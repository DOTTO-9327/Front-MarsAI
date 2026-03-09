import { useEffect, useState } from 'react'
import CardMovie from '../components/admin/CardMovie'
import Searchbar from '../components/admin/searchbar'
import { Filter, Inbox, ListOrdered } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import BtnPagination from '../components/ui/BtnPagination'
import ScrollToTop from '../components/ScrollToTop'

const MovieManagement = () => {
  const [data, setData] = useState([])
  const [paginationInfo, setPaginationInfo] = useState(null) // Stocke les infos totalItems, from, to...
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const { token } = useAuth()

  const [currentFilter, setCurrentFilter] = useState('TOUT')
  const [page, setPage] = useState(1)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/movie?page=${page}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        )
        if (!response.ok) throw new Error(`Erreur HTTP : ${response.status}`)

        const result = await response.json()

        setData(result.data || [])
        setPaginationInfo(result.pagination || null)

      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [token, page])

  const filteredData = data.filter((movie) => {
    if (currentFilter === 'TOUT') return true
    const status = movie.status?.toUpperCase()

    if (currentFilter === 'EN ATTENTE') return status === 'PENDING' || status === 'EN ATTENTE'
    if (currentFilter === 'VALIDÉ') return status === 'APPROVED' || status === 'VALIDÉ'
    if (currentFilter === 'REFUSÉ') return status === 'REJECTED' || status === 'REFUSÉ'
    if (currentFilter === 'À MODIFIER') return status === 'CHANGES_REQUESTED' || status === 'À MODIFIER'

    return true
  })

  if (loading) return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
        <p className="text-[10px] font-black tracking-widest text-primary uppercase">Chargement des films...</p>
      </div>
    </div>
  )

  if (error) return (
    <div className="p-20 text-center font-black text-red-500 uppercase tracking-widest">
      ❌ Erreur : {error}
    </div>
  )

  const filterOptions = ['TOUT', 'EN ATTENTE', 'À MODIFIER', 'VALIDÉ', 'REFUSÉ']

  return (
    <div className="min-h-screen py-6">
      {/* HEADER PAGE */}
      <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h3 className="text-6xl font-black tracking-tighter uppercase italic leading-none">
            FILMS SOUMIS
          </h3>
          <p className="text-slate-400 mt-4 max-w-xl text-lg font-medium leading-tight">
            Gérer l'intégralité des soumissions, modérer les contenus et gérer les mises en avant.
          </p>
        </div>

        {/* Résumé global (Nombre Total) */}
        {paginationInfo && (
          <div className="bg-mars-dark text-white px-8 py-4 rounded-4xl shadow-xl flex items-center gap-4">
            <Inbox className="text-primary" size={24} />
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest opacity-60">Total Base</p>
              <p className="text-2xl font-black italic">{paginationInfo.totalItems} Films</p>
            </div>
          </div>
        )}
      </div>

      {/* Barre de Filtres */}
      <div className="mb-8 flex flex-wrap items-center gap-3">
        <div className="text-slate-400 mr-2 flex items-center gap-2">
          <Filter size={14} />
          <span className="text-[10px] font-black tracking-widest uppercase">Filtres :</span>
        </div>

        {filterOptions.map((filter) => {
          const isActive = currentFilter === filter
          let colorClass = "bg-primary border-primary"
          if (filter === 'EN ATTENTE') colorClass = "bg-orange-500 border-orange-500"
          if (filter === 'VALIDÉ') colorClass = "bg-green-500 border-green-500"
          if (filter === 'À MODIFIER') colorClass = "bg-blue-500 border-blue-500"
          if (filter === 'REFUSÉ') colorClass = "bg-red-500 border-red-500"

          return (
            <button
              key={filter}
              onClick={() => { setCurrentFilter(filter); setPage(1); }} // Reset page quand on filtre
              className={`rounded-2xl border-2 px-6 py-2.5 text-[10px] font-black tracking-widest uppercase transition-all shadow-sm ${isActive ? `${colorClass} text-white shadow-lg scale-105` : 'border-slate-100 bg-white text-slate-400 hover:border-slate-300'
                }`}
            >
              {filter}
            </button>
          )
        })}
      </div>

      <div className="w-full rounded-[3rem] bg-white p-10 shadow-sm border border-slate-100">
        <div className="mb-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="w-full max-w-md">
            <Searchbar />
          </div>

          {/* STATISTIQUES DE LA VUE ACTUELLE */}
          {paginationInfo && (
            <div className="flex items-center gap-4 text-slate-400">
              <ListOrdered size={16} />
              <span className="text-[10px] font-black tracking-widest uppercase">
                Affichage : <span className="text-mars-dark">{paginationInfo.from}-{paginationInfo.to}</span> sur <span className="text-primary">{paginationInfo.totalItems}</span>
              </span>
            </div>
          )}
        </div>

        {/* Header de la liste */}
        <div className="mb-8 grid grid-cols-6 gap-4 px-8 text-[10px] font-black tracking-[0.2em] text-slate-300 uppercase">
          <div>Affiche</div>
          <div className="col-span-2">Titre & Réalisateur</div>
          <div className="text-center">Statut</div>
          <div className="text-center">Date</div>
          <div className="text-center">Action</div>
        </div>

        {/* Liste filtrée */}
        <section className="flex flex-col gap-4">
          {filteredData.length > 0 ? (
            filteredData.map((movie) => (
              <CardMovie
                key={movie.id}
                {...movie} // On passe tout l'objet
              />
            ))
          ) : (
            <div className="bg-slate-50 rounded-[2.5rem] border-2 border-dashed border-slate-100 py-24 text-center">
              <p className="text-slate-400 font-black uppercase tracking-widest italic">
                Aucun film trouvé dans cette sélection
              </p>
            </div>
          )}
        </section>

        {/* SYSTÈME DE PAGINATION CORRIGÉ */}
        {paginationInfo && (
          <BtnPagination
            page={page}
            onPageChange={(newPage) => setPage(newPage)}
            totalPages={paginationInfo?.totalPages}
            totalItems={paginationInfo?.totalItems}
            from={paginationInfo?.from}
            to={paginationInfo?.to}
          />
        )}
      </div>

      <ScrollToTop />
    </div>
  )
}

export default MovieManagement