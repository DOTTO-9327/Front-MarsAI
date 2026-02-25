import { NavLink, useNavigate } from 'react-router-dom'
import {
  Settings,
  Film,
  User,
  ChartNoAxesCombined,
  CalendarDays,
  FolderKanban,
  LogOut 
} from 'lucide-react'
import { useAuth } from '../context/AuthContext' 

const NavbarAdmin = () => {
  const { logout, user } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/admin/login')
  }

  const linkStyle =
    'flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-black tracking-tighter transition-colors mb-2 h-14'

  // Filtrage des liens selon le rôle pour la cohérence visuelle
  const menuItems = [
    { to: "/admin", icon: <FolderKanban size={20} />, label: "DASHBOARD", end: true, roles: ['ADMIN', 'JURY'] },
    { to: "/admin/movie", icon: <Film size={20} />, label: "GESTION DE FILMS", roles: ['ADMIN'] },
    { to: "/admin/jury", icon: <User size={20} />, label: "JURY", roles: ['ADMIN', 'JURY'] },
    { to: "/admin/resultats", icon: <ChartNoAxesCombined size={20} />, label: "RÉSULTATS", roles: ['ADMIN', 'JURY'] },
    { to: "/admin/evenements", icon: <CalendarDays size={20} />, label: "ÉVÈNEMENTS", roles: ['ADMIN'] },
    { to: "/admin/confirm", icon: <Settings size={20} />, label: "CONFIGURATION", roles: ['ADMIN'] },
  ].filter(item => item.roles.includes(user?.role))

  return (
    <div className="bg-mars-dark h-screen w-80 px-6 text-amber-50 shrink-0 border-r border-white/5 flex flex-col justify-between py-10">
      <div>
        <div className="mb-10 px-4 py-3 inline-block bg-primary rounded-xl text-xl font-black tracking-tighter">
          <NavLink to="/">MARS.A.I</NavLink>
        </div>
        
        <ul className="flex flex-col">
          {menuItems.map((item) => (
            <li key={item.to} className="w-full">
              <NavLink
                to={item.to}
                end={item.end}
                className={({ isActive }) =>
                  `${linkStyle} ${isActive ? 'bg-primary text-white' : 'hover:bg-primary/20 text-gray-400'}`
                }
              >
                {item.icon}
                <span className="font-sans text-[11px] font-extrabold tracking-widest uppercase">
                  {item.label}
                </span>
              </NavLink>
            </li>
          ))}
        </ul>
      </div>

      {/* Section Déconnexion */}
      <div className="border-t border-white/10 pt-6">
        <div className="px-4 mb-4 flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-[10px] font-black border border-primary/30 text-primary">
                {user?.firstname?.charAt(0)}{user?.lastname?.charAt(0)}
            </div>
            <div className="flex flex-col">
                <span className="text-[10px] font-black uppercase tracking-wider leading-none">{user?.firstname}</span>
                <span className="text-[8px] font-bold text-gray-500 uppercase tracking-widest">{user?.role}</span>
            </div>
        </div>
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-black tracking-widest transition-all hover:bg-red-500/10 text-red-500 group"
        >
          <LogOut size={20} className="group-hover:translate-x-1 transition-transform" />
          <span className="font-sans text-[11px] uppercase">Déconnexion</span>
        </button>
      </div>
    </div>
  )
}

export default NavbarAdmin