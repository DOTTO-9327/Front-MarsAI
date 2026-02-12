import MovieListSection from '../components/admin/MovieListSection'
import Searchbar from '../components/admin/searchbar'
const Movie = () => {
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
            <ul className="flex items-center gap-26.5 mt-10 mb-10">
              <li>Affiche</li>
              <li>Titre</li>
              <li>Réalisateur </li>
              <li>Statut</li>
              <li>Date</li>
              <li>En avant</li>
            </ul>
          </div>
          <div>
            <MovieListSection />
            <MovieListSection />
            <MovieListSection />
            <MovieListSection />
          </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Movie
