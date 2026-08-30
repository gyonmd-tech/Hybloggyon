'use server';

import { randomUUID } from 'node:crypto';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import { isDatabaseConfigured } from '../../lib/db/client.js';
import { postEditorInputSchema } from '../../lib/content/contracts.js';
import {
  archiveAdminPost,
  createMediaAsset,
  deleteAdminPost,
  deleteCategory,
  deleteMediaAsset,
  deleteSeries,
  deleteTag,
  findAdminByEmail,
  getAdminUserWithPassword,
  getMediaAssetById,
  markAdminLogin,
  restorePostRevision,
  saveAdminPost,
  saveAdminSiteProfile,
  saveCategory,
  saveSeries,
  saveTag,
  updateAdminPassword,
  updateMediaAsset,
} from '../../lib/db/repositories/admin.js';
import {
  createAdminSession,
  destroyCurrentAdminSession,
  requireAdmin,
} from '../../lib/auth/session.js';
import { clearLoginAttempts, consumeLoginAttempt } from '../../lib/auth/login-rate-limit.js';
import { hashPassword, verifyPassword } from '../../lib/auth/password.js';
import { slugify } from '../../lib/slugify.js';
import { deleteStoredImage, storeImage } from '../../lib/media/storage.js';

const emptyState = { ok: false, message: '', errors: {} };
const taxonomySchema = z.object({
  id: z.string().uuid().optional(),
  name: z.string().trim().min(1, 'Nama wajib diisi.').max(160),
  slug: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Slug tidak valid.').max(160),
  description: z.string().trim().max(600).default(''),
});

function actionError(error, fallback = 'Operasi gagal. Silakan coba lagi.') {
  if (error instanceof z.ZodError) {
    return {
      ...emptyState,
      message: 'Periksa kembali field yang ditandai.',
      errors: error.flatten().fieldErrors,
    };
  }
  if (error?.code === '23505') {
    return { ...emptyState, message: 'Slug atau nilai tersebut sudah digunakan.' };
  }
  return { ...emptyState, message: error?.message || fallback };
}

function optionalUuid(value) {
  const text = String(value || '').trim();
  return text || null;
}

function optionalDate(value) {
  const text = String(value || '').trim();
  if (!text) return null;
  const date = new Date(text);
  return Number.isNaN(date.valueOf()) ? null : date.toISOString();
}

function boolValue(formData, key) {
  return formData.get(key) === 'on' || formData.get(key) === 'true';
}

function revalidateEditorialPaths(route) {
  revalidatePath('/');
  revalidatePath('/archive');
  revalidatePath('/notes');
  revalidatePath('/sitemap.xml');
  revalidatePath('/admin');
  revalidatePath('/admin/posts');
  if (route) revalidatePath(route);
}

export async function loginAction(_previousState, formData) {
  if (!isDatabaseConfigured()) {
    return { ...emptyState, message: 'Database belum dikonfigurasi.' };
  }

  const email = String(formData.get('email') || '').trim().toLowerCase();
  const password = String(formData.get('password') || '');
  const returnToValue = String(formData.get('returnTo') || '/admin');
  const returnTo = returnToValue.startsWith('/admin') && !returnToValue.startsWith('//')
    ? returnToValue
    : '/admin';
  const requestHeaders = await headers();
  const remoteAddress = requestHeaders.get('x-forwarded-for')?.split(',')[0]?.trim() || 'local';
  const limiterKey = `${remoteAddress}:${email || 'unknown'}`;
  const rateLimit = consumeLoginAttempt(limiterKey);

  if (!rateLimit.allowed) {
    return {
      ...emptyState,
      message: `Terlalu banyak percobaan. Coba lagi dalam ${rateLimit.retryAfterSeconds} detik.`,
    };
  }
  if (!email || !password) {
    return { ...emptyState, message: 'Email dan password wajib diisi.' };
  }

  const admin = await findAdminByEmail(email);
  const valid = admin?.isActive && await verifyPassword(password, admin.passwordHash);
  if (!valid) {
    await new Promise((resolve) => setTimeout(resolve, 350));
    return { ...emptyState, message: 'Email atau password tidak cocok.' };
  }

  clearLoginAttempts(limiterKey);
  await createAdminSession(admin.id);
  await markAdminLogin(admin.id);
  redirect(returnTo);
}

