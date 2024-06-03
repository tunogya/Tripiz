import {createSlice} from "@reduxjs/toolkit";
import "react-native-get-random-values";
import elliptic from 'elliptic';

export const slice = createSlice({
  name: "account",
  initialState: {
    publicKey: "",
    privateKey: "",
  },
  reducers: {
    initialize: (state) => {
      const EC = new elliptic.ec('secp256k1');
      const keyPair = EC.genKeyPair();
      const publicKey = keyPair.getPublic(true,'hex');
      const privateKey = keyPair.getPrivate('hex');
      state.publicKey = publicKey;
      state.privateKey = privateKey;
    },
    destroy: (state) => {
      state.publicKey = ""
      state.privateKey = ""
    },
  },
});

export const {initialize, destroy} = slice.actions;

export default slice.reducer;
