import { Link } from 'react-router-dom'
import { PageHeader } from '../../../components/ui/PageHeader'
import { PlaceholderPanel } from '../../../components/ui/PlaceholderPanel'

export function ProjectsPage() {
  return (
    <div className="arvi-stack">
      <PageHeader
        title="Daftar Proyek"
        breadcrumb="ARVI / Proyek"
        description="Kelola proyek survei jalan milik akun yang sedang masuk."
      />

      <div className="arvi-empty-state">
        <h3>Daftar proyek kosong</h3>
        <p>
          Belum ada operasi CRUD proyek pada Fase 0 dan tidak ada proyek dummy
          yang disisipkan. Pembuatan, pengeditan, dan penghapusan proyek akan
          ditambahkan pada Fase 2 bersama validasi RLS.
        </p>
        <div className="arvi-actions" style={{ justifyContent: 'center' }}>
          <Link to="/projects/preview-route" className="arvi-btn">
            Pratinjau Rute Detail Proyek
          </Link>
        </div>
      </div>

      <PlaceholderPanel
        title="Modul Proyek (PRO)"
        phaseLabel="Target: Fase 2"
        summary="Mendukung pembuatan, pembacaan, pembaruan, dan penghapusan proyek milik user dengan konsistensi kolom schema (name, road_name, location, description)."
        requirements={[
          'PRO-01 & PRO-02: Buat proyek dengan nama, ruas jalan, lokasi, dan deskripsi opsional.',
          'PRO-03 & PRO-04: Tampilkan, edit, dan hapus proyek hanya milik user aktif.',
          'PRO-05: Buka detail proyek untuk mengelola titik surveinya.',
          'PRO-06: Tidak ada proyek dummy pada akun baru.',
        ]}
      />
    </div>
  )
}
