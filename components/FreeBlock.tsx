import { Text, View } from "react-native";
import { FC, memo } from "react";

const Block: FC<{
  text: string;
}> = ({ text }) => {
  return (
    <View className={"w-[140px] h-full bg-[#333333] relative"}>
      <Text className={"text-white text-center absolute w-full p-2 text-xs"}>
        Free
      </Text>
      <View
        className={"w-full h-full absolute items-center justify-center px-4"}
      >
        <Text className={"text-white font-bold text-xl text-center"}>
          {text}
        </Text>
      </View>
    </View>
  );
};

export default memo(Block);
