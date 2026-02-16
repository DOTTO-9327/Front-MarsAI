import { Outlet } from 'react-router-dom'
import NavbarAdmin from '../components/NavbarAdmin'
import HeaderAdmin from '../components/HeaderAdmin'

const AdminLayout = () => {
  return (
    <div className="bg-mars-light flex h-screen overflow-hidden">
      <NavbarAdmin />
            <main className="flex-1 py-10 px-18 overflow-y-auto bg-mars-light">
        <HeaderAdmin />
        <div className="mt-8">
          <Outlet />
        </div>
      </main>
    </div>
  )
}

export default AdminLayout