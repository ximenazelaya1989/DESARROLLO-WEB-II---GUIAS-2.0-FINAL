import { useEffect, useState } from "react";
import { useFetchMovieDetails } from '../hooks/useFetchMovieDetails';
import StarRating from "./StarRating";

/**
 * Componente que muestra los detalles de una pelicula y permite al usuario calificarla y agregarla a su lista de vistas
 * @param {Object} props
 * @param {string} props.selectedId - ID de la pelicula seleccionada
 * @param {Function} props.onCloseMovie - Funncion para cerrar los detalles de la pelicula
 * @param {Function} props.onAddWatched - Funcion para agregar la pelicula a la lista de vistas
 * @param {Array} props.watched- Lista de peliculas ya vistas
 */

export const MovieDetails = ({ selectedId, onCloseMovie, onAddWatched, watched }) => {

    //Hook personalizado para obtener los detalles de la pelicula
    const { movie, error, isLoading } = useFetchMovieDetails(selectedId);

    //Extraemos la informacion relevante de la pelicula
    const {
        Title: title,
        Year: year,
        Poster: poster,
        Runtime: runtime,
        imdbRating,
        Plot: plot,
        Released: released,
        Actors: actors,
        Director: director,
        Genre: genre,

    } = movie;

    //Estado para la calificacion del usuario
    const [userRating, setUserRating] = useState('');

    //Verifica si la pelicula ya esta en la lista de vistas
    const isWatched = watched.some(movie => movie.imdbID === selectedId);

    //Obtiene la calificiacion previa del usuario si ya la ha visto
    const watchedUserRating = watched.find(movie => movie.imdbID === selectedId)?.userRating;

    /**
     * Maneja la adicion de una pelicula a la lista de vistas
     */

    function handleAdd() {
        const newMovie = {
            imdbID: selectedId,
            title,
            year,
            poster,
            imdbRating: Number(imdbRating),
            runtime: Number(runtime.split(" ")[0]), //Extrae solo el numero de mins
            userRating
        };
        onAddWatched(newMovie);
        onCloseMovie(); // Cierra los detalles despues de pagar
    }

    return (
        <div className="details">
            {isLoading ? (
                <p className="loader">Cargando...</p>
            ) : (
                <>
                    <header>
                        <button className="btn-back" onClick={onCloseMovie}>
                            &larr;
                        </button>
                        <img src={poster} alt={`Poster de ${title}`} />
                        <div className="details-overview">
                            <h2>{title}</h2>
                            <p>{released} &bull; {runtime}</p>
                            <p>{genre}</p>
                            <p><span>⭐</span>{imdbRating} IMDB rating</p>
                        </div>
                    </header>
                    <section>
                        <div className="rating">
                            {!isWatched ? (
                                <>
                                    {/**Calificacion con estrellas */}
                                    <StarRating maxRating={10} size={18} onSetRating={setUserRating} />

                                    {userRating > 0 && (
                                        <button className="btn-add" onClick={handleAdd}>
                                            + Agregar a la lista
                                        </button>
                                    )}
                                </>
                            ) : (
                                <p>Has calificado esta pelicula con {watchedUserRating} ⭐</p>
                            )}

                        </div>
                        <p><em>{plot}</em></p>
                        <p><b>Elenco:</b>{actors}</p>
                        <p><b>Director:</b>{director}</p>
                    </section>
                </>
            )}
        </div >
    );
};