import { Pressable, Text, View } from "react-native";
import { FC, memo, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useDispatch } from "react-redux";
import uuid from "react-native-uuid";
import { addOneLikeTask } from "../reducers/likeTask/likeTaskSlice";

const TaskItem: FC<{
  index: number;
  title: string;
  description: string;
}> = ({ index, title, description }) => {
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();

  return (
    <View className={"space-y-0.5 py-1.5"}>
      <View
        className={"flex flex-row items-center justify-between space-x-1.5"}
      >
        <Pressable
          onPress={() => {
            setShow(!show);
          }}
          className={"flex flex-row items-center space-x-0.5"}
        >
          <Text className={"text-white font-semibold text-lg"}>
            {index + 1}. {title}
          </Text>
          <Ionicons name="information-circle" size={16} color={"#A7A7A7"} />
        </Pressable>
        <View className={"flex flex-row items-center space-x-3"}>
          <Pressable
            onPress={() => {
              dispatch(
                addOneLikeTask({
                  id: uuid.v4().toString(),
                  title: title,
                }),
              );
            }}
            hitSlop={4}
          >
            <Ionicons name="add-circle-outline" size={24} color={"white"} />
          </Pressable>
        </View>
      </View>
      {show && <Text className={"text-[#A7A7A7]"}>{description}</Text>}
    </View>
  );
};

export default memo(TaskItem);
