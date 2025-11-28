import { configureStore } from "@reduxjs/toolkit";

import { pokeApi } from "./pokeApiSlice.js";
import userReducer from "./userSlice";

/**
 * load
 * Helper to safely read and parse from localStorage.
 */
const load = (key, fallback) => {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch (e) {
    console.warn("localStorage loading error", key, e);
    return fallback;
  }
};

// Preloaded state from localStorage
const preloadedState = {
  user: {
    isLogged: false,
    username: null,
    favorites: { byId: load("pokedex_favorites", {}) },
    captures: { byId: load("pokedex_captures", {}) },
    loginModalOpen: false,
    trainerProfile: {
      level: 45,
      badges: 8,
      region: "Kanto",
      since: 2025,
      favoriteType: "electric",
    },
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

/**
 * Persist favorites and captures to localStorage on every state change.
 * Only saves the `byId` maps to avoid storing large lists.
 */
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
