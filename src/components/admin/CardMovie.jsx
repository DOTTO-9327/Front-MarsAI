import { ArrowRight } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import ToggleButton from './Togglebutton'

const CardMovie = ({
  id, // Ajout de l'ID pour la navigation
  cover_image,
  original_title,
  submitted_at,
  firstname,
  lastname,
  status,
}) => {
  const navigate = useNavigate()
  const serverUrl = 'http://localhost:3000/'
  const date = new Date(submitted_at).toLocaleDateString('fr-FR')

  const statusStyles = {
    VALIDÉ: 'bg-green-100 text-green-600',
    'EN ATTENTE': 'bg-orange-100 text-orange-600',
    REFUSÉ: 'bg-red-100 text-red-600',
  }

  const currentStatusStyle =
    statusStyles[status?.toUpperCase()] || 'bg-gray-100 text-gray-600'

  const handleNavigation = (e) => {
    if (e.target.closest('.no-nav')) return 
    navigate(`/admin/movie/${id}`)
  }

  return (
    <div 
      onClick={handleNavigation}
      className="group grid grid-cols-6 items-center gap-4 px-6 py-3 transition-all cursor-pointer bg-white border border-transparent hover:border-primary/10 hover:shadow-md rounded-3xl"
    >
      {/* Affiche */}
      <div>
        <img
          src={`${serverUrl}${cover_image}`}
          alt={original_title}
          className="h-16 w-24 rounded-xl object-cover shadow-sm transition-transform group-hover:scale-105"
        />
      </div>

      {/* Titre */}
      <div className="text-[13px] leading-tight font-black uppercase tracking-tight text-mars-dark">
        {original_title}
      </div>

      {/* Réalisateur */}
      <div className="flex flex-col text-xs font-extrabold text-light-gray tracking-wide uppercase">
        <span>{firstname}</span>
        <span className="text-mars-dark">{lastname}</span>
      </div>

      {/* Statut */}
      <div className="flex justify-center">
        <span
          className={`rounded-full px-4 py-1.5 text-[9px] font-black tracking-[0.15em] ${currentStatusStyle}`}
        >
          {status?.toUpperCase()}
        </span>
      </div>

      {/* Date */}
      <div className="text-center text-sm font-bold text-gray-400 font-sans">
        {date}
      </div>

      {/* Actions */}
      <div className="flex items-center justify-between pl-4">
        <div className="no-nav">
          <ToggleButton />
        </div>

        <div className="rounded-xl bg-mars-light p-3 text-gray-400 transition-all group-hover:bg-primary group-hover:text-white shadow-sm">
          <ArrowRight size={18} strokeWidth={3} />
        </div>
      </div>
    </div>
  )
}

export default CardMovie