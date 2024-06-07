import { Text, View } from "react-native";
import React, { FC, memo } from "react";
import { useSelector } from "react-redux";
import * as Crypto from "expo-crypto";
import { selectPublicKey } from "../reducers/account/accountSlice";
import Avatar from "./Avatar";

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
    tags_map: any;
    created_at: number;
  };
}> = ({ item }) => {
  const publicKey = useSelector(selectPublicKey);

  const name =
    item.pubkey === publicKey ? "Me" : item?.tags_map?.name?.[0] || "Anonymous";

  return (
    <View className={"px-4 pt-4 flex flex-row space-x-3 bg-[#121212]"}>
      <Avatar publicKey={publicKey}/>
      <View className={"space-y-1.5 pb-4 flex-1 border-b border-[#FFFFFF12]"}>
        <View className={"flex flex-row justify-between items-end"}>
          <Text
            className={"text-[#B3B3B3] text-[16px] w-[200px]"}
            numberOfLines={1}
          >
            {name}
          </Text>
          <Text className={"text-[#B3B3B3] text-xs"}>
            {new Date(item.created_at * 1000)
              .toLocaleDateString()
              .replaceAll("/", "-")
              .replace(`${new Date().getFullYear()}-`, "")}
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
