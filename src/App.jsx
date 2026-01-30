import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Homepage from './pages/Homepage'
import MainLayout from './layouts/MainLayout'
import Program from './pages/Program'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Homepage />} />
          <Route path="programme" element={<Program />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