export async function logoutAction() {
  await destroyCurrentAdminSession();
  redirect('/admin/login');
}

export async function savePostAction(_previousState, formData) {
  const admin = await requireAdmin('/admin/posts/new');
  const postId = optionalUuid(formData.get('id'));

  try {
    let publishedAt = optionalDate(formData.get('publishedAt'));
    const status = String(formData.get('status') || 'draft');
    if (status === 'published' && !publishedAt) publishedAt = new Date().toISOString();

    const input = postEditorInputSchema.parse({
      title: formData.get('title'),
      subtitle: formData.get('subtitle') || '',
      categorySlug: formData.get('categorySlug'),
      slug: formData.get('slug'),
      excerpt: formData.get('excerpt') || '',
      contentMarkdown: formData.get('contentMarkdown') || '',
      pullQuote: formData.get('pullQuote') || '',
      status,
      featured: boolValue(formData, 'featured'),
      tags: String(formData.get('tags') || '').split(',').map((tag) => tag.trim()).filter(Boolean),
      seriesSlug: optionalUuid(formData.get('seriesSlug')),
      seriesOrder: formData.get('seriesOrder') ? Number(formData.get('seriesOrder')) : null,
      scheduledAt: optionalDate(formData.get('scheduledAt')),
      publishedAt,
      coverAssetId: optionalUuid(formData.get('coverAssetId')),
      seoTitle: formData.get('seoTitle') || '',
      seoDescription: formData.get('seoDescription') || '',
      canonicalUrl: formData.get('canonicalUrl') || '',
      ogImageUrl: formData.get('ogImageUrl') || '',
      noIndex: boolValue(formData, 'noIndex'),
    });

    if (input.status === 'scheduled' && !input.scheduledAt) {
      return { ...emptyState, message: 'Tanggal terbit wajib diisi untuk artikel terjadwal.' };
    }

    const saved = await saveAdminPost({
      ...input,
      scheduledAt: input.scheduledAt ? new Date(input.scheduledAt) : null,
      publishedAt: input.publishedAt ? new Date(input.publishedAt) : null,
    }, admin.userId, postId);
    revalidateEditorialPaths(saved.route);
    if (saved.previousRoute) revalidatePath(saved.previousRoute);
    redirect(`/admin/posts/${saved.id}/edit?saved=1`);
  } catch (error) {
    if (error?.digest?.startsWith('NEXT_REDIRECT')) throw error;
    return actionError(error, 'Artikel gagal disimpan.');
  }
}

export async function archivePostAction(formData) {
  await requireAdmin('/admin/posts');
  const id = z.string().uuid().parse(formData.get('id'));
  await archiveAdminPost(id);
  revalidateEditorialPaths();
  redirect('/admin/posts?archived=1');
}

export async function deletePostAction(formData) {
  await requireAdmin('/admin/posts');
  const id = z.string().uuid().parse(formData.get('id'));
  await deleteAdminPost(id);
  revalidateEditorialPaths();
  redirect('/admin/posts?deleted=1');
}

export async function restoreRevisionAction(formData) {
  const admin = await requireAdmin('/admin/posts');
  const postId = z.string().uuid().parse(formData.get('postId'));
  const revisionId = z.string().uuid().parse(formData.get('revisionId'));
  const result = await restorePostRevision(postId, revisionId, admin.userId);
  revalidateEditorialPaths(result.route);
  redirect(`/admin/posts/${postId}/edit?restored=1`);
}

export async function saveCategoryAction(_previousState, formData) {
  await requireAdmin('/admin/categories');
  try {
    const value = taxonomySchema.parse({
      id: optionalUuid(formData.get('id')) || undefined,
      name: formData.get('name'),
      slug: formData.get('slug') || slugify(formData.get('name')),
      description: formData.get('description') || '',
    });
    await saveCategory(value);
    revalidateEditorialPaths();
    revalidatePath('/admin/categories');
    return { ok: true, message: value.id ? 'Kategori diperbarui.' : 'Kategori dibuat.', errors: {} };
  } catch (error) {
    return actionError(error);
  }
}

