import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLogged: false,
  username: null,
  favorites: { byId: {} },
  captures: { byId: {} },
  fullList: [],
  loginModalOpen: false,
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
} = userSlice.actions;

// Convenience action creators to keep a clear API
export const addFavorite = (id) => add({ list: "favorites", id });
export const removeFavorite = (id) => remove({ list: "favorites", id });
export const toggleFavorite = (id) => toggle({ list: "favorites", id });

export const addCapture = (id) => add({ list: "captures", id });
export const removeCapture = (id) => remove({ list: "captures", id });
export const toggleCapture = (id) => toggle({ list: "captures", id });

// Selectors helpers
// Accept either the whole store (`state`) or the substate (`state.user`).
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

export default userSlice.reducer;
