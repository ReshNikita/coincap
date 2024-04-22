import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { errorSlice } from "./errorSlice";
import { themeSlice } from "./themeSlice";
import { coincapApi } from "../api/coincapApi";

const rootReducer = combineReducers({
  error: errorSlice.reducer,
  theme: themeSlice.reducer,
  [coincapApi.reducerPath]: coincapApi.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(coincapApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
