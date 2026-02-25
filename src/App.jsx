import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Homepage from './pages/Homepage'
import MainLayout from './layouts/MainLayout'
import Program from './pages/Program'
import SubmissionForm from './pages/SubmissionForm'
import MovieGallery from './pages/MovieGallery'
import AdminLayout from './layouts/AdminLayout'
import DashboardAdmin from './pages/DashboardAdmin'
import MovieManagement from './pages/MovieManagement'
import MovieDetailAdmin from './pages/MovieDetailAdmin'
import ScrollToTop from './components/ScrollToTop'
import MovieDetail from './pages/MovieDetail'
import JuryPage from './pages/JuryPage'
import JuryDistributionPage from './pages/JuryDistributionPage'
import OfficialLeaderboard from './pages/OfficialLeaderboard'
import AdminPlanning from './pages/AdminPlanning'
import JuryRatingLayout from './layouts/JuryRatingLayout'
import MovieRatingPage from './pages/MovieRatingPage'
import BookingSubmission from './pages/BookingSubmission'
import LoginPage from './pages/LoginPage'
import EditSubmissionPage from './pages/EditSubmissionPage'
import { AuthProvider } from './context/AuthContext'
import ProtectedRoute from './components/ProtectedRoute'

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <ScrollToTop />
        <Routes>

          {/* ROUTES PUBLIQUES */}
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Homepage />} />
            <Route path="soumettre" element={<SubmissionForm />} />
            <Route path="programme" element={<Program />} />
            <Route path="galerie" element={<MovieGallery />} />
            <Route path="jury" element={<JuryPage />} />
            <Route path="reserver" element={<BookingSubmission />} />
            <Route path="movie/:title" element={<MovieDetail />} />
            <Route path="/edit/:id" element={<EditSubmissionPage />} />
          </Route>

          {/* LOGIN : Complètement indépendant */}
          <Route path="/admin/login" element={<LoginPage />} />

          {/* ROUTES ADMIN (Protégées) */}
          <Route path="/admin" element={
            <ProtectedRoute allowedRoles={['ADMIN', 'JURY']}>
              <AdminLayout />
            </ProtectedRoute>
          }>
            {/* Accessible aux 2 rôles (Admin & Jury) */}
            <Route index element={<DashboardAdmin />} />
            <Route path="resultats" element={<OfficialLeaderboard />} />
            <Route path="jury" element={<JuryDistributionPage />} />

            {/* Strictement réservé aux ADMINS */}
            <Route path="movie" element={
              <ProtectedRoute allowedRoles={['ADMIN']}><MovieManagement /></ProtectedRoute>
            } />
            <Route path="movie/:title" element={
              <ProtectedRoute allowedRoles={['ADMIN']}><MovieDetailAdmin /></ProtectedRoute>
            } />
            <Route path="evenements" element={
              <ProtectedRoute allowedRoles={['ADMIN']}><AdminPlanning /></ProtectedRoute>
            } />
          </Route>

          {/* ROUTES JURY RATING (Protégé) */}
          <Route path="/admin/jury/:juryId/rating" element={
            <ProtectedRoute allowedRoles={['ADMIN', 'JURY']}>
              <JuryRatingLayout />
            </ProtectedRoute>
          }>
            <Route index element={<MovieRatingPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App