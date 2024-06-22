import { Pressable, View, Text } from "react-native";
import React, { memo } from "react";
import { BlurView } from "expo-blur";
import { t } from "../i18n";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useRealm } from "@realm/react";
import { router } from "expo-router";
import { useWebSocket } from "./WebSocketProvider";

const PostMoreModal = ({ post, onCopy, onClose }) => {
  const insets = useSafeAreaInsets();
  const realm = useRealm();
  const { send } = useWebSocket();

  return (
    <BlurView
      intensity={100}
      tint={"dark"}
      className={"absolute w-screen h-screen z-50"}
      style={{
        paddingTop: insets.top + 20,
        paddingBottom: insets.bottom + 20,
      }}
    >
      <View className={"w-full h-full justify-end"}>
        <View className={"space-y-10"}>
          <View className={"space-y-5 p-4"}>
            <Pressable
              className={"p-2 flex flex-row space-x-3 items-center"}
              onPress={() => {
                onCopy();
              }}
            >
              <Ionicons name="copy-outline" size={24} color="white" />
              <Text className={"text-white font-medium"}>{t("Copy")}</Text>
            </Pressable>
            <Pressable
              className={"p-2 flex flex-row space-x-3 items-center"}
              onPress={() => {
                realm.write(() => {
                  realm.delete(post);
                  // POST
                  router.navigate("library");
                });
              }}
            >
              <Ionicons name="trash-outline" size={24} color="white" />
              <Text className={"text-white font-medium"}>{t("Delete")}</Text>
            </Pressable>
          </View>
          <Pressable className={"w-full items-center"} onPress={onClose}>
            <Text className={"text-white font-medium"}>{t("Close")}</Text>
          </Pressable>
        </View>
      </View>
    </BlurView>
  );
};

export default memo(PostMoreModal);
