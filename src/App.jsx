import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Homepage from './pages/Homepage'
import MainLayout from './layouts/MainLayout'
import Program from './pages/Program'
import SubmissionForm from './pages/SubmissionForm'
import DashboardAdmin from './pages/DashboardAdmin'
import AdminLayout from './layouts/AdminLayout'
import Movie from './pages/Movie'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Homepage />} />
          <Route path="soumettre" element={<SubmissionForm />} />
          <Route path="programme" element={<Program />} />
        </Route>
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<DashboardAdmin />} />
          <Route path="movie" element={<Movie />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
