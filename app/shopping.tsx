import {View, Text, TextInput, Pressable} from "react-native";
import {useLocalSearchParams} from "expo-router";
import {useState} from "react";

const Page = () => {
  const { travelId } = useLocalSearchParams()
  const [ amount, setAmount ] = useState("");
  const [ description, setDescription ] = useState("");

  return (
    <View className={"flex h-full bg-[#121212] px-3 space-y-6"}>
      <View className={"space-y-3"}>
        <Text className={"text-white font-semibold"}>消费金额</Text>
        <TextInput
          className={"p-3 bg-white rounded"}
          placeholder={"0"}
          value={amount}
          onChangeText={(e) => {
            setAmount(e)
          }}
        />
      </View>
      <View className={"space-y-3"}>
        <Text className={"text-white font-semibold"}>描述(可选)</Text>
        <TextInput
          className={"p-3 bg-white rounded"}
          placeholder={"消费描述"}
          value={description}
          onChangeText={(e) => {
            setDescription(e)
          }}
        />
      </View>
      <View className={"pt-3"}>
        <Pressable className={"bg-[#1ED760] p-3 rounded-lg flex items-center"}>
          <Text className={"text-black font-semibold"}>记录</Text>
        </Pressable>
      </View>
    </View>
  )
}

export default Page