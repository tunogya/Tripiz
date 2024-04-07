import {View, Text, Pressable} from "react-native";

export default function Page() {

  return (
    <View className={"flex flex-1 bg-[#121212] w-full h-full space-y-4 pt-5"}>
      <Pressable
        className={"px-3 flex flex-row justify-between items-center"}
      >
        <Text className={"text-white font-medium"}>
          English
        </Text>
      </Pressable>
      <Pressable className={"px-3 flex flex-row justify-between items-center"}>
        <Text className={"text-white font-medium"}>
          简体中文
        </Text>
      </Pressable>
    </View>
  );
}
