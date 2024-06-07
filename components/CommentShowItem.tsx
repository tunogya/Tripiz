import {Text, View} from "react-native";
import React, {FC, memo} from "react";
import {useSelector} from "react-redux";
import * as Crypto from "expo-crypto";
import {selectPublicKey} from "../reducers/account/accountSlice";
import Avatar from "./Avatar";
import {API_HOST_NAME} from "../utils/const";
import useSWR from "swr";

const CommentShowItem: FC<{
  item: {
    id: string;
    pubkey: string;
    content: string;
    created_at: number;
  };
}> = ({item}) => {
  const myPublicKey = useSelector(selectPublicKey);
  const {data} = useSWR(`${API_HOST_NAME}/accounts/${item.pubkey}`, (url) => fetch(url).then((res) => res.json()));

  const name = item.pubkey === myPublicKey ? "Me" : (data?.name || "Anonymous");

  return (
    <View className={"px-4 pt-4 flex flex-row space-x-3 bg-[#121212]"}>
      <Avatar publicKey={item.pubkey}/>
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
