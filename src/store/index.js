import { configureStore } from "@reduxjs/toolkit";

import { pokeApi } from "./pokeApiSlice.js";
import userReducer from "./userSlice";

// Funzione helper per leggere localStorage
const load = (key, fallback) => {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch (e) {
    console.warn("localStorage loading error", key, e);
    return fallback;
  }
};

// Preloaded state
const preloadedState = {
  user: {
    isLogged: false,
    username: null,
    favorites: { byId: load("pokedex_favorites", {}) },
    captures: { byId: load("pokedex_captures", {}) },
  },
};

export const store = configureStore({
  reducer: {
    [pokeApi.reducerPath]: pokeApi.reducer,
    user: userReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(pokeApi.middleware),
  preloadedState,
});

// Persist: salva solo le mappe byId su localStorage
store.subscribe(() => {
  try {
    const state = store.getState();
    const lists = state.user ?? {};
    localStorage.setItem(
      "pokedex_favorites",
      JSON.stringify(lists.favorites?.byId ?? {})
    );
    localStorage.setItem(
      "pokedex_captures",
      JSON.stringify(lists.captures?.byId ?? {})
    );
  } catch (e) {
    console.warn("Unable to save to localStorage", e);
  }
});
