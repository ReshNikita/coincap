import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { errorSlice } from "./errorSlice";
import { themeSlice } from "./themeSlice";
import { coincapApi } from "../api/coincapApi";
import { walletSlice } from "./walletSlice";

const rootReducer = combineReducers({
  error: errorSlice.reducer,
  theme: themeSlice.reducer,
  wallet: walletSlice.reducer,
  [coincapApi.reducerPath]: coincapApi.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(coincapApi.middleware),
});
store.dispatch(walletSlice.actions.loadState());

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
