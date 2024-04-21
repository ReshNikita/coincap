import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { ErrorProps, Nullable } from "../types/types";

type initialStateProps = {
  notification: Nullable<ErrorProps>;
};

const initialState: initialStateProps = {
  notification: null,
};

export const errorSlice = createSlice({
  name: "error",
  initialState,
  reducers: {
    showError(state, action: PayloadAction<ErrorProps>) {
      state.notification = {
        title: action.payload?.title,
        message: action.payload?.message,
      };
    },
    resetNotification(state) {
      state.notification = null;
    },
  },
});

export const { showError, resetNotification } = errorSlice.actions;
