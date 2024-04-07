import {View, Text, ScrollView, Pressable} from "react-native";
import {useSafeAreaInsets} from "react-native-safe-area-context";

const NewTask = () => {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={{
        paddingBottom: insets.bottom + 12,
      }}
      className={"flex h-full bg-[#121212] px-3"}
    >
      <ScrollView className={'pt-4 space-y-6'}>
        <Text className={"text-white font-medium"}>必做任务</Text>

        <Text className={"text-white font-medium"}>选做任务</Text>
      </ScrollView>
      <View className={"space-y-3"}>
        <Pressable className={"rounded-lg bg-[#272727] items-center"}>
          <Text className={"text-white py-3 font-medium"}>重新生成</Text>
        </Pressable>
        <Pressable className={"rounded-lg bg-[#1ED760] items-center"}>
          <Text className={"text-black py-3 font-medium"}>立即启程</Text>
        </Pressable>
      </View>
    </View>
  )
}

export default NewTask;