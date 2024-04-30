import {View, Text} from "react-native";
import {memo} from "react";
import {useSafeAreaInsets} from "react-native-safe-area-context";

const Page = () => {
  const insets = useSafeAreaInsets();
  return (
    <View
      className={"flex flex-1 h-full bg-[#121212]"}
      style={{
        paddingTop: insets.top + 20,
      }}
    >
      <Text>会员计划</Text>
    </View>
  )
}

export default memo(Page);