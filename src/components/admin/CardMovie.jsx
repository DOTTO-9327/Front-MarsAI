import { ArrowRight } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import ToggleButton from './Togglebutton'

const CardMovie = ({ id, cover_image, original_title, submitted_at, firstname, lastname, status }) => {
  const navigate = useNavigate()
  const serverUrl = 'http://localhost:3000/'
  const date = new Date(submitted_at).toLocaleDateString('fr-FR')

  const statusTranslations = {
    'PENDING': 'EN ATTENTE',
    'APPROVED': 'VALIDÉ',
    'REJECTED': 'REFUSÉ',
    'EN ATTENTE': 'EN ATTENTE',
    'VALIDÉ': 'VALIDÉ',
    'REFUSÉ': 'REFUSÉ'
  }

  const getStatusStyle = (status) => {
    const s = status?.toUpperCase()
    if (s === 'VALIDÉ' || s === 'APPROVED') return 'bg-green-100 text-green-700'
    if (s === 'REFUSÉ' || s === 'REJECTED') return 'bg-red-100 text-red-700'
    return 'bg-orange-100 text-orange-700'
  }

  const handleNavigation = (e) => {
    if (e.target.closest('.no-nav')) return 

    // Création du slug à partir du titre
    const slug = original_title
      .toLowerCase()
      .trim()
      .normalize("NFD").replace(/[\u0300-\u036f]/g, "") // Enlève les accents
      .replace(/[^\w\s-]/g, '') // Enlève caractères spéciaux
      .replace(/[\s_-]+/g, '-') // Remplace espaces par tirets
      .replace(/^-+|-+$/g, '');

    // Navigation vers le slug en transportant l'ID en secret dans le state
    navigate(`/admin/movie/${slug}`, { state: { movieId: id } })
  }

  return (
    <div 
      onClick={handleNavigation}
      className="group grid grid-cols-6 items-center gap-4 px-6 py-3 transition-all cursor-pointer bg-white border border-transparent hover:border-primary/10 hover:shadow-md rounded-3xl"
    >
      <div>
        <img src={`${serverUrl}${cover_image}`} alt={original_title} className="h-16 w-24 rounded-xl object-cover shadow-sm transition-transform group-hover:scale-105" />
      </div>
      <div className="text-[13px] leading-tight font-black uppercase tracking-tight text-mars-dark">{original_title}</div>
      <div className="flex flex-col text-xs font-extrabold text-light-gray tracking-wide uppercase">
        <span>{firstname}</span>
        <span className="text-mars-dark">{lastname}</span>
      </div>
      <div className="flex justify-center">
        <span className={`rounded-full px-4 py-1.5 text-[9px] font-black tracking-[0.15em] ${getStatusStyle(status)}`}>
          {statusTranslations[status?.toUpperCase()] || status}
        </span>
      </div>
      <div className="text-center text-sm font-bold text-gray-400">{date}</div>
      <div className="flex items-center justify-between pl-4">
        <div className="no-nav"><ToggleButton /></div>
        <div className="rounded-xl bg-mars-light p-3 text-gray-400 transition-all group-hover:bg-primary group-hover:text-white shadow-sm">
          <ArrowRight size={18} strokeWidth={3} />
        </div>
      </div>
    </div>
  )
}

export default CardMovie