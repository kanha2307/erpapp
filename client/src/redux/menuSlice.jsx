// store/menuSlice.js
import { createSlice } from "@reduxjs/toolkit";

const menuSlice = createSlice({
  name: "menu",
  initialState: {
    isOpen: true, // Set initial menu state here
  },
  reducers: {
    toggleMenu: (state) => {
      state.isOpen = !state.isOpen;
    },
    openMenu: (state) => {
      state.isOpen = true;
    },
    closeMenu: (state) => {
      state.isOpen = false;
    },
  },
});

export const { toggleMenu, openMenu, closeMenu } = menuSlice.actions;
export default menuSlice.reducer;
