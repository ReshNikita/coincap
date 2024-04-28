import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type CurrencyCountType = {
  key: string;
  amount: number;
  total: number;
  name: string;
  id?: string;
  count?: number;
  price: string;
};

type initialStateType = {
  currencies: CurrencyCountType[];
  totalQuantity: number;
};

const initialState: initialStateType = {
  currencies: [],
  totalQuantity: 0,
};

type AddCryptoPayloadType = {
  name: string;
  key: string;
  amount: number;
  total: number;
  price: string;
};

export const walletSlice = createSlice({
  name: "wallet",
  initialState,
  reducers: {
    addCrypto: (state, action: PayloadAction<AddCryptoPayloadType>) => {
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
    removeCrypto: (state, action) => {
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
  },
});

export const { addCrypto, removeCrypto } = walletSlice.actions;

/*
const deletedItem = state.items.filter((i) => i.id === action.payload)[0];
state.totalPrice -= Math.round(+deletedItem.priceUsd * 100 * deletedItem.count) / 100;
*/
