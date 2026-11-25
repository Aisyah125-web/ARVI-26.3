import { Link, useParams } from 'react-router-dom'
import { PageHeader } from '../../../components/ui/PageHeader'
import { PlaceholderPanel } from '../../../components/ui/PlaceholderPanel'

export function SurveyDetailPage() {
  const { surveyPointId = '' } = useParams<{ surveyPointId: string }>()

  return (
    <div className="arvi-stack">
      <PageHeader
        title="Detail Titik Survei"
        breadcrumb={`ARVI / Survei / ${surveyPointId}`}
        description="Informasi titik survei, foto lokasi, dan akses menuju editor penampang 2D serta lembar gambar."
        actions={
          <div className="arvi-actions">
            <Link
              to={`/surveys/${surveyPointId}/cross-section`}
              className="arvi-btn arvi-btn--primary"
            >
              Buka Penampang 2D
            </Link>
            <Link
              to={`/surveys/${surveyPointId}/drawing-sheet`}
              className="arvi-btn"
            >
              Buka Lembar Gambar
            </Link>
          </div>
        }
      />

      <div className="arvi-notice">
        Parameter rute aktif: <code>surveyPointId = {surveyPointId}</code>.
      </div>

      <PlaceholderPanel
        title="Detail & Media Titik Survei (SUR)"
        phaseLabel="Target: Fase 3 & Fase 6"
        summary="Menampilkan data identitas STA, koordinat, tanggal, catatan, foto lokasi, serta aksi edit dan hapus titik survei."
        requirements={[
          'SUR-04: Edit identitas titik survei milik user.',
          'SUR-05: Hapus titik survei beserta penampang, komponen, pengaturan gambar, dan media turunannya.',
          'SUR-06: Manajemen foto lokasi survei.',
        ]}
      />
    </div>
  )
}
