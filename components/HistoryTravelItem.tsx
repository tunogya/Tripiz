import { FC, memo, useEffect, useState } from "react";
import { Pressable, Text, View } from "react-native";
import { router } from "expo-router";
import { Travel } from "../reducers/travel/travelSlice";
import { Ionicons } from "@expo/vector-icons";
import moment from "moment/moment";

const HistoryTravelItem: FC<{
  travel?: Travel;
}> = ({ travel }) => {
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
    <Pressable
      onPress={() => {
        router.push(`travels/${travel?.id}`);
      }}
      className={"bg-[#292929] my-1.5 rounded-lg flex flex-row overflow-hidden"}
    >
      <View
        className={
          "h-24 w-24 bg-[#292929] shadow-lg items-center justify-center"
        }
      >
        <Ionicons name="image-outline" size={24} color="#A7A7A7" />
      </View>
      <View className={"p-3 space-y-2"}>
        <Text className={"text-white font-semibold"} numberOfLines={1}>
          {travel?.title}
        </Text>
        <View>
          <Text className={"text-white text-xs font-semibold"}>
            预算 {travel.available}/{travel?.budget} (
            {Math.floor((travel.available / travel.budget) * 100)}%)
          </Text>
          <Text className={"text-white text-xs font-semibold"}>任务 0/4</Text>
          <Text className={"text-white text-xs font-semibold"}>
            截止 {timeLeft.days ? `${timeLeft.days}天 ` : ""}
            {timeLeft.hours}:{timeLeft.minutes}:{timeLeft.seconds}
          </Text>
        </View>
      </View>
    </Pressable>
  );
};

export default memo(HistoryTravelItem);
