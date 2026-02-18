import { ArrowRight } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import ToggleButton from './Togglebutton'

const CardMovie = ({ id, cover_image, original_title, submitted_at, firstname, lastname, status }) => {
  const navigate = useNavigate()
  
  /**
   * Gestion dynamique de l'URL de l'image
   * Détecte si l'image provient de S3 (https://) ou du serveur local
   */
  const getFinalImageUrl = (path) => {
    if (!path) return 'https://placehold.co/400x600?text=No+Cover'
    
    // Si c'est une URL complète (S3 Scaleway), on la retourne telle quelle
    if (path.startsWith('http')) {
      return path
    }
    
    // Sinon, on utilise la variable d'environnement
    const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000'
    const cleanPath = path.startsWith('/') ? path : `/${path}`
    
    return `${baseUrl}${cleanPath}`
  }

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
    // Empêche la navigation si on clique sur le ToggleButton (no-nav)
    if (e.target.closest('.no-nav')) return 

    const slug = original_title
      .toLowerCase()
      .trim()
      .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '-')
      .replace(/^-+|-+$/g, '')

    navigate(`/admin/movie/${slug}`, { state: { movieId: id } })
  }

  return (
    <div 
      onClick={handleNavigation}
      className="group grid grid-cols-6 items-center gap-4 px-6 py-3 transition-all cursor-pointer bg-white border border-transparent hover:border-primary/10 hover:shadow-md rounded-3xl"
    >
      {/* SECTION IMAGE */}
      <div>
        <img 
          src={getFinalImageUrl(cover_image)} 
          alt={original_title} 
          className="h-16 w-24 rounded-xl object-cover shadow-sm transition-transform group-hover:scale-105"
          onError={(e) => { e.target.src = 'https://placehold.co/400x600?text=Image+Error' }}
        />
      </div>

      {/* TITRE */}
      <div className="text-[13px] leading-tight font-black uppercase tracking-tight text-mars-dark">
        {original_title}
      </div>

      {/* RÉALISATEUR */}
      <div className="flex flex-col text-xs font-extrabold text-light-gray tracking-wide uppercase">
        <span>{firstname}</span>
        <span className="text-mars-dark">{lastname}</span>
      </div>

      {/* STATUT */}
      <div className="flex justify-center">
        <span className={`rounded-full px-4 py-1.5 text-[9px] font-black tracking-[0.15em] ${getStatusStyle(status)}`}>
          {statusTranslations[status?.toUpperCase()] || status}
        </span>
      </div>

      {/* DATE */}
      <div className="text-center text-sm font-bold text-gray-400">{date}</div>

      {/* ACTIONS */}
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