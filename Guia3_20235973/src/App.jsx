import { useEffect, useState } from "react";
import { Logo, Nav, NumResults, Search } from "./components/Nav";
import { Box } from "./components/Box";
import { MovieList } from "./components/Movie";
import { WatchedMoviesContainer, WatchedMoviesList, WatchedSummary } from
  "./components/WatchedMovie";
import { useFetchMovies } from "./hooks/useFetchMovies";
import { MovieDetails } from "./components/MovieDetails";

/**
 * Componente principal de la aplicacion
 */

export default function App() {

  function initialWatchedMovies() {
    const localStorageWatched = localStorage.getItem("watched");
    return localStorageWatched ? JSON.parse(localStorageWatched) : [];
  }

  //Estado para la busqueda de peliculas
  const [query, setQuery] = useState("");

  //Obtiene peliculas basadas de peliculas
  const { movies, isLoading, error } = useFetchMovies(query);

  //Estado de peliculas vistas
  const [watched, setWatched] = useState(initialWatchedMovies);

  //Estado para la pelicula sleccionada
  const [selectedId, setSelectedId] = useState(null);


  useEffect(() => {
    localStorage.setItem("watched", JSON.stringify(watched));
  }, [watched]);
  /**
   * Maneja la seleccion de una pelicula
   * @param {string} id - ID de la pelicula seleccionada
   */

  function handleSelectMovie(id) {
    setSelectedId(id);
  }

  /**
   * Cierra los detalles de la pelicula
   */

  function handleCloseMovie() {
    setSelectedId(null);
  }

  /**
   * Agrega una pelicula a la lista de vistas
   * @param {Object} movie - Pelicula a agregar
   */

  function handleAddWatched(movie) {
    setWatched((watched) => [...watched, movie]);
  }

  /**
   * Elimina una pelicula de la lista de vistas
   * @param {string} id - ID de la pelicula a eliminar
   */

  function handleRemoveMovie(id) {
    setWatched((watched) => watched.filter((movie) => movie.imdbID !== id));
  }

  return (
    <>
      <Nav>
        <Logo />
        <Search query={query} setQuery={setQuery} />
        <NumResults movies={movies} />
      </Nav>

      <main className="main">

        <Box>
          {isLoading && <p className="loader">Cargando...</p>}
          {error && <p className="error">⛔ {error}</p>}
          <MovieList movies={movies} onSelectMovie={handleSelectMovie} />
        </Box>

        <Box>
          <WatchedMoviesContainer>
            {selectedId ? (
              <MovieDetails
                selectedId={selectedId}
                onCloseMovie={handleCloseMovie}
                onAddWatched={handleAddWatched}
                watched={watched}
              />
            ) : (
              <>
                <WatchedSummary watched={watched} />
                <WatchedMoviesList watched={watched} onRemoveMovie={handleRemoveMovie} />
              </>
            )}
          </WatchedMoviesContainer>
        </Box>
      </main>
    </>
  );
}
