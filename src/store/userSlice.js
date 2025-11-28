import { createSlice } from "@reduxjs/toolkit";

/**
 * userSlice
 * Manages user auth, favorites/captures (stored as `byId` maps), and trainer profile.
 * Lists use string IDs as keys for consistent localStorage serialization.
 */
const initialState = {
  isLogged: false,
  username: null,
  favorites: { byId: {} },
  captures: { byId: {} },
  fullList: [],
  loginModalOpen: false,
  trainerProfile: {
    level: 45,
    badges: 8,
    region: "Kanto",
    since: 2025,
    favoriteType: "electric",
  },
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login(state, action) {
      state.isLogged = true;
      state.username = action.payload?.username || "User";
    },
    logout(state) {
      state.isLogged = false;
      state.username = null;
    },
    openLoginModal(state) {
      state.loginModalOpen = true;
    },
    closeLoginModal(state) {
      state.loginModalOpen = false;
    },
    add(state, action) {
      const { list, id } = action.payload;
      if (!state[list]) return;
      state[list].byId[String(id)] = true;
    },
    remove(state, action) {
      const { list, id } = action.payload;
      if (!state[list]) return;
      delete state[list].byId[String(id)];
    },
    toggle(state, action) {
      const { list, id } = action.payload;
      if (!state[list]) return;
      const key = String(id);
      if (state[list].byId[key]) delete state[list].byId[key];
      else state[list].byId[key] = true;
    },
    setFullList(state, action) {
      state.fullList = action.payload;
    },
    updateTrainerProfile(state, action) {
      state.trainerProfile = {
        ...state.trainerProfile,
        ...action.payload,
      };
    },
  },
});

export const {
  login,
  logout,
  add,
  remove,
  toggle,
  setFullList,
  openLoginModal,
  closeLoginModal,
  updateTrainerProfile,
} = userSlice.actions;

// Convenience action creators for favorites and captures
export const addFavorite = (id) => add({ list: "favorites", id });
export const removeFavorite = (id) => remove({ list: "favorites", id });
export const toggleFavorite = (id) => toggle({ list: "favorites", id });

export const addCapture = (id) => add({ list: "captures", id });
export const removeCapture = (id) => remove({ list: "captures", id });
export const toggleCapture = (id) => toggle({ list: "captures", id });

/**
 * Selector helpers
 * Accept either full store (`state`) or substate (`state.user`) for flexibility.
 */
const getUserState = (state) => state?.user ?? state;

export const selectIsLogged = (state) => getUserState(state).isLogged;
export const selectUsername = (state) => getUserState(state).username;
export const selectLoginModalOpen = (state) =>
  getUserState(state).loginModalOpen;

export const selectListById = (state, list) =>
  getUserState(state)[list]?.byId ?? {};
export const isFavorite = (state, id) =>
  !!getUserState(state).favorites?.byId?.[String(id)];
export const isCaptured = (state, id) =>
  !!getUserState(state).captures?.byId?.[String(id)];

export const selectTrainerProfile = (state) =>
  getUserState(state).trainerProfile;

export default userSlice.reducer;
