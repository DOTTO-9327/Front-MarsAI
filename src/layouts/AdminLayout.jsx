import { Outlet } from 'react-router-dom'
import NavbarAdmin from '../components/NavbarAdmin'
import HeaderAdmin from '../components/HeaderAdmin'

const AdminLayout = () => {
  return (
    <>
      <div className="flex min-h-screen">
        <NavbarAdmin />
        <main className="w-full p-20">
          <HeaderAdmin />
          <Outlet />
        </main>
      </div>
    </>
  )
}

export default AdminLayout