export async function deleteCategoryAction(formData) {
  await requireAdmin('/admin/categories');
  await deleteCategory(z.string().uuid().parse(formData.get('id')));
  revalidatePath('/admin/categories');
}

export async function saveTagAction(_previousState, formData) {
  await requireAdmin('/admin/tags');
  try {
    const value = taxonomySchema.pick({ id: true, name: true, slug: true }).parse({
      id: optionalUuid(formData.get('id')) || undefined,
      name: formData.get('name'),
      slug: formData.get('slug') || slugify(formData.get('name')),
    });
    await saveTag(value);
    revalidatePath('/admin/tags');
    return { ok: true, message: value.id ? 'Tag diperbarui.' : 'Tag dibuat.', errors: {} };
  } catch (error) {
    return actionError(error);
  }
}

export async function deleteTagAction(formData) {
  await requireAdmin('/admin/tags');
  await deleteTag(z.string().uuid().parse(formData.get('id')));
  revalidatePath('/admin/tags');
}

export async function saveSeriesAction(_previousState, formData) {
  await requireAdmin('/admin/series');
  try {
    const value = taxonomySchema.parse({
      id: optionalUuid(formData.get('id')) || undefined,
      name: formData.get('name'),
      slug: formData.get('slug') || slugify(formData.get('name')),
      description: formData.get('description') || '',
    });
    await saveSeries(value);
    revalidatePath('/admin/series');
    return { ok: true, message: value.id ? 'Seri diperbarui.' : 'Seri dibuat.', errors: {} };
  } catch (error) {
    return actionError(error);
  }
}

export async function deleteSeriesAction(formData) {
  await requireAdmin('/admin/series');
  await deleteSeries(z.string().uuid().parse(formData.get('id')));
  revalidatePath('/admin/series');
}

const imageTypes = new Map([
  ['image/jpeg', 'jpg'],
  ['image/png', 'png'],
  ['image/webp', 'webp'],
  ['image/gif', 'gif'],
  ['image/avif', 'avif'],
]);

export async function uploadMediaAction(_previousState, formData) {
  const admin = await requireAdmin('/admin/media');
  try {
    const file = formData.get('file');
    if (!(file instanceof File) || file.size === 0) throw new Error('Pilih file gambar.');
    const extension = imageTypes.get(file.type);
    if (!extension) throw new Error('Format yang didukung: JPG, PNG, WebP, GIF, dan AVIF.');
    const maxBytes = Number(process.env.MEDIA_MAX_SIZE_MB || 8) * 1024 * 1024;
    if (file.size > maxBytes) throw new Error(`Ukuran file maksimal ${process.env.MEDIA_MAX_SIZE_MB || 8} MB.`);

    const bytes = Buffer.from(await file.arrayBuffer());
    const stored = await storeImage({
      fileName: file.name,
      extension,
      mimeType: file.type,
      bytes,
    });

    try {
      await createMediaAsset({
        storageKey: stored.storageKey,
        publicUrl: stored.publicUrl,
        fileName: file.name.slice(0, 255),
        mimeType: file.type,
        sizeBytes: file.size,
        altText: String(formData.get('altText') || '').trim(),
        caption: String(formData.get('caption') || '').trim(),
        uploadedById: admin.userId,
      });
    } catch (error) {
      await deleteStoredImage(stored).catch(() => {});
      throw error;
    }
    revalidatePath('/admin/media');
    return { ok: true, message: 'Gambar berhasil diunggah.', errors: {} };
  } catch (error) {
    return actionError(error, 'Gambar gagal diunggah.');
  }
}

