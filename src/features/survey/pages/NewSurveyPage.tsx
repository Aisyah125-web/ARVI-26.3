import { Link, useParams } from 'react-router-dom'
import { PageHeader } from '../../../components/ui/PageHeader'
import { PlaceholderPanel } from '../../../components/ui/PlaceholderPanel'

export function NewSurveyPage() {
  const { projectId = '' } = useParams<{ projectId: string }>()

  return (
    <div className="arvi-stack">
      <PageHeader
        title="Tambah Titik Survei"
        breadcrumb={`ARVI / Proyek / ${projectId} / Titik Survei Baru`}
        description="Form pembuatan titik survei baru yang terikat langsung pada proyek induk."
        actions={
          <Link to={`/projects/${projectId}`} className="arvi-btn">
            Kembali ke Detail Proyek
          </Link>
        }
      />

      <div className="arvi-notice">
        Konteks proyek induk: <code>projectId = {projectId}</code>. Titik
        survei tidak dapat dibuat tanpa parent proyek yang valid (BR-02 /
        AC-03).
      </div>

      <PlaceholderPanel
        title="Form Titik Survei (SUR)"
        phaseLabel="Target: Fase 3"
        summary="Input kode titik/STA, koordinat opsional (latitude & longitude), tanggal survei, catatan, serta unggah foto lokasi."
        requirements={[
          'SUR-03: Kode/STA wajib, koordinat dan tanggal tersimpan sesuai schema.',
          'BR-09: Input kosong disimpan sebagai NULL, bukan angka nol.',
          'SUR-06: Unggah dan hapus foto lokasi survei.',
        ]}
      />
    </div>
  )
}
