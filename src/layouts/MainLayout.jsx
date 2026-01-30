import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const MainLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      {/* On ajoute une marge interne en haut pour laisser la place à la Navbar */}
      <main className="grow"> 
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

export default MainLayout
