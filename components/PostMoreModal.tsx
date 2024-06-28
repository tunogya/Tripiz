import {Pressable, View, Text, Platform} from "react-native";
import React, { memo } from "react";
import { BlurView } from "expo-blur";
import { t } from "../i18n";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useRealm } from "@realm/react";
import { router } from "expo-router";
import { useWebSocket } from "./WebSocketProvider";
import { finalizeEvent } from "nostr-tools";
import { Buffer } from "buffer";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import Avatar from "./Avatar";
import Clipboard from "@react-native-clipboard/clipboard";
import useUserInfo from "./useUserInfo";

const PostMoreModal = ({ post, onClose }) => {
  const insets = useSafeAreaInsets();
  const realm = useRealm();
  const { privateKey } = useSelector((state: RootState) => state.account);
  const { name } = useUserInfo(post.pubkey);
  const { send } = useWebSocket();

  return (
    <BlurView
      intensity={100}
      tint={"dark"}
      className={`absolute w-full h-full z-50 ${Platform.OS === "android" ? "bg-[#121212DD]" : ""}`}
      style={{
        paddingTop: insets.top + 20,
        paddingBottom: insets.bottom + 20,
      }}
    >
      <View className={"w-full h-full justify-end"}>
        <View className={"p-6 space-y-3"}>
          <View className={"flex flex-row items-center space-x-3"}>
            <Avatar publicKey={post.pubkey} />
            <Text
              className={"text-white text-[20px] font-semibold"}
              numberOfLines={1}
            >
              {name}
            </Text>
          </View>
          <Text className={"text-[#B3B3B3] text-[16px]"} numberOfLines={1}>
            {post.content}
          </Text>
        </View>
        <View className={"space-y-10"}>
          <View className={"space-y-5 p-4"}>
            <Pressable
              className={"p-2 flex flex-row space-x-3 items-center"}
              onPress={() => {
                Clipboard.setString(post.content);
                onClose();
              }}
            >
              <Ionicons name="copy-outline" size={24} color="white" />
              <Text className={"text-white font-medium"}>{t("Copy")}</Text>
            </Pressable>
            <Pressable
              className={"p-2 flex flex-row space-x-3 items-center"}
              onPress={() => {
                try {
                  router.navigate("library");
                  const event = finalizeEvent(
                    {
                      kind: 5,
                      created_at: Math.floor(Date.now() / 1000),
                      tags: [["e", post.id]],
                      content: "Delete this post.",
                    },
                    Buffer.from(privateKey, "hex"),
                  );
                  send(JSON.stringify(["EVENT", event]));
                  setTimeout(() => {
                    realm.write(() => {
                      realm.delete(post);
                    });
                  }, 200);
                } catch (e) {
                  console.log(e);
                }
              }}
            >
              <Ionicons name="trash-outline" size={24} color="white" />
              <Text className={"text-white font-medium"}>{t("Delete")}</Text>
            </Pressable>
          </View>
          <View className={"flex flex-row justify-center"}>
            <Pressable className={"items-center p-3"} onPress={onClose}>
              <Text className={"text-white font-medium"}>{t("Close")}</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </BlurView>
  );
};

export default memo(PostMoreModal);
