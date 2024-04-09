import {View, Text} from "react-native";
import {FC, memo} from "react";
import {useLocalSearchParams} from "expo-router";

const Tips = () => {
  const { title, description } = useLocalSearchParams();

  return (
    <View className={"flex h-full bg-[#121212] p-3 space-y-3"}>
      <Text className={"text-white text-center text-lg font-bold"}>{title}</Text>
      <Text className={"text-[#A7A7A7] text-center text-sm py-6"}>{description}</Text>
    </View>
  )
}

export default memo(Tips)