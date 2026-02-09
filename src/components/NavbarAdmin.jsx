import { NavLink } from 'react-router-dom'
import { Settings } from 'lucide-react'

const NavbarAdmin = () => {
  const linkStyle =
    'mt-16 ml-8 inline-block rounded-xl px-6 py-3 text-xl font-black tracking-tighter transition-colors'

  return (
    <div className="bg-mars-dark w-72 text-amber-50">
      <div className=":hover bg-primary mt-16 ml-8 inline-block rounded-xl px-6 py-3 text-xl font-black tracking-tighter">
        <NavLink to="/" className="z-50 flex items-center gap-2">
          MARS.A.I
        </NavLink>
      </div>
      <ul className="ml-10">
        <li>
          <NavLink
            to="/admin"
            end
            className={({ isActive }) =>
              `${linkStyle} ${isActive ? 'bg-primary' : 'hover:bg-primary'}`
            }
          >
            DASHBOARD
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/admin/gestion"
            className={({ isActive }) =>
              `${linkStyle} ${isActive ? 'bg-primary' : 'hover:bg-primary'}`
            }
          >
            GESTION DE FILMS
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/admin/jury"
            className={({ isActive }) =>
              `${linkStyle} ${isActive ? 'bg-primary' : 'hover:bg-primary'}`
            }
          >
            JURY
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/admin/resultats"
            className={({ isActive }) =>
              `${linkStyle} ${isActive ? 'bg-primary' : 'hover:bg-primary'}`
            }
          >
            RÉSULTATS & CLASSEMENT
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/admin/events"
            className={({ isActive }) =>
              `${linkStyle} ${isActive ? 'bg-primary' : 'hover:bg-primary'}`
            }
          >
            ÉVÈNEMENTS
          </NavLink>
        </li>

        <li>
          <Settings />
          <NavLink
            to="/admin/confirm"
            className={({ isActive }) =>
              `${linkStyle} ${isActive ? 'bg-primary' : 'hover:bg-primary'}`
            }
          >
            CONFIRMATION
          </NavLink>
        </li>
      </ul>
    </div>
  )
}

export default NavbarAdmin
