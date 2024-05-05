import { Pressable, View, Text } from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { memo, useState } from "react";
import { router } from "expo-router";
import { BlurView } from "expo-blur";

const AddButton = () => {
  const insets = useSafeAreaInsets();
  const [openMore, setOpenMore] = useState(false);

  const normalView = () => (
    <View
      className={
        "absolute flex flex-row items-center bg-white rounded-full shadow"
      }
      style={{
        right: 20,
        bottom: insets.bottom + 66,
      }}
    >
      <Pressable
        onPress={() => {
          router.navigate("/add/dream");
        }}
        className={
          "items-center justify-center flex flex-row h-14 pl-4 pr-3 space-x-3"
        }
      >
        <Ionicons name="moon-outline" size={24} color="#121212" />
        <Text className={"font-bold text-lg"}>New dream</Text>
      </Pressable>
      <View className={"bg-[#121212] w-0.5 h-10 opacity-20"}></View>
      <Pressable
        className={
          "items-center justify-center flex flex-row h-14 pl-3 pr-4 space-x-1"
        }
        onPress={() => {
          setOpenMore(true);
        }}
      >
        <Ionicons name="chevron-up" size={24} color="#121212" />
      </Pressable>
    </View>
  );

  const openMoreView = () => (
    <View className={"absolute w-full h-full"}>
      <BlurView intensity={100} tint="dark">
        <View className={"relative w-full h-full"}>
          <Pressable
            onPress={() => {
              setOpenMore(false);
            }}
            className={"absolute w-full h-full"}
          ></Pressable>
          <View
            className={"absolute flex items-end space-y-3"}
            style={{
              right: 20,
              bottom: insets.bottom + 66,
            }}
          >
            <View className={"flex flex-row space-x-6 items-center"}>
              <Text className={"text-white text-lg font-bold"}>
                New thought
              </Text>
              <View className={"bg-[#242424] p-2 rounded-full m-1"}>
                <MaterialCommunityIcons
                  name="thought-bubble-outline"
                  size={24}
                  color="white"
                />
              </View>
            </View>
            <View className={"flex flex-row space-x-6 items-center"}>
              <Text className={"text-white text-lg font-bold"}>New memory</Text>
              <View className={"bg-[#242424] p-2 rounded-full m-1"}>
                <Ionicons name="sunny-outline" size={24} color="white" />
              </View>
            </View>
            <Pressable
              className={"flex flex-row space-x-6 items-center"}
              onPress={() => {
                setOpenMore(false);
                router.push("/add/dream");
              }}
            >
              <Text className={"text-white text-lg font-bold"}>New dream</Text>
              <View className={"bg-white p-3 rounded-full"}>
                <Ionicons name="moon-outline" size={24} color="black" />
              </View>
            </Pressable>
          </View>
        </View>
      </BlurView>
    </View>
  );

  if (openMore) {
    return openMoreView();
  } else {
    return normalView();
  }
};

export default memo(AddButton);
