import { useEffect, useState } from 'react'
import CardMovie from '../components/admin/CardMovie'
import Searchbar from '../components/admin/searchbar'

const MovieManagement = () => {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const response = await fetch(`${import.meta.env.VITE_API_URL}/movie`)
        if (!response.ok) throw new Error(`Erreur HTTP : ${response.status}`)
        const result = await response.json()
        setData(result.data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  if (loading) return <p className="p-10 text-center">Chargement...</p>
  if (error) return <p className="p-10 text-red-500">Erreur : {error}</p>

  return (
    <>
      <div className="min-h-screen p-8">
        <h3 className="mb-2 text-2xl font-bold">FILMS SOUMIS</h3>
        <div className="mb-8 text-gray-500">
          Gérer l'intégralité des soumissions et gérer les mise en avant.
        </div>
        <div className="w-full rounded-[40px] bg-white p-8 shadow-sm">
          <div className="mb-10">
            <Searchbar />
          </div>

          <div className="mb-6 grid grid-cols-6 gap-4 px-6 text-xs font-bold tracking-widest text-gray-400 uppercase">
            <div>Affiche</div>
            <div>Titre</div>
            <div>Réalisateur</div>
            <div className="text-center">Statut</div>
            <div className="text-center">Date</div>
            <div className="text-center">En avant</div>
          </div>

          <section className="flex flex-col gap-4">
            {data.map((movie) => (
              <CardMovie
                key={movie.id}
                cover_image={movie.cover_image}
                original_title={movie.original_title}
                submitted_at={movie.submitted_at}
                firstname={movie.firstname}
                lastname={movie.lastname}
                status={movie.status}
              />
            ))}
          </section>
        </div>
      </div>
    </>
  )
}

export default MovieManagement
