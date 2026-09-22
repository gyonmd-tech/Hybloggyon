'use client';

import { useActionState, useEffect, useMemo, useRef, useState } from 'react';
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

function PreviewStrong({ node, children }) {
  return node?.properties?.title === 'editor-highlight'
    ? <mark className="editor-highlight">{children}</mark>
    : <strong>{children}</strong>;
}

function remarkHighlight() {
  return (tree) => {
    function transform(node) {
      if (!Array.isArray(node.children)) return;
      node.children = node.children.flatMap((child) => {
        if (child.type !== 'text' || !child.value.includes('==')) {
          transform(child);
          return child;
        }
        return child.value.split(/(==[^=\n]+==)/g).filter(Boolean).map((part) => (
          part.startsWith('==') && part.endsWith('==')
            ? { type: 'strong', children: [{ type: 'text', value: part.slice(2, -2) }], data: { hProperties: { title: 'editor-highlight' } } }
            : { type: 'text', value: part }
        ));
      });
    }
    transform(tree);
  };
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
  const [focusMode, setFocusMode] = useState(false);
  const [showOutline, setShowOutline] = useState(false);
  const [wordGoal, setWordGoal] = useState(1000);
  const [autoSaveLabel, setAutoSaveLabel] = useState('Cadangan lokal aktif');
  const [recovery, setRecovery] = useState(null);
  const [toolFeedback, setToolFeedback] = useState('');
  const [notebookOpen, setNotebookOpen] = useState(false);
  const [notebookPages, setNotebookPages] = useState([{ id: 'inbox', title: 'Catatan 1', content: '' }]);
  const [activeNoteId, setActiveNoteId] = useState('inbox');
  const editorRef = useRef(null);
  const formRef = useRef(null);
  const recoveryPendingRef = useRef(false);
  const draftReadyRef = useRef(false);
  const notebookReadyRef = useRef(false);

  const wordCount = useMemo(() => content.trim() ? content.trim().split(/\s+/).length : 0, [content]);
  const readingMinutes = Math.max(1, Math.ceil(wordCount / 200));
  const characterCount = content.length;
  const goalProgress = Math.min(100, Math.round((wordCount / Math.max(1, wordGoal)) * 100));
  const draftKey = 'hybloggyon:editor-draft:' + (post?.id || 'new');
  const notebookKey = 'hybloggyon:writing-notebook';
  const activeNote = notebookPages.find((page) => page.id === activeNoteId) || notebookPages[0];
  const outline = useMemo(() => content.split('\n').reduce((items, line, index) => {
    const match = line.match(/^(#{1,3})\s+(.+)/);
    if (match) items.push({ level: match[1].length, text: match[2], line: index + 1 });
    return items;
  }, []), [content]);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      try {
        const saved = JSON.parse(window.localStorage.getItem(draftKey) || 'null');
        const differs = saved && (saved.content !== content || saved.title !== title);
        if (differs) {
          recoveryPendingRef.current = true;
          setRecovery(saved);
        }
      } catch {
        window.localStorage.removeItem(draftKey);
      }
      draftReadyRef.current = true;
    }, 0);
    return () => window.clearTimeout(timer);
  // Nilai awal sengaja dibaca sekali untuk menawarkan pemulihan tanpa menimpa konten server.
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [draftKey]);

  useEffect(() => {
    if (!draftReadyRef.current || recoveryPendingRef.current) return undefined;
    setAutoSaveLabel('Menyimpan cadangan…');
    const timer = window.setTimeout(() => {
      window.localStorage.setItem(draftKey, JSON.stringify({ title, content, excerpt, savedAt: Date.now() }));
      setAutoSaveLabel('Tersimpan di perangkat');
    }, 700);
    return () => window.clearTimeout(timer);
  }, [content, draftKey, excerpt, title]);

  useEffect(() => {
    if (!state.ok) return;
    const timer = window.setTimeout(() => {
      window.localStorage.removeItem(draftKey);
      recoveryPendingRef.current = false;
      setRecovery(null);
      setAutoSaveLabel('Tersimpan ke database');
    }, 0);
    return () => window.clearTimeout(timer);
  }, [draftKey, state.ok]);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      try {
        const saved = JSON.parse(window.localStorage.getItem(notebookKey) || 'null');
        if (Array.isArray(saved) && saved.length) {
          setNotebookPages(saved);
          setActiveNoteId(saved[0].id);
        }
      } catch {
        window.localStorage.removeItem(notebookKey);
      }
      notebookReadyRef.current = true;
    }, 0);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!notebookReadyRef.current) return undefined;
    const timer = window.setTimeout(() => {
      window.localStorage.setItem(notebookKey, JSON.stringify(notebookPages));
    }, 250);
    return () => window.clearTimeout(timer);
  }, [notebookPages]);

  useEffect(() => {
    function handleShortcut(event) {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 's') {
        event.preventDefault();
        formRef.current?.requestSubmit();
      }
      if (event.key === 'Escape') {
        if (notebookOpen) setNotebookOpen(false);
        else setFocusMode(false);
      }
    }
    window.addEventListener('keydown', handleShortcut);
    return () => window.removeEventListener('keydown', handleShortcut);
  }, [notebookOpen]);

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

  function prefixSelection(prefix, placeholder = 'Item daftar') {
    const textarea = editorRef.current;
    if (!textarea) return;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selected = content.slice(start, end) || placeholder;
    const replacement = selected.split('\n').map((line, index) => typeof prefix === 'function' ? prefix(index) + line : prefix + line).join('\n');
    setContent(content.slice(0, start) + replacement + content.slice(end));
    requestAnimationFrame(() => {
      textarea.focus();
      textarea.setSelectionRange(start, start + replacement.length);
    });
  }

  function handleEditorKeyDown(event) {
    if (event.key === 'Tab') {
      event.preventDefault();
      wrapSelection('  ', '', '');
    } else if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'b') {
      event.preventDefault();
      wrapSelection('**');
    } else if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'i') {
      event.preventDefault();
      wrapSelection('_');
    } else if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k') {
      event.preventDefault();
      wrapSelection('[', '](https://)', 'label');
    }
  }

  function restoreDraft() {
    if (!recovery) return;
    setTitle(recovery.title || '');
    setContent(recovery.content || '');
    setExcerpt(recovery.excerpt || '');
    recoveryPendingRef.current = false;
    setRecovery(null);
    setAutoSaveLabel('Cadangan dipulihkan');
  }

  function dismissRecovery() {
    window.localStorage.removeItem(draftKey);
    recoveryPendingRef.current = false;
    setRecovery(null);
    setAutoSaveLabel('Cadangan baru aktif');
  }

  async function copyMarkdown() {
    await navigator.clipboard.writeText(content);
    setToolFeedback('Markdown disalin');
    window.setTimeout(() => setToolFeedback(''), 1800);
  }

  function downloadMarkdown() {
    const file = new Blob([content], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(file);
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = (slug || 'tulisan') + '.md';
    anchor.click();
    URL.revokeObjectURL(url);
    setToolFeedback('File Markdown diunduh');
    window.setTimeout(() => setToolFeedback(''), 1800);
  }

  function jumpToHeading(line) {
    const textarea = editorRef.current;
    if (!textarea) return;
    const offset = content.split('\n').slice(0, line - 1).join('\n').length + (line > 1 ? 1 : 0);
    setTab('write');
    requestAnimationFrame(() => {
      textarea.focus();
      textarea.setSelectionRange(offset, offset);
      textarea.scrollTop = Math.max(0, (line - 4) * 30);
    });
  }

  function addNotebookPage(seed = '') {
    const titleFromSeed = seed.replace(/\s+/g, ' ').trim();
    const page = {
      id: window.crypto.randomUUID(),
      title: seed ? titleFromSeed.slice(0, 42) + (titleFromSeed.length > 42 ? '…' : '') : 'Ide baru',
      content: seed,
    };
    setNotebookPages((pages) => [...pages, page]);
    setActiveNoteId(page.id);
    setNotebookOpen(true);
  }

  function updateNotebookPage(field, value) {
    setNotebookPages((pages) => pages.map((page) => page.id === activeNoteId ? { ...page, [field]: value } : page));
  }

  function removeNotebookPage() {
    if (!activeNote) return;
    if (notebookPages.length === 1) {
      setNotebookPages([{ ...activeNote, title: 'Catatan 1', content: '' }]);
      return;
    }
    const remaining = notebookPages.filter((page) => page.id !== activeNote.id);
    setNotebookPages(remaining);
    setActiveNoteId(remaining[0].id);
  }

  function saveSelectionToNotebook() {
    const textarea = editorRef.current;
    const selected = textarea ? content.slice(textarea.selectionStart, textarea.selectionEnd).trim() : '';
    if (selected) {
      addNotebookPage(selected);
      setToolFeedback('Pilihan tersimpan di Bank Ide');
    } else {
      setNotebookOpen(true);
      setToolFeedback('Sorot teks terlebih dahulu, lalu klik Simpan pilihan');
    }
    window.setTimeout(() => setToolFeedback(''), 1800);
  }

  function insertNoteIntoArticle() {
    if (!activeNote?.content) return;
    const textarea = editorRef.current;
    const start = textarea?.selectionStart ?? content.length;
    const insertion = (start > 0 ? '\n\n' : '') + activeNote.content;
    setContent(content.slice(0, start) + insertion + content.slice(start));
    setNotebookOpen(false);
    setTab('write');
    requestAnimationFrame(() => editorRef.current?.focus());
  }

  return (
    <form ref={formRef} action={action} className={'admin-form-stack admin-writing-form' + (focusMode ? ' is-focus-mode' : '') + (notebookOpen ? ' is-notebook-open' : '')}>
      {post?.id ? <input type="hidden" name="id" value={post.id} /> : null}
      <ActionMessage state={state} />
      {recovery ? (
        <div className="admin-draft-recovery" role="status">
          <span className="material-symbols-outlined" aria-hidden="true">history</span>
          <div><strong>Ada cadangan tulisan yang belum tersimpan.</strong><p>Cadangan perangkat dari {new Intl.DateTimeFormat('id-ID', { dateStyle: 'medium', timeStyle: 'short' }).format(new Date(recovery.savedAt))}.</p></div>
          <button type="button" className="admin-button admin-button--primary admin-button--small" onClick={restoreDraft}>Pulihkan</button>
          <button type="button" className="admin-button admin-button--ghost admin-button--small" onClick={dismissRecovery}>Abaikan</button>
        </div>
      ) : null}

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

          <section className="admin-panel admin-editor-panel">
            <div className="admin-editor-tabs" role="tablist" aria-label="Editor konten">
              <button type="button" role="tab" aria-selected={tab === 'write'} className={'admin-editor-tab' + (tab === 'write' ? ' is-active' : '')} onClick={() => setTab('write')}><span className="material-symbols-outlined">edit_note</span>Tulis</button>
              <button type="button" role="tab" aria-selected={tab === 'split'} className={'admin-editor-tab' + (tab === 'split' ? ' is-active' : '')} onClick={() => setTab('split')}><span className="material-symbols-outlined">vertical_split</span>Terbagi</button>
              <button type="button" role="tab" aria-selected={tab === 'preview'} className={'admin-editor-tab' + (tab === 'preview' ? ' is-active' : '')} onClick={() => setTab('preview')}><span className="material-symbols-outlined">visibility</span>Pratinjau</button>
              <span className="admin-meta" style={{ marginLeft: 'auto', alignSelf: 'center', padding: '0 14px' }}>{wordCount} kata · ±{readingMinutes} menit</span>
              <button type="button" className={'admin-editor-focus' + (showOutline ? ' is-active' : '')} onClick={() => setShowOutline((value) => !value)} aria-pressed={showOutline} title="Navigator outline"><span className="material-symbols-outlined">toc</span></button>
              <button type="button" className={'admin-notebook-trigger' + (notebookOpen ? ' is-active' : '')} onClick={() => setNotebookOpen((value) => !value)} aria-pressed={notebookOpen}><span className="material-symbols-outlined">note_stack</span><span>Bank Ide</span></button>
              <button type="button" className="admin-editor-focus" onClick={copyMarkdown} title="Salin Markdown"><span className="material-symbols-outlined">content_copy</span></button>
              <button type="button" className="admin-editor-focus" onClick={downloadMarkdown} title="Unduh Markdown"><span className="material-symbols-outlined">download</span></button>
              <button type="button" className="admin-editor-focus" onClick={() => setFocusMode((value) => !value)} aria-pressed={focusMode} title="Mode fokus (Esc untuk keluar)"><span className="material-symbols-outlined">{focusMode ? 'close_fullscreen' : 'open_in_full'}</span></button>
            </div>
            <div className="admin-writing-pulse">
              <div className="admin-writing-metric"><span className="material-symbols-outlined">edit</span><div><strong>{wordCount}</strong><small>Kata</small></div></div>
              <div className="admin-writing-metric"><span className="material-symbols-outlined">schedule</span><div><strong>±{readingMinutes}</strong><small>Menit baca</small></div></div>
              <div className="admin-writing-metric"><span className="material-symbols-outlined">data_object</span><div><strong>{characterCount.toLocaleString('id-ID')}</strong><small>Karakter</small></div></div>
              <label className="admin-writing-goal">
                <span>Target kata</span>
                <input type="number" min="100" step="100" value={wordGoal} onChange={(event) => setWordGoal(Number(event.target.value) || 100)} aria-label="Target jumlah kata" />
                <i><b style={{ width: goalProgress + '%' }} /></i>
                <em>{goalProgress}%</em>
              </label>
              <div className="admin-autosave-state"><span className="material-symbols-outlined">cloud_done</span><span>{toolFeedback || autoSaveLabel}</span></div>
            </div>
            {tab !== 'preview' ? (
              <>
                <div className="admin-editor-toolbar" aria-label="Format Markdown">
                  <button type="button" onClick={() => wrapSelection('**')} title="Tebal"><span className="material-symbols-outlined">format_bold</span></button>
                  <button type="button" onClick={() => wrapSelection('_')} title="Miring"><span className="material-symbols-outlined">format_italic</span></button>
                  <button type="button" onClick={() => wrapSelection('==', '==', 'teks penting')} title="Stabilo"><span className="material-symbols-outlined">ink_highlighter</span></button>
                  <button type="button" onClick={() => wrapSelection('## ', '', 'Subjudul')} title="Subjudul"><span className="material-symbols-outlined">title</span></button>
                  <i />
                  <button type="button" onClick={() => prefixSelection('- ')} title="Daftar poin"><span className="material-symbols-outlined">format_list_bulleted</span></button>
                  <button type="button" onClick={() => prefixSelection((index) => (index + 1) + '. ')} title="Daftar bernomor"><span className="material-symbols-outlined">format_list_numbered</span></button>
                  <button type="button" onClick={() => prefixSelection('- [ ] ')} title="Checklist"><span className="material-symbols-outlined">checklist</span></button>
                  <i />
                  <button type="button" onClick={() => wrapSelection('> ', '', 'Kutipan')} title="Kutipan"><span className="material-symbols-outlined">format_quote</span></button>
                  <button type="button" onClick={() => wrapSelection('`', '`', 'kode')} title="Kode inline"><span className="material-symbols-outlined">code</span></button>
                  <button type="button" onClick={() => wrapSelection('[', '](https://)', 'label')} title="Tautan (Ctrl/⌘ K)"><span className="material-symbols-outlined">link</span></button>
                  <button type="button" onClick={() => wrapSelection('![', '](https://)', 'deskripsi gambar')} title="Gambar"><span className="material-symbols-outlined">image</span></button>
                  <button type="button" onClick={() => wrapSelection('\n---\n', '', '')} title="Garis pemisah"><span className="material-symbols-outlined">horizontal_rule</span></button>
                  <i />
                  <button type="button" className="admin-toolbar-labeled" onClick={saveSelectionToNotebook} title="Simpan teks yang disorot ke Bank Ide"><span className="material-symbols-outlined">note_add</span><span>Simpan pilihan</span></button>
                  <span>Markdown · Ctrl/⌘ + S untuk menyimpan</span>
                </div>
                <div className={'admin-editor-canvas' + (tab === 'split' ? ' is-split' : '')}>
                  <textarea ref={editorRef} className="admin-textarea admin-textarea--editor" name="contentMarkdown" aria-label="Isi Markdown" value={content} onChange={(event) => setContent(event.target.value)} onKeyDown={handleEditorKeyDown} spellCheck="true" placeholder={'Mulai menulis di sini…\n\n## Subjudul\n\nGagasan utama.'} />
                  {tab === 'split' ? <div className="admin-markdown-preview">{content ? <ReactMarkdown remarkPlugins={[remarkGfm, remarkHighlight]} rehypePlugins={[rehypeSanitize]} components={{ strong: PreviewStrong }}>{content}</ReactMarkdown> : <p>Pratinjau akan tampil di sini.</p>}</div> : null}
                  {showOutline ? (
                    <aside className="admin-writing-outline">
                      <div><strong>Outline tulisan</strong><button type="button" onClick={() => setShowOutline(false)} aria-label="Tutup outline"><span className="material-symbols-outlined">close</span></button></div>
                      {outline.length ? outline.map((heading) => <button type="button" key={heading.line} style={{ '--outline-level': heading.level }} onClick={() => jumpToHeading(heading.line)}><span>H{heading.level}</span>{heading.text}</button>) : <p>Tambahkan heading dengan <code>##</code> agar struktur tulisan tampil di sini.</p>}
                    </aside>
                  ) : null}
                </div>
              </>
            ) : (
              <div className="admin-markdown-preview">
                {content ? <ReactMarkdown remarkPlugins={[remarkGfm, remarkHighlight]} rehypePlugins={[rehypeSanitize]} components={{ strong: PreviewStrong }}>{content}</ReactMarkdown> : <p style={{ color: 'var(--color-outline)' }}>Belum ada isi untuk dipratinjau.</p>}
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

      <button type="button" className={'admin-notebook-scrim' + (notebookOpen ? ' is-open' : '')} onClick={() => setNotebookOpen(false)} aria-label="Tutup notebook" />
      <aside className={'admin-notebook' + (notebookOpen ? ' is-open' : '')} aria-label="Bank Ide" aria-hidden={!notebookOpen} inert={!notebookOpen}>
        <header>
          <div><span className="material-symbols-outlined" aria-hidden="true">note_stack</span><div><small>Ruang menyimpan potongan tulisan</small><strong>Bank Ide</strong></div></div>
          <div className="admin-notebook-header-actions">
            <button type="button" className="admin-notebook-new" onClick={() => addNotebookPage()}><span className="material-symbols-outlined">add</span><span>Ide baru</span></button>
            <button type="button" onClick={() => setNotebookOpen(false)} aria-label="Tutup Bank Ide"><span className="material-symbols-outlined">close</span></button>
          </div>
        </header>
        <div className="admin-notebook-guide">
          <span className="material-symbols-outlined" aria-hidden="true">tips_and_updates</span>
          <div><strong>Cara cepat</strong><p>Sorot teks di artikel lalu pilih <b>Simpan pilihan</b>. Kembangkan idenya di sini, kemudian tekan <b>Masukkan ke tulisan</b>.</p></div>
        </div>
        <div className="admin-notebook-workspace">
          <nav className="admin-notebook-pages" aria-label="Halaman Bank Ide">
            <div><strong>Halaman</strong><span>{notebookPages.length}</span></div>
            {notebookPages.map((page, index) => (
              <button type="button" key={page.id} className={page.id === activeNoteId ? 'is-active' : ''} onClick={() => setActiveNoteId(page.id)}>
                <span>{String(index + 1).padStart(2, '0')}</span>
                <div><strong>{page.title || 'Tanpa judul'}</strong><small>{page.content.trim() ? page.content.trim().split(/\s+/).length + ' kata' : 'Kosong'}</small></div>
              </button>
            ))}
            <button type="button" className="admin-notebook-add" onClick={() => addNotebookPage()}><span className="material-symbols-outlined">add</span><strong>Tambah halaman</strong></button>
          </nav>
          {activeNote ? (
            <div className="admin-notebook-page">
              <div className="admin-notebook-page-meta"><span>Catatan aktif</span><span>{activeNote.content.trim() ? activeNote.content.trim().split(/\s+/).length : 0} kata</span></div>
              <input value={activeNote.title} onChange={(event) => updateNotebookPage('title', event.target.value)} maxLength={80} aria-label="Judul catatan" placeholder="Beri judul ide ini" />
              <textarea value={activeNote.content} onChange={(event) => updateNotebookPage('content', event.target.value)} aria-label="Isi catatan" placeholder="Tulis atau kembangkan ide Anda di sini. Catatan tersimpan otomatis…" spellCheck="true" />
            </div>
          ) : null}
        </div>
        <footer>
          <div><span className="material-symbols-outlined">cloud_done</span><span>Perubahan tersimpan otomatis di perangkat ini</span></div>
          <button type="button" className="admin-notebook-delete" onClick={removeNotebookPage} title="Hapus halaman aktif"><span className="material-symbols-outlined">delete</span><span>Hapus</span></button>
          <button type="button" className="admin-button admin-button--primary" onClick={insertNoteIntoArticle} disabled={!activeNote?.content}><span className="material-symbols-outlined">keyboard_return</span>Masukkan ke tulisan</button>
        </footer>
      </aside>
    </form>
  );
}
