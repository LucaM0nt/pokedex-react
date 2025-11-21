import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  favorites: { byId: {} },
  captures: { byId: {} },
};

const userListsSlice = createSlice({
  name: "userLists",
  initialState,
  reducers: {
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
  },
});

export const { add, remove, toggle } = userListsSlice.actions;
// Convenience action creators to keep a clear API
export const addFavorite = (id) => add({ list: "favorites", id });
export const removeFavorite = (id) => remove({ list: "favorites", id });
export const toggleFavorite = (id) => toggle({ list: "favorites", id });

export const addCapture = (id) => add({ list: "captures", id });
export const removeCapture = (id) => remove({ list: "captures", id });
export const toggleCapture = (id) => toggle({ list: "captures", id });

// Selectors helpers
// Accept either the whole store (`state`) or the substate (`state.userLists`).
const getListsState = (state) => state?.userLists ?? state;
export const selectListById = (state, list) => getListsState(state)[list]?.byId ?? {};
export const isFavorite = (state, id) => !!getListsState(state).favorites?.byId?.[String(id)];
export const isCaptured = (state, id) => !!getListsState(state).captures?.byId?.[String(id)];

export default userListsSlice.reducer;
