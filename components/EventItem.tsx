import { View, Text, Pressable } from "react-native";
import React, { memo, useEffect } from "react";
import { useObject } from "@realm/react";
import { Event } from "../app/Event";
import { Image } from "expo-image";
import { API_HOST_NAME } from "../utils/const";
import { t } from "../i18n";
import { router } from "expo-router";
import { useWebSocket } from "./WebSocketProvider";
import { uuid } from "expo-modules-core";

const EventItem = ({ id }) => {
  const item = useObject(Event, id);
  const { send } = useWebSocket();

  const category =
    item?.tags?.find((tag: any[]) => tag?.[0] === "category")?.[1] ||
    "reflections";

  useEffect(() => {
    if (!item) {
      send(
        JSON.stringify([
          "REQ",
          uuid.v4(),
          {
            ids: [id],
            limit: 1,
          },
        ]),
      );
    }
  }, [item]);

  if (!item) {
    return null;
  }

  return (
    <Pressable
      onPress={() => {
        router.navigate(`posts/${item.id}`);
      }}
      className={"w-28 mx-2 space-y-2"}
    >
      <View
        className={`h-28 w-28 bg-[#FFFFFF12] ${category === "reflections" ? "" : category === "dreams" ? "rounded-full" : "rounded-xl"} overflow-hidden`}
      >
        <Image
          className={"w-28 h-28"}
          source={`${API_HOST_NAME}/autoglyphs?hash=0x${item.id}`}
          contentFit="cover"
          cachePolicy={"memory-disk"}
        />
      </View>
      <View className={"space-y-0.5"}>
        <Text
          className={"text-white text-[12px] font-semibold"}
          numberOfLines={2}
        >
          {item.content}
        </Text>
        <Text className={"text-[#B3B3B3] text-[12px]"}>{t(category)}</Text>
      </View>
    </Pressable>
  );
};

export default memo(EventItem);
