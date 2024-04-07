import {FC, memo} from "react";
import {Pressable, Text, View} from "react-native";
import {router} from "expo-router";
import {Travel} from "../reducers/travel/travelSlice";
import {Ionicons} from "@expo/vector-icons";

const HistoryTravelItem: FC<{
  travel?: Travel
}> = ({ travel }) => {
  return (
    <Pressable
      onPress={() => {
        router.push(`travels/${travel?.id}`);
      }}
      className={"bg-[#292929] my-1.5 rounded-lg flex flex-row overflow-hidden"}
    >
      <View className={"h-20 w-20 bg-[#292929] shadow-lg items-center justify-center"}>
        <Ionicons name="image-outline" size={24} color="#A7A7A7" />
      </View>
      <View className={'p-3 space-y-2'}>
        <Text className={"text-white font-semibold"}>{travel?.title}</Text>
        <View>
          <Text className={"text-white text-xs font-semibold"}>可用预算 {travel.available}/{travel?.budget} ({Math.floor(travel.available / travel.budget * 100)}%)</Text>
          <Text className={"text-white text-xs font-semibold"}>完成任务 0/4</Text>
        </View>
      </View>
    </Pressable>
  )
}

export default memo(HistoryTravelItem)