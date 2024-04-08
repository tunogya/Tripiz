import {router, useLocalSearchParams} from "expo-router";
import {FlatList, Pressable, ScrollView, Text, View} from "react-native";
import {useSafeAreaInsets} from "react-native-safe-area-context";
import {useSelector} from "react-redux";
import {RootState} from "../../store/store";
import moment from "moment";
import {useEffect, useState} from "react";
import {ProgressCircle} from "react-native-svg-charts";
import {Ionicons} from "@expo/vector-icons";
import Task from "../../components/Task";

export function ensureString(value: string | string[]) {
  if (Array.isArray(value)) {
    return value[0];
  }
  return value;
}

export default function Page() {
  const {id, canGoBack} = useLocalSearchParams();
  const insets = useSafeAreaInsets();
  const {entities} = useSelector((state: RootState) => state.travel);
  const travel = entities?.[ensureString(id)];
  const calculateTimeLeft = () => {
    const now = moment();
    const duration = moment.duration(
      moment(travel.timestamp.end * 1000).diff(now),
    );
    if (duration.asSeconds() <= 0) {
      return {days: 0, hours: 0, minutes: 0, seconds: 0};
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
      <View className={"flex flex-row justify-between"}>
        <Pressable
          onPress={() => {
            if (canGoBack === "false") {
              router.navigate('/')
            } else {
              router.back();
            }
          }}
          className={"w-5 h-5 flex items-center justify-center"}
        >
          <Ionicons name="chevron-back" size={20} color="white"/>
        </Pressable>
        <View className={"flex space-y-1 pb-3"}>
          <Text className={"text-[#A7A7A7] text-xs text-center"}>
            本次旅途将在以下时间后结束
          </Text>
          <Text className={"text-white font-bold text-center"}>
            {timeLeft.days ? `${timeLeft.days}天 ` : ""}
            {timeLeft.hours}:{timeLeft.minutes}:{timeLeft.seconds}
          </Text>
        </View>
        <Pressable className={"w-5 h-5 flex items-center justify-center"}>
          <Ionicons name="ellipsis-horizontal-sharp" size={20} color="white"/>
        </Pressable>
      </View>
      <ScrollView
        className={"space-y-6 py-3"}
        showsVerticalScrollIndicator={false}
      >
        <View className={"relative"}>
          <ProgressCircle
            style={{height: 200}}
            progress={travel.available / travel.budget}
            progressColor={"#1ED760"}
            strokeWidth={10}
          />
          <View
            className={
              "absolute w-full h-full flex items-center justify-center"
            }
          >
            <Text className={"text-white text-3xl font-bold"}>{travel.budget.toFixed(0)}</Text>
            <Text className={"text-[#A7A7A7] text-xs font-bold"}>初始总预算</Text>
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
            <Text className={"text-white font-bold"}>{travel.available.toFixed(0)}</Text>
          </View>
          <Pressable
            className={"flex space-y-1 items-center w-20"}
            onPress={() => {
              router.navigate(`shopping?travelId=${travel.id}`)
            }}
          >
            <View className={"flex flex-row space-x-1 items-center"}>
              <Text className={"text-[#A7A7A7] text-xs font-medium"}>已使用</Text>
              <Ionicons name="chevron-forward" size={12} color="#A7A7A7" />
            </View>
            <Text className={"text-white font-bold"}>{(travel.budget - travel.available).toFixed(0)}</Text>
          </Pressable>
        </View>
        <View className={"pt-6 space-y-3"}>
          <Text className={"text-white text-center text-lg font-semibold"}>
            所有任务
          </Text>
          <FlatList
            data={travel.taskIds}
            scrollEnabled={false}
            renderItem={({item}) => (
              <Task id={item} />
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
