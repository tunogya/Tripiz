import {FC, memo} from "react";
import {Pressable, Text, View} from "react-native";
import {useSelector} from "react-redux";
import {RootState} from "../store/store";

const Task: FC<{
  id: string
}> = ({ id }) => {
  const { entities } = useSelector((state: RootState) => state.task)
  const task = entities?.[id];
  return (
    <View className={"flex space-y-0.5"}>
      <View className={"bg-[#292929] rounded-lg overflow-hidden"}>
        <View className={"relative h-52 bg-white"}>
          <Text className={"text-white truncate absolute"}>
            {task?.type}
          </Text>
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