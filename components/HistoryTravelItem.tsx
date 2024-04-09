import { FC, memo, useEffect, useMemo, useState } from "react";
import { Pressable, Text, View } from "react-native";
import { router } from "expo-router";
import moment from "moment/moment";
import { t } from "../i18n";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";

const HistoryTravelItem: FC<{
  id: string;
}> = ({ id }) => {
  const { entities: tasks } = useSelector((state: RootState) => state.task);
  const { entities: travels } = useSelector((state: RootState) => state.travel);
  const travel = travels[id];

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

  const calculateDuration = () => {
    const duration = moment.duration(
      moment(travel.timestamp.end * 1000).diff(
        moment(travel.timestamp.start * 1000),
      ),
    );
    return {
      days: duration.days() ? duration.days().toString().padStart(2, "0") : 0,
      hours: duration.hours().toString().padStart(2, "0"),
      minutes: duration.minutes().toString().padStart(2, "0"),
      seconds: duration.seconds().toString().padStart(2, "0"),
    };
  };

  const duration = calculateDuration();

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

  const calculateDoneTasks = useMemo(() => {
    let sum = 0;
    for (const id of travel.taskIds) {
      if (tasks[id].status === "SUCCESS") {
        sum += 1;
      }
    }
    return sum;
  }, [tasks]);

  return (
    <Pressable
      onPress={() => {
        router.push(`travels/${travel?.id}`);
      }}
      className={`${isEnd ? "bg-[#181818]" : "bg-[#292929]"} my-1.5 rounded-lg flex flex-row overflow-hidden shadow-lg`}
    >
      {/*<View*/}
      {/*  className={`h-24 w-24 ${isEnd ? "bg-[#181818]" : "bg-[#292929]"} shadow-lg items-center justify-center`}*/}
      {/*>*/}
      {/*  <Ionicons name="image-outline" size={24} color="#A7A7A7" />*/}
      {/*</View>*/}
      <View className={"p-3 space-y-2 flex-1 flex justify-center"}>
        <View className={"flex flex-row items-start justify-between"}>
          <View className={"flex space-y-1"}>
            <Text
              className={"text-white font-semibold truncate"}
              numberOfLines={1}
            >
              {travel?.title}
            </Text>
            <Text className={"text-[#A7A7A7] font-bold text-xs"}>
              {new Date(travel?.timestamp.start * 1000).toLocaleDateString()}
            </Text>
          </View>
          {isEnd ? (
            <Text className={"text-[#A7A7A7] text-xs font-bold"}>
              {duration.days ? `${duration.days}${t("day")} ` : ""}
              {duration.hours}:{duration.minutes}:{duration.seconds}
            </Text>
          ) : (
            <Text className={"text-[#1ED760] text-xs font-bold"}>
              {timeLeft.days ? `${timeLeft.days}${t("day")} ` : ""}
              {timeLeft.hours}:{timeLeft.minutes}:{timeLeft.seconds}
            </Text>
          )}
        </View>
        <View className={"flex flex-row items-center space-x-3 flex-1"}>
          <View className={"flex flex-row items-center space-x-1.5"}>
            <Text className={"text-[#A7A7A7] text-xs font-semibold"}>
              {t("costed")}
            </Text>
            <Text className={"text-white text-xl font-bold"}>
              {travel?.budget - travel.available}
            </Text>
          </View>
          <View className={"h-4 border-r border-[#A7A7A7]"} />
          <View className={"flex flex-row items-center space-x-1.5"}>
            <Text className={"text-[#A7A7A7] text-xs font-semibold"}>
              {t("tasks")}
            </Text>
            <Text className={"text-white text-xl font-bold"}>
              {calculateDoneTasks}
            </Text>
          </View>
        </View>
      </View>
    </Pressable>
  );
};

export default memo(HistoryTravelItem);
