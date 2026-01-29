import { Outlet } from 'react-router-dom'

const MainLayout = () => {
  return (
    <div className="app-container">
      <div>header</div>
      
        <Outlet />
      
      <div>footer</div>
    </div>
  )
}

export default MainLayout
