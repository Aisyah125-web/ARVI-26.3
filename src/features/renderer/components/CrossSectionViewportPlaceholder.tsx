/**
 * Kerangka viewport SVG berlatar putih (GEN-02) untuk modul renderer.
 * Logika rendering komponen penampang 2D, skala meter-ke-pixel, dan editor interaktif
 * akan diimplementasikan pada Fase 5.
 */
export function CrossSectionViewportPlaceholder({
  surveyPointId,
}: {
  surveyPointId: string
}) {
  return (
    <div
      className="arvi-card arvi-stack"
      style={{ backgroundColor: '#ffffff' }}
    >
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '0.5rem',
        }}
      >
        <strong style={{ fontSize: '0.95rem' }}>
          Viewport Penampang 2D (SVG)
        </strong>
        <span className="arvi-badge">Target: Fase 5</span>
      </div>

      <div
        style={{
          border: '1px solid var(--arvi-border)',
          borderRadius: 'var(--arvi-radius-sm)',
          backgroundColor: '#ffffff',
          overflow: 'hidden',
        }}
      >
        <svg
          viewBox="0 0 800 320"
          role="img"
          aria-label="Placeholder kanvas penampang melintang 2D berlatar putih"
          style={{ width: '100%', height: 'auto', display: 'block' }}
        >
          <rect width="800" height="320" fill="#ffffff" />
          <line
            x1="40"
            y1="220"
            x2="760"
            y2="220"
            stroke="#cbd5e1"
            strokeWidth="1"
          />
          <line
            x1="400"
            y1="40"
            x2="400"
            y2="275"
            stroke="#94a3b8"
            strokeWidth="1"
            strokeDasharray="6 4"
          />
          <text
            x="400"
            y="28"
            textAnchor="middle"
            fill="#475569"
            fontSize="12"
            fontFamily="monospace"
          >
            CL (0.00 m) — Survei: {surveyPointId}
          </text>
          <text
            x="400"
            y="150"
            textAnchor="middle"
            fill="#64748b"
            fontSize="13"
            fontFamily="sans-serif"
          >
            Kanvas SVG penampang jalan (latar putih) siap untuk Fase 5
          </text>
        </svg>
      </div>

      <p
        style={{
          margin: 0,
          fontSize: '0.85rem',
          color: 'var(--arvi-text-muted)',
        }}
      >
        Sesuai GEN-02, GEN-03, dan GEN-04: kanvas berlatar putih, warna khusus
        hanya untuk tata guna lahan dan drainase, komponen lain memakai garis
        hitam tanpa label nama komponen pada gambar utama.
      </p>
    </div>
  )
}
