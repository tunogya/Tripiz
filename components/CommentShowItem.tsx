import {Text, View} from "react-native";
import React, {FC} from "react";
import {useSelector} from "react-redux";
import {RootState} from "../store/store";

const CommentShowItem: FC<{
  item: {
    user: string,
    text: string,
    updatedAt: string,
  }
}> = ({item}) => {
  const { address } = useSelector((state: RootState) => state.user);

  return (
    <View className={"py-3 border-b border-[#2F2F2F]"}>
      <Text className={"text-[#B3B3B3]"}>{ item.user === address ? "Me" : item.user}</Text>
      <View className={"flex flex-row space-x-1.5 items-end"}>
        <Text className={"text-white"}>{item.text}</Text>
        <Text className={"text-[#B3B3B3] text-xs"}>{new Date(item.updatedAt).toLocaleDateString().replaceAll('/', '-')}</Text>
      </View>
    </View>
  )
}

export default CommentShowItem