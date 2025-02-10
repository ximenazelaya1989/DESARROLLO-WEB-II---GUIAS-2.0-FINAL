import React from 'react'
/** 
@param { Object } movies
@param { Function } onSelectMovie
*/

export const MovieList = ({ movies, onSelectMovie }) => {
    return (
        <ul className="list list-movies">
            {movies?.map((movie) => (
                <Movie
                    key={movie.imdbID}
                    movie={movie}
                    onSelectMovie={onSelectMovie}
                />
            ))}
        </ul>
    );
};
/** 
* @param { Object } movie
* @param { Function } onSelectMovie
*/

export const Movie = ({ movie, onSelectMovie }) => {
    return (

        <li onClick={() => onSelectMovie(movie.imdbID)}>
            <img src={movie.Poster} alt={`${movie.Title} poster`} />
            <h3>{movie.Title}</h3>
            <div>
                <p>
                    <span>⭐️</span>
                    <span>{movie.Year}</span>
                </p>

            </div>
        </li>

    );
};


