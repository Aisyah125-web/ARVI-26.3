import { Link, useParams } from 'react-router-dom'
import { PageHeader } from '../../../components/ui/PageHeader'
import { PlaceholderPanel } from '../../../components/ui/PlaceholderPanel'

export function ProjectDetailPage() {
  const { projectId = '' } = useParams<{ projectId: string }>()

  return (
    <div className="arvi-stack">
      <PageHeader
        title="Detail Proyek"
        breadcrumb={`ARVI / Proyek / ${projectId}`}
        description="Ringkasan identitas proyek dan daftar titik survei di dalam proyek terpilih."
        actions={
          <div className="arvi-actions">
            <Link to="/projects" className="arvi-btn">
              Kembali ke Proyek
            </Link>
            <Link
              to={`/projects/${projectId}/surveys/new`}
              className="arvi-btn arvi-btn--primary"
            >
              Pratinjau Rute Titik Survei Baru
            </Link>
          </div>
        }
      />

      <div className="arvi-notice">
        Parameter rute aktif: <code>projectId = {projectId}</code> (hanya untuk
        verifikasi routing Fase 0, belum mengambil data dari database).
      </div>

      <PlaceholderPanel
        title="Daftar Titik Survei Proyek (SUR)"
        phaseLabel="Target: Fase 3"
        summary="Titik survei selalu dibuat dan ditampilkan dalam konteks proyek induk yang dipilih."
        requirements={[
          'SUR-01 & SUR-02: project_id wajib dan tervalidasi.',
          'SUR-04 & SUR-05: Edit dan hapus titik survei dengan konfirmasi serta cascade anak.',
          'Pratinjau rute lanjutan di bawah ini hanya menguji navigasi struktural Fase 0.',
        ]}
      >
        <div className="arvi-actions">
          <Link to="/surveys/preview-route" className="arvi-btn">
            Pratinjau Rute Detail Titik Survei
          </Link>
        </div>
      </PlaceholderPanel>
    </div>
  )
}
