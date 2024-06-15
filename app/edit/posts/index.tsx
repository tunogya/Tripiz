import {
  View,
  Text,
  Pressable,
  TextInput,
  TouchableOpacity, KeyboardAvoidingView, Keyboard,
} from "react-native";
import {memo, useEffect, useState} from "react";
import { router } from "expo-router";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { increaseVersion } from "../../../reducers/ui/uiSlice";
import { t } from "../../../i18n";
import { API_HOST_NAME } from "../../../utils/const";
import { finalizeEvent } from "nostr-tools";
import { Buffer } from "buffer";

const Page = () => {
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
      dispatch(increaseVersion());
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

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', (event) => {
      setKeyboardHeight(event.endCoordinates.height);
    });

    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardHeight(0);
    });

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  return (
    <View className={`bg-[#121212] flex flex-1`}>
      <View className={"flex justify-center items-center pt-2"}>
        <View className={"w-10 h-1 bg-[#B3B3B3] rounded-full"}></View>
      </View>
      <View
        className={"flex-row justify-between px-3 items-center"}
      >
        <View></View>
        <TouchableOpacity
          hitSlop={12}
          disabled={status !== "idle" || text === ""}
          className={`p-1.5`}
          onPress={save}
        >
          <Text className={`font-bold text-white`}>
            {status === "idle" && t("Post")}
            {status === "error" && t("Error")}
            {status === "success" && t("Success")}
            {status === "loading" && t("Waiting")}
          </Text>
        </TouchableOpacity>
      </View>
      <View
        className={"flex flex-row items-center border-b border-[#FFFFFF12] px-2 pb-3"}
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
      <View className={"p-3 space-y-4 flex-1"}>
        <TextInput
          multiline
          autoFocus={true}
          placeholder={t("Content")}
          placeholderTextColor={"#B3B3B3"}
          className={`text-white text-[16px]`}
          value={text}
          onChangeText={(text) => {
            setText(text);
          }}
        />
      </View>
      <View style={{
        height: keyboardHeight,
      }}></View>
    </View>
  );
};

export default memo(Page);
