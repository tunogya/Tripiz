import { View, Text, Pressable } from "react-native";
import { FC, memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { Ionicons } from "@expo/vector-icons";
import { removeOneLikeTask } from "../reducers/likeTask/likeTaskSlice";

const LikeTaskItem: FC<{
  id: string;
}> = ({ id }) => {
  const { entities } = useSelector((state: RootState) => state.likeTask);
  const dispatch = useDispatch();
  const task = entities[id];

  return (
    <View className={"flex flex-row items-center justify-between"}>
      <Text className={"text-white py-3 font-semibold"}>{task.title}</Text>
      <Pressable
        onPress={() => {
          dispatch(removeOneLikeTask(id));
        }}
      >
        <Ionicons name="remove-circle-outline" size={24} color={"white"} />
      </Pressable>
    </View>
  );
};

export default memo(LikeTaskItem);
