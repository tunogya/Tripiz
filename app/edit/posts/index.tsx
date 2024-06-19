import {
  View,
  Text,
  Pressable,
  TextInput,
  TouchableOpacity,
  Keyboard,
} from "react-native";
import { memo, useEffect, useMemo, useState } from "react";
import { router } from "expo-router";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { t } from "../../../i18n";
import { API_HOST_NAME } from "../../../utils/const";
import { finalizeEvent } from "nostr-tools";
import { Buffer } from "buffer";
import { useSafeAreaInsets } from "react-native-safe-area-context";
// import {Ionicons} from "@expo/vector-icons";
import Svg, { Circle } from "react-native-svg";

const Page = () => {
  const insets = useSafeAreaInsets();
  const { privateKey } = useSelector((state: RootState) => state.account);
  const [text, setText] = useState("");
  const [status, setStatus] = useState("idle");
  const dispatch = useDispatch();
  const FILTERS = ["Memories", "Dreams", "Reflections"];
  const [filter, setFilter] = useState("Memories");
  const [keyboardHeight, setKeyboardHeight] = useState(0);

  const save = async () => {
    setStatus("loading");
    try {
      const event = finalizeEvent(
        {
          kind: 1,
          created_at: Math.floor(Date.now() / 1000),
          tags: [["category", filter.toLowerCase()]],
          content: text,
        },
        Buffer.from(privateKey, "hex"),
      );
      await fetch(`${API_HOST_NAME}/posts/`, {
        method: "POST",
        body: JSON.stringify(event),
      });
      setStatus("success");
      setTimeout(() => {
        router.back();
        setStatus("idle");
      }, 500);
    } catch (e) {
      setStatus("error");
      setTimeout(() => {
        setStatus("idle");
      }, 3000);
    }
  };

  const strokeDashoffset = useMemo(() => {
    return (1 - text.length / 12800) * Math.PI * 2 * 10;
  }, [text]);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      (event) => {
        setKeyboardHeight(event.endCoordinates.height);
      },
    );

    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        setKeyboardHeight(0);
      },
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  return (
    <View
      className={`bg-[#121212] flex flex-1`}
      style={{
        paddingTop: insets.top + 12,
      }}
    >
      <View className={"flex-row justify-between px-3 py-1 items-center"}>
        <TouchableOpacity
          hitSlop={12}
          className={`px-1 h-8 items-center justify-center`}
          onPress={() => {
            router.back();
          }}
        >
          <Text className={`text-white font-medium text-[16px]`}>
            {t("Cancel")}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          hitSlop={12}
          disabled={status !== "idle" || text === ""}
          className={`px-4 h-8 items-center justify-center border ${status !== "idle" || text === "" ? "border-[#FFFFFF12]" : "border-[#1DB954]"}  rounded-full`}
          onPress={save}
        >
          <Text
            className={`font-bold ${status !== "idle" || text === "" ? "text-[#B3B3B3]" : "text-[#1DB954]"}`}
          >
            {status === "idle" && t("Post")}
            {status === "error" && t("Error")}
            {status === "success" && t("Success")}
            {status === "loading" && t("Waiting")}
          </Text>
        </TouchableOpacity>
      </View>
      <View
        className={"flex flex-row items-center border-[#FFFFFF12] px-2 py-1"}
      >
        {FILTERS.map((item, index) => (
          <Pressable
            hitSlop={4}
            key={index}
            className={`px-4 h-8 items-center justify-center ${filter === item ? "bg-[#1DB954]" : "bg-[#FFFFFF12]"} rounded-full mx-1`}
            onPress={() => {
              setFilter(item);
            }}
          >
            <Text
              className={`${filter === item ? "text-black" : "text-white"} text-[14px]`}
            >
              {t(item)}
            </Text>
          </Pressable>
        ))}
      </View>
      <TextInput
        multiline
        autoFocus={true}
        placeholder={t("Content")}
        placeholderTextColor={"#B3B3B3"}
        className={`text-white text-[18px] px-5 py-3 flex-1`}
        value={text}
        onChangeText={(text) => {
          setText(text);
        }}
        maxLength={12800}
      />
      <View
        className={
          "flex flex-row h-12 border-t border-[#FFFFFF12] items-center justify-between"
        }
      >
        <View className={"flex flex-row"}>
          {/*<Pressable className={"h-12 w-12 items-center justify-center"}>*/}
          {/*  <Ionicons name="mic" size={24} color="#7357F6" />*/}
          {/*</Pressable>*/}
          {/*<Pressable className={"h-12 w-12 items-center justify-center"}>*/}
          {/*  <Ionicons name="images-outline" size={20} color="#1DB954" />*/}
          {/*</Pressable>*/}
          {/*<Pressable className={"h-12 w-12 items-center justify-center"}>*/}
          {/*  <Ionicons name="location-outline" size={20} color="#1DB954" />*/}
          {/*</Pressable>*/}
        </View>
        <View className={"flex flex-row"}>
          <View className={"h-12 w-12 items-center justify-center -rotate-90"}>
            <Svg height="24" width="24">
              <Circle
                cx="12"
                cy="12"
                r="10"
                stroke="#FFFFFF12"
                strokeWidth="2"
                fill="transparent"
              />
              <Circle
                cx="12"
                cy="12"
                r="10"
                origin="12,12"
                stroke="#1DB954"
                strokeWidth="2"
                strokeLinecap="round"
                fill="transparent"
                strokeDasharray={[Math.PI * 2 * 10]}
                strokeDashoffset={strokeDashoffset}
              />
            </Svg>
          </View>
        </View>
      </View>
      <View
        style={{
          height: keyboardHeight ? keyboardHeight : insets.bottom,
        }}
      ></View>
    </View>
  );
};

export default memo(Page);
