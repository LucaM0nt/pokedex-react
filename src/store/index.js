import { configureStore } from "@reduxjs/toolkit";

import { pokeApi } from "./pokeApiSlice.js";
import userListsReducer from "./userListsSlice";

const load = (key, fallback) => {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch (e) {
    console.warn("Errore caricamento localStorage", key, e);
    return fallback;
  }
};

const preloadedState = {
  userLists: {
    favorites: { byId: load("pokedex_favorites", {}) },
    captures: { byId: load("pokedex_captures", {}) },
  },
};

export const store = configureStore({
  reducer: {
    [pokeApi.reducerPath]: pokeApi.reducer,
    userLists: userListsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(pokeApi.middleware),
  preloadedState,
});

// Persist: save only byId maps immediately when state changes
store.subscribe(() => {
  try {
    const state = store.getState();
    const lists = state.userLists ?? {};
    localStorage.setItem("pokedex_favorites", JSON.stringify(lists.favorites?.byId ?? {}));
    localStorage.setItem("pokedex_captures", JSON.stringify(lists.captures?.byId ?? {}));
  } catch (e) {
    console.warn("Impossibile salvare in localStorage", e);
  }
});
