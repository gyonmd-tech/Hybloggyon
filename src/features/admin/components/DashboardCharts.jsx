'use client';

import { useMemo, useState } from 'react';

const monthFormatter = new Intl.DateTimeFormat('id-ID', { month: 'short' });

export default function DashboardCharts({ publications, counts }) {
  const data = useMemo(() => publications.map((item) => ({
    ...item,
    date: new Date(item.month),
    label: monthFormatter.format(new Date(item.month)),
  })), [publications]);
  const [activeIndex, setActiveIndex] = useState(Math.max(0, data.length - 1));
  const [view, setView] = useState('bar');
  const max = Math.max(1, ...data.map((item) => item.value));
  const total = data.reduce((sum, item) => sum + item.value, 0);
  const active = data[activeIndex];
  const statusTotal = Math.max(1, counts.published + counts.draft + counts.scheduled);
  const publishedAngle = (counts.published / statusTotal) * 360;
  const draftAngle = publishedAngle + (counts.draft / statusTotal) * 360;

  return (
    <section className="admin-dashboard-visuals" aria-label="Visualisasi editorial">
      <article className="admin-panel admin-publication-chart">
        <div className="admin-panel-header admin-chart-header">
          <div><span className="admin-kicker">Performa konten</span><h2 className="admin-panel-title">Ritme publikasi</h2></div>
          <div className="admin-segmented" aria-label="Tampilan grafik">
            <button type="button" className={view === 'bar' ? 'is-active' : ''} onClick={() => setView('bar')} aria-pressed={view === 'bar'}><span className="material-symbols-outlined" aria-hidden="true">bar_chart</span> Batang</button>
            <button type="button" className={view === 'line' ? 'is-active' : ''} onClick={() => setView('line')} aria-pressed={view === 'line'}><span className="material-symbols-outlined" aria-hidden="true">show_chart</span> Tren</button>
          </div>
        </div>
        <div className="admin-chart-summary">
          <div><strong>{total}</strong><span>publikasi / 6 bulan</span></div>
          <div className="admin-chart-active" aria-live="polite"><span>{active?.label || '—'}</span><strong>{active?.value ?? 0} artikel</strong></div>
        </div>
        {data.length ? (
          <div className={'admin-interactive-chart admin-interactive-chart--' + view}>
            {view === 'line' ? (
              <svg className="admin-line-chart" viewBox="0 0 600 190" role="img" aria-label="Grafik tren publikasi enam bulan terakhir" preserveAspectRatio="none">
                <defs><linearGradient id="publication-area" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stopColor="var(--admin-primary)" stopOpacity=".28" /><stop offset="1" stopColor="var(--admin-primary)" stopOpacity=".02" /></linearGradient></defs>
                {[30, 80, 130, 180].map((y) => <line key={y} x1="0" x2="600" y1={y} y2={y} className="admin-chart-gridline" />)}
                <path className="admin-chart-area" d={'M 0 180 ' + data.map((item, index) => 'L ' + (data.length === 1 ? 300 : index * (600 / (data.length - 1))) + ' ' + (170 - (item.value / max) * 130)).join(' ') + ' L 600 180 Z'} />
                <polyline className="admin-chart-line" points={data.map((item, index) => (data.length === 1 ? 300 : index * (600 / (data.length - 1))) + ',' + (170 - (item.value / max) * 130)).join(' ')} />
                {data.map((item, index) => <circle key={item.date.toISOString()} className={activeIndex === index ? 'is-active' : ''} cx={data.length === 1 ? 300 : index * (600 / (data.length - 1))} cy={170 - (item.value / max) * 130} r={activeIndex === index ? 8 : 5} tabIndex="0" onMouseEnter={() => setActiveIndex(index)} onFocus={() => setActiveIndex(index)} aria-label={item.label + ': ' + item.value + ' artikel'} />)}
              </svg>
            ) : (
              <div className="admin-bars" role="img" aria-label="Grafik batang publikasi enam bulan terakhir">
                {data.map((item, index) => (
                  <button type="button" key={item.date.toISOString()} className={activeIndex === index ? 'is-active' : ''} onMouseEnter={() => setActiveIndex(index)} onFocus={() => setActiveIndex(index)} onClick={() => setActiveIndex(index)} aria-label={item.label + ': ' + item.value + ' artikel'}>
                    <span className="admin-bar-value">{item.value}</span><i style={{ '--bar-size': Math.max(8, (item.value / max) * 100) + '%' }} /><span>{item.label}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        ) : <div className="admin-chart-empty"><span className="material-symbols-outlined">insert_chart</span><p>Data publikasi akan muncul setelah artikel pertama diterbitkan.</p></div>}
      </article>
      <article className="admin-panel admin-status-card">
        <div className="admin-panel-header"><div><span className="admin-kicker">Komposisi</span><h2 className="admin-panel-title">Status tulisan</h2></div><span className="material-symbols-outlined admin-panel-icon" aria-hidden="true">donut_large</span></div>
        <div className="admin-status-visual">
          <div className="admin-donut" style={{ '--published-angle': publishedAngle + 'deg', '--draft-angle': draftAngle + 'deg' }}><div><strong>{counts.all}</strong><span>Total</span></div></div>
          <div className="admin-chart-legend">
            <div><i className="is-published" /><span>Terbit</span><strong>{counts.published}</strong></div>
            <div><i className="is-draft" /><span>Draft</span><strong>{counts.draft}</strong></div>
            <div><i className="is-scheduled" /><span>Terjadwal</span><strong>{counts.scheduled}</strong></div>
          </div>
        </div>
      </article>
    </section>
  );
}
