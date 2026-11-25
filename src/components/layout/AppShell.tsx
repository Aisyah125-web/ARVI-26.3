import { useState } from 'react'
import { NavLink, Outlet, useLocation } from 'react-router-dom'
import './AppShell.css'

interface NavItem {
  label: string
  to: string
}

const PRIMARY_NAV: NavItem[] = [
  { label: 'Dashboard', to: '/dashboard' },
  { label: 'Proyek', to: '/projects' },
  { label: 'Pengaturan', to: '/settings' },
]

const AUTH_NAV: NavItem[] = [{ label: 'Masuk / Akun', to: '/login' }]

function getContextLabel(pathname: string): string {
  if (pathname === '/' || pathname === '/login') return 'Autentikasi Akun'
  if (pathname.startsWith('/dashboard')) return 'Dashboard Proyek'
  if (pathname.includes('/cross-section')) return 'Penampang Melintang 2D'
  if (pathname.includes('/drawing-sheet')) return 'Lembar Gambar & Ekspor'
  if (pathname.includes('/surveys/new')) return 'Titik Survei Baru'
  if (pathname.startsWith('/surveys/')) return 'Detail Titik Survei'
  if (pathname.startsWith('/projects/')) return 'Detail Proyek'
  if (pathname.startsWith('/projects')) return 'Daftar Proyek'
  if (pathname.startsWith('/settings')) return 'Pengaturan Aplikasi'
  return 'ARVI Workspace'
}

export function AppShell() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const location = useLocation()

  const closeSidebar = () => setSidebarOpen(false)

  return (
    <div className="arvi-shell">
      <div
        className={`arvi-backdrop ${sidebarOpen ? 'arvi-backdrop--open' : ''}`}
        onClick={closeSidebar}
        aria-hidden="true"
      />

      <aside
        className={`arvi-sidebar ${sidebarOpen ? 'arvi-sidebar--open' : ''}`}
        aria-label="Navigasi utama"
      >
        <div className="arvi-brand">
          <div className="arvi-brand__mark" aria-hidden="true">
            AR
          </div>
          <div>
            <div className="arvi-brand__title">ARVI</div>
            <div className="arvi-brand__subtitle">
              Automatic Road Visualization
            </div>
          </div>
        </div>

        <nav className="arvi-nav">
          <div className="arvi-nav__section-label">Ruang Kerja</div>
          {PRIMARY_NAV.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={closeSidebar}
              className={({ isActive }) =>
                `arvi-nav__link ${isActive ? 'arvi-nav__link--active' : ''}`
              }
            >
              {item.label}
            </NavLink>
          ))}

          <div className="arvi-nav__section-label">Akses</div>
          {AUTH_NAV.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={closeSidebar}
              className={({ isActive }) =>
                `arvi-nav__link ${isActive ? 'arvi-nav__link--active' : ''}`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="arvi-sidebar__footer">
          <div>Rebuild Baseline v1.0</div>
          <div>Status: Fase 0 (Fondasi UI)</div>
        </div>
      </aside>

      <div className="arvi-main-wrap">
        <header className="arvi-topbar">
          <div className="arvi-topbar__left">
            <button
              type="button"
              className="arvi-menu-btn"
              onClick={() => setSidebarOpen((prev) => !prev)}
              aria-label="Buka atau tutup menu navigasi"
              aria-expanded={sidebarOpen}
            >
              ☰
            </button>
            <span className="arvi-topbar__context">
              {getContextLabel(location.pathname)}
            </span>
          </div>

          <span className="arvi-badge arvi-badge--accent">
            Fase 0 · Fondasi Aplikasi
          </span>
        </header>

        <main className="arvi-content">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
