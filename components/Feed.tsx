import {Dimensions, Pressable, Text, View} from "react-native";
import {Ionicons} from "@expo/vector-icons";
import {BlurView} from "expo-blur";
import React, {FC} from "react";

const Feed: FC<{
  item: {
    _id: string,
    text: string,
    category: string,
  },
}> = ({item}) => {
  const screenWidth = Dimensions.get('window').width;

  return (
    <View
      className={"flex-1 bg-[#FFFFFF12] rounded-2xl mt-4 mb-6 relative"}
      style={{
        width: screenWidth - 32,
        height: (screenWidth - 32) / 5 * 6,
      }}
    >
      <View className={"absolute w-full h-full justify-between"}>
        <View className={"w-full flex flex-row items-center p-4 space-x-3"}>
          <View className={"flex flex-row space-x-3 w-full flex-1"}>
            <View className={"flex justify-center"}>
              <Text className={"text-[#B3B3B3]"}>{item.category}</Text>
            </View>
          </View>
          <Pressable className={"p-1"}>
            <Ionicons name="remove-circle-outline" size={28} color="white"/>
          </Pressable>
          <Pressable className={"p-1"}>
            <Ionicons name="add-circle-outline" size={28} color="white"/>
          </Pressable>
        </View>
        <View className={"w-full flex flex-row justify-between items-center px-4"}>
          <Pressable className={"w-10 h-10 rounded-full relative overflow-hidden"}>
            <BlurView
              intensity={20}
              tint={"dark"}
              style={{
                position: "absolute",
                left: 0,
                bottom: 0,
                right: 0,
                top: 0,
              }}
              className={"items-center justify-center"}
            >
              <Ionicons name="chevron-back" size={24} color="white"/>
            </BlurView>
          </Pressable>
          <Pressable className={"w-10 h-10 items-center justify-center rounded-full"}>
            <BlurView
              intensity={20}
              tint={"dark"}
              style={{
                position: "absolute",
                left: 0,
                bottom: 0,
                right: 0,
                top: 0,
              }}
              className={"items-center justify-center"}
            >
              <Ionicons name="chevron-forward" size={24} color="white"/>
            </BlurView>
          </Pressable>
        </View>
        <View className={"w-full p-4 space-y-3 h-20"}>
          <Text className={"text-white font-semibold"} numberOfLines={2}>
            {item.text}
          </Text>
        </View>
      </View>
    </View>
  )
}

export default Feed;