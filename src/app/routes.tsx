import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { AppShell } from '../components/layout/AppShell'
import { LoginPage } from '../features/auth/pages/LoginPage'
import { DashboardPage } from '../features/dashboard/pages/DashboardPage'
import { DrawingSheetPage } from '../features/export/pages/DrawingSheetPage'
import { CrossSectionPage } from '../features/geometry/pages/CrossSectionPage'
import { ProjectDetailPage } from '../features/project/pages/ProjectDetailPage'
import { ProjectsPage } from '../features/project/pages/ProjectsPage'
import { SettingsPage } from '../features/settings/pages/SettingsPage'
import { NewSurveyPage } from '../features/survey/pages/NewSurveyPage'
import { SurveyDetailPage } from '../features/survey/pages/SurveyDetailPage'
import { Link } from 'react-router-dom'

function NotFoundPage() {
  return (
    <div className="arvi-empty-state">
      <h3>Halaman tidak ditemukan</h3>
      <p>
        Rute yang diminta tidak tersedia pada struktur halaman ARVI. Silakan
        kembali ke Dashboard atau halaman Proyek.
      </p>
      <div className="arvi-actions" style={{ justifyContent: 'center' }}>
        <Link to="/dashboard" className="arvi-btn arvi-btn--primary">
          Ke Dashboard
        </Link>
        <Link to="/projects" className="arvi-btn">
          Ke Daftar Proyek
        </Link>
      </div>
    </div>
  )
}

export function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppShell />}>
          <Route path="/" element={<LoginPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/projects/:projectId" element={<ProjectDetailPage />} />
          <Route
            path="/projects/:projectId/surveys/new"
            element={<NewSurveyPage />}
          />
          <Route
            path="/surveys/:surveyPointId"
            element={<SurveyDetailPage />}
          />
          <Route
            path="/surveys/:surveyPointId/cross-section"
            element={<CrossSectionPage />}
          />
          <Route
            path="/surveys/:surveyPointId/drawing-sheet"
            element={<DrawingSheetPage />}
          />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
