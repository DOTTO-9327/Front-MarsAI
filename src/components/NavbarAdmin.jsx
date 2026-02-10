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
    ' flex items-center gap-3 rounded-xl px-6 py-3 text-sm font-black tracking-tighter transition-colors mb-6 '

  return (
    <div className="bg-mars-dark w-l text-amber-50">
      <div className=":hover bg-primary mt-16 mb-10 ml-8 inline-block rounded-xl px-6 py-3 text-xl font-black tracking-tighter">
        <NavLink to="/" className="z-50 flex items-center gap-2">
          MARS.A.I
        </NavLink>
      </div>
      <ul className="flex flex-col items-start ml-10 mr-10">
        <li className="">
          <NavLink
            to="/admin"
            end
            className={({ isActive }) =>
              `${linkStyle} ${isActive ? 'bg-primary' : 'hover:bg-primary'}`
            }
          >
            <FolderKanban size={20} />
            <span>DASHBOARD</span>
            {/* <FolderKanban /> DASHBOARD */}
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/admin/movie"
            className={({ isActive }) =>
              `${linkStyle} ${isActive ? 'bg-primary' : 'hover:bg-primary'}`
            }
          >
            <Film /> GESTION DE FILMS
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/admin/jury"
            className={({ isActive }) =>
              `${linkStyle} ${isActive ? 'bg-primary' : 'hover:bg-primary'}`
            }
          >
            <User /> JURY
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/admin/resultats"
            className={({ isActive }) =>
              `${linkStyle} ${isActive ? 'bg-primary' : 'hover:bg-primary'}`
            }
          >
            <ChartNoAxesCombined /> RÉSULTATS & CLASSEMENT
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/admin/events"
            className={({ isActive }) =>
              `${linkStyle} ${isActive ? 'bg-primary' : 'hover:bg-primary'}`
            }
          >
            <CalendarDays /> ÉVÈNEMENTS
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/admin/confirm"
            className={({ isActive }) =>
              `${linkStyle} ${isActive ? 'bg-primary' : 'hover:bg-primary'}`
            }
          >
            <Settings /> CONFIRMATION
          </NavLink>
        </li>
      </ul>
    </div>
  )
}

export default NavbarAdmin
