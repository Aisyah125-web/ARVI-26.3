import { Link, useParams } from 'react-router-dom'
import { PageHeader } from '../../../components/ui/PageHeader'
import { PlaceholderPanel } from '../../../components/ui/PlaceholderPanel'

export function DrawingSheetPage() {
  const { surveyPointId = '' } = useParams<{ surveyPointId: string }>()

  return (
    <div className="arvi-stack">
      <PageHeader
        title="Lembar Gambar & Ekspor"
        breadcrumb={`ARVI / Survei / ${surveyPointId} / Lembar Gambar`}
        description="Pengaturan ukuran kertas, orientasi, skala gambar, metadata survei, serta ekspor PDF dan PNG/JPG."
        actions={
          <Link
            to={`/surveys/${surveyPointId}/cross-section`}
            className="arvi-btn"
          >
            Kembali ke Penampang 2D
          </Link>
        }
      />

      <PlaceholderPanel
        title="Modul Lembar Gambar & Ekspor (EXP)"
        phaseLabel="Target: Fase 6"
        summary="Menggabungkan visualisasi penampang 2D dengan blok judul teknis, foto lokasi, dan pengaturan cetak yang konsisten."
        requirements={[
          'EXP-01: Memuat identitas ruas, STA, koordinat, foto, tanggal, skala, logo, dan nama surveyor/kelompok.',
          'EXP-02 & EXP-03: Pilihan ukuran kertas (A4/A3/custom), orientasi portrait/landscape, dan skala gambar.',
          'EXP-04 & EXP-05: Ekspor ke format PDF dan PNG/JPG.',
          'EXP-06: Print preview konsisten dengan hasil ekspor.',
        ]}
      />
    </div>
  )
}
