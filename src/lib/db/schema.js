import { relations, sql } from 'drizzle-orm';
import {
  boolean,
  index,
  integer,
  jsonb,
  pgEnum,
  pgTable,
  primaryKey,
  text,
  timestamp,
  uniqueIndex,
  uuid,
  varchar,
} from 'drizzle-orm/pg-core';

export const postStatus = pgEnum('post_status', [
  'draft',
  'scheduled',
  'published',
  'archived',
]);

export const categories = pgTable(
  'categories',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    name: varchar('name', { length: 80 }).notNull(),
    slug: varchar('slug', { length: 80 }).notNull(),
    description: text('description').notNull().default(''),
    createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => [uniqueIndex('categories_slug_unique').on(table.slug)],
);

export const series = pgTable(
  'series',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    name: varchar('name', { length: 160 }).notNull(),
    slug: varchar('slug', { length: 160 }).notNull(),
    description: text('description').notNull().default(''),
    createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => [uniqueIndex('series_slug_unique').on(table.slug)],
);

export const adminUsers = pgTable(
  'admin_users',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    email: varchar('email', { length: 320 }).notNull(),
    displayName: varchar('display_name', { length: 120 }).notNull(),
    passwordHash: text('password_hash'),
    role: varchar('role', { length: 32 }).notNull().default('owner'),
    isActive: boolean('is_active').notNull().default(true),
    lastLoginAt: timestamp('last_login_at', { withTimezone: true }),
    createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => [uniqueIndex('admin_users_email_unique').on(sql`lower(${table.email})`)],
);

export const mediaAssets = pgTable(
  'media_assets',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    storageKey: text('storage_key').notNull(),
    publicUrl: text('public_url').notNull(),
    fileName: varchar('file_name', { length: 255 }).notNull(),
    mimeType: varchar('mime_type', { length: 120 }).notNull(),
    sizeBytes: integer('size_bytes').notNull(),
    width: integer('width'),
    height: integer('height'),
    altText: text('alt_text').notNull().default(''),
    caption: text('caption').notNull().default(''),
    uploadedById: uuid('uploaded_by_id').references(() => adminUsers.id, {
      onDelete: 'set null',
    }),
    createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => [
    uniqueIndex('media_assets_storage_key_unique').on(table.storageKey),
    index('media_assets_created_at_idx').on(table.createdAt),
  ],
);

export const posts = pgTable(
  'posts',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    categoryId: uuid('category_id')
      .notNull()
      .references(() => categories.id, { onDelete: 'restrict' }),
    authorId: uuid('author_id').references(() => adminUsers.id, {
      onDelete: 'set null',
    }),
    seriesId: uuid('series_id').references(() => series.id, {
      onDelete: 'set null',
    }),
    coverAssetId: uuid('cover_asset_id').references(() => mediaAssets.id, {
      onDelete: 'set null',
    }),
    title: varchar('title', { length: 240 }).notNull(),
    subtitle: text('subtitle').notNull().default(''),
    slug: varchar('slug', { length: 200 }).notNull(),
    excerpt: text('excerpt').notNull().default(''),
    contentMarkdown: text('content_markdown').notNull().default(''),
    pullQuote: text('pull_quote').notNull().default(''),
    status: postStatus('status').notNull().default('draft'),
    featured: boolean('featured').notNull().default(false),
    readingTime: integer('reading_time').notNull().default(1),
    seriesOrder: integer('series_order'),
    scheduledAt: timestamp('scheduled_at', { withTimezone: true }),
    publishedAt: timestamp('published_at', { withTimezone: true }),
    seoTitle: varchar('seo_title', { length: 240 }).notNull().default(''),
    seoDescription: varchar('seo_description', { length: 320 }).notNull().default(''),
    canonicalUrl: text('canonical_url').notNull().default(''),
    ogImageUrl: text('og_image_url').notNull().default(''),
    noIndex: boolean('no_index').notNull().default(false),
    createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => [
    uniqueIndex('posts_category_slug_unique').on(table.categoryId, table.slug),
    index('posts_status_published_at_idx').on(table.status, table.publishedAt),
    index('posts_category_id_idx').on(table.categoryId),
    index('posts_series_id_idx').on(table.seriesId),
    index('posts_featured_idx').on(table.featured),
  ],
);

