import { useEffect, useState } from 'react'
import MovieListSection from '../components/admin/MovieListSection'
import Searchbar from '../components/admin/searchbar'
const Movie = () => {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const response = await fetch(`${import.meta.env.VITE_API_URL}/movie`)

        if (!response.ok) {
          throw new Error(`Erreur HTTP : ${response.status}`)
        }

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

  if (loading) return <p>Chargement...</p>
  if (error) return <p>Erreur : {error}</p>
  return (
    <>
      <div>
        <h3> FILMS SOUMIS</h3>
        <div className="">
          <div>
            Gérer l'intégralité des soumissions et gérer les mise en avant.
          </div>
          <div>
            <div>
              <Searchbar />
            </div>
            <div>
              <ul className="mt-10 mb-10 flex items-center gap-26.5">
                <li>Affiche</li>
                <li>Titre</li>
                <li>Réalisateur </li>
                <li>Statut</li>
                <li>Date</li>
                <li>En avant</li>
              </ul>
            </div>
            <div>
              <section className="movie-list">
                {data.map((movie) => (
                  <MovieListSection
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
        </div>
      </div>
    </>
  )
}

export default Movie

