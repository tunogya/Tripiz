import { Pressable, View, Text } from "react-native";
import React, { memo, useState } from "react";
import { BlurView } from "expo-blur";
import { t } from "../i18n";
import { router } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { API_HOST_NAME } from "../utils/const";

const PostMoreModal = ({ postId, onCopy, onClose }) => {
  const insets = useSafeAreaInsets();
  const [state, setState] = useState("idle");
  const deletePost = async () => {
    setState("loading");
    try {
      await fetch(`${API_HOST_NAME}/posts/${postId}`, {
        method: "DELETE",
      });
      setState("success");
      setTimeout(() => {
        setState("idle");
        router.push("library");
      }, 1_000);
    } catch (e) {
      setState("error");
      setTimeout(() => {
        setState("idle");
      }, 3_000);
    }
  };

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
              disabled={state !== "idle"}
              className={"p-2"}
              onPress={() => {
                onCopy();
              }}
            >
              <Text className={"text-white font-medium"}>{t("Copy")}</Text>
            </Pressable>
            <Pressable
              disabled={state !== "idle"}
              className={"p-2"}
              onPress={deletePost}
            >
              <Text className={"text-white font-medium"}>
                {state === "idle" && t("Delete")}
                {state === "loading" && t("Deleting")}
                {state === "success" && t("Success")}
                {state === "error" && t("Error")}
              </Text>
            </Pressable>
          </View>
          <Pressable className={"w-full items-center"} onPress={onClose}>
            <Text className={"text-white"}>Close</Text>
          </Pressable>
        </View>
      </View>
    </BlurView>
  );
};

export default memo(PostMoreModal);
