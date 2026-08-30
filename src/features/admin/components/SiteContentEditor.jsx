'use client';

import { useActionState, useState } from 'react';
import { saveSiteContentAction } from '../actions';
import ActionMessage from './ActionMessage';
import SubmitButton from './SubmitButton';

const initialState = { ok: false, message: '', errors: {} };

function getAt(value, path) {
  return path.reduce((current, key) => current?.[key], value);
}

function setAt(value, path, nextValue) {
  const root = structuredClone(value);
  let current = root;
  path.slice(0, -1).forEach((key) => { current = current[key]; });
  current[path.at(-1)] = nextValue;
  return root;
}

function Field({ data, setData, path, label, type = 'text', options = [], required = true, help }) {
  const value = getAt(data, path);
  const onChange = (event) => {
    let next = event.target.value;
    if (type === 'checkbox') next = event.target.checked;
    if (type === 'number') next = Number(event.target.value || 0);
    setData((current) => setAt(current, path, next));
  };

  if (type === 'checkbox') {
    return (
      <label className="admin-check-row">
        <input type="checkbox" checked={Boolean(value)} onChange={onChange} />
        <span>{label}</span>
      </label>
    );
  }

  return (
    <label className="admin-field-group">
      <span className="admin-label">{label}</span>
      {type === 'textarea' ? (
        <textarea className="admin-textarea" value={value ?? ''} onChange={onChange} required={required} />
      ) : type === 'select' ? (
        <select className="admin-select" value={value ?? ''} onChange={onChange} required={required}>
          {options.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
        </select>
      ) : (
        <input className="admin-field" type={type} value={value ?? ''} onChange={onChange} required={required} />
      )}
      {help ? <span className="admin-help">{help}</span> : null}
    </label>
  );
}

function RepeatableList({ data, setData, path, title, description, fields, createItem }) {
  const items = getAt(data, path) || [];
  const replace = (next) => setData((current) => setAt(current, path, next));
  const move = (index, direction) => {
    const next = [...items];
    const destination = index + direction;
    if (destination < 0 || destination >= next.length) return;
    [next[index], next[destination]] = [next[destination], next[index]];
    replace(next);
  };

  return (
    <section className="admin-panel">
      <div className="admin-panel-header">
        <div><h2 className="admin-panel-title">{title}</h2>{description ? <p className="admin-help">{description}</p> : null}</div>
        <button className="admin-button admin-button--small" type="button" onClick={() => replace([...items, createItem(items.length)])}>
          <span className="material-symbols-outlined" aria-hidden="true">add</span> Tambah
        </button>
      </div>
      <div className="admin-panel-body admin-form-stack">
        {items.length ? items.map((item, index) => (
          <fieldset className="admin-repeater" key={`${title}-${index}`}>
            <legend>{String(index + 1).padStart(2, '0')}</legend>
            <div className="admin-repeater-actions">
              <button type="button" className="admin-button admin-button--small" onClick={() => move(index, -1)} disabled={index === 0} aria-label="Pindah ke atas">↑</button>
              <button type="button" className="admin-button admin-button--small" onClick={() => move(index, 1)} disabled={index === items.length - 1} aria-label="Pindah ke bawah">↓</button>
              <button type="button" className="admin-button admin-button--small admin-button--danger" onClick={() => replace(items.filter((_, itemIndex) => itemIndex !== index))}>Hapus</button>
            </div>
            <div className="admin-form-grid">
              {fields.map((field) => (
                <Field key={field.key} data={data} setData={setData} path={[...path, index, field.key]} {...field} />
              ))}
            </div>
          </fieldset>
        )) : <p className="admin-help">Belum ada item. Klik Tambah untuk membuat konten.</p>}
      </div>
    </section>
  );
}

function TextList({ data, setData, path, title, multiline = true }) {
  return <RepeatableList data={data} setData={setData} path={path} title={title} fields={[{ key: 'value', label: 'Isi', type: multiline ? 'textarea' : 'text' }]} createItem={() => ({ value: '' })} />;
}

function normalizeTextList(data, path) {
  const values = getAt(data, path) || [];
  return setAt(data, path, values.map((value) => typeof value === 'string' ? { value } : value));
}

function denormalizeTextList(data, paths) {
  return paths.reduce((current, path) => setAt(current, path, (getAt(current, path) || []).map((item) => item.value)), data);
}

const urlHelp = 'Pilih URL dari Pustaka Media atau tempel URL/path gambar.';

function HomeFields({ data, setData, group }) {
  if (group === 'hero') return (
    <section className="admin-panel"><div className="admin-panel-header"><h2 className="admin-panel-title">Hero & pengantar</h2></div><div className="admin-panel-body admin-form-stack">
      <div className="admin-form-grid"><Field data={data} setData={setData} path={['hero', 'title']} label="Judul hero" /><Field data={data} setData={setData} path={['hero', 'edition']} label="Edisi" /></div>
      <div className="admin-form-grid"><Field data={data} setData={setData} path={['hero', 'coordinates']} label="Koordinat" required={false} /><Field data={data} setData={setData} path={['hero', 'eyebrow']} label="Label hero" /></div>
      <Field data={data} setData={setData} path={['hero', 'description']} label="Deskripsi hero" type="textarea" />
      <div className="admin-form-grid"><Field data={data} setData={setData} path={['hero', 'ctaLabel']} label="Label tombol" /><Field data={data} setData={setData} path={['hero', 'ctaUrl']} label="Tujuan tombol" /></div>
      <Field data={data} setData={setData} path={['hero', 'imageUrl']} label="Gambar hero" help={urlHelp} />
      <Field data={data} setData={setData} path={['ticker']} label="Ticker berjalan" type="textarea" />
      <Field data={data} setData={setData} path={['intro', 'lead']} label="Pengantar utama" type="textarea" />
      <Field data={data} setData={setData} path={['intro', 'meta']} label="Pengantar pendukung" type="textarea" />
    </div></section>
  );
  if (group === 'manifesto') return (
    <section className="admin-panel"><div className="admin-panel-header"><h2 className="admin-panel-title">Kutipan & manifesto ringkas</h2></div><div className="admin-panel-body admin-form-stack">
      <Field data={data} setData={setData} path={['quote', 'text']} label="Kutipan" type="textarea" /><Field data={data} setData={setData} path={['quote', 'citation']} label="Sumber kutipan" />
      <div className="admin-form-grid"><Field data={data} setData={setData} path={['manifesto', 'eyebrow']} label="Label manifesto" /><Field data={data} setData={setData} path={['manifesto', 'title']} label="Judul manifesto" /></div>
      <Field data={data} setData={setData} path={['manifesto', 'description']} label="Deskripsi manifesto" type="textarea" />
      <div className="admin-form-grid"><Field data={data} setData={setData} path={['manifesto', 'ctaLabel']} label="Label tombol" /><Field data={data} setData={setData} path={['manifesto', 'ctaUrl']} label="Tujuan tombol" /></div>
      <div className="admin-form-grid"><Field data={data} setData={setData} path={['manifesto', 'author']} label="Penulis" /><Field data={data} setData={setData} path={['manifesto', 'location']} label="Lokasi" /><Field data={data} setData={setData} path={['manifesto', 'status']} label="Status" /></div>
    </div></section>
  );
  if (group === 'hobbies') return <RepeatableList data={data} setData={setData} path={['hobbies']} title="Minat & obsesi" fields={[{ key: 'label', label: 'Kategori' }, { key: 'tag', label: 'Tag' }, { key: 'title', label: 'Judul' }, { key: 'imageUrl', label: 'Gambar', help: urlHelp }, { key: 'description', label: 'Deskripsi', type: 'textarea' }]} createItem={() => ({ label: '', title: '', description: '', tag: '[ NEW ]', imageUrl: '/images/og/default.webp' })} />;
  if (group === 'showcase') return <RepeatableList data={data} setData={setData} path={['showcase']} title="Showcase / Koleksi & arsip" fields={[{ key: 'title', label: 'Judul' }, { key: 'tag', label: 'Keterangan' }, { key: 'imageUrl', label: 'Gambar', help: urlHelp }]} createItem={() => ({ title: '', tag: '', imageUrl: '/images/og/default.webp' })} />;
  if (group === 'observations') return <RepeatableList data={data} setData={setData} path={['logs']} title="Log observasi" fields={[{ key: 'date', label: 'Tanggal' }, { key: 'time', label: 'Waktu', required: false }, { key: 'status', label: 'Status', type: 'select', options: [{ value: 'OPEN', label: 'Open' }, { value: 'CLOSED', label: 'Closed' }] }, { key: 'text', label: 'Catatan', type: 'textarea' }]} createItem={() => ({ date: '', time: '', text: '', status: 'OPEN' })} />;
  return <RepeatableList data={data} setData={setData} path={['timeline']} title="Jejak & evolusi" fields={[{ key: 'year', label: 'Tahun' }, { key: 'title', label: 'Judul' }, { key: 'description', label: 'Deskripsi', type: 'textarea' }]} createItem={() => ({ year: String(new Date().getFullYear()), title: '', description: '' })} />;
}

function AboutFields({ data, setData, group }) {
  if (group === 'identity') return (
    <section className="admin-panel"><div className="admin-panel-header"><h2 className="admin-panel-title">Identitas & pembuka</h2></div><div className="admin-panel-body admin-form-stack">
      <Field data={data} setData={setData} path={['openerText']} label="Kalimat pembuka" type="textarea" />
      <div className="admin-form-grid"><Field data={data} setData={setData} path={['name']} label="Nama" /><Field data={data} setData={setData} path={['portraitImage']} label="Foto profil" help={urlHelp} /></div>
      <Field data={data} setData={setData} path={['shortBio']} label="Bio singkat" type="textarea" />
      <Field data={data} setData={setData} path={['contactEmail']} label="Email kontak" type="email" />
    </div></section>
  );
  if (group === 'meta') return <RepeatableList data={data} setData={setData} path={['meta']} title="Metadata profil" fields={[{ key: 'label', label: 'Label' }, { key: 'value', label: 'Nilai' }]} createItem={() => ({ label: '', value: '' })} />;
  if (group === 'manifesto') return <TextList data={data} setData={setData} path={['manifestoParagraphs']} title="Paragraf manifesto" />;
  if (group === 'beliefs') return <TextList data={data} setData={setData} path={['beliefs']} title="Prinsip / beliefs" />;
  return <RepeatableList data={data} setData={setData} path={['socialLinks']} title="Tautan sosial" fields={[{ key: 'label', label: 'Platform' }, { key: 'url', label: 'URL' }]} createItem={() => ({ label: '', url: 'https://' })} />;
}

function HobbyFields({ data, setData, group }) {
  if (group === 'identity') return (
    <section className="admin-panel"><div className="admin-panel-header"><h2 className="admin-panel-title">Hero & pembaruan</h2></div><div className="admin-panel-body admin-form-stack">
      <div className="admin-form-grid"><Field data={data} setData={setData} path={['hero', 'titleFirst']} label="Judul bagian pertama" /><Field data={data} setData={setData} path={['hero', 'titleSecond']} label="Judul bagian kedua" /></div>
      <Field data={data} setData={setData} path={['hero', 'subtitle']} label="Subjudul" type="textarea" /><Field data={data} setData={setData} path={['lastUpdated']} label="Terakhir diperbarui" />
    </div></section>
  );
  if (group === 'music') return <RepeatableList data={data} setData={setData} path={['music']} title="Musik" fields={[{ key: 'artist', label: 'Artis' }, { key: 'title', label: 'Judul' }, { key: 'year', label: 'Tahun' }, { key: 'genre', label: 'Genre' }, { key: 'mood', label: 'Mood' }, { key: 'isCurrentlyPlaying', label: 'Sedang diputar', type: 'checkbox' }]} createItem={(index) => ({ id: Date.now() + index, artist: '', title: '', year: '', genre: '', mood: '', isCurrentlyPlaying: false })} />;
  if (group === 'featured') return (
    <section className="admin-panel"><div className="admin-panel-header"><h2 className="admin-panel-title">Sorotan tontonan</h2></div><div className="admin-panel-body admin-form-stack">
      <div className="admin-form-grid"><Field data={data} setData={setData} path={['watchlist', 'featured', 'title']} label="Judul" /><Field data={data} setData={setData} path={['watchlist', 'featured', 'year']} label="Tahun" /><Field data={data} setData={setData} path={['watchlist', 'featured', 'genre']} label="Genre" /><Field data={data} setData={setData} path={['watchlist', 'featured', 'oneWord']} label="Satu kata" /><Field data={data} setData={setData} path={['watchlist', 'featured', 'tmdbId']} label="TMDB ID" type="number" /><Field data={data} setData={setData} path={['watchlist', 'featured', 'mediaType']} label="Tipe TMDB" type="select" options={[{ value: 'movie', label: 'Film' }, { value: 'tv', label: 'TV/Serial' }]} /></div>
      <Field data={data} setData={setData} path={['watchlist', 'featured', 'impression']} label="Kesan" type="textarea" />
    </div></section>
  );
  if (group === 'watchlist') return <RepeatableList data={data} setData={setData} path={['watchlist', 'others']} title="Daftar tontonan" fields={[{ key: 'title', label: 'Judul' }, { key: 'year', label: 'Tahun' }, { key: 'genre', label: 'Genre' }, { key: 'type', label: 'Label tipe' }, { key: 'tmdbId', label: 'TMDB ID', type: 'number' }, { key: 'mediaType', label: 'Tipe TMDB', type: 'select', options: [{ value: 'movie', label: 'Film' }, { value: 'tv', label: 'TV/Serial' }] }, { key: 'oneWord', label: 'Satu kata' }, { key: 'impression', label: 'Kesan', type: 'textarea' }]} createItem={() => ({ title: '', year: '', genre: '', tmdbId: 0, mediaType: 'movie', type: 'film', impression: '', oneWord: '' })} />;
  if (group === 'books') return <RepeatableList data={data} setData={setData} path={['books']} title="Rak buku" fields={[{ key: 'title', label: 'Judul' }, { key: 'author', label: 'Penulis' }, { key: 'isbn', label: 'ISBN', required: false }, { key: 'status', label: 'Status', type: 'select', options: [{ value: 'reading', label: 'Sedang dibaca' }, { value: 'done', label: 'Selesai' }, { value: 'queue', label: 'Antrean' }] }, { key: 'impression', label: 'Kesan', type: 'textarea' }]} createItem={() => ({ title: '', author: '', isbn: '', status: 'queue', impression: '' })} />;
  return <RepeatableList data={data} setData={setData} path={['observations']} title="Observasi samping" fields={[{ key: 'date', label: 'Tanggal' }, { key: 'text', label: 'Isi', type: 'textarea' }]} createItem={() => ({ date: '', text: '' })} />;
}

function NotesFields({ data, setData, group }) {
  if (group === 'current') return <>
    <section className="admin-panel"><div className="admin-panel-header"><h2 className="admin-panel-title">Current thinking</h2></div><div className="admin-panel-body admin-form-stack"><Field data={data} setData={setData} path={['quote', 'text']} label="Kutipan" type="textarea" /><Field data={data} setData={setData} path={['quote', 'citation']} label="Sumber" /></div></section>
    <RepeatableList data={data} setData={setData} path={['currentThinking']} title="Status pemikiran" fields={[{ key: 'label', label: 'Label' }, { key: 'value', label: 'Isi', type: 'textarea' }]} createItem={() => ({ label: '', value: '' })} />
  </>;
  if (group === 'random') return <TextList data={data} setData={setData} path={['randomThoughts']} title="Random thoughts" />;
  return <RepeatableList data={data} setData={setData} path={['connections']} title="Benang merah antarcatatan" fields={[{ key: 'from', label: 'Node A' }, { key: 'to', label: 'Node B' }, { key: 'via', label: 'Hubungan', type: 'textarea' }]} createItem={() => ({ from: '', to: '', via: '' })} />;
}

const textListPaths = { about: [['manifestoParagraphs'], ['beliefs']], notes: [['randomThoughts']] };

export default function SiteContentEditor({ section, group, initialContent }) {
  const paths = textListPaths[section] || [];
  const [data, setData] = useState(() => paths.reduce((current, path) => normalizeTextList(current, path), structuredClone(initialContent)));
  const [state, action] = useActionState(saveSiteContentAction, initialState);
  const serialized = JSON.stringify(denormalizeTextList(data, paths));
  const Fields = { home: HomeFields, about: AboutFields, hobby: HobbyFields, notes: NotesFields }[section];

  return (
    <form action={action} className="admin-form-stack">
      <input type="hidden" name="section" value={section} />
      <input type="hidden" name="group" value={group} />
      <input type="hidden" name="content" value={serialized} />
      <ActionMessage state={state} />
      <Fields data={data} setData={setData} group={group} />
      <div className="admin-savebar">
        <p><strong>Terbit langsung.</strong> Perubahan akan tampil pada halaman publik setelah disimpan.</p>
        <SubmitButton className="admin-button--primary" icon="publish">Simpan & terbitkan</SubmitButton>
      </div>
    </form>
  );
}
