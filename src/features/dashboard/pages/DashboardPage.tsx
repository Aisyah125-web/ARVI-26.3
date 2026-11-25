import { Link } from 'react-router-dom'
import { PageHeader } from '../../../components/ui/PageHeader'
import { PlaceholderPanel } from '../../../components/ui/PlaceholderPanel'

export function DashboardPage() {
  return (
    <div className="arvi-stack">
      <PageHeader
        title="Dashboard"
        breadcrumb="ARVI / Dashboard"
        description="Ringkasan proyek survei jalan milik pengguna aktif dan akses cepat ke alur kerja penampang 2D."
        actions={
          <Link to="/projects" className="arvi-btn arvi-btn--primary">
            Buka Daftar Proyek
          </Link>
        }
      />

      <div className="arvi-empty-state">
        <h3>Belum ada proyek yang ditampilkan</h3>
        <p>
          Sesuai aturan produk (PRO-06 &amp; AC-01), dashboard tidak mengisi
          proyek contoh atau data dummy. Pada Fase 0, koneksi database belum
          diaktifkan; pengelolaan proyek akan diimplementasikan pada Fase 2.
        </p>
        <div className="arvi-actions" style={{ justifyContent: 'center' }}>
          <Link to="/projects" className="arvi-btn">
            Lihat Halaman Proyek
          </Link>
          <Link to="/settings" className="arvi-btn">
            Pengaturan Aplikasi
          </Link>
        </div>
      </div>

      <PlaceholderPanel
        title="Alur Kerja Inti ARVI"
        phaseLabel="Panduan Struktur"
        summary="Setiap data terikat dalam hierarki eksplisit dari pengguna hingga lembar gambar:"
        requirements={[
          '1. Proyek (projects) dimiliki oleh user aktif.',
          '2. Titik Survei (survey_points) wajib terikat pada project_id.',
          '3. Penampang Jalan (cross_sections) memiliki relasi 1:1 dengan titik survei.',
          '4. Komponen Jalan (road_components) dan Lembar Gambar (drawing_settings) terikat pada penampang.',
        ]}
      />
    </div>
  )
}
