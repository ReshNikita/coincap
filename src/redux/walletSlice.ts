import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { CurrencyCountType } from "../types";

type initialStateType = {
  currencies: CurrencyCountType[];
  totalQuantity: number;
};
const initialState: initialStateType = {
  currencies: JSON.parse(localStorage.getItem("currencies") as string) || [],
  totalQuantity:
    JSON.parse(localStorage.getItem("totalQuantity") as string) || 0,
};

export const walletSlice = createSlice({
  name: "wallet",
  initialState,
  reducers: {
    addCrypto: (state, action: PayloadAction<CurrencyCountType>) => {
      const { key, amount, total } = action.payload;
      const existingCurrencyIdx = state.currencies.findIndex(
        currency => currency.key === key
      );
      if (existingCurrencyIdx !== -1) {
        state.currencies[existingCurrencyIdx].amount += amount;
        state.currencies[existingCurrencyIdx].total += total;
      } else {
        state.currencies.push(action.payload);
      }
      state.totalQuantity = state.currencies.reduce(
        (acc, item) => acc + item.total,
        0
      );
    },
    removeCrypto: (state, action: PayloadAction<CurrencyCountType>) => {
      const deletedItem = state.currencies.filter(
        currency => currency.total === action.payload.total
      )[0];
      state.totalQuantity -= deletedItem.total;
      state.currencies = state.currencies.filter(
        currency => currency.name !== action.payload.name
      );
      if (state.currencies.length === 0) {
        state.totalQuantity = 0;
      }
    },
    saveState: state => {
      localStorage.setItem("currencies", JSON.stringify(state.currencies));
      localStorage.setItem(
        "totalQuantity",
        JSON.stringify(state.totalQuantity)
      );
    },
    loadState: state => {
      const savedCurrencies = localStorage.getItem("currencies");
      const savedTotalQuantity = localStorage.getItem("totalQuantity");

      if (savedCurrencies && savedTotalQuantity) {
        state.currencies = JSON.parse(savedCurrencies);
        state.totalQuantity = Number(savedTotalQuantity);
      }
    },
  },
});

export const { addCrypto, removeCrypto, saveState, loadState } =
  walletSlice.actions;
