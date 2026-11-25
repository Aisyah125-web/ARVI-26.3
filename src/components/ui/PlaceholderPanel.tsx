import type { ReactNode } from 'react'

interface PlaceholderPanelProps {
  title: string
  phaseLabel: string
  summary: string
  requirements: string[]
  children?: ReactNode
}

/**
 * Panel status jujur untuk Fase 0 agar ruang kerja tidak menampilkan
 * data proyek/survei dummy atau mengklaim integrasi backend sebelum waktunya.
 */
export function PlaceholderPanel({
  title,
  phaseLabel,
  summary,
  requirements,
  children,
}: PlaceholderPanelProps) {
  return (
    <section className="arvi-card arvi-stack">
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '0.5rem',
        }}
      >
        <h2 style={{ margin: 0, fontSize: '1.05rem' }}>{title}</h2>
        <span className="arvi-badge">{phaseLabel}</span>
      </div>

      <p style={{ margin: 0, color: 'var(--arvi-text-muted)' }}>{summary}</p>

      <div>
        <strong style={{ fontSize: '0.88rem' }}>
          Cakupan PRD yang terikat pada modul ini:
        </strong>
        <ul className="arvi-list">
          {requirements.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>

      {children}
    </section>
  )
}
