import {Text, View} from "react-native";
import {FC, memo} from "react";
import {LinearGradient} from "expo-linear-gradient";

const Block: FC<{
  text: string
}> = ({text}) => {
  return (
    <LinearGradient colors={["#296250", "#53B274"]} className={"w-[140px] h-full relative"}>
      <Text className={"text-white text-center absolute w-full p-2 text-xs"}>Free</Text>
      <View className={"w-full h-full absolute items-center justify-center px-4"}>
        <Text className={"text-white font-bold text-xl text-center"}>
          {text}
        </Text>
      </View>
    </LinearGradient>
  )
}

export default memo(Block)