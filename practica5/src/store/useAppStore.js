import { devtools } from "zustand/middleware";
import { createRecipeSlice } from "./recipeSlice";
import { create } from "zustand";
import { createFavoritesSlice } from "./favoritesSlice";

export const useAppStore = create(devtools((...args) => ({
    ...createRecipeSlice(...args),
    ...createFavoritesSlice(...args)
})))