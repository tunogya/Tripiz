import {Pressable, View, Text} from "react-native";
import React, {memo, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../store/store";
import {BlurView} from "expo-blur";
import {updateCurrentPost} from "../reducers/ui/uiSlice";
import {t} from "../i18n";
import {router} from "expo-router";
import {useSafeAreaInsets} from "react-native-safe-area-context";
import useSWR from "swr";
import {Ionicons} from "@expo/vector-icons";

const PostMoreModal = () => {
  const insets = useSafeAreaInsets();
  const {currentPost} = useSelector((state: RootState) => state.ui);
  const dispatch = useDispatch();
  const {address} = useSelector((state: RootState) => state.user);
  const [state, setState] = useState("idle");

  const deletePost = async () => {
    setState("loading");
    try {
      await fetch(`https://tripiz.abandon.ai/api/posts/${currentPost}`, {
        method: "DELETE",
        headers: {
          "Tripiz-User": address,
          "Tripiz-Signature": "Signature",
        }
      })
      setState("success")
      setTimeout(() => {
        setState("idle")
        dispatch(updateCurrentPost(""));
        router.push("library")
      }, 1_000)
    } catch (e) {
      setState("error")
      setTimeout(() => {
        setState("idle")
      }, 3_000)
    }
  }

  const {data} = useSWR(currentPost ? `https://tripiz.abandon.ai/api/posts/${currentPost}` : undefined, (url: string) => fetch(url, {
      method: "GET",
      headers: {
        "Tripiz-User": address,
        "Tripiz-Signature": "Signature",
      }
    })
      .then((res) => res.json())
      .then((res) => res.data)
  );

  if (!currentPost) {
    return null;
  }

  return (
    <BlurView
      intensity={100}
      tint={"dark"}
      className={"absolute w-full h-full z-50"}
    >
      <View className={"relative w-full h-full"}>
        <Pressable
          className={"absolute w-full h-full"}
          onPress={() => {
            dispatch(updateCurrentPost(""));
          }}
        >
        </Pressable>
        <View className={"absolute right-0"}>
          <Pressable
            disabled={state !== "idle"}
            className={"px-4 py-2"}
            onPress={() => {
              const id = currentPost;
              dispatch(updateCurrentPost(""));
              router.push(`edit/posts/${id}`);
            }}
          >
            <Text className={"text-white text-lg font-semibold"}>
              {t("Edit")}
            </Text>
          </Pressable>
          <Pressable
            disabled={state !== "idle"}
            className={"px-4 py-2"}
            onPress={deletePost}
          >
            <Text className={"text-white text-lg font-semibold"}>
              {state === "idle" && t("Delete")}
              {state === "loading" && t("Deleting")}
              {state === "success" && t("Success")}
              {state === "error" && t("Error")}
            </Text>
          </Pressable>
        </View>
        {
          data && (
            <View
              className={"absolute left-0 w-full p-4 h-40 overflow-hidden"}
              style={{
                bottom: insets.bottom + 60,
              }}
            >
              <View className={"flex flex-row space-x-1 items-center"}>
                {
                  data.category === "reflection" && (
                    <Ionicons name="flash-outline" size={14} color="#B3B3B3" />
                  )
                }
                {
                  data.category === "memory" && (
                    <Ionicons name="sunny-outline" size={14} color="#B3B3B3" />
                  )
                }
                {
                  data.category === "dreams" && (
                    <Ionicons name="moon-outline" size={14} color="#B3B3B3" />
                  )
                }
                <Text className={"text-[#B3B3B3]"}>{t(data.category)}</Text>
              </View>
              <Text className={"text-white text-lg"} numberOfLines={4}>{data.text}</Text>
            </View>
          )
        }
      </View>
    </BlurView>
  )
}

export default memo(PostMoreModal);