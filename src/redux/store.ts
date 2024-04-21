import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { errorSlice } from "./errorSlice";
import { themeSlice } from "./themeSlice";

const rootReducer = combineReducers({
  error: errorSlice.reducer,
  theme: themeSlice.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
