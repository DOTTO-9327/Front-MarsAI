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

function App() {
  return (
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

        {/* LOGIN : Complètement indépendant (pas de sidebar, pas de header admin) */}
        <Route path="/admin/login" element={<LoginPage />} />

        {/* ROUTES ADMIN */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<DashboardAdmin />} />
          <Route path="movie" element={<MovieManagement />} />
          <Route path="jury" element={<JuryDistributionPage />} />
          <Route path="movie/:title" element={<MovieDetailAdmin />} />
          <Route path="resultats" element={<OfficialLeaderboard />} />
          <Route path="evenements" element={<AdminPlanning />} />
        </Route>

        {/* ROUTES JURY RATING */}
        <Route path="/admin/jury/:juryId/rating" element={<JuryRatingLayout />}>
          <Route index element={<MovieRatingPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App