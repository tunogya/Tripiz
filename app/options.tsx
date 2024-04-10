import { View, Text, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { t } from "../i18n";

export default function Page() {
  return (
    <View className={"flex flex-1 bg-[#121212] w-full h-full"}>
      <Pressable
        onPress={() => {
          router.navigate("optionsOpenAI");
        }}
        className={"px-3 flex flex-row justify-between items-center py-3"}
      >
        <Text className={"text-white font-bold"}>{t("openaiConfig")}</Text>
        <Ionicons name="chevron-forward" size={20} color="white" />
      </Pressable>
      <Pressable
        onPress={() => {
          router.navigate("likeTask");
        }}
        className={"px-3 flex flex-row justify-between items-center py-3"}
      >
        <Text className={"text-white font-bold"}>{t("likedTasks")}</Text>
        <Ionicons name="chevron-forward" size={20} color="white" />
      </Pressable>
      <Pressable
        onPress={() => {
          router.navigate("preference");
        }}
        className={"px-3 flex flex-row justify-between items-center py-3"}
      >
        <Text className={"text-white font-bold"}>{t("preference")}</Text>
        <Ionicons name="chevron-forward" size={20} color="white" />
      </Pressable>
    </View>
  );
}
