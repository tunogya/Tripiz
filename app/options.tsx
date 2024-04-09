import { View, Text, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

export default function Page() {
  return (
    <View className={"flex flex-1 bg-[#121212] w-full h-full space-y-4 pt-4"}>
      <Pressable
        onPress={() => {
          router.navigate("optionsLanguage");
        }}
        className={"px-3 flex flex-row justify-between items-center"}
      >
        <Text className={"text-white font-medium"}>界面语言</Text>
        <Ionicons name="chevron-forward" size={20} color="white" />
      </Pressable>
      <Pressable
        onPress={() => {
          router.navigate("optionsOpenAI");
        }}
        className={"px-3 flex flex-row justify-between items-center"}
      >
        <Text className={"text-white font-medium"}>OpenAI配置</Text>
        <Ionicons name="chevron-forward" size={20} color="white" />
      </Pressable>
      <Pressable
        onPress={() => {
          router.navigate("likeTask");
        }}
        className={"px-3 flex flex-row justify-between items-center"}
      >
        <Text className={"text-white font-medium"}>已点赞的任务</Text>
        <Ionicons name="chevron-forward" size={20} color="white" />
      </Pressable>
    </View>
  );
}
