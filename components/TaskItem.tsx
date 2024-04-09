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
      <View
        className={"flex flex-row items-center justify-between space-x-1.5"}
      >
        <Pressable
          onPress={() => {
            setShow(!show)
          }}
        >
          <Text className={"text-white font-semibold text-lg"}>{index + 1}. {title}</Text>
        </Pressable>
        <Pressable
          onPress={() => {
            // setShow(!show)
          }}
          hitSlop={4}
        >
          <Ionicons name="remove-circle-outline" size={20} color={"white"} />
        </Pressable>
      </View>
      {
        show && (
          <Text className={"text-[#A7A7A7]"}>{description}</Text>
        )
      }
    </View>
  )
}

export default memo(TaskItem)