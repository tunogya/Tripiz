import {
  useWindowDimensions,
  View,
  Text,
  Pressable,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { memo, useState } from "react";
import { SceneMap, TabBar, TabView } from "react-native-tab-view";
import { Ionicons } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  removeOneDream,
  updateOneDream,
} from "../../../reducers/dreams/dreamSlice";
import { router, useLocalSearchParams } from "expo-router";
import { ensureString } from "../../../utils/ensureString";

const Page = () => {
  const { id } = useLocalSearchParams();
  const layout = useWindowDimensions();
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: "story", title: "Dream" },
    { key: "details", title: "Details" },
  ]);
  const { entities } = useSelector((state: RootState) => state.dream);
  const dispatch = useDispatch();
  const dream = id ? entities?.[ensureString(id)] : null;

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
      <View className={"px-3"}>
        <TextInput
          placeholder="Title"
          placeholderTextColor={"#B3B3B3"}
          className={"text-white text-lg font-bold py-3 border-b border-[#222222]"}
          value={dream?.title}
        />
      </View>
      <View className={"px-3 flex-1"}>
        <TextInput
          multiline
          numberOfLines={5}
          placeholder="Content"
          placeholderTextColor={"#B3B3B3"}
          className={"text-white py-3 flex-1"}
          value={dream?.title}
        />
      </View>
    </View>
  );
};

export default memo(Page);
