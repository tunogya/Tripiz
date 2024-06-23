import { Image } from "expo-image";
import { FC, memo, useEffect, useState } from "react";
import { View, Text } from "react-native";
import { useQuery } from "@realm/react";
import { Event } from "../app/Event";
import { useWebSocket } from "./WebSocketProvider";
import { uuid } from "expo-modules-core";

const Avatar: FC<{
  publicKey: string;
  classname?: string;
}> = ({ classname, publicKey }) => {
  const [picture, setPicture] = useState("");
  const { send } = useWebSocket();

  const events = useQuery(Event, (events) => {
    return events.filtered("kind == $0 && pubkey == $1", 0, publicKey);
  });

  useEffect(() => {
    if (events.length > 0) {
      try {
        const userinfo = JSON.parse(events[0]?.content);
        setPicture(userinfo?.picture);
      } catch (e) {
        console.log(e)
      }
    } else {
      send(
        JSON.stringify([
          "REQ",
          uuid.v4(),
          {
            authors: [publicKey],
            kinds: [0],
            limit: 1,
          },
        ]),
      );
    }
  }, [events]);

  if (picture) {
    return (
      <Image
        contentFit={"cover"}
        cachePolicy={"memory-disk"}
        source={{
          uri: picture,
        }}
        className={classname ? classname : "w-10 h-10 rounded-full bg-gray-400"}
      />
    );
  }

  return (
    <View
      className={
        classname
          ? classname
          : "w-10 h-10 rounded-full bg-gray-400 items-center justify-center"
      }
    >
      <Text className={"font-bold text-center"}>
        {publicKey?.slice(0, 2).toUpperCase()}
      </Text>
    </View>
  );
};

export default memo(Avatar);
