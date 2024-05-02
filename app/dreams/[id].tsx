import {View, Text} from "react-native";
import {memo} from "react";

const Page = () => {
  return (
    <View>
      <Text className={"text-white"}>Dream Details</Text>
    </View>
  )
}

export default memo(Page)