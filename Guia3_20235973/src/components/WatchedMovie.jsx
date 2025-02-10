import React from 'react'

export function WatchedMoviesContainer({ children }) {
    return <>{children}</>;
}

export function WatchedMoviesList({ watched, onRemoveMovie}) {
    return (

        <ul className="list">
            {watched.map((movie) => (
                <WatchedMovie
                    movie={movie}
                    key={movie.imdbID}
                    onRemoveMovie={onRemoveMovie} />
            ))}
        </ul>
    );
}

export function WatchedMovie({ movie, onRemoveMovie }) {
    return (
        <li>
            <img src={movie.poster} alt={`${movie.title} poster`} />
            <h3>{movie.title}</h3>
            <div>
                <p>
                    <span>⭐️</span>
                    <span>{movie.imdbRating}</span>
                </p>
                <p>
                    <span>🌟</span>
                    <span>{movie.userRating}</span>
                </p>
                <p>
                    <span>⏳</span>
                    <span>{movie.runtime} min</span>
                </p>
                <button className="btn-delete" onClick={()=> onRemoveMovie(movie.imdbID)}>X</button>
            </div>
        </li>
    );
}

/**
 * Calcula el promedio de un arreglo de numeros
 * @param {number[]} arr -- Arreglo de valores numericos
 * @returns {number} Promedio de los valores
 */


const calculateAverage = (arr) =>
    arr.length ? arr.reduce((acc, cur) => acc + cur, 0) / arr.length : 0;


export function WatchedSummary({ watched }) {

    const avgImdbRating = calculateAverage(watched.map((movie) => movie.imdbRating));
    const avgUserRating = calculateAverage(watched.map((movie) => movie.userRating));
    const avgRuntime = calculateAverage(watched.map((movie) => movie.runtime));
    return (
        <div className="summary">
            <h2>Peliculas que has visto</h2>
            <div>
                <p>
                    <span>#️⃣</span>
                    <span>{watched.length} peliculas</span>
                </p>
                <p>
                    <span>⭐</span>
                    <span>{avgImdbRating.toFixed(2)}</span>
                </p>
                <p>
                    <span>�</span>
                    <span>{avgUserRating.toFixed(2)}</span>
                </p>
                <p>
                    <span>⏳</span>
                    <span>{avgRuntime.toFixed(2)} min</span>
                </p>
            </div>
        </div>
    );
}