export async function importMediaUrlAction(_previousState, formData) {
  const admin = await requireAdmin('/admin/media');
  try {
    const schema = z.object({
      publicUrl: z.url('URL gambar tidak valid.'),
      fileName: z.string().trim().min(1).max(255),
      altText: z.string().trim().max(500).default(''),
      caption: z.string().trim().max(1000).default(''),
    });
    const value = schema.parse({
      publicUrl: formData.get('publicUrl'),
      fileName: formData.get('fileName'),
      altText: formData.get('altText') || '',
      caption: formData.get('caption') || '',
    });
    await createMediaAsset({
      storageKey: `external/${randomUUID()}`,
      publicUrl: value.publicUrl,
      fileName: value.fileName,
      mimeType: 'image/external',
      sizeBytes: 0,
      altText: value.altText,
      caption: value.caption,
      uploadedById: admin.userId,
    });
    revalidatePath('/admin/media');
    return { ok: true, message: 'URL gambar ditambahkan ke pustaka.', errors: {} };
  } catch (error) {
    return actionError(error);
  }
}

export async function updateMediaAction(_previousState, formData) {
  await requireAdmin('/admin/media');
  try {
    const id = z.string().uuid().parse(formData.get('id'));
    await updateMediaAsset(id, {
      altText: String(formData.get('altText') || '').trim().slice(0, 500),
      caption: String(formData.get('caption') || '').trim().slice(0, 1000),
    });
    revalidatePath('/admin/media');
    return { ok: true, message: 'Metadata gambar diperbarui.', errors: {} };
  } catch (error) {
    return actionError(error);
  }
}

export async function deleteMediaAction(formData) {
  await requireAdmin('/admin/media');
  const id = z.string().uuid().parse(formData.get('id'));
  const asset = await getMediaAssetById(id);
  if (asset) {
    await deleteStoredImage(asset);
    await deleteMediaAsset(id);
  }
  revalidatePath('/admin/media');
}

export async function saveSettingsAction(_previousState, formData) {
  const admin = await requireAdmin('/admin/settings');
  try {
    const profile = z.object({
      siteName: z.string().trim().min(1).max(80),
      siteTitle: z.string().trim().min(1).max(160),
      description: z.string().trim().min(1).max(320),
      authorName: z.string().trim().min(1).max(120),
      authorBio: z.string().trim().max(600).default(''),
      defaultOgImage: z.string().trim().refine(
        (value) => !value || value.startsWith('/') || z.url().safeParse(value).success,
        'Gunakan URL absolut atau path yang diawali /.',
      ),
      postsPerPage: z.number().int().min(5).max(100),
    }).parse({
      siteName: formData.get('siteName'),
      siteTitle: formData.get('siteTitle'),
      description: formData.get('description'),
      authorName: formData.get('authorName'),
      authorBio: formData.get('authorBio') || '',
      defaultOgImage: formData.get('defaultOgImage') || '',
      postsPerPage: Number(formData.get('postsPerPage') || 20),
    });
    await saveAdminSiteProfile(profile, admin.userId);
    revalidatePath('/', 'layout');
    revalidatePath('/admin/settings');
    return { ok: true, message: 'Pengaturan situs disimpan.', errors: {} };
  } catch (error) {
    return actionError(error);
  }
}

export async function changePasswordAction(_previousState, formData) {
  const admin = await requireAdmin('/admin/settings');
  try {
    const currentPassword = String(formData.get('currentPassword') || '');
    const newPassword = String(formData.get('newPassword') || '');
    const confirmation = String(formData.get('passwordConfirmation') || '');
    if (newPassword.length < 12) throw new Error('Password baru minimal 12 karakter.');
    if (newPassword !== confirmation) throw new Error('Konfirmasi password tidak sama.');
    const user = await getAdminUserWithPassword(admin.userId);
    if (!user || !await verifyPassword(currentPassword, user.passwordHash)) {
      throw new Error('Password saat ini tidak cocok.');
    }
    await updateAdminPassword(admin.userId, await hashPassword(newPassword));
    await destroyCurrentAdminSession();
    redirect('/admin/login?passwordChanged=1');
  } catch (error) {
    if (error?.digest?.startsWith('NEXT_REDIRECT')) throw error;
    return actionError(error);
  }
}
