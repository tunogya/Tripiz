import { useLocalSearchParams } from "expo-router";
import { FlatList, ScrollView, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import moment from "moment";
import { useEffect, useState } from "react";
import { ProgressCircle } from "react-native-svg-charts";

export function ensureString(value: string | string[]) {
  if (Array.isArray(value)) {
    return value[0];
  }
  return value;
}

export default function Page() {
  const { id } = useLocalSearchParams();
  const insets = useSafeAreaInsets();
  const { entities } = useSelector((state: RootState) => state.travel);
  const travel = entities?.[ensureString(id)];
  const calculateTimeLeft = () => {
    const now = moment();
    const duration = moment.duration(
      moment(travel.timestamp.end * 1000).diff(now),
    );
    if (duration.asSeconds() <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }
    return {
      days: duration.days() ? duration.days().toString().padStart(2, "0") : 0,
      hours: duration.hours().toString().padStart(2, "0"),
      minutes: duration.minutes().toString().padStart(2, "0"),
      seconds: duration.seconds().toString().padStart(2, "0"),
    };
  };
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      const newTimeLeft = calculateTimeLeft();
      setTimeLeft(newTimeLeft);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <View
      style={{
        paddingTop: insets.top + 12,
      }}
      className={"flex h-full bg-[#121212] px-3"}
    >
      <View className={"flex space-y-1 pb-3"}>
        <Text className={"text-[#A7A7A7] text-xs text-center"}>
          本次旅程将在以下时间后结束
        </Text>
        <Text className={"text-white font-bold text-center"}>
          {timeLeft.days ? `${timeLeft.days}天 ` : ""}
          {timeLeft.hours}:{timeLeft.minutes}:{timeLeft.seconds}
        </Text>
      </View>
      <ScrollView
        className={"space-y-6 py-3"}
        showsVerticalScrollIndicator={false}
      >
        <View className={"relative"}>
          <ProgressCircle
            style={{ height: 200 }}
            progress={0.7}
            progressColor={"#1ED760"}
            strokeWidth={10}
          />
          <View
            className={
              "absolute w-full h-full flex items-center justify-center"
            }
          >
            <Text className={"text-white text-3xl font-bold"}>2000</Text>
            <Text className={"text-[#A7A7A7] text-xs font-bold"}>总预算</Text>
          </View>
        </View>
        <View className={"flex flex-row justify-around"}>
          <View className={"flex space-y-1 items-center w-20"}>
            <View className={"flex flex-row items-center space-x-1"}>
              <View className={"bg-[#1ED760] w-2 h-2 rounded-full"}></View>
              <Text className={"text-[#A7A7A7] text-xs font-medium"}>
                可用预算
              </Text>
            </View>
            <Text className={"text-white font-bold"}>1400</Text>
          </View>
          <View className={"flex space-y-1 items-center w-20"}>
            <Text className={"text-[#A7A7A7] text-xs font-medium"}>已使用</Text>
            <Text className={"text-white font-bold"}>600</Text>
          </View>
        </View>
        <View className={"pt-6 space-y-3"}>
          <Text className={"text-white text-center text-lg font-semibold"}>
            所有任务
          </Text>
          <FlatList
            data={travel.taskIds}
            numColumns={3}
            scrollEnabled={false}
            contentContainerStyle={{
              display: "flex",
              alignItems: "center",
            }}
            renderItem={({ item }) => (
              <View className={"flex w-[30%] m-1.5 space-y-0.5"}>
                <View className={"bg-[#292929] p-3 rounded-lg h-16"}>
                  <Text className={"text-white"}>{item}</Text>
                </View>
                <Text className={"text-center text-[#A7A7A7] text-xs"}>
                  {item}
                </Text>
              </View>
            )}
          />
        </View>
        <View
          style={{
            height: insets.bottom,
          }}
        />
      </ScrollView>
    </View>
  );
}
