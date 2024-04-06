import { View, Text } from "react-native";
import { memo } from "react";

function Page() {
  return (
    <View
      className={"flex flex-1 h-full bg-[#121212]"}
    >
      <Text>新建旅行</Text>
    </View>
  );
}

export default memo(Page);
