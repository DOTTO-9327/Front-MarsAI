import { NavLink } from 'react-router-dom'
import {
  Settings,
  Film,
  User,
  ChartNoAxesCombined,
  CalendarDays,
  FolderKanban,
} from 'lucide-react'

const NavbarAdmin = () => {
  const linkStyle =
    'flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-black tracking-tighter transition-colors mb-2 h-14'

  return (
    <div className="bg-mars-dark h-screen w-80 px-6 text-amber-50 shrink-0 border-r border-white/5">
      <div className="mt-10 mb-10 px-4 py-3 inline-block bg-primary rounded-xl text-xl font-black tracking-tighter">
        <NavLink to="/">MARS.A.I</NavLink>
      </div>
      
      <ul className="flex flex-col">
        {[
          { to: "/admin", icon: <FolderKanban size={20} />, label: "DASHBOARD", end: true },
          { to: "/admin/movie", icon: <Film size={20} />, label: "GESTION DE FILMS" },
          { to: "/admin/jury", icon: <User size={20} />, label: "JURY" },
          { to: "/admin/resultats", icon: <ChartNoAxesCombined size={20} />, label: "RÉSULTATS" },
          { to: "/admin/events", icon: <CalendarDays size={20} />, label: "ÉVÈNEMENTS" },
          { to: "/admin/confirm", icon: <Settings size={20} />, label: "CONFIGURATION" },
        ].map((item) => (
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
  )
}

export default NavbarAdmin