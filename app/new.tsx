import {View, Text, Pressable, TextInput, ScrollView} from "react-native";
import {memo, useState} from "react";
import {useSafeAreaInsets} from "react-native-safe-area-context";
import {router} from "expo-router";

function Page() {
  const insets = useSafeAreaInsets();
  const [interval, setInterval] = useState("4h");

  const INTERVALS = [
    "1h", "2h", "4h", "6h", "8h", "12h", "1D"
  ]

  const MODE = [
    "低", "中等", "高"
  ]

  return (
    <View
      style={{
        paddingBottom: insets.bottom + 12,
      }}
      className={"flex h-full bg-[#121212] px-3"}
    >
      <ScrollView
        style={{
          paddingTop: insets.top + 20,
          paddingBottom: insets.bottom + 12,
        }}
        className={"flex space-y-6 relative"}
        showsVerticalScrollIndicator={false}
      >
        <View className={"space-y-3"}>
          <Text className={"text-white font-medium"}>旅行时长</Text>
          <ScrollView
            horizontal={true}
            className={"space-x-2"}
            showsHorizontalScrollIndicator={false}
          >
            {
              INTERVALS.map((item) => (
                <Pressable
                  key={item}
                  onPress={() => {
                    setInterval(item)
                  }}
                  className={`${item === interval ? 'bg-[#1ED760]' : 'bg-[#272727]'} px-3 py-1.5 rounded-full`}
                >
                  <Text className={`${item === interval ? 'text-black' : 'text-white'} text-xs`}>{item}</Text>
                </Pressable>
              ))
            }
          </ScrollView>
        </View>
        <View className={"space-y-3"}>
          <Text className={"text-white font-medium"}>预算程度</Text>
          <ScrollView
            horizontal={true}
            className={"space-x-2"}
            showsHorizontalScrollIndicator={false}
          >
            {
              MODE.map((item) => (
                <Pressable
                  key={item}
                  onPress={() => {
                    setInterval(item)
                  }}
                  className={`${item === interval ? 'bg-[#1ED760]' : 'bg-[#272727]'} px-3 py-1.5 rounded-full`}
                >
                  <Text className={`${item === interval ? 'text-black' : 'text-white'} text-xs`}>{item}</Text>
                </Pressable>
              ))
            }
          </ScrollView>
        </View>
        <View className={"space-y-3"}>
          <Text className={"text-white font-medium"}>目的地详情</Text>
          <TextInput
            multiline={true}
            className={"bg-white p-2 rounded h-20"}
          />
        </View>

      </ScrollView>
      <View className={"pt-8 flex space-y-3"}>
        <View className={"flex flex-row space-x-3"}>
          <Pressable
            onPress={() => {
              router.back();
            }}
            className={"py-3 bg-[#272727] flex rounded items-center flex-1"}
          >
            <Text className={"text-white font-medium"}>返回</Text>
          </Pressable>
        </View>
        <Pressable className={"py-3 w-full bg-[#1ED760] flex rounded items-center"}>
          <Text className={"text-black font-medium"}>立即规划</Text>
        </Pressable>
      </View>
    </View>
  );
}

export default memo(Page);
