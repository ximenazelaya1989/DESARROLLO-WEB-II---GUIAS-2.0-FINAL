import { devtools } from "zustand/middleware";
import { createRecipeSlice } from "./recipeSlice";
import { create } from "zustand";
import { createFavoritesSlice } from "./favoritesSlice";
import createNotificationSlice from "./notificationSlice";

export const useAppStore = create(devtools((...args) => ({
    ...createRecipeSlice(...args),
    ...createFavoritesSlice(...args),
    ...createNotificationSlice(...args)
})))
