import {Text, View} from "react-native";
import { Image } from 'expo-image';
import React, {FC, memo, useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {RootState} from "../store/store";
import * as Crypto from "expo-crypto";

export async function mapAddressToNumber(address: string) {
  const hash = await Crypto.digestStringAsync(
    Crypto.CryptoDigestAlgorithm.SHA256,
    address
  );
  const bigInt = BigInt('0x' + hash);
  return Number(bigInt % 10000n);
}

const CommentShowItem: FC<{
  item: {
    user: string,
    text: string,
    updatedAt: string,
  }
}> = ({item}) => {
  const [number, setNumber] = useState<string | undefined>(undefined);
  const { address } = useSelector((state: RootState) => state.user);

  const fetchNumber = async (address: string) => {
    const data = await mapAddressToNumber(item.user);
    setNumber(data.toString().padStart(4, '0'));
  };

  useEffect(() => {
    fetchNumber(address);
  }, [address]);

  return (
    <View
      className={"px-4 pt-4 flex flex-row space-x-3 bg-[#121212]"}
    >
      {
        number ? (
          <Image
            contentFit={"cover"}
            source={{
              uri: `https://www.larvalabs.com/cryptopunks/cryptopunk${(number || 0)?.toString().padStart(4, '0')}.png`
            }}
            className={"w-10 h-10 rounded-full bg-gray-400"}
          />
          ) : (
          <View className={"w-10 h-10 rounded-full bg-gray-400"}></View>
        )
      }
      <View className={"space-y-1.5 pb-4 flex-1 border-b border-[#FFFFFF12]"}>
        <View className={"flex flex-row justify-between items-end"}>
          <Text className={"text-[#B3B3B3] text-[16px]"}>{ item.user === address ? "Me" : item.user}</Text>
          <Text className={"text-[#B3B3B3] text-xs"}>{new Date(item.updatedAt).toLocaleDateString().replaceAll('/', '-')}</Text>
        </View>
        <View className={"flex flex-row items-end flex-wrap"}>
          <Text className={"text-white text-[16px] leading-5"}>{item.text}</Text>
        </View>
      </View>
    </View>
  )
}

export default memo(CommentShowItem);