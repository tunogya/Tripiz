import { View, Text, ScrollView, Pressable } from "react-native";
import React, { memo } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Feather, Ionicons } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import { router, useLocalSearchParams } from "expo-router";
import { Dimensions } from "react-native";
import {useDispatch, useSelector} from "react-redux";
import { RootState } from "../../store/store";
import { ensureString } from "../../utils/ensureString";
import Svg, { Path } from "react-native-svg";
import {updateOneDream} from "../../reducers/dreams/dreamSlice";

const Page = () => {
  const { id } = useLocalSearchParams();
  const insets = useSafeAreaInsets();
  const screenWidth = Dimensions.get("window").width;
  const { entities } = useSelector((state: RootState) => state.dream);
  const dispatch = useDispatch();
  const item = id ? entities?.[ensureString(id)] : null;

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
          className={"items-center justify-center w-8 h-8"}
        >
          <Ionicons name="chevron-back-sharp" size={20} color="white" />
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
          <Text className={"text-white text-5xl font-bold"}>{item.title}</Text>
        </View>
        <BlurView intensity={5} tint={"dark"}>
          <View className={"p-4 space-y-1.5"}>
            <Text className={"text-[#B3B3B3] font-medium"}>
              {item.description}
            </Text>
            <View className={"flex flex-row space-x-2 items-center"}>
              <View
                className={
                  "bg-green-500 h-5 w-5 rounded-full items-center justify-center"
                }
              >
                <Ionicons name="moon-sharp" size={16} color="#121212" />
              </View>
              <Text className={"text-white font-bold"}>Dream</Text>
            </View>
            <Text className={"text-[#B3B3B3] font-medium"}>
              {item.rate} Star · {new Date(item.date).toLocaleDateString()}
            </Text>
            <View className={"flex flex-row items-center justify-between py-2"}>
              <View className={"flex flex-row items-center space-x-6"}>
                <Pressable
                  className={"w-8 h-10 border-2 border-[#B3B3B3] rounded"}
                ></Pressable>
                <Pressable
                  className={"h-6 w-6 rounded-full items-center justify-center"}
                  onPress={() => {
                    dispatch(updateOneDream({
                      id: item.id,
                      changes: {
                        favoured: !item.favoured
                      }
                    }))
                  }}
                >
                  {
                    item.favoured ? (
                      <Ionicons name="checkmark-circle-sharp" size={26} color="rgb(34,197,94)" />
                    ) : (
                      <Ionicons
                        name="add-circle-outline"
                        size={26}
                        color="#B3B3B3"
                      />
                    )
                  }
                </Pressable>
                <Pressable
                  className={"h-6 w-6 rounded-full items-center justify-center"}
                >
                  <Ionicons
                    name="ellipsis-horizontal"
                    size={20}
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
          {/*<Text className={"text-white font-bold text-xl"}>可能关联的内容</Text>*/}
        </View>
      </ScrollView>
    </View>
  );
};

export default memo(Page);
