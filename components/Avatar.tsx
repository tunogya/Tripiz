import * as Crypto from "expo-crypto";
import { Image, View } from "react-native";
import { FC, memo, useEffect, useState } from "react";

export async function mapAddressToNumber(address: string) {
  const hash = await Crypto.digestStringAsync(
    Crypto.CryptoDigestAlgorithm.SHA256,
    address
  );
  const bigInt = BigInt('0x' + hash);
  return Number(bigInt % 10000n);
}

const Avatar: FC<{
  address: string,
  classname?: string,
}> = ({ address, classname }) => {
  const [number, setNumber] = useState<string | undefined>(undefined);

  const fetchNumber = async (address: string) => {
    const data = await mapAddressToNumber(address);
    setNumber(data.toString().padStart(4, '0'));
  };

  useEffect(() => {
    fetchNumber(address);
  }, [address]);

  if (!number) {
    return <View className={classname ? classname : "w-10 h-10 rounded-full bg-gray-400"}></View>;
  }

  return (
    <Image
      resizeMode={"stretch"}
      source={{
        uri: `https://www.larvalabs.com/cryptopunks/cryptopunk${number}.png`
      }}
      className={classname ? classname : "w-10 h-10 rounded-full bg-gray-400"}
    />
  );
};

export default memo(Avatar);