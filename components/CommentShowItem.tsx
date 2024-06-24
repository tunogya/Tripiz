import { Pressable, Text, TouchableOpacity, View } from "react-native";
import React, { FC, memo, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { selectPublicKey } from "../reducers/account/accountSlice";
import Avatar from "./Avatar";
import Clipboard from "@react-native-clipboard/clipboard";
import { BottomSheet, BottomSheetRef } from "react-native-sheet";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { t } from "../i18n";
import { useQuery, useRealm } from "@realm/react";
import { Event } from "../app/Event";
import { useWebSocket } from "./WebSocketProvider";
import { uuid } from "expo-modules-core";
import { finalizeEvent } from "nostr-tools";
import { Buffer } from "buffer";
import { RootState } from "../store/store";

const CommentShowItem: FC<{
  item: Event;
  onPressCallback: () => void;
}> = ({ item, onPressCallback }) => {
  const insets = useSafeAreaInsets();
  const myPublicKey = useSelector(selectPublicKey);
  const events = useQuery(Event, (events) => {
    return events.filtered("kind == $0 && pubkey == $1", 0, item.pubkey);
  });
  const [name, setName] = useState("Anonymous");
  const bottomSheet = useRef<BottomSheetRef>(null);
  const { privateKey } = useSelector((state: RootState) => state.account);
  const { send } = useWebSocket();
  const realm = useRealm();

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
    <View>
      <View className={"px-4 pt-4 flex flex-row space-x-3 bg-[#121212]"}>
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
          <Pressable
            className={"flex flex-row items-end flex-wrap"}
            onPress={() => bottomSheet.current?.show()}
          >
            <Text className={"text-white text-[16px] leading-5"}>
              {item.content}
            </Text>
          </Pressable>
          {/*<View className={"flex flex-row items-center justify-between"}>*/}
          {/*  <View></View>*/}
          {/*  <View></View>*/}
          {/*</View>*/}
        </View>
      </View>
      <BottomSheet
        height={14 * 3 * 5 + 2 * 4 + insets.bottom}
        ref={bottomSheet}
        backdropClosesSheet={true}
        draggable={false}
        borderRadius={12}
        openTime={300}
        closeTime={300}
      >
        <View className={"bg-[#121212] flex-1"}>
          <Pressable className={"h-14 items-center justify-center"}>
            <Text
              className={"text-[#B3B3B3] px-8 text-[14px] font-medium"}
              numberOfLines={1}
            >
              {name}: {item.content}
            </Text>
          </Pressable>
          <TouchableOpacity
            className={"border-t border-[#FFFFFF12] h-14 justify-center"}
            onPress={() => {
              Clipboard.setString(item.content);
              bottomSheet.current?.hide();
            }}
          >
            <Text className={"text-white text-[16px] text-center font-medium"}>
              {t("Copy")}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            className={"border-t border-[#FFFFFF12] h-14 justify-center"}
            onPress={async () => {
              try {
                const event = finalizeEvent(
                  {
                    kind: 5,
                    created_at: Math.floor(Date.now() / 1000),
                    tags: [["e", item.id]],
                    content: "Delete this comment.",
                  },
                  Buffer.from(privateKey, "hex"),
                );
                send(JSON.stringify(["EVENT", event]));
                realm.write(() => {
                  realm.delete(item);
                });
              } catch (e) {
                console.log(e);
              } finally {
                bottomSheet.current?.hide();
              }
            }}
          >
            <Text
              className={"text-red-500 text-[16px] text-center font-medium"}
            >
              {t("Delete")}
            </Text>
          </TouchableOpacity>
          <View className={"h-2 bg-[#FFFFFF12]"}></View>
          <TouchableOpacity
            className={"border-t border-[#FFFFFF12] h-14 justify-center"}
            onPress={() => {
              bottomSheet.current?.hide();
            }}
          >
            <Text
              className={"text-white text-[16px] text-center font-semibold"}
            >
              {t("Cancel")}
            </Text>
          </TouchableOpacity>
        </View>
      </BottomSheet>
    </View>
  );
};

export default memo(CommentShowItem);
