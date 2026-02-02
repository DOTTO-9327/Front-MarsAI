import { Outlet, useLocation } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const MainLayout = () => {
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      {/* Padding que si on n'est pas sur la homepage */}
      <main className={`grow ${isHomePage ? '' : 'pt-18'}`}> 
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

export default MainLayout;