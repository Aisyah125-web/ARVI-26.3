import type { ReactNode } from 'react'

interface PageHeaderProps {
  title: string
  description: string
  breadcrumb?: string
  actions?: ReactNode
}

export function PageHeader({
  title,
  description,
  breadcrumb,
  actions,
}: PageHeaderProps) {
  return (
    <section
      className="arvi-card"
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        gap: '1rem',
      }}
    >
      <div style={{ minWidth: 0 }}>
        {breadcrumb ? (
          <div
            style={{
              fontSize: '0.8rem',
              color: 'var(--arvi-text-subtle)',
              marginBottom: '0.35rem',
            }}
          >
            {breadcrumb}
          </div>
        ) : null}
        <h1 style={{ margin: 0, fontSize: '1.35rem', lineHeight: 1.25 }}>
          {title}
        </h1>
        <p
          style={{
            margin: '0.4rem 0 0',
            color: 'var(--arvi-text-muted)',
            maxWidth: '68ch',
          }}
        >
          {description}
        </p>
      </div>

      {actions ? <div className="arvi-actions">{actions}</div> : null}
    </section>
  )
}
