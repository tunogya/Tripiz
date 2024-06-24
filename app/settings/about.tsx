import {ScrollView, Text, View} from "react-native";
import {memo} from "react";
import Constants from "expo-constants";

const Page = () => {
  return (
    <ScrollView className={"bg-[#121212] flex flex-1"}>
      <View
        className={"px-4 py-2 flex flex-row justify-between items-center"}>
        <Text className={"text-white font-medium"}>
          Version
        </Text>
        <Text className={"text-[#B3B3B3] text-xs"}>
          {Constants.easConfig.version}
        </Text>
      </View>
      <View
        className={"px-4 py-2 flex flex-row justify-between items-center"}>
        <Text className={"text-white font-medium"}>
          Device Name
        </Text>
        <Text className={"text-[#B3B3B3] text-xs"}>
          {Constants.deviceName}
        </Text>
      </View>
      {
        Constants.debugMode && (
          <View
            className={"px-4 py-2 flex flex-row justify-between items-center"}>
            <Text className={"text-white font-medium"}>
              Mode
            </Text>
            <Text className={"text-[#B3B3B3] text-xs"}>
              Debug
            </Text>
          </View>
        )
      }
    </ScrollView>
  )
}

export default memo(Page)