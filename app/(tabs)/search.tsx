import {View, Text, Pressable, TextInput} from "react-native";
import { memo } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {Ionicons} from "@expo/vector-icons";
import AddDreamButton from "../../components/AddButton";

const Page = () => {
  const insets = useSafeAreaInsets();
  return (
    <View
      className={"flex flex-1 h-full bg-[#121212]"}
      style={{
        paddingTop: insets.top + 20,
      }}
    >
      <View className={"p-4 flex flex-row justify-between items-center"}>
        <Text className={"text-white font-bold text-2xl"}>Search</Text>
        <Pressable hitSlop={8}>
          <Ionicons name="camera-outline" size={24} color="white" />
        </Pressable>
      </View>
      <View className={"px-4"}>
        <View className={"flex flex-row bg-white rounded-lg h-12 px-3 items-center space-x-3"}>
          <Ionicons name="search" size={24} color="black" />
          <TextInput
            placeholderTextColor={"#B3B3B3"}
            placeholder={"Search..."}
            className={""}
          />
        </View>
      </View>
      <AddDreamButton/>
    </View>
  );
};

export default memo(Page);
