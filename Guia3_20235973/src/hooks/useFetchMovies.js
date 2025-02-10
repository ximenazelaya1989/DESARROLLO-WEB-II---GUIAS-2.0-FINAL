import { useEffect, useState } from "react";

export const API_KEY = "87ed132f"

/**
 * Hook personalizado para obtener peliculas desde la API de OMDb
 * @param {string} query - Termino de busqueda ingresado por el usuario
 * @returns {Object} - Retorna un objeto con:
* - movies: Lista de películas encontradas.
* - isLoading: Estado de carga de la solicitud.
* - error: Mensaje de error en caso de fallo.

 */

export function useFetchMovies(query) {

    const [movies, setMovies] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {

        if (query.length < 3) {
            setMovies([]);
            setError("");
            return;
        }
        /**
        * Función asincrónica que obtiene las películas de la API.
        */

        async function fetchMovies() {

            try {
                setIsLoading(true);
                setError(null);

                const response = await fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&s=${query}`);

                if (!response.ok)
                    throw new Error("Error al cargar peliculas");

                const data = await response.json();

                if (data.Response === "False")
                    throw new Error("No se encontraron resultados");

                setMovies(data.Search);
            } catch (err) {
                setError(err.message);
                setMovies([]);

            } finally {
                setIsLoading(false);
            }

        }

        fetchMovies();

    }, [query]);

    return { movies, isLoading, error };
}