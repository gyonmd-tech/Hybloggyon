// src/components/hobby/MusicCard.jsx
// Satu kartu lagu dalam RecordCrate — warna dari moodColorMap
// Direvisi: Ukuran lebih besar (poster-size), tipografi lebih dominan, transisi lebih smooth.

export const moodColorMap = {
  melankolis: {
    bg: 'var(--color-background-ash)',
    text: 'var(--color-ink)',
    accentLine: 'var(--color-ink)',
    tagBg: 'rgba(18,18,20,0.06)',
    tagText: 'var(--color-ink)',
  },
  energik: {
    bg: 'var(--color-ink)',
    text: '#ffffff',
    accentLine: 'var(--color-accent-warm)',
    tagBg: 'rgba(255,255,255,0.1)',
    tagText: '#ffffff',
  },
  tenang: {
    bg: 'var(--color-espresso)',
    text: '#ffffff',
    accentLine: 'var(--color-accent-green)',
    tagBg: 'rgba(255,255,255,0.1)',
    tagText: '#ffffff',
  },
  upbeat: {
    bg: 'var(--color-accent-warm)',
    text: 'var(--color-ink)',
    accentLine: 'var(--color-espresso)',
    tagBg: 'rgba(18,18,20,0.1)',
    tagText: 'var(--color-ink)',
  },
  fokus: {
    bg: 'var(--color-accent-green)',
    text: 'var(--color-ink)',
    accentLine: 'var(--color-espresso)',
    tagBg: 'rgba(18,18,20,0.1)',
    tagText: 'var(--color-ink)',
  },
};

const defaultColors = {
  bg: 'var(--color-background-ash)',
  text: 'var(--color-ink)',
  accentLine: 'var(--color-ink)',
  tagBg: 'rgba(18,18,20,0.08)',
  tagText: 'var(--color-ink)',
};

export default function MusicCard({ item }) {
  const colors = moodColorMap[item.mood] ?? defaultColors;

  return (
    <div
      className="music-card-hover"
      style={{
        width: 'clamp(280px, 32vw, 420px)',
        height: 'clamp(380px, 45vw, 560px)',
        flexShrink: 0,
        border: '1px solid var(--color-ink)',
        boxShadow: '6px 6px 0px var(--color-ink)',
        backgroundColor: colors.bg,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: 'clamp(24px, 3vw, 40px)',
        position: 'relative',
        scrollSnapAlign: 'center', // Changed to center for smoother infinite loop snapping
        transition: 'transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275), box-shadow 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
        cursor: 'pointer',
      }}
      onMouseEnter={(e) => {
        // Efek neo-brutalist pop yang lebih dramatis (sedikit rotasi dan scale/lift)
        e.currentTarget.style.transform = 'translate(-6px, -12px) rotate(-1.5deg)';
        e.currentTarget.style.boxShadow = '14px 18px 0px var(--color-ink)';
        e.currentTarget.style.zIndex = '10';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translate(0, 0) rotate(0deg)';
        e.currentTarget.style.boxShadow = '6px 6px 0px var(--color-ink)';
        e.currentTarget.style.zIndex = '1';
      }}
    >
      {/* Garis atas tebal untuk "sedang didengarkan sekarang" */}
      {item.isCurrentlyPlaying && (
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '6px',
            backgroundColor: colors.accentLine,
          }}
        />
      )}

      {/* Atas: tag genre */}
      <div>
        <span
          style={{
            display: 'inline-block',
            fontFamily: 'var(--font-mono)',
            fontSize: '11px',
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            backgroundColor: colors.tagBg,
            color: colors.tagText,
            border: `1px solid ${colors.text === '#ffffff' ? 'rgba(255,255,255,0.2)' : 'rgba(18,18,20,0.15)'}`,
            padding: '6px 12px',
          }}
        >
          [{item.genre}]
        </span>
      </div>

      {/* Tengah: judul lagu */}
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', padding: '24px 0' }}>
        <p
          style={{
            fontFamily: 'var(--font-heading)',
            fontWeight: 300,
            fontSize: 'clamp(2.2rem, 4vw, 4rem)',
            lineHeight: 1.05,
            letterSpacing: '-0.03em',
            color: colors.text,
            margin: 0,
            wordBreak: 'break-word',
          }}
        >
          {item.title}
        </p>
      </div>

      {/* Bawah: artis + tahun dengan border pemisah */}
      <div
        style={{
          borderTop: `1px solid ${colors.text === '#ffffff' ? 'rgba(255,255,255,0.2)' : 'rgba(18,18,20,0.15)'}`,
          paddingTop: '20px'
        }}
      >
        <span
          style={{
            display: 'block',
            fontFamily: 'var(--font-mono)',
            fontSize: '12px',
            letterSpacing: '0.08em',
            color: colors.text,
            marginBottom: '6px',
            textTransform: 'uppercase',
          }}
        >
          {item.artist}
        </span>
        <span
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '11px',
            letterSpacing: '0.1em',
            color: colors.text,
            opacity: 0.6,
          }}
        >
          {item.year}
        </span>
      </div>
    </div>
  );
}
