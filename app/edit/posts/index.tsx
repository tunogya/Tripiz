import {View, Text, Pressable, TextInput, Platform, KeyboardAvoidingView, ScrollView} from "react-native";
import { memo, useState } from "react";
import { router, useLocalSearchParams } from "expo-router";
import { ensureString } from "../../../utils/ensureString";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { increaseVersion } from "../../../reducers/ui/uiSlice";
import { t } from "../../../i18n";
import { API_HOST_NAME } from "../../../utils/const";
import { finalizeEvent } from "nostr-tools";
import { Buffer } from "buffer";

const Page = () => {
  const { category } = useLocalSearchParams();
  const { privateKey } = useSelector((state: RootState) => state.account);
  const [text, setText] = useState("");
  const [status, setStatus] = useState("idle");
  const dispatch = useDispatch();

  const save = async () => {
    setStatus("loading");
    try {
      const event = finalizeEvent(
        {
          kind: 1,
          created_at: Math.floor(Date.now() / 1000),
          tags: [["category", ensureString(category) || "reflections"]],
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

  return (
    <View className={"bg-[#121212] flex flex-1"}>
      <View className={"flex justify-center items-center pt-2"}>
        <View className={"w-10 h-1 bg-[#B3B3B3] rounded-full"}></View>
      </View>
      <View className={"flex-row justify-between p-3 items-center"}>
        <View></View>
        <Pressable
          disabled={status !== "idle"}
          className={`rounded-full items-center justify-center flex flex-row space-x-1`}
          onPress={save}
        >
          <Text className={"font-bold text-white"}>
            {status === "idle" && t("Post")}
            {status === "error" && t("Error")}
            {status === "success" && t("Success")}
            {status === "loading" && t("Waiting")}
          </Text>
        </Pressable>
      </View>
      <ScrollView
        className={"px-4"}
        showsVerticalScrollIndicator={false}
      >
        <TextInput
          multiline
          placeholder={t("Content")}
          placeholderTextColor={"#B3B3B3"}
          className={"text-white text-[16px] px-4 py-3 h-60 border border-[#FFFFFF12] rounded-lg"}
          value={text}
          maxLength={4000}
          onChangeText={(text) => {
            setText(text);
          }}
        />
        <View className={"flex flex-row justify-end"}>
          <Text className={"text-[#B3B3B3] text-xs p-2"}>
            {text.length} / 4000
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

export default memo(Page);
