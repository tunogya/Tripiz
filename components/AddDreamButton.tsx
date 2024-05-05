import { Pressable, View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { memo } from "react";
import { router } from "expo-router";

const AddDreamButton = () => {
  const insets = useSafeAreaInsets();

  return (
    <View
      className={"absolute flex flex-row items-center"}
      style={{
        right: 20,
        bottom: insets.bottom + 66,
      }}
    >
      <Pressable
        onPress={() => {
          router.navigate("/add/dream");
        }}
        className={
          "bg-white rounded-l-full items-center justify-center flex flex-row h-10 pl-3 pr-1.5 space-x-1"
        }
      >
        <Ionicons name="add-sharp" size={20} color="#121212" />
        <Text className={"font-bold"}>Dream</Text>
      </Pressable>
      <Pressable
        className={
          "bg-white rounded-r-full items-center justify-center flex flex-row h-10 pl-1.5 pr-3 space-x-1"
        }
      >
        <Ionicons name="chevron-up" size={20} color="#121212" />
      </Pressable>
    </View>
  );
};

export default memo(AddDreamButton);
