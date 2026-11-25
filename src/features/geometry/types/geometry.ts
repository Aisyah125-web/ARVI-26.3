/**
 * Domain types dasar untuk modul geometri penampang jalan (BR-08: semua dimensi dalam satuan meter).
 * Implementasi form, validasi, dan persistensi akan dikerjakan pada Fase 4 dan Fase 5.
 */
export type RoadSide = 'left' | 'right' | 'center'

export type LandUseCategory = 'residential' | 'green_space' | 'commercial' | 'none'

export type RoadComponentType =
  | 'lane'
  | 'shoulder'
  | 'median'
  | 'sidewalk'
  | 'kerb'
  | 'drainage'
  | 'furniture'
  | 'land_use'

export interface RoadComponentDraft {
  id: string
  side: RoadSide
  componentType: RoadComponentType
  templateKey: string | null
  label: string | null
  widthM: number | null
  heightM: number | null
  positionXM: number
  positionYM: number
  rotationDeg: number
  sortOrder: number
}

export interface CrossSectionDraft {
  surveyPointId: string
  crownEnabled: boolean
  leftCrossSlopePct: number | null
  rightCrossSlopePct: number | null
  elevationEnabled: boolean
  elevationValueM: number | null
  leftLandUse: LandUseCategory
  rightLandUse: LandUseCategory
  notes: string | null
  components: RoadComponentDraft[]
}
