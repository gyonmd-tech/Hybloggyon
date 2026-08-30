'use client';

import { useActionState, useMemo, useRef, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import rehypeSanitize from 'rehype-sanitize';
import remarkGfm from 'remark-gfm';
import { savePostAction } from '../actions';
import ActionMessage from './ActionMessage';
import SubmitButton from './SubmitButton';

const initialState = { ok: false, message: '', errors: {} };

function dateTimeLocal(value) {
  if (!value) return '';
  const date = new Date(value);
  const offset = date.getTimezoneOffset() * 60_000;
  return new Date(date.getTime() - offset).toISOString().slice(0, 16);
}

function makeSlug(value) {
  return String(value || '')
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim()
    .replace(/&/g, '-dan-')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function FieldError({ state, name }) {
  const messages = state?.errors?.[name];
  return messages?.length ? <span className="admin-error">{messages[0]}</span> : null;
}

export default function PostEditor({ post, options }) {
  const [state, action] = useActionState(savePostAction, initialState);
  const [title, setTitle] = useState(post?.title || '');
  const [slug, setSlug] = useState(post?.slug || '');
  const [slugTouched, setSlugTouched] = useState(Boolean(post?.slug));
  const [content, setContent] = useState(post?.contentMarkdown || '');
  const [excerpt, setExcerpt] = useState(post?.excerpt || '');
  const [seoTitle, setSeoTitle] = useState(post?.seoTitle || '');
  const [seoDescription, setSeoDescription] = useState(post?.seoDescription || '');
  const [status, setStatus] = useState(post?.status || 'draft');
  const [tab, setTab] = useState('write');
  const editorRef = useRef(null);

  const wordCount = useMemo(() => content.trim() ? content.trim().split(/\s+/).length : 0, [content]);
  const readingMinutes = Math.max(1, Math.ceil(wordCount / 200));

  function updateTitle(value) {
    setTitle(value);
    if (!slugTouched) setSlug(makeSlug(value));
  }

  function wrapSelection(before, after = before, placeholder = 'teks') {
    const textarea = editorRef.current;
    if (!textarea) return;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selected = content.slice(start, end) || placeholder;
    const next = `${content.slice(0, start)}${before}${selected}${after}${content.slice(end)}`;
    setContent(next);
    requestAnimationFrame(() => {
      textarea.focus();
      textarea.setSelectionRange(start + before.length, start + before.length + selected.length);
    });
  }

  return (
    <form action={action} className="admin-form-stack">
      {post?.id ? <input type="hidden" name="id" value={post.id} /> : null}
      <ActionMessage state={state} />

      <div className="admin-grid admin-grid--editor">
        <div className="admin-form-stack">
          <section className="admin-panel">
            <div className="admin-panel-body admin-form-stack">
              <label className="admin-field-group">
                <span className="admin-label">Judul artikel</span>
                <input
                  className="admin-field"
                  name="title"
                  value={title}
                  onChange={(event) => updateTitle(event.target.value)}
                  maxLength={240}
                  placeholder="Judul yang membuat gagasan terasa perlu dibaca"
                  required
                  style={{ minHeight: 64, fontFamily: 'var(--font-heading)', fontSize: 24, fontWeight: 300 }}
                />
                <span className="admin-field-count">{title.length}/240</span>
                <FieldError state={state} name="title" />
              </label>
              <label className="admin-field-group">
                <span className="admin-label">Subjudul</span>
                <input className="admin-field" name="subtitle" defaultValue={post?.subtitle || ''} maxLength={500} placeholder="Opsional — satu kalimat konteks tambahan" />
              </label>
              <div className="admin-form-grid">
                <label className="admin-field-group">
                  <span className="admin-label">Kategori</span>
                  <select className="admin-select" name="categorySlug" defaultValue={post?.categorySlug || options.categories[0]?.slug || ''} required>
                    {options.categories.map((category) => <option key={category.id} value={category.slug}>{category.name}</option>)}
                  </select>
                  <FieldError state={state} name="categorySlug" />
                </label>
                <label className="admin-field-group">
                  <span className="admin-label">Slug URL</span>
                  <input
                    className="admin-field"
                    name="slug"
                    value={slug}
                    onChange={(event) => { setSlugTouched(true); setSlug(makeSlug(event.target.value)); }}
                    maxLength={200}
                    required
                  />
                  <FieldError state={state} name="slug" />
                </label>
              </div>
            </div>
          </section>

          <section className="admin-panel">
            <div className="admin-editor-tabs" role="tablist" aria-label="Editor konten">
              <button type="button" role="tab" aria-selected={tab === 'write'} className={`admin-editor-tab ${tab === 'write' ? 'is-active' : ''}`} onClick={() => setTab('write')}>Tulis Markdown</button>
              <button type="button" role="tab" aria-selected={tab === 'preview'} className={`admin-editor-tab ${tab === 'preview' ? 'is-active' : ''}`} onClick={() => setTab('preview')}>Pratinjau</button>
              <span className="admin-meta" style={{ marginLeft: 'auto', alignSelf: 'center', padding: '0 14px' }}>{wordCount} kata · ±{readingMinutes} menit</span>
            </div>
            {tab === 'write' ? (
              <>
                <div className="admin-actions" style={{ justifyContent: 'flex-start', padding: '10px 12px', borderBottom: '1px solid var(--color-outline-variant)' }} aria-label="Format Markdown">
                  <button type="button" className="admin-button admin-button--small" onClick={() => wrapSelection('**')}>Tebal</button>
                  <button type="button" className="admin-button admin-button--small" onClick={() => wrapSelection('_')}>Miring</button>
                  <button type="button" className="admin-button admin-button--small" onClick={() => wrapSelection('## ', '', 'Subjudul')}>H2</button>
                  <button type="button" className="admin-button admin-button--small" onClick={() => wrapSelection('[', '](https://)', 'label')}>Tautan</button>
                  <button type="button" className="admin-button admin-button--small" onClick={() => wrapSelection('> ', '', 'Kutipan')}>Kutipan</button>
                </div>
                <textarea
                  ref={editorRef}
                  className="admin-textarea admin-textarea--editor"
                  name="contentMarkdown"
                  aria-label="Isi Markdown"
                  value={content}
                  onChange={(event) => setContent(event.target.value)}
                  placeholder={'Mulai menulis di sini…\n\n## Subjudul\n\nGagasan utama.'}
                />
              </>
            ) : (
              <div className="admin-markdown-preview">
                {content ? <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeSanitize]}>{content}</ReactMarkdown> : <p style={{ color: 'var(--color-outline)' }}>Belum ada isi untuk dipratinjau.</p>}
              </div>
            )}
          </section>

          <section className="admin-panel">
            <div className="admin-panel-header"><h2 className="admin-panel-title">Ringkasan & konteks</h2></div>
            <div className="admin-panel-body admin-form-stack">
              <label className="admin-field-group">
                <span className="admin-label">Excerpt</span>
                <textarea className="admin-textarea" name="excerpt" value={excerpt} onChange={(event) => setExcerpt(event.target.value)} maxLength={500} placeholder="Ringkasan untuk kartu artikel dan metadata dasar." />
                <span className="admin-field-count">{excerpt.length}/500</span>
              </label>
              <label className="admin-field-group">
                <span className="admin-label">Pull quote</span>
                <textarea className="admin-textarea" name="pullQuote" defaultValue={post?.pullQuote || ''} maxLength={500} placeholder="Kalimat utama yang ingin ditonjolkan." />
              </label>
              <label className="admin-field-group">
                <span className="admin-label">Tag</span>
                <input className="admin-field" name="tags" defaultValue={post?.tags?.join(', ') || ''} placeholder="filsafat, budaya, catatan" />
                <span className="admin-help">Pisahkan setiap tag dengan koma. Tag baru dibuat otomatis.</span>
              </label>
            </div>
          </section>

          <section className="admin-panel">
            <div className="admin-panel-header"><h2 className="admin-panel-title">SEO & distribusi</h2><span className="admin-meta">Search preview</span></div>
            <div className="admin-panel-body admin-form-stack">
              <div style={{ padding: 18, border: '1px solid var(--color-outline-variant)', background: 'var(--color-surface-container-low)' }}>
                <p style={{ color: '#1a0dab', fontFamily: 'var(--font-sans)', fontSize: 18 }}>{seoTitle || title || 'Judul artikel'}</p>
                <p style={{ color: '#006621', fontFamily: 'var(--font-sans)', fontSize: 11, marginTop: 4 }}>hybloggyon · artikel</p>
                <p style={{ color: 'var(--color-on-surface-variant)', fontFamily: 'var(--font-sans)', fontSize: 12, marginTop: 5, lineHeight: 1.55 }}>{seoDescription || excerpt || 'Deskripsi artikel akan terlihat di sini.'}</p>
              </div>
              <label className="admin-field-group">
                <span className="admin-label">Judul SEO</span>
                <input className="admin-field" name="seoTitle" value={seoTitle} onChange={(event) => setSeoTitle(event.target.value)} maxLength={240} placeholder="Kosongkan untuk memakai judul artikel" />
                <span className="admin-field-count">{seoTitle.length}/240</span>
              </label>
              <label className="admin-field-group">
                <span className="admin-label">Deskripsi SEO</span>
                <textarea className="admin-textarea" name="seoDescription" value={seoDescription} onChange={(event) => setSeoDescription(event.target.value)} maxLength={320} placeholder="Kosongkan untuk memakai excerpt" />
                <span className="admin-field-count">{seoDescription.length}/320</span>
              </label>
              <div className="admin-form-grid">
                <label className="admin-field-group">
                  <span className="admin-label">Canonical URL</span>
                  <input className="admin-field" name="canonicalUrl" type="url" defaultValue={post?.canonicalUrl || ''} placeholder="https://…" />
                </label>
                <label className="admin-field-group">
                  <span className="admin-label">OG image URL</span>
                  <input className="admin-field" name="ogImageUrl" type="url" defaultValue={post?.ogImageUrl || ''} placeholder="https://…" />
                </label>
              </div>
              <label className="admin-check"><input type="checkbox" name="noIndex" defaultChecked={post?.noIndex || false} /><span><strong>Jangan indeks halaman ini</strong><br /><span className="admin-help">Menambahkan aturan noindex dan mengeluarkannya dari sitemap.</span></span></label>
            </div>
          </section>
        </div>

        <aside className="admin-form-stack">
          <section className="admin-panel admin-panel--sticky">
            <div className="admin-panel-header"><h2 className="admin-panel-title">Publikasi</h2><span className={`admin-status admin-status--${status}`}>{status}</span></div>
            <div className="admin-panel-body admin-form-stack">
              <label className="admin-field-group">
                <span className="admin-label">Status</span>
                <select className="admin-select" name="status" value={status} onChange={(event) => setStatus(event.target.value)}>
                  <option value="draft">Draft</option>
                  <option value="scheduled">Terjadwal</option>
                  <option value="published">Terbit</option>
                  <option value="archived">Arsip</option>
                </select>
              </label>
              {status === 'scheduled' ? (
                <label className="admin-field-group"><span className="admin-label">Jadwal terbit</span><input className="admin-field" type="datetime-local" name="scheduledAt" defaultValue={dateTimeLocal(post?.scheduledAt)} required /></label>
              ) : <input type="hidden" name="scheduledAt" value={dateTimeLocal(post?.scheduledAt)} />}
              <label className="admin-field-group"><span className="admin-label">Tanggal publikasi</span><input className="admin-field" type="datetime-local" name="publishedAt" defaultValue={dateTimeLocal(post?.publishedAt)} /></label>
              <label className="admin-check"><input type="checkbox" name="featured" defaultChecked={post?.featured || false} /><span>Jadikan artikel unggulan</span></label>
              <SubmitButton className="admin-button--primary" pendingLabel="Menyimpan artikel…" icon="save">Simpan artikel</SubmitButton>
              {post?.categorySlug && post?.slug && post.status === 'published' ? (
                <a href={`/${post.categorySlug}/${post.slug}`} target="_blank" className="admin-button" rel="noreferrer"><span className="material-symbols-outlined" aria-hidden="true">open_in_new</span>Lihat artikel</a>
              ) : null}
            </div>
          </section>

          <section className="admin-panel">
            <div className="admin-panel-header"><h2 className="admin-panel-title">Sampul</h2></div>
            <div className="admin-panel-body admin-form-stack">
              <label className="admin-field-group">
                <span className="admin-label">Aset media</span>
                <select className="admin-select" name="coverAssetId" defaultValue={post?.coverAssetId || ''}>
                  <option value="">Tanpa sampul</option>
                  {options.media.map((asset) => <option key={asset.id} value={asset.id}>{asset.fileName}</option>)}
                </select>
              </label>
              <a href="/admin/media" className="admin-button admin-button--small">Buka pustaka media</a>
            </div>
          </section>

          <section className="admin-panel">
            <div className="admin-panel-header"><h2 className="admin-panel-title">Seri</h2></div>
            <div className="admin-panel-body admin-form-stack">
              <label className="admin-field-group"><span className="admin-label">Pilih seri</span><select className="admin-select" name="seriesSlug" defaultValue={post?.seriesSlug || ''}><option value="">Bukan bagian seri</option>{options.series.map((item) => <option key={item.id} value={item.slug}>{item.name}</option>)}</select></label>
              <label className="admin-field-group"><span className="admin-label">Urutan dalam seri</span><input className="admin-field" type="number" min="1" name="seriesOrder" defaultValue={post?.seriesOrder || ''} /></label>
            </div>
          </section>
        </aside>
      </div>
    </form>
  );
}
