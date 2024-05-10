import { View, Text, ScrollView, Pressable } from "react-native";
import React, { memo } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Feather, Ionicons } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import { router, useLocalSearchParams } from "expo-router";
import { Dimensions } from "react-native";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { ensureString } from "../../utils/ensureString";
import Svg, { Path } from "react-native-svg";

const Page = () => {
  const { id } = useLocalSearchParams();
  const insets = useSafeAreaInsets();
  const screenWidth = Dimensions.get("window").width;
  const { entities } = useSelector((state: RootState) => state.reflection);

  const reflection = id ? entities?.[ensureString(id)] : null;

  return (
    <View className={"flex flex-1 h-full bg-[#121212] relative"}>
      <Pressable
        className={"absolute left-4 z-50 rounded-full overflow-hidden"}
        style={{
          top: insets.top,
        }}
        onPress={() => router.back()}
      >
        <BlurView
          intensity={100}
          tint={"dark"}
          className={"items-center justify-center w-10 h-10"}
        >
          <Ionicons name="chevron-back" size={24} color="white" />
        </BlurView>
      </Pressable>
      <View
        className={"w-full absolute top-0 left-0 z-0"}
        style={{
          height: screenWidth * 0.99,
        }}
      >
        {/*  Image*/}
      </View>
      <ScrollView
        className={"h-full w-full absolute top-0 left-0 z-10"}
        style={{
          paddingBottom: insets.bottom + 66,
        }}
      >
        <View
          className={"justify-end p-4"}
          style={{
            height: screenWidth * 0.99,
          }}
        >
          <Text className={"text-white text-5xl font-bold"}>
            {reflection.title}
          </Text>
        </View>
        <BlurView intensity={5} tint={"dark"}>
          <View className={"p-4 space-y-1.5"}>
            <Text className={"text-[#B3B3B3] font-medium"}>
              {reflection.description}
            </Text>
            <View className={"flex flex-row space-x-2 items-center"}>
              <View
                className={
                  "bg-green-500 h-6 w-6 rounded-full items-center justify-center"
                }
              >
                <Ionicons name="flash-sharp" size={16} color="#121212" />
              </View>
              <Text className={"text-white font-bold"}>Reflection</Text>
            </View>
            <Text className={"text-[#B3B3B3] font-medium"}>
              {new Date(reflection.date).toLocaleDateString()}
            </Text>
            <View className={"flex flex-row items-center justify-between py-4"}>
              <View className={"flex flex-row items-center space-x-6"}>
                <Pressable
                  className={"w-9 h-12 border-2 border-[#B3B3B3] rounded"}
                ></Pressable>
                <Pressable
                  className={"h-8 w-8 rounded-full items-center justify-center"}
                >
                  <Ionicons
                    name="add-circle-outline"
                    size={32}
                    color="#B3B3B3"
                  />
                </Pressable>
                <Pressable
                  className={"h-6 w-6 rounded-full items-center justify-center"}
                >
                  <Ionicons
                    name="ellipsis-horizontal"
                    size={24}
                    color="#B3B3B3"
                  />
                </Pressable>
              </View>
              <View className={"flex flex-row items-center space-x-4"}>
                <Pressable
                  className={
                    "h-12 w-12 rounded-full items-center justify-center"
                  }
                >
                  <Ionicons
                    name="flash-outline"
                    size={28}
                    color="rgb(34,197,94)"
                  />
                </Pressable>
                <Pressable
                  className={
                    "bg-green-500 h-12 w-12 rounded-full items-center justify-center"
                  }
                >
                  <Feather name="edit" size={24} color="#121212" />
                </Pressable>
              </View>
            </View>
          </View>
        </BlurView>
        <View className={"p-4 mt-2"}>
          {/*<Text className={"text-white font-bold text-xl"}>你可能还会喜欢</Text>*/}
        </View>
      </ScrollView>
    </View>
  );
};

export default memo(Page);