export const tags = pgTable(
  'tags',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    name: varchar('name', { length: 80 }).notNull(),
    slug: varchar('slug', { length: 80 }).notNull(),
    createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => [uniqueIndex('tags_slug_unique').on(table.slug)],
);

export const postTags = pgTable(
  'post_tags',
  {
    postId: uuid('post_id')
      .notNull()
      .references(() => posts.id, { onDelete: 'cascade' }),
    tagId: uuid('tag_id')
      .notNull()
      .references(() => tags.id, { onDelete: 'cascade' }),
    position: integer('position').notNull().default(0),
  },
  (table) => [
    primaryKey({ columns: [table.postId, table.tagId] }),
    index('post_tags_tag_id_idx').on(table.tagId),
  ],
);

export const postRevisions = pgTable(
  'post_revisions',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    postId: uuid('post_id')
      .notNull()
      .references(() => posts.id, { onDelete: 'cascade' }),
    editorId: uuid('editor_id').references(() => adminUsers.id, {
      onDelete: 'set null',
    }),
    revisionNumber: integer('revision_number').notNull(),
    title: varchar('title', { length: 240 }).notNull(),
    excerpt: text('excerpt').notNull().default(''),
    contentMarkdown: text('content_markdown').notNull(),
    metadata: jsonb('metadata').notNull().default({}),
    createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => [
    uniqueIndex('post_revisions_post_number_unique').on(
      table.postId,
      table.revisionNumber,
    ),
    index('post_revisions_post_id_idx').on(table.postId),
  ],
);

export const slugRedirects = pgTable(
  'slug_redirects',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    postId: uuid('post_id')
      .notNull()
      .references(() => posts.id, { onDelete: 'cascade' }),
    fromPath: text('from_path').notNull(),
    toPath: text('to_path').notNull(),
    statusCode: integer('status_code').notNull().default(301),
    createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => [uniqueIndex('slug_redirects_from_path_unique').on(table.fromPath)],
);

export const siteSettings = pgTable('site_settings', {
  key: varchar('key', { length: 120 }).primaryKey(),
  value: jsonb('value').notNull(),
  updatedById: uuid('updated_by_id').references(() => adminUsers.id, {
    onDelete: 'set null',
  }),
  updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
});

export const adminSessions = pgTable(
  'admin_sessions',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    userId: uuid('user_id')
      .notNull()
      .references(() => adminUsers.id, { onDelete: 'cascade' }),
    tokenHash: text('token_hash').notNull(),
    expiresAt: timestamp('expires_at', { withTimezone: true }).notNull(),
    lastSeenAt: timestamp('last_seen_at', { withTimezone: true }).notNull().defaultNow(),
    createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => [
    uniqueIndex('admin_sessions_token_hash_unique').on(table.tokenHash),
    index('admin_sessions_user_id_idx').on(table.userId),
    index('admin_sessions_expires_at_idx').on(table.expiresAt),
  ],
);

export const categoriesRelations = relations(categories, ({ many }) => ({
  posts: many(posts),
}));

export const seriesRelations = relations(series, ({ many }) => ({
  posts: many(posts),
}));

export const postsRelations = relations(posts, ({ one, many }) => ({
  category: one(categories, {
    fields: [posts.categoryId],
    references: [categories.id],
  }),
  author: one(adminUsers, {
    fields: [posts.authorId],
    references: [adminUsers.id],
  }),
  series: one(series, {
    fields: [posts.seriesId],
    references: [series.id],
  }),
  coverAsset: one(mediaAssets, {
    fields: [posts.coverAssetId],
    references: [mediaAssets.id],
  }),
  tags: many(postTags),
  revisions: many(postRevisions),
  redirects: many(slugRedirects),
}));

export const tagsRelations = relations(tags, ({ many }) => ({
  posts: many(postTags),
}));

export const postTagsRelations = relations(postTags, ({ one }) => ({
  post: one(posts, { fields: [postTags.postId], references: [posts.id] }),
  tag: one(tags, { fields: [postTags.tagId], references: [tags.id] }),
}));

export const adminUsersRelations = relations(adminUsers, ({ many }) => ({
  posts: many(posts),
  sessions: many(adminSessions),
  mediaAssets: many(mediaAssets),
  revisions: many(postRevisions),
}));
