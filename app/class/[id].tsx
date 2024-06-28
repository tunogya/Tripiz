import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import React, { memo, useState } from "react";
import { router, useLocalSearchParams } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { t } from "../../i18n";
import { ensureString } from "../../utils/ensureString";

const Page = () => {
  const { id } = useLocalSearchParams();
  const [scrollY, setScrollY] = useState(0);
  const insets = useSafeAreaInsets();

  const handleScroll = (event) => {
    setScrollY(event.nativeEvent.contentOffset.y);
  };

  return (
    <View className={"flex flex-1 h-full bg-[#121212] relative"}>
      <ScrollView
        stickyHeaderIndices={[0]}
        className={"flex flex-1 h-full"}
        style={{
          marginTop: insets.top,
        }}
        scrollEventThrottle={1000}
        onScroll={handleScroll}
      >
        <View
          className={
            "w-full flex flex-row items-center justify-between bg-[#121212]"
          }
        >
          <TouchableOpacity
            onPress={() => {
              router.back();
            }}
            className={"w-10 h-10 items-center justify-center"}
          >
            <Ionicons name="chevron-back" size={28} color="white" />
          </TouchableOpacity>
          <View
            style={{
              opacity: Math.min(scrollY, 48) / 48,
            }}
          >
            <Text className={"text-white font-bold text-[16px]"}>
              {t(ensureString(id))}
            </Text>
          </View>
          <View className={"w-10"}></View>
        </View>
        <Text className={"text-white px-4 py-2 font-bold text-2xl"}>
          {t(ensureString(id))}
        </Text>
        <View className={"py-4"}>
          <Text className={"text-white font-bold px-4 text-[16px]"}>Tom</Text>
        </View>
      </ScrollView>
    </View>
  );
};

export default memo(Page);
