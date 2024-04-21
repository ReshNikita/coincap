import { createSlice } from "@reduxjs/toolkit";

type initialStateType = {
  darkTheme: boolean;
};

const initialState: initialStateType = {
  darkTheme: false,
};

export const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    toggleTheme: state => {
      state.darkTheme = !state.darkTheme;
    },
  },
});

export const { toggleTheme } = themeSlice.actions;
