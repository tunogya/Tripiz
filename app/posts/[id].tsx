import { View, Text, ScrollView, Image } from "react-native";
import React, {memo} from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { BlurView } from "expo-blur";
import { useLocalSearchParams } from "expo-router";
import { Dimensions } from "react-native";
import useSWR from "swr";

const Page = () => {
  const { id } = useLocalSearchParams();
  const insets = useSafeAreaInsets();
  const screenWidth = Dimensions.get("window").width;

  const { data, isLoading } = useSWR(`https://tripiz.abandon.ai/api/posts/${id}`, (url: string) => fetch(url)
    .then((res) => res.json())
    .then((res) => res.data)
  );

  if (isLoading) {
    return (
      <View
        className={"flex flex-1 h-full bg-[#121212] relative"}
      >
        <Text className={"text-white"}>Loading</Text>
      </View>
    )
  }

  return (
    <View
      className={"flex flex-1 h-full bg-[#121212] relative"}
    >
      <ScrollView
        className={"h-full w-full"}
      >
        {
          data.entities && data.entities?.media?.length > 0 && (
            <View
              className={"w-full"}
              style={{
                height: screenWidth * 0.99,
              }}
            >
              <Image
                className={"w-full h-full"}
                source={{
                  uri: "https://preview.qiantucdn.com/58pic/20231114/00058PICChzpR3rwfa86b_PIC2018_PIC2018.jpg!qt_h320",
                }}
              />
            </View>
          )
        }
        <View className={"p-3 space-y-1"}>
          <Text className={"text-[#B3B3B3] font-medium"}>
            {data.text}
          </Text>
          <Text className={"pt-3 text-[#B3B3B3] text-xs font-medium"}>
            Updated at {new Date(data.updatedAt).toLocaleDateString()}
          </Text>
        </View>
      </ScrollView>
      <BlurView
        intensity={100}
        tint={"dark"}
        className={
          "flex flex-row items-center justify-between px-4 py-2 w-full absolute left-0 bottom-0 bg-[#121212] z-50"
        }
        style={{
          paddingBottom: insets.bottom,
        }}
      >
      </BlurView>
    </View>
  );
};

export default memo(Page);
