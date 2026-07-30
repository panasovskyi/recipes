import { configureStore } from "@reduxjs/toolkit";
import { authSlice, recipeSlice } from "./slices/index";

export const store = configureStore({
  reducer: {
    recipes: recipeSlice,
    auth: authSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
