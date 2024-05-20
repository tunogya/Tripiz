import { createSlice } from "@reduxjs/toolkit";
import "react-native-get-random-values"
import "@ethersproject/shims"
import { ethers } from "ethers";

export const slice = createSlice({
  name: "user",
  initialState: {
    address: "",
    privateKey: "",
  },
  reducers: {
    initialize: (state) => {
      const wallet = ethers.Wallet.createRandom();
      state.address = wallet.address
      state.privateKey = wallet.privateKey
    },
    destroy: (state) => {
      state.address = ""
      state.privateKey = ""
    }
  },
});

export const { initialize, destroy } = slice.actions;

export default slice.reducer;
