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
    ' flex items-center gap-3 rounded-2xl px-6 py-3 text-sm font-black tracking-tighter transition-colors  mb-6 h-19'

  return (
    <div className="bg-mars-dark w-l w-2xl pl-12 text-amber-50">
      <div className=":hover bg-primary mt-16 mb-16 inline-block rounded-xl px-6 py-3 text-xl font-black tracking-tighter ">
        <NavLink to="/">MARS.A.I</NavLink>
      </div>
      <ul className="flex flex-col">
        <li className="w-4/5">
          <NavLink
            to="/admin"
            end
            className={({ isActive }) =>
              `${linkStyle} ${isActive ? 'bg-primary text-white' : 'hover:bg-primary text-gray-400'}`
            }
          >
            <FolderKanban size={20} />
            <span className="font-sans text-sm font-extrabold tracking-widest">
              DASHBOARD
            </span>
          </NavLink>
        </li>

        <li className="w-4/5">
          <NavLink
            to="/admin/movie"
            className={({ isActive }) =>
              `${linkStyle} ${isActive ? 'bg-primary text-white' : 'hover:bg-primary text-gray-400'}`
            }
          >
            <Film />
            <span className="font-sans text-sm font-extrabold tracking-widest">
              GESTION DE FILMS
            </span>
          </NavLink>
        </li>
        <li className="w-4/5">
          <NavLink
            to="/admin/jury"
            className={({ isActive }) =>
              `${linkStyle} ${isActive ? 'bg-primary text-white' : 'hover:bg-primary text-gray-400'}`
            }
          >
            <User />
            <span className="font-sans text-sm font-extrabold tracking-widest">
              JURY
            </span>
          </NavLink>
        </li>
        <li className="w-4/5">
          <NavLink
            to="/admin/resultats"
            className={({ isActive }) =>
              `${linkStyle} ${isActive ? 'bg-primary text-white' : 'hover:bg-primary text-gray-400'}`
            }
          >
            <ChartNoAxesCombined />
            <span className="font-sans text-sm font-extrabold tracking-widest">
              RÉSULTATS & CLASSEMENT
            </span>
          </NavLink>
        </li>
        <li className="w-4/5">
          <NavLink
            to="/admin/events"
            className={({ isActive }) =>
              `${linkStyle} ${isActive ? 'bg-primary text-white' : 'hover:bg-primary text-gray-400'}`
            }
          >
            <CalendarDays />
            <span className="font-sans text-sm font-extrabold tracking-widest">
              ÉVÈNEMENTS
            </span>
          </NavLink>
        </li>
        <li className="w-4/5">
          <NavLink
            to="/admin/confirm"
            className={({ isActive }) =>
              `${linkStyle} ${isActive ? 'bg-primary text-white' : 'hover:bg-primary text-gray-400'}`
            }
          >
            <Settings />
            <span className="font-sans text-sm font-extrabold tracking-widest">
              CONFIGURATION
            </span>
          </NavLink>
        </li>
      </ul>
    </div>
  )
}

export default NavbarAdmin
