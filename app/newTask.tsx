import { View, Text, ScrollView, Pressable } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { router } from "expo-router";
import { useDispatch } from "react-redux";
import { addOneTravel, Travel } from "../reducers/travel/travelSlice";
import { addOneTask, Task } from "../reducers/task/taskSlice";
import uuid from "react-native-uuid";
import { useState } from "react";

const NewTask = () => {
  const insets = useSafeAreaInsets();
  const dispatch = useDispatch();
  const [tasks, setTasks] = useState<Task[]>([]);

  const newTravel = async () => {
    const task1: Task = {
      id: `${uuid.v4()}`,
      type: "main",
      title: "Test Task",
      status: "IDLE",
    };
    const travel: Travel = {
      id: `${uuid.v4()}`,
      title: new Date().toLocaleDateString(),
      timestamp: {
        start: Math.floor(new Date().getTime() / 1000),
        end: Math.floor(new Date().getTime() / 1000) + 4 * 60 * 60,
      },
      budget: 1000,
      costed: 0,
      available: 1000,
      shoppingIds: [],
      footPrintIds: [],
      taskIds: [...task1.id],
    };
    dispatch(addOneTask(task1));
    dispatch(addOneTravel(travel));
    router.push(`travels/${travel.id}`);
  };

  return (
    <View
      style={{
        paddingBottom: insets.bottom + 12,
      }}
      className={"flex h-full bg-[#121212] px-3"}
    >
      <ScrollView className={"pt-4 space-y-6"}>
        <View className={"space-y-2"}>
          <Text className={"text-[#1ED760] font-bold text-lg"}>必做任务</Text>
          <Text className={"text-white"}>{"  "}吃一次土耳其特色早餐</Text>
          <Text className={"text-white"}>{"  "}完成一次出海拍摄</Text>
        </View>
        <View className={"space-y-2"}>
          <Text className={"text-red-400 font-bold text-lg"}>选做任务</Text>
          <Text className={"text-white"}>{"  "}去一户当地人家蹭饭</Text>
          <Text className={"text-white"}>{"  "}不用翻译软件自己存活</Text>
        </View>
      </ScrollView>
      <View className={"space-y-3"}>
        <Pressable className={"rounded-lg bg-[#292929] items-center"}>
          <Text className={"text-white py-3 font-medium"}>重新生成</Text>
        </Pressable>
        <Pressable
          onPress={newTravel}
          className={"rounded-lg bg-[#1ED760] items-center"}
        >
          <Text className={"text-black py-3 font-medium"}>立即启程</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default NewTask;
