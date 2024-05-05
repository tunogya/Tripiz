import { Pressable, View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { memo } from "react";
import { router } from "expo-router";

const AddButton = () => {
  const insets = useSafeAreaInsets();

  return (
    <View
      className={"absolute flex flex-row items-center bg-white rounded-full shadow"}
      style={{
        right: 20,
        bottom: insets.bottom + 80,
      }}
    >
      <Pressable
        onPress={() => {
          router.navigate("/add/dream");
        }}
        className={
          "items-center justify-center flex flex-row h-14 pl-4 pr-3 space-x-3"
        }
      >
        <Ionicons name="moon-outline" size={24} color="#121212" />
        <Text className={"font-bold text-lg"}>New dream</Text>
      </Pressable>
      <View className={"bg-[#121212] w-0.5 h-10 opacity-20"}></View>
      <Pressable
        className={
          "items-center justify-center flex flex-row h-14 pl-3 pr-4 space-x-1"
        }
      >
        <Ionicons name="chevron-up" size={24} color="#121212" />
      </Pressable>
    </View>
  );
};

export default memo(AddButton);
