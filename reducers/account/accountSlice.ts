import { createSlice } from "@reduxjs/toolkit";
import "react-native-get-random-values";
import elliptic from "elliptic";
import { RootState } from "../../store/store";
import { Buffer } from "buffer";
import { encodeKey } from "../../utils/nostrUtil";
import { getPubkey } from "../../utils/getPubkey";

export const slice = createSlice({
  name: "account",
  initialState: {
    privateKey: "",
  },
  reducers: {
    initialize: (state) => {
      const EC = new elliptic.ec("secp256k1");
      const keyPair = EC.genKeyPair();
      state.privateKey = keyPair.getPrivate("hex");
    },
    recovery: (state, action) => {
      state.privateKey = action.payload;
    },
  },
});

export const { initialize, recovery } = slice.actions;

export const selectPublicKey = (state: RootState) => {
  const privateKey = state.account.privateKey;
  return getPubkey(privateKey);
};

export const selectNostrPublicKey = (state: RootState) => {
  if (!state.account.privateKey) {
    return "";
  }
  const keyPair = new elliptic.ec("secp256k1").keyFromPrivate(
    Buffer.from(state.account.privateKey, "hex"),
  );
  const publicKey = keyPair.getPublic(true, "hex");
  // Remove 02 compress prefix
  return encodeKey("npub", publicKey.substring(2));
};

export const selectNostrPrivateKey = (state: RootState) =>
  encodeKey("nsec", state.account.privateKey);

export default slice.reducer;
