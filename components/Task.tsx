import { FC, memo } from "react";
import { Pressable, Text, View } from "react-native";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { Ionicons } from "@expo/vector-icons";
import {t} from "../i18n";

const Task: FC<{
  id: string;
}> = ({ id }) => {
  const { entities } = useSelector((state: RootState) => state.task);
  const task = entities?.[id];

  return (
    <View className={"flex space-y-0.5 py-1.5"}>
      <View
        className={`rounded-lg overflow-hidden shadow-lg ${task?.type === "main" ? "bg-[#292929]" : "bg-[#181818]"}`}
      >
        <View className={"p-3 space-y-3"}>
          <View className={"flex flex-row items-center justify-between"}>
            <View className={"flex"}>
              <View className={'flex flex-row space-x-1.5 items-center'}>
                <Text className={"text-white truncate font-bold"}>
                  {task?.title}
                </Text>
                {
                  task?.type === "main" ? (
                    <Ionicons name="sparkles-sharp" size={16} color="#1ED760" />
                  ) : (
                    <Ionicons name="ticket" size={16} color="#A7A7A7" />
                  )
                }
              </View>
              <Text className={"text-[#A7A7A7] font-semibold text-xs"}>
                {task?.type === "main" ? t("mainTask") : t("optionTask")}
              </Text>
            </View>
            <Pressable
              className={`border ${task?.status === "SUCCESS" ? "border-white" : "border-[#A7A7A7]"} rounded-full px-3 py-1.5`}
            >
              <Text className={"text-white truncate text-xs font-semibold"}>
                {task?.status === "SUCCESS" ? t("done") : t("undone")}
              </Text>
            </Pressable>
          </View>
          <Text className={"text-xs text-[#A7A7A7]"} numberOfLines={3}>
            {task.description || t("noDescription")}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default memo(Task);
