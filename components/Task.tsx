import { FC, memo } from "react";
import { Pressable, Text, Vibration, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { Ionicons } from "@expo/vector-icons";
import { t } from "../i18n";
import {
  addOneLikeTask,
  removeOneLikeTask,
} from "../reducers/likeTask/likeTaskSlice";
import { updateOneTask } from "../reducers/task/taskSlice";
import { scheduleNotificationAsync } from "expo-notifications";

const Task: FC<{
  id: string;
}> = ({ id }) => {
  const { entities } = useSelector((state: RootState) => state.task);
  const { ids: likeTaskIds } = useSelector(
    (state: RootState) => state.likeTask,
  );
  const task = entities?.[id];
  const dispatch = useDispatch();

  const isLiked = likeTaskIds.includes(id);

  return (
    <View className={"flex space-y-0.5 py-1.5"}>
      <View
        className={`rounded-lg overflow-hidden shadow-lg ${task?.type === "main" ? "bg-[#292929]" : "bg-[#181818]"}`}
      >
        <View className={"p-3 space-y-3"}>
          <View className={"flex flex-row items-center justify-between"}>
            <View className={"flex"}>
              <View
                className={"flex flex-row items-center justify-between w-full"}
              >
                <View className={"flex flex-row space-x-1.5 items-center"}>
                  <Text
                    className={"text-white truncate font-bold w-64"}
                    lineBreakMode={"tail"}
                    numberOfLines={1}
                  >
                    {task?.title}
                  </Text>
                </View>
                <View className={"flex flex-row space-x-3 stroke-0"}>
                  {isLiked ? (
                    <Pressable
                      onPress={() => {
                        dispatch(removeOneLikeTask(task.id));
                      }}
                      hitSlop={4}
                    >
                      <Ionicons
                        name="heart"
                        size={24}
                        color={"rgb(239, 89, 89)"}
                      />
                    </Pressable>
                  ) : (
                    <Pressable
                      onPress={() => {
                        Vibration.vibrate(200);
                        dispatch(
                          addOneLikeTask({
                            id: task.id,
                            title: task.title,
                          }),
                        );
                      }}
                      hitSlop={4}
                    >
                      <Ionicons
                        name="heart-outline"
                        size={24}
                        color={task?.type === "main" ? "white" : "#A7A7A7"}
                      />
                    </Pressable>
                  )}
                  {task.status === "SUCCESS" ? (
                    <Pressable
                      onPress={() => {
                        dispatch(
                          updateOneTask({
                            id: task.id,
                            changes: {
                              status: "IDLE",
                            },
                          }),
                        );
                      }}
                    >
                      <Ionicons
                        name="checkmark-circle"
                        size={24}
                        color={"#1ED760"}
                      />
                    </Pressable>
                  ) : (
                    <Pressable
                      onPress={async () => {
                        await scheduleNotificationAsync({
                          content: {
                            title: t("taskCompleted"),
                            body: task.title,
                          },
                          trigger: { seconds: 1 },
                        });
                        Vibration.vibrate(200);
                        dispatch(
                          updateOneTask({
                            id: task.id,
                            changes: {
                              status: "SUCCESS",
                            },
                          }),
                        );
                      }}
                    >
                      <Ionicons
                        name="add-circle-outline"
                        size={24}
                        color={task?.type === "main" ? "white" : "#A7A7A7"}
                      />
                    </Pressable>
                  )}
                </View>
              </View>
              <Text className={"text-[#A7A7A7] font-semibold text-xs"}>
                {task?.type === "main" ? t("mainTask") : t("optionTask")}
              </Text>
            </View>
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
