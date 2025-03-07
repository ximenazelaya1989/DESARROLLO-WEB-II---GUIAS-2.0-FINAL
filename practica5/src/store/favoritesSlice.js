export const createFavoritesSlice = (set, get) => ({
    // Esatdo inicial una lista de favoritos
    favorites: [],

    //Funcion para verificar si una receta ya esta en favoritos
    favoriteExists: (id) => {
        return get().favorites.some(favorite => favorite.idDrink == id);
    },

    // Maneja el clic en el boton de favorito (agregar o eliminar)
    handleClickFavorite: (recipe) => {
        if (get().favoriteExists(recipe.idDrink)) {
            // Si la receta ya esta en favoritos, la eliminamos de la lista
            set((state) => ({
                favorites: state.favorites.filter(favorite => favorite.idDrink != recipe.idDrink)
            }));
        } else {
            //Si no esta en favoritos, la agregamos
            set((state) => ({
                favorites: [...state.favorites, recipe]
            }));

            state.add

        }
        //Guardamos la lista de favoritos actualizada de favorites en localStorage
        localStorage.setItem('favorites', JSON.stringify(get().favorites));
    },

    // Carga la lista de favorito desde localStorage al iniciar la aplicacion
    loadFromStorage: () => {
        const storedFavorites = localStorage.getItem('favorites');
        if (storedFavorites) {
            set({
                favorites: JSON.parse(storedFavorites)
            });
        }
    }

});