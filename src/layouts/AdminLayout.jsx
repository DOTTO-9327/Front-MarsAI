import { Outlet } from 'react-router-dom'
import NavbarAdmin from '../components/NavbarAdmin'

const AdminLayout = () => {
  return (
    <>
      <div className="flex min-h-screen ">
        <NavbarAdmin />
        <main>
          <Outlet />
        </main>
      </div>
    </>
  )
}

export default AdminLayout
