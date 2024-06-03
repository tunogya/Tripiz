import {createSlice} from "@reduxjs/toolkit";
import {bech32} from 'bech32';
import "react-native-get-random-values";
import elliptic from 'elliptic';
import {RootState} from "../../store/store";
import {Buffer} from 'buffer';

function encodeKey(prefix: string, key: string) {
  const words = bech32.toWords(Buffer.from(key, 'hex'));
  return bech32.encode(prefix, words);
}

export const slice = createSlice({
  name: "account",
  initialState: {
    privateKey: "",
  },
  reducers: {
    initialize: (state) => {
      const EC = new elliptic.ec('secp256k1');
      const keyPair = EC.genKeyPair();
      state.privateKey = keyPair.getPrivate('hex');
    },
    destroy: (state) => {
      state.privateKey = ""
    },
  },
});

export const {initialize, destroy} = slice.actions;

export const selectPublicKey = (state: RootState) => {
  const privateKey = state.account.privateKey;
  if (!privateKey) {
    return "";
  }
  const keyPair = new elliptic.ec('secp256k1').keyFromPrivate(Buffer.from(privateKey, 'hex'));
  return keyPair.getPublic(true, 'hex');
};

export const selectNostrPublicKey = (state: RootState) => {
  if (!state.account.privateKey) {
    return "";
  }
  const keyPair = new elliptic.ec('secp256k1').keyFromPrivate(Buffer.from(state.account.privateKey, 'hex'));
  const publicKey = keyPair.getPublic(true, 'hex');
  return encodeKey("npub", publicKey)
};

export const selectNostrPrivateKey = (state: RootState) => encodeKey("nsec", state.account.privateKey);

export default slice.reducer;
