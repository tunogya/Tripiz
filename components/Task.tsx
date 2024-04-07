import {FC, memo} from "react";
import {Pressable, Text, View} from "react-native";
import {useSelector} from "react-redux";
import {RootState} from "../store/store";
import {Ionicons} from "@expo/vector-icons";

const Task: FC<{
  id: string
}> = ({ id }) => {
  const { entities } = useSelector((state: RootState) => state.task)
  const task = entities?.[id];
  return (
    <View className={"flex space-y-0.5"}>
      <View className={"bg-[#292929] rounded-lg overflow-hidden"}>
        <View className={"relative h-52 bg-[#292929] shadow-xl"}>
          <Text className={"text-white truncate absolute left-3 top-3 font-semibold"}>
            {task?.type === "main" ? "必要任务" : "可选任务"}
          </Text>
          <View className={"absolute w-full"}>
            <View className={"flex items-center justify-center h-52"}>
              <Ionicons name="image-outline" size={24} color="#A7A7A7" />
            </View>
          </View>
        </View>
        <View className={'p-3 space-y-3'}>
          <View className={"flex flex-row items-center justify-between"}>
            <View className={"flex space-y-0"}>
              <Text className={"text-white truncate text-lg font-bold"}>
                {task?.title}
              </Text>
              <Text className={"text-xs text-[#A7A7A7]"}>
                {task?.status === "SUCCESS" ? `任务完成时间：` : "任务未完成。"}
              </Text>
            </View>
            <Pressable className={`border ${task?.status === "SUCCESS" ? "border-white" : "border-[#A7A7A7]"} rounded-full px-3 py-1.5`}>
              <Text className={"text-white truncate text-xs font-semibold"}>
                {task?.status === "SUCCESS" ? "已完成" : "完成"}
              </Text>
            </Pressable>
          </View>
          <Text
            className={"text-xs text-[#A7A7A7]"}
            numberOfLines={3}
          >
            {task.description || "没有任何任务描述。"}
          </Text>
        </View>
      </View>
    </View>
  )
}

export default memo(Task)