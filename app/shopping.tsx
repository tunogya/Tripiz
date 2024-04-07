import {View, Text} from "react-native";
import {useLocalSearchParams} from "expo-router";

const Page = () => {
  const { travelId } = useLocalSearchParams()

  return (
    <View className={"flex h-full bg-[#121212] px-3"}>
      <Text className={"text-white"}>Shopping</Text>
    </View>
  )
}

export default Page