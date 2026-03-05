import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import FilmCard from '../components/ui/FilmCard'
import { Loader2, ArrowLeft, ChevronDown } from 'lucide-react'
import BtnPagination from '../components/ui/BtnPagination'
import ScrollToTop from '../components/ScrollToTop'

const MovieGallery = () => {
  const { t } = useTranslation('galerie')
  const navigate = useNavigate()

  const [films, setFilms] = useState([])
  const [filteredFilms, setFilteredFilms] = useState([])
  const [loading, setLoading] = useState(true)

  // États pour les filtres
  const [selectedTypeIA, setSelectedTypeIA] = useState('')
  const [selectedPays, setSelectedPays] = useState('')

  const [page, setPage] = useState(1)

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        setLoading(true)
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/movie?page=${page}`
        )
        const result = await response.json()

        const validated = result.data.filter(
          (f) =>
            f.status?.toUpperCase() === 'VALIDÉ' ||
            f.status?.toUpperCase() === 'APPROVED'
        )

        setFilms(validated)
        setFilteredFilms(validated)
      } catch (error) {
        console.error('Erreur Galerie:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchGallery()
  }, [page])

  useEffect(() => {
    let temp = films

    if (selectedTypeIA) {
      temp = temp.filter((f) => f.ia_tools?.includes(selectedTypeIA))
    }
    if (selectedPays) {
      temp = temp.filter((f) => f.original_language === selectedPays)
    }

    setFilteredFilms(temp)
  }, [selectedTypeIA, selectedPays, films])

  const typeIAOptions = [
    ...new Set(
      films.flatMap((f) =>
        f.ia_tools ? f.ia_tools.split(',').map((t) => t.trim()) : []
      )
    ),
  ]
  const paysOptions = [...new Set(films.map((f) => f.original_language))]

  return (
    <div className="min-h-screen bg-white py-16">
      <div className="mx-auto max-w-6xl px-6">
        {/* Bouton Retour */}
        <button
          onClick={() => navigate('/')}
          className="text-md group text-primary mb-12 flex cursor-pointer items-center gap-2 font-bold tracking-widest uppercase transition-all"
        >
          <ArrowLeft className="h-6 w-6 transition-transform group-hover:-translate-x-2" />
          <span className="after:bg-primary relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:transition-all group-hover:after:w-full">
            {t('header.button')}
          </span>
        </button>

        {/* Titre de la Galerie */}
        <div className="mb-12">
          <h2 className="text-mars-dark mb-6">
            {t('header.blackTittle')} <br />
            <span className="text-accent">{t('header.orangeTittle')}</span>
          </h2>
          <p className="text-mars-dark max-w-2xl text-lg leading-snug font-light">
            {t('header.description')}
          </p>
        </div>

        {/* Barre de Filtres */}
        <div className="mb-16 grid grid-cols-1 gap-4 md:grid-cols-3">
          <div className="relative">
            <select
              onChange={(e) => setSelectedTypeIA(e.target.value)}
              className="bg-mars-light text-light-gray focus:ring-primary/20 w-full cursor-pointer appearance-none rounded-xl border-none px-6 py-4 text-sm font-bold outline-none focus:ring-2"
            >
              <option value="">{t('header.filterIA')}</option>
              {typeIAOptions.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
            <ChevronDown
              className="text-light-gray pointer-events-none absolute top-1/2 right-4 -translate-y-1/2"
              size={18}
            />
          </div>

          <div className="relative">
            <select
              onChange={(e) => setSelectedPays(e.target.value)}
              className="bg-mars-light text-light-gray focus:ring-primary/20 w-full cursor-pointer appearance-none rounded-xl border-none px-6 py-4 text-sm font-bold outline-none focus:ring-2"
            >
              <option value="">{t('header.filterCountry')}</option>
              {paysOptions.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
            <ChevronDown
              className="text-light-gray pointer-events-none absolute top-1/2 right-4 -translate-y-1/2"
              size={18}
            />
          </div>
        </div>

        {/* Grille de Films */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-40">
            <Loader2 className="text-primary h-12 w-12 animate-spin" />
          </div>
        ) : (
          <>
            <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-3">
              {filteredFilms.map((film) => (
                <FilmCard
                  key={film.id}
                  title={film.original_title}
                  director={`${film.firstname} ${film.lastname}`}
                  country={film.original_language || 'FR'}
                  thumbnail={film.cover_image}
                  tags={
                    film.ia_tools
                      ? film.ia_tools.split(',').slice(0, 2)
                      : ['AI']
                  }
                  onClick={() => {
                    const slug = film.original_title
                      .toLowerCase()
                      .trim()
                      .normalize('NFD')
                      .replace(/[\u0300-\u036f]/g, '')
                      .replace(/[^\w\s-]/g, '')
                      .replace(/[\s_-]+/g, '-')
                      .replace(/^-+|-+$/g, '')

                    navigate(`/movie/${slug}`, {
                      state: { movieId: film.id },
                    })
                  }}
                />
              ))}
            </div>

            {/* Pagination */}

            <BtnPagination
              page={page}
              onPageChange={(newPage) => {
                setPage(newPage)
              }}
              totalInPage={films.length}
            />
            <ScrollToTop />
          </>
        )}
      </div>
    </div>
  )
}

export default MovieGallery
