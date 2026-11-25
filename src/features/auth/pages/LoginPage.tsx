import { Link } from 'react-router-dom'
import { PageHeader } from '../../../components/ui/PageHeader'
import { PlaceholderPanel } from '../../../components/ui/PlaceholderPanel'

export function LoginPage() {
  return (
    <div className="arvi-stack">
      <PageHeader
        title="Masuk / Daftar Akun"
        breadcrumb="ARVI / Autentikasi"
        description="Halaman masuk dan pendaftaran akun surveyor atau mahasiswa untuk mengakses proyek survei jalan."
      />

      <div className="arvi-notice arvi-notice--warning">
        <strong>Status Fase 0:</strong> Autentikasi Supabase Auth belum
        diaktifkan pada fase ini. Integrasi sign in, sign up, sesi reload, dan
        RLS akan dikerjakan pada <strong>Fase 1</strong>.
      </div>

      <div className="arvi-grid-2">
        <PlaceholderPanel
          title="Modul Autentikasi (AUTH)"
          phaseLabel="Target: Fase 1"
          summary="Form login/register email & password, logout aman, pemeliharaan sesi saat reload, dan alur reset password."
          requirements={[
            'AUTH-01: Daftar dan login menggunakan Supabase Auth (email/password).',
            'AUTH-02 & AUTH-03: Logout dan pemeliharaan sesi aman saat reload.',
            'AUTH-04: Kepemilikan data dijaga melalui Row Level Security (RLS).',
            'AUTH-05: Alur reset password.',
          ]}
        >
          <div className="arvi-actions">
            <Link to="/dashboard" className="arvi-btn arvi-btn--primary">
              Buka Ruang Kerja Dashboard
            </Link>
            <Link to="/settings" className="arvi-btn">
              Cek Status Environment
            </Link>
          </div>
        </PlaceholderPanel>

        <section className="arvi-card arvi-card--muted arvi-stack">
          <h2 style={{ margin: 0, fontSize: '1.05rem' }}>
            Prinsip Keamanan Baseline
          </h2>
          <ul className="arvi-list">
            <li>Tidak menggunakan proyek contoh/dummy sebagai data pengguna.</li>
            <li>
              Frontend hanya memakai <code>VITE_SUPABASE_ANON_KEY</code>, tidak
              pernah <code>service_role</code> key.
            </li>
            <li>
              UI tidak menampilkan status &ldquo;Tersinkron&rdquo; sebelum
              operasi database benar-benar berhasil.
            </li>
          </ul>
        </section>
      </div>
    </div>
  )
}
