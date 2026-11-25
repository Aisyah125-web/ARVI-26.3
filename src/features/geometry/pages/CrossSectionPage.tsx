import { Link, useParams } from 'react-router-dom'
import { PageHeader } from '../../../components/ui/PageHeader'
import { PlaceholderPanel } from '../../../components/ui/PlaceholderPanel'
import { CrossSectionViewportPlaceholder } from '../../renderer/components/CrossSectionViewportPlaceholder'

export function CrossSectionPage() {
  const { surveyPointId = '' } = useParams<{ surveyPointId: string }>()

  return (
    <div className="arvi-stack">
      <PageHeader
        title="Input & Visualisasi Penampang 2D"
        breadcrumb={`ARVI / Survei / ${surveyPointId} / Penampang 2D`}
        description="Ruang kerja terpisah antara input geometri jalan (satuan meter) dan viewport penampang melintang 2D."
        actions={
          <div className="arvi-actions">
            <Link to={`/surveys/${surveyPointId}`} className="arvi-btn">
              Detail Survei
            </Link>
            <Link
              to={`/surveys/${surveyPointId}/drawing-sheet`}
              className="arvi-btn arvi-btn--primary"
            >
              Lembar Gambar &amp; Ekspor
            </Link>
          </div>
        }
      />

      <div className="arvi-split-workspace">
        <PlaceholderPanel
          title="Panel Geometri & Komponen (DAT / LIB)"
          phaseLabel="Target: Fase 4"
          summary="Form parameter penampang 1:1 untuk titik survei dengan dukungan kondisi kiri/kanan asimetris."
          requirements={[
            'DAT-01..03: Lajur fleksibel dan kondisi kiri/kanan berbeda.',
            'DAT-04 & DAT-05: Bahu, median, trotoar, kerb, drainase (dimensi lebar), dan perlengkapan jalan.',
            'DAT-06..08: Kemiringan melintang, mahkota jalan (crowned road), dan elevasi opsional.',
            'LIB-01..05: Pustaka template dan kategori tata guna lahan kiri/kanan terpisah.',
            'GEN-06..08: Editor pindah posisi/ubah dimensi, Undo/Redo/Reset, sinkron ke input.',
          ]}
        />

        <CrossSectionViewportPlaceholder surveyPointId={surveyPointId} />
      </div>
    </div>
  )
}
