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
import { Vibration } from "react-native";

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
    const prompt = `根据需求，为我定制一个专属的旅行计划，旨在为${duration} ${location}之旅提供一个全面而独特的体验。目标是确保这次短暂旅程不仅符合预算限制：${budget}当地货币，而且也能充分满足我的个人喜好和情感状态：${preference || "未指定"}。此外，可以参考我近喜欢的任务：${recentlyLikeTasks.join(",")}，以进一步个性化我的的旅行计划。计划中的文字内容使用${getLocales()[0].languageCode}语言。

请返回定制的旅行计划，将其格式化为JSON对象，方便我的查阅和使用。计划将分为“必做任务”和“选做任务”，旨在提供一个平衡的旅游体验，以便我能够深入探索${location}的文化、历史和自然美景。

\`\`\`json
{
  "title": "简洁的旅行标题",
  "tasks": [
    {
      "title": "简洁的任务标题",
      "description": "任务详细介绍，包括为什么这个任务能满足您的个人偏好，以及它如何反应文化或历史特色。可以是去某个地方观光，或者和当地人某个特殊的互动。",
      "type": "main"
    },
    {
      "title": "另一个任务标题",
      "description": "另一个任务的详细介绍，可能是一个选做任务，提供不同的体验或探索当地人的生活或地点的另一面。",
      "type": "option"
    }
    // 更多任务...
  ]
}`;
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
        Vibration.vibrate(200);
      } else {
        console.log("No Tasks");
      }
    } catch (e) {
      Vibration.vibrate([200, 200, 200]);
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
