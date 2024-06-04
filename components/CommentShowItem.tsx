import { Text, View } from "react-native";
import { Image } from "expo-image";
import React, { FC, memo, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import * as Crypto from "expo-crypto";
import { selectPublicKey } from "../reducers/account/accountSlice";

export async function mapAddressToNumber(address: string) {
  const hash = await Crypto.digestStringAsync(
    Crypto.CryptoDigestAlgorithm.SHA256,
    address,
  );
  const bigInt = BigInt("0x" + hash);
  return Number(bigInt % 10000n);
}

const CommentShowItem: FC<{
  item: {
    id: string;
    pubkey: string;
    content: string;
    tags: [][];
    created_at: number;
  };
}> = ({ item }) => {
  const [number, setNumber] = useState<string | undefined>(undefined);
  const publicKey = useSelector(selectPublicKey);

  const fetchNumber = async (id: string) => {
    const data = await mapAddressToNumber(id);
    setNumber(data.toString().padStart(4, "0"));
  };

  useEffect(() => {
    fetchNumber(item.pubkey);
  }, [item.pubkey]);

  return (
    <View className={"px-4 pt-4 flex flex-row space-x-3 bg-[#121212]"}>
      {number ? (
        <Image
          contentFit={"cover"}
          cachePolicy={"memory-disk"}
          source={{
            uri: `https://www.larvalabs.com/cryptopunks/cryptopunk${(number || 0)?.toString().padStart(4, "0")}.png`,
          }}
          className={"w-10 h-10 rounded-full bg-gray-400"}
        />
      ) : (
        <View className={"w-10 h-10 rounded-full bg-gray-400"}></View>
      )}
      <View className={"space-y-1.5 pb-4 flex-1 border-b border-[#FFFFFF12]"}>
        <View className={"flex flex-row justify-between items-end"}>
          <Text className={"text-[#B3B3B3] text-[16px]"}>
            {item.pubkey === publicKey ? "Me" : item.pubkey}
          </Text>
          <Text className={"text-[#B3B3B3] text-xs"}>
            {new Date(item.created_at * 1000)
              .toLocaleDateString()
              .replaceAll("/", "-")}
          </Text>
        </View>
        <View className={"flex flex-row items-end flex-wrap"}>
          <Text className={"text-white text-[16px] leading-5"}>
            {item.content}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default memo(CommentShowItem);
