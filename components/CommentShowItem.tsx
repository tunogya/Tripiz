import { Pressable, Text, View } from "react-native";
import React, { FC, memo, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectPublicKey } from "../reducers/account/accountSlice";
import Avatar from "./Avatar";
import { useQuery } from "@realm/react";
import { Event } from "../app/Event";
import { useWebSocket } from "./WebSocketProvider";
import { uuid } from "expo-modules-core";

const CommentShowItem: FC<{
  item: Event;
  onPress: () => void;
}> = ({ item, onPress }) => {
  const myPublicKey = useSelector(selectPublicKey);
  const events = useQuery(Event, (events) => {
    return events.filtered("kind == $0 && pubkey == $1", 0, item.pubkey);
  });
  const [name, setName] = useState("Anonymous");
  const { send } = useWebSocket();

  useEffect(() => {
    if (item.pubkey === myPublicKey) {
      setName("Me");
      return;
    }
    if (events.length > 0) {
      const userinfo = JSON.parse(events[0]?.content);
      const name = userinfo?.name || "Anonymous";
      setName(name);
    } else {
      send(
        JSON.stringify([
          "REQ",
          uuid.v4(),
          {
            authors: [item.pubkey],
            kinds: [0],
            limit: 1,
          },
        ]),
      );
    }
  }, [events]);

  return (
    <Pressable
      onPress={onPress}
      className={"px-4 pt-4 flex flex-row space-x-3 bg-[#121212]"}>
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
