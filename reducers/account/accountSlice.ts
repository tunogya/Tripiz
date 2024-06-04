import { createSlice } from "@reduxjs/toolkit";
import "react-native-get-random-values";
import elliptic from "elliptic";
import { RootState } from "../../store/store";
import { Buffer } from "buffer";
import { encodeKey } from "../../utils/nostrUtil";

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
    destroy: (state) => {
      state.privateKey = "";
    },
  },
});

export const { initialize, destroy } = slice.actions;

export const selectPublicKey = (state: RootState) => {
  const privateKey = state.account.privateKey;
  if (!privateKey) {
    return "";
  }
  const keyPair = new elliptic.ec("secp256k1").keyFromPrivate(
    Buffer.from(privateKey, "hex"),
  );
  const publicKey = keyPair.getPublic(true, "hex");
  // Remove 02 compress prefix
  return publicKey.substring(2);
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
