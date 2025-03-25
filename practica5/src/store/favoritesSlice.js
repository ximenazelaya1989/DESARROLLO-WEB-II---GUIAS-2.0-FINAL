export const createFavoritesSlice = (set, get) => ({
    // Estado inicial una lista de favoritos
    favorites: [],

    //Funcion para verificar si una receta ya esta en favoritos
    favoriteExists: (id) => {
        return get().favorites.some(favorite => favorite.idDrink == id);
    },

    handleClickFavorite: (recipe) => {
        const addNotification = get().addNotification;


        if (get().favoriteExists(recipe.idDrink)) {

            set((state) => ({
                favorites: state.favorites.filter((favorite) => favorite.idDrink != recipe.idDrink)
            }));
            addNotification("Bebida eliminada de favoritos", "error");
        } else {

            set((state) => ({
                favorites: [...state.favorites, recipe]
            }));
            addNotification("Bebida agregada a favoritos", "success");
        }
        
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