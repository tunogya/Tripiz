import React, {FC, memo, useEffect, useState} from "react";
import {Pressable, Text, View} from "react-native";
import {router} from "expo-router";
import {t} from "../i18n";
import * as Crypto from "expo-crypto";
import { Image } from 'expo-image';
import {API_HOST_NAME} from "../utils/const";

const LibraryShowItem: FC<{
  item: {
    _id: string,
    possibly_sensitive?: boolean,
    text: string,
    category: string,
  },
  showType: boolean
}> = ({item, showType}) => {
  const [hash, setHash] = useState("");

  const getHash = async (data: string) => {
    const _hash = await Crypto.digestStringAsync(
      Crypto.CryptoDigestAlgorithm.SHA256,
      data,
    )
    setHash(`0x${_hash}`);
  }

  useEffect(() => {
    getHash(item.text);
  }, []);

  return (
    <Pressable
      className={"h-20 flex flex-row my-2 px-4 space-x-3"}
      onPress={() => {
        router.push(`/posts/${item._id}`)
      }}
    >
      <View
        className={`h-20 w-20 bg-[#FFFFFF12] ${item.category === "reflections" ? "" : (item.category === "dreams" ? "rounded-full" : "rounded-xl")} overflow-hidden`}>
        {
          hash && (
            <Image
              className={"w-20 h-20"}
              source={`${API_HOST_NAME}/autoglyphs?hash=${hash}`}
              contentFit="cover"
              cachePolicy={"memory-disk"}
            />
          )
        }
      </View>
      <View className={"flex justify-center flex-1 space-y-0.5"}>
        <Text className={"text-white font-medium text-lg"} numberOfLines={1}>
          {item.text}
        </Text>
        <View className={"flex flex-row space-x-1 items-center"}>
          {
            item.possibly_sensitive && (
              <Text className={"w-3.5 h-3.5 bg-[#B3B3B3] text-[#121212] text-[12px] text-center"}>E</Text>
            )
          }
          {showType && <Text className={"text-[#B3B3B3]"}>{t(item.category)}</Text>}
        </View>
      </View>
    </Pressable>
  )
};

export default memo(LibraryShowItem);
