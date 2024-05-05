import { Pressable, View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { memo } from "react";
import { router } from "expo-router";

const AddDreamButton = () => {
  const insets = useSafeAreaInsets();

  return (
    <View
      className={"absolute"}
      style={{
        right: 20,
        bottom: insets.bottom + 66,
      }}
    >
      <Pressable
        onPress={() => {
          router.navigate("/add");
        }}
        className={
          "bg-white rounded-full items-center justify-center flex flex-row py-3 px-6 space-x-1"
        }
      >
        <Ionicons name="add-sharp" size={20} color="#121212" />
        <Text className={"font-bold"}>Dream</Text>
      </Pressable>
    </View>
  );
};

export default memo(AddDreamButton);
