import {Pressable, View} from "react-native";
import {Ionicons} from "@expo/vector-icons";
import {useSafeAreaInsets} from "react-native-safe-area-context";
import {memo} from "react";
import {router} from "expo-router";

const AddDreamButton = () => {
  const insets = useSafeAreaInsets();

  return (
    <View className={"absolute"} style={{
      right: 20,
      bottom: insets.bottom + 66,
    }}>
      <Pressable
        onPress={() => {
          router.navigate("/add")
        }}
        className={"bg-white rounded-full w-12 h-12 items-center justify-center"}
      >
        <Ionicons name="add" size={24} color="black"/>
      </Pressable>
    </View>
  )
}

export default memo(AddDreamButton)