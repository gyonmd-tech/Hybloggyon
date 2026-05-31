// src/components/LoggedObservations.jsx
const LOGS = [
  { id: 'LOG-042', date: '27 MEI 2026', time: '23:14', text: 'Apakah sebuah foto yang difoto ulang masih memiliki aura aslinya? Walter Benjamin tidak pernah sempat menjawab pertanyaan tentang JPEG.', status: 'OPEN' },
  { id: 'LOG-041', date: '23 MEI 2026', time: '11:32', text: 'Ada jenis kesunyian yang hanya bisa dicapai dengan headphone penuh dan album yang tepat. Bukan isolasi — lebih seperti fokus yang terarah.', status: 'CLOSED' },
  { id: 'LOG-040', date: '18 MEI 2026', time: '08:07', text: 'Font sans-serif membuat orang membaca lebih cepat, tapi serif membuat orang mengingat lebih lama. Ini bukan tentang estetika — ini tentang arsitektur ingatan.', status: 'OPEN' },
  { id: 'LOG-039', date: '12 MEI 2026', time: '21:55', text: 'Notebook kosong paling berat adalah yang belum dibuka. Bukan karena isinya — tapi karena kemungkinannya.', status: 'CLOSED' },
  { id: 'LOG-038', date: '05 MEI 2026', time: '14:20', text: 'Scrolling tidak berakhir karena kita sudah melihat semua — tapi karena kita kelelahan. Itu beda.', status: 'CLOSED' },
];

export default function LoggedObservations() {
  return (
    <section
      className="logged-observations-section"
      style={{
        backgroundColor: 'var(--color-background-ash)',
        borderBottom: '1px solid var(--color-ink)',
        display: 'flex',
        flexWrap: 'wrap',
      }}
    >
      <style>{`
        .log-card {
          transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .log-card:hover {
          transform: translate(-4px, -4px);
          box-shadow: 6px 6px 0px var(--color-ink);
        }
      `}</style>

      {/* Sticky Sidebar Area */}
      <div
        style={{
          flex: '1 1 350px',
          maxWidth: '450px',
          borderRight: '1px solid var(--color-ink)',
          padding: '80px 60px',
          display: 'flex',
          flexDirection: 'column',
          position: 'sticky',
          top: 0,
          height: 'max-content',
        }}
      >
        <span
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '11px',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color: 'var(--color-espresso)',
            marginBottom: '40px',
            display: 'block',
          }}
        >
          Log Catatan Harian
        </span>

        <h2
          style={{
            fontFamily: 'var(--font-heading)',
            fontWeight: 800,
            fontSize: 'clamp(40px, 5vw, 60px)',
            lineHeight: 1,
            letterSpacing: '-0.02em',
            color: 'var(--color-ink)',
            textTransform: 'uppercase',
            marginBottom: '40px',
          }}
        >
          LOG
          <br />
          SISTEM
        </h2>

        <p
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '12px',
            lineHeight: 1.6,
            color: 'rgba(45,34,30,0.6)',
            maxWidth: '280px',
            marginBottom: '40px',
          }}
        >
          Catatan observasi, refleksitas teknis, dan anomali pemikiran yang diarsipkan secara acak.
        </p>

        <div style={{ width: '40px', height: '2px', backgroundColor: 'var(--color-ink)' }} />
      </div>

      {/* Cards Grid Area */}
      <div
        style={{
          flex: '999 1 600px',
          padding: '80px 60px',
          backgroundColor: 'var(--color-background-alt)', // Slightly different shade for content
        }}
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: '30px',
          }}
        >
          {LOGS.map((log) => (
            <div
              key={log.id}
              className="log-card"
              style={{
                backgroundColor: '#ffffff',
                border: '1px solid var(--color-ink)',
                padding: '30px',
                display: 'flex',
                flexDirection: 'column',
                minHeight: '280px',
                cursor: 'pointer',
              }}
            >
              {/* Card Header */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '10px',
                    letterSpacing: '0.1em',
                    color: 'var(--color-accent-green)', // Green highlight for log ID
                    fontWeight: 600,
                  }}
                >
                  [ ENTRI ]
                </span>
                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '9px',
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    color: log.status === 'OPEN' ? 'var(--color-ink)' : 'rgba(45,34,30,0.4)',
                    backgroundColor: log.status === 'OPEN' ? 'var(--color-wasabi)' : 'transparent',
                    border: `1px solid ${log.status === 'OPEN' ? 'var(--color-ink)' : 'rgba(45,34,30,0.2)'}`,
                    padding: '4px 8px',
                    borderRadius: '2px',
                  }}
                >
                  {log.status}
                </span>
              </div>

              {/* Card Body */}
              <p
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontWeight: 400,
                  fontSize: '18px',
                  lineHeight: 1.4,
                  letterSpacing: '-0.01em',
                  color: 'var(--color-ink)',
                  flexGrow: 1, // Pushes footer to bottom
                }}
              >
                {log.text}
              </p>

              {/* Card Footer */}
              <div
                style={{
                  marginTop: '30px',
                  paddingTop: '20px',
                  borderTop: '1px dashed rgba(0,0,0,0.1)',
                  display: 'flex',
                  justifyContent: 'space-between',
                }}
              >
                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '10px',
                    color: 'rgba(45,34,30,0.5)',
                  }}
                >
                  {log.date}
                </span>
                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '10px',
                    color: 'rgba(45,34,30,0.5)',
                  }}
                >
                  {log.time}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
