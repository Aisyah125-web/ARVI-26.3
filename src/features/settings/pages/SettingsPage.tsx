import { PageHeader } from '../../../components/ui/PageHeader'
import { PlaceholderPanel } from '../../../components/ui/PlaceholderPanel'
import { getPublicEnvStatus } from '../../../lib/env'

export function SettingsPage() {
  const envStatus = getPublicEnvStatus()

  return (
    <div className="arvi-stack">
      <PageHeader
        title="Pengaturan Aplikasi & Akun"
        breadcrumb="ARVI / Pengaturan"
        description="Informasi konfigurasi environment frontend dan preferensi akun pengguna."
      />

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
          <h2 style={{ margin: 0, fontSize: '1.05rem' }}>
            Status Variabel Environment Publik
          </h2>
          <span className="arvi-badge">
            {envStatus.isSupabaseEnvReady
              ? 'Variabel Terdeteksi (Belum Dihubungkan)'
              : 'Belum Dikonfigurasi'}
          </span>
        </div>

        <p style={{ margin: 0, color: 'var(--arvi-text-muted)' }}>
          Pada Fase 0, aplikasi berjalan tanpa dependensi koneksi Supabase.
          Variabel <code>VITE_SUPABASE_URL</code> dan{' '}
          <code>VITE_SUPABASE_ANON_KEY</code> akan digunakan mulai Fase 1.
        </p>

        <ul className="arvi-list">
          <li>
            <code>VITE_SUPABASE_URL</code>:{' '}
            {envStatus.hasSupabaseUrl ? 'Terisi' : 'Kosong'}
          </li>
          <li>
            <code>VITE_SUPABASE_ANON_KEY</code>:{' '}
            {envStatus.hasSupabaseAnonKey ? 'Terisi' : 'Kosong'}
          </li>
        </ul>
      </section>

      <PlaceholderPanel
        title="Pengaturan Profil & Akun"
        phaseLabel="Target: Fase 1+"
        summary="Pengaturan profil pengguna (profiles.display_name) dan manajemen sesi akan tersedia setelah autentikasi Supabase diaktifkan."
        requirements={[
          'NFR-04: Tidak menyimpan secret atau service_role key di frontend.',
          'AUTH-02: Logout dan manajemen sesi pengguna aktif.',
        ]}
      />
    </div>
  )
}
