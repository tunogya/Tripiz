import {
  View,
  Text,
  ScrollView,
  Pressable,
  ActivityIndicator,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { router, useLocalSearchParams } from "expo-router";
import { useDispatch, useSelector } from "react-redux";
import { addOneTravel, Travel } from "../reducers/travel/travelSlice";
import { addManyTasks, Task } from "../reducers/task/taskSlice";
import uuid from "react-native-uuid";
import { useEffect, useMemo, useState } from "react";
import { RootState } from "../store/store";
import { ensureString } from "./travels/[id]";
import TaskItem from "../components/TaskItem";
import { t } from "../i18n";
import { getLocales } from "expo-localization";
import { scheduleNotificationAsync } from "expo-notifications";

const NewTask = () => {
  const { duration, location, budget } = useLocalSearchParams();
  const insets = useSafeAreaInsets();
  const dispatch = useDispatch();
  const [tasks, setTasks] = useState<Task[]>([]);
  const { key, model, gateway, preference } = useSelector(
    (state: RootState) => state.config,
  );
  const { entities, ids } = useSelector((state: RootState) => state.likeTask);
  const [title, setTitle] = useState("");

  const newTravel = async () => {
    const travel: Travel = {
      id: uuid.v4().toString(),
      title: title,
      timestamp: {
        start: Math.floor(new Date().getTime() / 1000),
        end: Math.floor(new Date().getTime() / 1000) + 4 * 60 * 60,
      },
      budget: Number(budget || 0),
      costed: 0,
      available: Number(budget || 0),
      shoppingIds: [],
      taskIds: tasks.map((i) => i.id),
    };
    dispatch(addManyTasks(tasks));
    dispatch(addOneTravel(travel));
    await scheduleNotificationAsync({
      content: {
        title: t("newTravelSuccess"),
        body: travel.title,
      },
      trigger: { seconds: 1 },
    });
    router.push(`travels/${travel.id}?canGoBack=false`);
    await scheduleNotificationAsync({
      content: {
        title: t("travelEnded"),
        body: travel.title,
      },
      trigger: { date: travel.timestamp.end * 1000 },
    });
  };

  const recentlyLikeTasks = useMemo(() => {
    if (ids.length === 0) {
      return [];
    }
    return ids.map((id) => entities[id]).slice(-10);
  }, [ids]);

  const fetchTravelPlan = async (
    duration: string | number,
    location: string,
    budget: string,
  ) => {
    const prompt = `请为我生成一个结构化的旅行计划，包括必做任务和选做任务，适用于${duration}的${location}之旅，预算为${budget}当地货币。计划应适合单人或小团体旅行，包括反映当地文化、历史和景点的多种活动，要符合我的个人偏好。这是我的个人需求、偏好和感情状态：${preference || "无"}。这是我最近喜爱的一些任务：${recentlyLikeTasks.join(",")}。返回时使用语言为${getLocales()[0].languageCode}。请将输出格式化为JSON对象，包含 "title" 和 "tasks"键，"title"为本次旅行的标题，"tasks" 指向任务数组，每个任务下包含 "title", "description", "type", 其中 "type" 的取值为 "main" 或者 "option"。`;
    try {
      const response = await fetch(`${gateway}/chat/completions`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${key}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: [
            {
              role: "user",
              content: prompt.replaceAll(`"`, `\"`),
            },
          ],
          temperature: 1,
          model: model,
          max_tokens: 2048,
          response_format: {
            type: "json_object",
          },
        }),
      }).then((res) => res.json());
      const content = JSON.parse(response.choices[0].message.content);
      setTitle(content?.title || "NaN");
      if (content.tasks.length > 0) {
        setTasks(
          content.tasks.map(
            (item: { title: string; description: string; type: string }) => ({
              id: uuid.v4().toString(),
              type: item.type || "option",
              title: item.title || "NaN",
              description: item.description || "NaN",
              status: "IDLE",
            }),
          ),
        );
      } else {
        console.log("No Tasks");
      }
    } catch (e) {
      router.navigate(`tips?title=Error&description=${e}`);
    }
  };

  useEffect(() => {
    fetchTravelPlan(
      ensureString(duration),
      ensureString(location),
      ensureString(budget),
    );
  }, []);

  if (tasks.length === 0) {
    return (
      <View
        style={{
          paddingBottom: insets.bottom + 12,
        }}
        className={"flex h-full bg-[#121212] px-3 py-6 space-y-1.5"}
      >
        <ActivityIndicator size="small" color="#A7A7A7" />
        <Text className={"text-[#A7A7A7] text-center text-xs"}>
          {t("wait")}
        </Text>
      </View>
    );
  }

  return (
    <View className={"flex h-full bg-[#121212] relative"}>
      <ScrollView className={"pt-4 space-y-6 px-3"}>
        <View className={"space-y-2"}>
          <Text className={"text-[#1ED760] font-bold text-lg"}>
            {t("mainTask")}
          </Text>
          {tasks
            .filter((item) => item.type === "main")
            .map((item, index) => (
              <TaskItem
                index={index}
                title={item.title}
                description={item.description}
                key={index}
              />
            ))}
        </View>
        <View className={"space-y-2"}>
          <Text className={"text-red-400 font-bold text-lg"}>
            {t("optionTask")}
          </Text>
          {tasks
            .filter((item) => item.type === "option")
            .map((item, index) => (
              <TaskItem
                index={index}
                title={item.title}
                description={item.description}
                key={index}
              />
            ))}
        </View>
        <View className={"h-40"}></View>
      </ScrollView>
      <View
        className={"space-y-3 absolute w-full px-3 bg-[#121212EE]"}
        style={{
          paddingTop: 12,
          paddingBottom: insets.bottom + 12,
          bottom: 0,
          left: 0,
        }}
      >
        <Pressable
          className={"rounded-lg items-center"}
          onPress={async () => {
            setTasks([]);
            await fetchTravelPlan(
              ensureString(duration),
              ensureString(location),
              ensureString(budget),
            );
          }}
        >
          <Text className={"text-white py-3 font-bold"}>{t("rebuild")}</Text>
        </Pressable>
        <Pressable
          onPress={newTravel}
          className={"rounded-lg bg-[#1ED760] items-center"}
        >
          <Text className={"text-black py-3 font-bold"}>{t("go")}</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default NewTask;
