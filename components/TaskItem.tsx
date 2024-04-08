import {Pressable, Text, View} from "react-native";
import {FC, memo, useState} from "react";
import {Ionicons} from "@expo/vector-icons";

const TaskItem: FC<{
  index: number,
  title: string,
  description: string
}> = ({ index, title, description }) => {
  const [show, setShow] = useState(false);

  return (
    <View className={"space-y-0.5 py-1.5"}>
      <Pressable
        className={"flex flex-row items-center space-x-1.5"}
        onPress={() => {
          setShow(!show)
        }}
      >
        <Text className={"text-white font-bold"}>{index + 1}. {title}</Text>
        <View
          className={`${show ? "rotate-180" : ""}`}
        >
          <Ionicons name="chevron-down" size={16} color={show ? "#A7A7A7" : "white"} />
        </View>
      </Pressable>
      {
        show && (
          <Text className={"text-[#A7A7A7]"}>{description}</Text>
        )
      }
    </View>
  )
}

export default memo(TaskItem)