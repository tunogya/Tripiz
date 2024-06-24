import { Pressable, Text, View } from "react-native";
import React, { FC, memo } from "react";
import Avatar from "./Avatar";
import { Event } from "../app/Event";
import useUserInfo from "./useUserInfo";

const CommentShowItem: FC<{
  item: Event;
  onPress: () => void;
}> = ({ item, onPress }) => {
  const { name } = useUserInfo(item.pubkey);

  return (
    <Pressable
      onPress={onPress}
      className={"px-4 pt-4 flex flex-row space-x-3 bg-[#121212]"}
    >
      <Avatar publicKey={item.pubkey} />
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
        {/*<View className={"flex flex-row items-center justify-between"}>*/}
        {/*  <View></View>*/}
        {/*  <View></View>*/}
        {/*</View>*/}
      </View>
    </Pressable>
  );
};

export default memo(CommentShowItem);
