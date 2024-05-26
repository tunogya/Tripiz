import {Dimensions, Pressable, Text, View, Image, TouchableOpacity} from "react-native";
import {Ionicons} from "@expo/vector-icons";
import {BlurView} from "expo-blur";
import React, {FC, useState} from "react";

const Feed: FC<{
  item: {
    _id: string,
    text: string,
    category: string,
    entities: {
      media?: {
        id: string,
        url: string,
        media_url: string,
        media_url_https: string,
        type: string,
      }[],
    },
  },
}> = ({item}) => {
  const screenWidth = Dimensions.get('window').width;
  const [index, setIndex] = useState(0);

  return (
    <View
      className={"flex-1 bg-[#FFFFFF12] rounded-2xl mt-4 mb-6 relative overflow-hidden"}
      style={{
        width: screenWidth - 32,
        height: (screenWidth - 32) / 5 * 6,
      }}
    >
      <View className={"w-full h-full"}>
        <Image
          resizeMode={"cover"}
          className={"w-full h-full"}
          source={{
            uri: item.entities.media[index].media_url_https,
          }}
        ></Image>
      </View>
      <View className={"absolute w-full h-full justify-between"}>
        <View className={"w-full flex flex-row items-center p-4 space-x-3"}>
          <View className={"flex flex-row space-x-3 w-full flex-1"}>
            <View className={"flex justify-center flex-row items-center space-x-1"}>
              {
                item.category === "reflection" && (
                  <Ionicons name="flash-outline" size={20} color="white" />
                )
              }
              {
                item.category === "memory" && (
                  <Ionicons name="sunny-outline" size={20} color="white" />
                )
              }
              {
                item.category === "dreams" && (
                  <Ionicons name="moon-outline" size={20} color="white" />
                )
              }
              <Text className={"text-white"}>{item.category}</Text>
            </View>
          </View>
          <TouchableOpacity
            className={"p-1"}
          >
            <Ionicons name="remove-circle-outline" size={28} color="white"/>
          </TouchableOpacity>
          <TouchableOpacity
            className={"p-1"}
          >
            <Ionicons name="add-circle-outline" size={28} color="white"/>
          </TouchableOpacity>
        </View>
        <View className={"w-full flex flex-row justify-between items-center px-4"}>
          <Pressable
            className={"w-10 h-10 rounded-full relative overflow-hidden"}
            onPress={() => {
              setIndex((index - 1 + item.entities.media.length) % item.entities.media.length);
            }}
          >
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
          <Pressable
            className={"w-10 h-10 rounded-full relative overflow-hidden"}
            onPress={() => {
              setIndex((index + 1 + item.entities.media.length) % item.entities.media.length);
            }}
          >
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
        <View className={"w-full p-4 space-y-3 h-18"}>
          <Text className={"text-white font-semibold"} numberOfLines={2}>
            {item.text}
          </Text>
        </View>
      </View>
    </View>
  )
}

export default Feed;