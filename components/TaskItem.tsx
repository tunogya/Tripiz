import { Pressable, Text, View } from "react-native";
import { FC, memo, useState } from "react";
import { Ionicons } from "@expo/vector-icons";

const TaskItem: FC<{
  index: number;
  title: string;
  description: string;
}> = ({ index, title, description }) => {
  const [show, setShow] = useState(false);

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
      </View>
      {show && <Text className={"text-[#A7A7A7]"}>{description}</Text>}
    </View>
  );
};

export default memo(TaskItem);
