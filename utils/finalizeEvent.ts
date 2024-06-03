import * as Crypto from "expo-crypto";
import {Buffer} from "buffer";
import elliptic from "elliptic";

export const finalizeEvent = async ({kind, created_at, tags, content}: {
  kind: number,
  created_at: number,
  tags: string[][],
  content: string
}, privateKey: string) => {
  const keyPair = new elliptic.ec('secp256k1').keyFromPrivate(Buffer.from(privateKey, 'hex'));
  const publicKey = keyPair.getPublic(true,'hex');
  const serializedEvent = JSON.stringify([
    0,
    publicKey,
    created_at,
    kind,
    tags,
    content,
  ]);
  const digest = await Crypto.digestStringAsync(
    Crypto.CryptoDigestAlgorithm.SHA256,
    serializedEvent,
  );
  const id = Buffer.from(digest, "hex").toString("hex");
  const signature = keyPair.sign(id, "hex");
  const r = signature.r.toString('hex').padStart(64, '0');
  const s = signature.s.toString('hex').padStart(64, '0');
  const sig = r + s;

  return {
    id,
    kind,
    pubkey: publicKey,
    created_at,
    content,
    tags,
    sig,
  }
}