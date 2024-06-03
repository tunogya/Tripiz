import {createSlice} from "@reduxjs/toolkit";
import {bech32} from 'bech32';
import "react-native-get-random-values";
import elliptic from 'elliptic';
import {RootState} from "../../store/store";
import { Buffer } from 'buffer';

function encodeKey(prefix: string, key: string) {
  const words = bech32.toWords(Buffer.from(key, 'hex'));
  return bech32.encode(prefix, words);
}

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

export const selectNostrPublicKey = (state: RootState) => encodeKey("npub", state.account.publicKey);
export const selectNostrPrivateKey = (state: RootState) => encodeKey("nsec", state.account.privateKey);

export default slice.reducer;
