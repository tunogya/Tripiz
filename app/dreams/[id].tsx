import {View, Text, ScrollView, Pressable} from "react-native";
import {memo} from "react";
import {useSafeAreaInsets} from "react-native-safe-area-context";
import {Ionicons} from "@expo/vector-icons";
import {BlurView} from "expo-blur";
import {router} from "expo-router";

const Page = () => {
  const insets = useSafeAreaInsets();
  return (
    <View
      className={"flex flex-1 h-full bg-[#121212] relative"}
    >
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
          <Ionicons name="chevron-back" size={24} color="white"/>
        </BlurView>
      </Pressable>
      <View className={"h-[50%] w-full absolute top-0 left-0 z-0"}>
        <Text className={"text-white"}>background image</Text>
      </View>
      <ScrollView
        className={"h-full w-full px-4 absolute top-0 left-0 z-10"}
        style={{
          paddingTop: insets.top + 100,
          paddingBottom: insets.bottom + 66,
        }}
      >
        <Text className={"text-white"}>
          Hello
        </Text>
      </ScrollView>
    </View>
  );
};

export default memo(Page);
