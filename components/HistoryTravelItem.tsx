import { FC, memo, useEffect, useState } from "react";
import { Pressable, Text, View } from "react-native";
import { router } from "expo-router";
import { Travel } from "../reducers/travel/travelSlice";
import { Ionicons } from "@expo/vector-icons";
import moment from "moment/moment";
import { t } from "../i18n";

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

  const isEnd =
    timeLeft.seconds === 0 &&
    timeLeft.minutes === 0 &&
    timeLeft.hours === 0 &&
    timeLeft.days === 0;

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
      className={`${isEnd ? "bg-[#181818]" : "bg-[#292929]"} my-1.5 rounded-lg flex flex-row overflow-hidden shadow-lg`}
    >
      <View
        className={`h-20 w-20 ${isEnd ? "bg-[#181818]" : "bg-[#292929]"} shadow-lg items-center justify-center`}
      >
        <Ionicons name="image-outline" size={24} color="#A7A7A7" />
      </View>
      <View className={"p-3 space-y-2 flex-1 flex justify-center"}>
        <View className={"flex flex-row items-center justify-between"}>
          <Text
            className={"text-white font-semibold truncate"}
            numberOfLines={1}
          >
            {travel?.title}
          </Text>
          {!isEnd && (
            <Text className={"text-[#1ED760] text-xs font-bold"}>
              {timeLeft.days ? `${timeLeft.days}${t("day")} ` : ""}
              {timeLeft.hours}:{timeLeft.minutes}:{timeLeft.seconds}
            </Text>
          )}
        </View>
        <View>
          <Text className={"text-[#A7A7A7] font-bold text-[10px]"}>
            {new Date(travel?.timestamp.start * 1000).toLocaleDateString()}
          </Text>
          <View className={"flex flex-row items-center space-x-3 flex-1"}>
            <View className={"flex flex-row items-center space-x-1"}>
              <Text className={"text-white text-xl font-bold"}>
                {travel?.budget - travel.available}
              </Text>
              <Text className={"text-[#A7A7A7] text-xs font-semibold"}>
                {t("costed")}
              </Text>
            </View>
            <View className={"h-4 border-r border-[#A7A7A7]"} />
            <View className={"flex flex-row items-center space-x-1"}>
              <Text className={"text-white text-xl font-bold"}>2</Text>
              <Text className={"text-[#A7A7A7] text-xs font-semibold"}>
                {t("tasks")}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </Pressable>
  );
};

export default memo(HistoryTravelItem);
