import {
  useWindowDimensions,
  View,
  Text,
  Pressable,
  TextInput,
  ScrollView,
} from "react-native";
import { memo, useState } from "react";
import { useLocalSearchParams } from "expo-router";

const Page = () => {
  const { id } = useLocalSearchParams();
  const layout = useWindowDimensions();
  const [index, setIndex] = useState(0);

  return (
    <View className={"bg-[#121212] flex flex-1"}>
      <View className={"flex justify-center items-center pt-2"}>
        <View className={"w-10 h-1 bg-[#B3B3B3] rounded-full"}></View>
      </View>
      <View className={"flex-row justify-between p-3 items-center"}>
        <View></View>
        <Pressable
          className={`rounded-full items-center justify-center flex flex-row space-x-1`}
        >
          <Text className={"font-bold text-white"}>Post</Text>
        </Pressable>
      </View>
      <View className={"px-3 pb-4"}>
        <ScrollView
          horizontal
          className={"flex flex-row"}
          showsHorizontalScrollIndicator={false}
        >
          <View className={"h-10 w-10 bg-gray-500 rounded"}></View>
        </ScrollView>
      </View>
      <View className={"px-3 flex-1"}>
        <TextInput
          multiline
          numberOfLines={5}
          placeholder="Content"
          placeholderTextColor={"#B3B3B3"}
          className={"text-white py-3 flex-1"}
          // value={dream?.title}
        />
      </View>
    </View>
  );
};

export default memo(Page);
