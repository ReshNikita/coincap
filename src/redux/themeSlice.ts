import { createSlice } from "@reduxjs/toolkit";

type initialStateType = {
  darkTheme: boolean;
};
const initialState: initialStateType = {
  darkTheme: localStorage.getItem("darkMode") === "true",
};

export const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    toggleTheme: state => {
      state.darkTheme = !state.darkTheme;
      localStorage.setItem("darkMode", state.darkTheme.toString());
    },
  },
});

export const { toggleTheme } = themeSlice.actions;
