import { ArrowRight } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import ToggleButton from './Togglebutton' // Assurez-vous que le chemin est correct selon votre structure

const CardMovie = ({ id, cover_image, original_title, submitted_at, firstname, lastname, status }) => {
  const navigate = useNavigate()
  
  /**
   * Gestion dynamique de l'URL de l'image
   */
  const getFinalImageUrl = (path) => {
    if (!path) return 'https://placehold.co/400x600?text=No+Cover'
    if (path.startsWith('http')) return path
    
    const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000'
    const cleanPath = path.startsWith('/') ? path : `/${path}`
    return `${baseUrl}${cleanPath}`
  }

  const date = new Date(submitted_at).toLocaleDateString('fr-FR')

  // 1. MISE À JOUR DES TRADUCTIONS DE STATUT
  const statusTranslations = {
    'PENDING': 'EN ATTENTE',
    'APPROVED': 'VALIDÉ',
    'REJECTED': 'REFUSÉ',
    'CHANGES_REQUESTED': 'À MODIFIER', // <-- Nouveau
    'EN ATTENTE': 'EN ATTENTE',
    'VALIDÉ': 'VALIDÉ',
    'REFUSÉ': 'REFUSÉ',
    'À MODIFIER': 'À MODIFIER'
  }

  // 2. MISE À JOUR DES COULEURS DES BADGES
  const getStatusStyle = (status) => {
    const s = status?.toUpperCase()
    if (s === 'VALIDÉ' || s === 'APPROVED') return 'bg-green-100 text-green-700'
    if (s === 'REFUSÉ' || s === 'REJECTED') return 'bg-red-100 text-red-700'
    if (s === 'À MODIFIER' || s === 'CHANGES_REQUESTED') return 'bg-blue-100 text-blue-700' // <-- Nouveau (Bleu)
    return 'bg-orange-100 text-orange-700' // Par défaut (EN ATTENTE)
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
      {/* 1. SECTION IMAGE */}
      <div>
        <img 
          src={getFinalImageUrl(cover_image)} 
          alt={original_title} 
          className="h-16 w-24 rounded-xl object-cover shadow-sm transition-transform group-hover:scale-105"
          onError={(e) => { e.target.src = 'https://placehold.co/400x600?text=Image+Error' }}
        />
      </div>

      {/* 2 & 3. TITRE ET RÉALISATEUR (col-span-2 pour s'aligner avec le header) */}
      <div className="col-span-2 flex flex-col justify-center overflow-hidden">
        <div className="text-[13px] leading-tight font-black uppercase tracking-tight text-mars-dark truncate mb-1">
          {original_title}
        </div>
        <div className="text-[10px] font-extrabold text-light-gray tracking-wide uppercase truncate">
          {firstname} <span className="text-mars-dark">{lastname}</span>
        </div>
      </div>

      {/* 4. STATUT */}
      <div className="flex justify-center">
        <span className={`rounded-full px-4 py-1.5 text-[9px] font-black tracking-[0.15em] ${getStatusStyle(status)}`}>
          {statusTranslations[status?.toUpperCase()] || status}
        </span>
      </div>

      {/* 5. DATE */}
      <div className="text-center text-sm font-bold text-gray-400">{date}</div>

      {/* 6. ACTIONS (Mise en avant + Flèche) */}
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