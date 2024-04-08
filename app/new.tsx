import { View, Text, Pressable, TextInput, ScrollView } from "react-native";
import { memo, useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { router } from "expo-router";

function Page() {
  const insets = useSafeAreaInsets();
  const [duration, setDuration] = useState("4h");
  const [budgetLevel, setBudgetLevel] = useState("中等");
  const [location, setLocation] = useState("");

  const INTERVALS = [
    "随机",
    "1h",
    "2h",
    "4h",
    "6h",
    "8h",
    "12h",
    "1D",
    "2D",
    "4D",
  ];

  const MODE = ["随机", "低", "中等", "高"];

  return (
    <View
      style={{
        paddingBottom: insets.bottom + 12,
      }}
      className={"flex h-full bg-[#121212]"}
    >
      <ScrollView
        style={{
          paddingTop: 16,
          paddingBottom: insets.bottom + 12,
        }}
        className={"flex space-y-6 relative"}
        showsVerticalScrollIndicator={false}
      >
        <View className={"space-y-3"}>
          <Text className={"text-white font-medium px-3"}>旅途时长</Text>
          <ScrollView
            horizontal={true}
            className={"space-x-2"}
            showsHorizontalScrollIndicator={false}
          >
            <View className={"w-1"}></View>
            {INTERVALS.map((item) => (
              <Pressable
                key={item}
                onPress={() => {
                  setDuration(item);
                }}
                className={`${item === duration ? "bg-[#1ED760]" : "bg-[#292929]"} px-3 py-1.5 rounded-full`}
              >
                <Text
                  className={`${item === duration ? "text-black" : "text-white"} text-xs`}
                >
                  {item}
                </Text>
              </Pressable>
            ))}
            <View className={"w-1"}></View>
          </ScrollView>
        </View>
        <View className={"space-y-3"}>
          <Text className={"text-white font-medium px-3"}>旅途预算</Text>
          <View className={"space-x-2 flex flex-row"}>
            <View className={"w-1"}></View>
            {MODE.map((item) => (
              <Pressable
                key={item}
                onPress={() => {
                  setBudgetLevel(item);
                }}
                className={`${item === budgetLevel ? "bg-[#1ED760]" : "bg-[#292929]"} px-3 py-1.5 rounded-full`}
              >
                <Text
                  className={`${item === budgetLevel ? "text-black" : "text-white"} text-xs`}
                >
                  {item}
                </Text>
              </Pressable>
            ))}
            <View className={"w-1"}></View>
          </View>
        </View>
        <View className={"space-y-3 px-3"}>
          <Text className={"text-white font-medium"}>目的地</Text>
          <TextInput
            multiline={true}
            className={"bg-white p-2 rounded h-20"}
            placeholder={"上海市"}
            onChangeText={(e) => setLocation(e)}
          />
        </View>
      </ScrollView>
      <View className={"pt-8 flex space-y-3 px-3"}>
        <Pressable
          onPress={() => {
            router.push(`newTask?duration=${duration}&location=${location}&budgetLevel=${budgetLevel}`);
          }}
          className={"py-3 w-full bg-[#1ED760] flex rounded items-center"}
        >
          <Text className={"text-black font-medium"}>生成任务清单</Text>
        </Pressable>
      </View>
    </View>
  );
}

export default memo(Page);
