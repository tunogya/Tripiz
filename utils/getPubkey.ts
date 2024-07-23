import elliptic from "elliptic";
import { Buffer } from "buffer";

export const getPubkey = (privateKey: string) => {
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
