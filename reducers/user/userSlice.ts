import { createSlice } from "@reduxjs/toolkit";
import "react-native-get-random-values"
import "@ethersproject/shims"
import { ethers } from "ethers";

export const slice = createSlice({
  name: "user",
  initialState: {
    address: "",
    publicKey: "",
    privateKey: "",
  },
  reducers: {
    initialize: (state) => {
      const wallet = ethers.Wallet.createRandom();
      state.address = wallet.address
      state.publicKey = wallet.publicKey
      state.privateKey = wallet.privateKey
    },
    destroy: (state) => {
      state.address = ""
      state.publicKey = ""
      state.privateKey = ""
    }
  },
});

export const { initialize, destroy } = slice.actions;

export default slice.reducer;
