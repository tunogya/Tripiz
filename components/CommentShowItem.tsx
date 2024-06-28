import { Pressable, StyleSheet, Text, View } from "react-native";
import React, { FC, memo } from "react";
import Avatar from "./Avatar";
import { Event } from "../app/Event";
import useUserInfo from "./useUserInfo";
import Markdown, { MarkdownIt } from "@ronradtke/react-native-markdown-display";

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
      <View className={"pb-4 flex-1 border-b border-[#FFFFFF12]"}>
        <View className={"flex flex-row justify-between items-center"}>
          <Text
            className={"text-[#B3B3B3] text-[16px] w-[200px]"}
            numberOfLines={1}
          >
            {name}
          </Text>
          <Text className={"text-[#B3B3B3] text-xs"}>
            {new Date((item?.created_at || 0) * 1000)
              .toLocaleDateString("zh")
              .replaceAll("/", "-")
              .replace(`${new Date().getFullYear()}-`, "")}
          </Text>
        </View>
        <View>
          <Markdown
            markdownit={MarkdownIt({ typographer: true }).disable([
              "link",
              "image",
            ])}
            style={{
              body: { color: "white", fontSize: 16, lineHeight: 24 },
              heading1: {
                color: "white",
                fontSize: 32,
                fontWeight: "bold",
                lineHeight: 48,
                marginVertical: 16,
              },
              heading2: {
                color: "white",
                fontSize: 18,
                fontWeight: "bold",
                lineHeight: 27,
                marginVertical: 16,
              },
              heading3: {
                color: "white",
                fontSize: 20,
                fontWeight: "bold",
                lineHeight: 30,
                marginVertical: 16,
              },
              heading4: {
                color: "white",
                fontSize: 16,
                fontWeight: "semibold",
                lineHeight: 20,
              },
              heading5: {
                color: "white",
                fontSize: 14,
                fontWeight: "semibold",
                lineHeight: 20,
              },
              heading6: {
                color: "white",
                fontSize: 13.6,
                fontWeight: "semibold",
                lineHeight: 20,
              },
              strong: { fontWeight: "bold" },
            }}
          >
            {item.content}
          </Markdown>
        </View>
      </View>
    </Pressable>
  );
};

const ContentStyle = StyleSheet.create({
  text: {
    color: "white",
    fontWeight: "medium",
    fontSize: 16,
  },
});

export default memo(CommentShowItem);
