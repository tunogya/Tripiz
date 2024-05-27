import {Text, View} from "react-native";
import React, {FC, memo} from "react";
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
    <View
      className={"p-4 bg-[#FFFFFF12] rounded-lg my-1.5 mx-4 space-y-1.5"}
    >
      <View className={"flex flex-row justify-between items-end"}>
        <Text className={"text-[#B3B3B3]"}>{ item.user === address ? "Me" : item.user}</Text>
        <Text className={"text-[#B3B3B3]"}>{new Date(item.updatedAt).toLocaleDateString().replaceAll('/', '-')}</Text>
      </View>
      <View className={"flex flex-row items-end flex-wrap"}>
        <Text className={"text-white mr-1.5 leading-5"}>{item.text}</Text>
      </View>
    </View>
  )
}

export default memo(CommentShowItem);