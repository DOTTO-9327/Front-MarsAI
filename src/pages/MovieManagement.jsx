import { useEffect, useState } from 'react'
import CardMovie from '../components/admin/CardMovie'
import Searchbar from '../components/admin/searchbar'
import { ChevronDown, Filter } from 'lucide-react'
import { useAuth } from '../context/AuthContext' // <-- N'oubliez pas l'auth si votre route est protégée

const MovieManagement = () => {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const { token } = useAuth() // Optionnel : à utiliser dans le fetch si besoin

  // État pour le filtre avec le nouveau statut
  const [currentFilter, setCurrentFilter] = useState('TOUT')

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        // Ajout du token si l'API est sécurisée
        const response = await fetch(`${import.meta.env.VITE_API_URL}/movie`, {
            headers: { 'Authorization': `Bearer ${token}` }
        })
        if (!response.ok) throw new Error(`Erreur HTTP : ${response.status}`)
        const result = await response.json()

        // --- TRI DES DONNÉES (du plus récent au plus ancien) ---
        const sortedData = result.data.sort((a, b) => {
          return new Date(b.submitted_at) - new Date(a.submitted_at)
        })

        setData(sortedData)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [token])

  // Logique de filtrage mise à jour avec "CHANGES_REQUESTED"
  const filteredData = data.filter((movie) => {
    if (currentFilter === 'TOUT') return true
    
    const status = movie.status?.toUpperCase()
    
    if (currentFilter === 'EN ATTENTE') return status === 'PENDING' || status === 'EN ATTENTE'
    if (currentFilter === 'VALIDÉ') return status === 'APPROVED' || status === 'VALIDÉ'
    if (currentFilter === 'REFUSÉ') return status === 'REJECTED' || status === 'REFUSÉ'
    if (currentFilter === 'À MODIFIER') return status === 'CHANGES_REQUESTED' || status === 'À MODIFIER'
    
    return true
  })

  if (loading) return <p className="p-10 text-center font-bold text-primary animate-pulse">Chargement...</p>
  if (error) return <p className="p-10 text-red-500 font-bold text-center">Erreur : {error}</p>

  // Liste des options de filtres
  const filterOptions = ['TOUT', 'EN ATTENTE', 'À MODIFIER', 'VALIDÉ', 'REFUSÉ']

  return (
    <div className="min-h-screen py-6">
      <h3 className="mb-4 font-black text-5xl tracking-tighter uppercase">FILMS SOUMIS</h3>
      <p className="max-w-2xl text-light-gray font-medium text-lg leading-snug mb-10">
        Gérer l'intégralité des soumissions et gérer les mises en avant.
      </p>

      {/* Barre de Filtres avec couleurs dynamiques */}
      <div className="flex flex-wrap items-center gap-3 mb-8">
        <div className="flex items-center gap-2 mr-2 text-light-gray">
            <Filter size={16} />
            <span className="text-[10px] font-black uppercase tracking-widest">Filtrer :</span>
        </div>
        
        {filterOptions.map((filter) => {
          // Attribution d'une couleur spécifique pour le badge actif
          let activeStyle = 'bg-primary border-primary text-white shadow-lg'
          if (filter === 'EN ATTENTE') activeStyle = 'bg-orange-500 border-orange-500 text-white shadow-lg'
          if (filter === 'VALIDÉ') activeStyle = 'bg-green-500 border-green-500 text-white shadow-lg'
          if (filter === 'À MODIFIER') activeStyle = 'bg-blue-500 border-blue-500 text-white shadow-lg'
          if (filter === 'REFUSÉ') activeStyle = 'bg-red-500 border-red-500 text-white shadow-lg'

          const isActive = currentFilter === filter

          return (
            <button
              key={filter}
              onClick={() => setCurrentFilter(filter)}
              className={`px-6 py-2 rounded-xl text-[11px] font-black tracking-widest transition-all border-2 
                ${isActive 
                  ? activeStyle 
                  : 'bg-white border-gray-100 text-light-gray hover:border-gray-300 hover:text-gray-700'
                }`}
            >
              {filter}
            </button>
          )
        })}
      </div>

      <div className="w-full rounded-[40px] bg-white p-8 shadow-sm">
        <div className="mb-10 flex justify-between items-center gap-4">
          <div className="flex-1">
            <Searchbar />
          </div>
          <div className="text-[10px] font-black text-light-gray uppercase tracking-widest px-4">
            {filteredData.length} Film(s) trouvé(s)
          </div>
        </div>

        {/* Header de la liste */}
        <div className="mb-6 grid grid-cols-6 gap-4 px-6 text-[10px] font-black tracking-[0.2em] text-gray-400 uppercase">
          <div>Affiche</div>
          <div className="col-span-2">Titre & Réalisateur</div> {/* Fusion pour plus de place */}
          <div className="text-center">Statut</div>
          <div className="text-center">Date</div>
          <div className="text-center">En avant</div>
        </div>

        {/* Liste filtrée */}
        <section className="flex flex-col gap-4">
          {filteredData.length > 0 ? (
            filteredData.map((movie) => (
              <CardMovie
                key={movie.id}
                id={movie.id}
                cover_image={movie.cover_image}
                original_title={movie.original_title}
                submitted_at={movie.submitted_at}
                firstname={movie.firstname}
                lastname={movie.lastname}
                status={movie.status}
              />
            ))
          ) : (
            <div className="py-20 text-center text-light-gray font-bold italic border-2 border-dashed border-gray-50 rounded-3xl">
              Aucun film ne correspond à ce filtre.
            </div>
          )}
        </section>

      </div>
      
      {/* SYSTÈME DE PAGINATION */}
      <div className="mt-16 flex flex-col items-center gap-6">
        <div className="flex items-center gap-2">
          <button className="w-10 h-10 flex items-center justify-center rounded-full border border-slate-200 text-light-gray hover:bg-mars-light transition-colors">
            <ChevronDown className="rotate-90" size={18} />
          </button>
          <button className="w-10 h-10 flex items-center justify-center rounded-full bg-primary text-white font-black text-sm shadow-lg shadow-primary/30">1</button>
          <button className="w-10 h-10 flex items-center justify-center rounded-full border border-slate-200 text-light-gray font-bold text-sm hover:bg-mars-light transition-colors">2</button>
          <button className="w-10 h-10 flex items-center justify-center rounded-full border border-slate-200 text-light-gray hover:bg-mars-light transition-colors">
            <ChevronDown className="-rotate-90" size={18} />
          </button>
        </div>
        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-light-gray">
          PAGE 1 SUR 2 - {filteredData.length} FILMS TROUVÉS
        </span>
      </div>
    </div>
  )
}

export default MovieManagement