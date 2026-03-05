import { useEffect, useState } from 'react'
import CardMovie from '../components/admin/CardMovie'
import Searchbar from '../components/admin/searchbar'
import { Filter } from 'lucide-react'
import { useAuth } from '../context/AuthContext' // <-- N'oubliez pas l'auth si votre route est protégée
import BtnPagination from '../components/ui/BtnPagination'
import ScrollToTop from '../components/ScrollToTop'

const MovieManagement = () => {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const { token } = useAuth() // Optionnel : à utiliser dans le fetch si besoin

  // État pour le filtre avec le nouveau statut
  const [currentFilter, setCurrentFilter] = useState('TOUT')

  const [page, setPage] = useState(1)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        // Ajout du token si l'API est sécurisée
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/movie?page=${page}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        )
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
  }, [token, page])

  // Logique de filtrage mise à jour avec "CHANGES_REQUESTED"
  const filteredData = data.filter((movie) => {
    if (currentFilter === 'TOUT') return true

    const status = movie.status?.toUpperCase()

    if (currentFilter === 'EN ATTENTE')
      return status === 'PENDING' || status === 'EN ATTENTE'
    if (currentFilter === 'VALIDÉ')
      return status === 'APPROVED' || status === 'VALIDÉ'
    if (currentFilter === 'REFUSÉ')
      return status === 'REJECTED' || status === 'REFUSÉ'
    if (currentFilter === 'À MODIFIER')
      return status === 'CHANGES_REQUESTED' || status === 'À MODIFIER'

    return true
  })

  if (loading)
    return (
      <p className="text-primary animate-pulse p-10 text-center font-bold">
        Chargement...
      </p>
    )
  if (error)
    return (
      <p className="p-10 text-center font-bold text-red-500">
        Erreur : {error}
      </p>
    )

  // Liste des options de filtres
  const filterOptions = ['TOUT', 'EN ATTENTE', 'À MODIFIER', 'VALIDÉ', 'REFUSÉ']

  return (
    <div className="min-h-screen py-6">
      <h3 className="mb-4 text-5xl font-black tracking-tighter uppercase">
        FILMS SOUMIS
      </h3>
      <p className="text-light-gray mb-10 max-w-2xl text-lg leading-snug font-medium">
        Gérer l'intégralité des soumissions et gérer les mises en avant.
      </p>

      {/* Barre de Filtres avec couleurs dynamiques */}
      <div className="mb-8 flex flex-wrap items-center gap-3">
        <div className="text-light-gray mr-2 flex items-center gap-2">
          <Filter size={16} />
          <span className="text-[10px] font-black tracking-widest uppercase">
            Filtrer :
          </span>
        </div>

        {filterOptions.map((filter) => {
          // Attribution d'une couleur spécifique pour le badge actif
          let activeStyle = 'bg-primary border-primary text-white shadow-lg'
          if (filter === 'EN ATTENTE')
            activeStyle = 'bg-orange-500 border-orange-500 text-white shadow-lg'
          if (filter === 'VALIDÉ')
            activeStyle = 'bg-green-500 border-green-500 text-white shadow-lg'
          if (filter === 'À MODIFIER')
            activeStyle = 'bg-blue-500 border-blue-500 text-white shadow-lg'
          if (filter === 'REFUSÉ')
            activeStyle = 'bg-red-500 border-red-500 text-white shadow-lg'

          const isActive = currentFilter === filter

          return (
            <button
              key={filter}
              onClick={() => setCurrentFilter(filter)}
              className={`rounded-xl border-2 px-6 py-2 text-[11px] font-black tracking-widest transition-all ${
                isActive
                  ? activeStyle
                  : 'text-light-gray border-gray-100 bg-white hover:border-gray-300 hover:text-gray-700'
              }`}
            >
              {filter}
            </button>
          )
        })}
      </div>

      <div className="w-full rounded-[40px] bg-white p-8 shadow-sm">
        <div className="mb-10 flex items-center justify-between gap-4">
          <div className="flex-1">
            <Searchbar />
          </div>
          <div className="text-light-gray px-4 text-[10px] font-black tracking-widest uppercase">
            {filteredData.length} Film(s) trouvé(s)
          </div>
        </div>

        {/* Header de la liste */}
        <div className="mb-6 grid grid-cols-6 gap-4 px-6 text-[10px] font-black tracking-[0.2em] text-gray-400 uppercase">
          <div>Affiche</div>
          <div className="col-span-2">Titre & Réalisateur</div>{' '}
          {/* Fusion pour plus de place */}
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
            <div className="text-light-gray rounded-3xl border-2 border-dashed border-gray-50 py-20 text-center font-bold italic">
              Aucun film ne correspond à ce filtre.
            </div>
          )}
        </section>
      </div>

      {/* SYSTÈME DE PAGINATION */}
      <BtnPagination
        page={page}
        onPageChange={(newPage) => {
          setPage(newPage)
        }}
        totalInPage={data.length}
      />
      <ScrollToTop />
    </div>
  )
}

export default MovieManagement
