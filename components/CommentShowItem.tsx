import {Dimensions, Text, View} from "react-native";
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
    <View
      className={"p-3 bg-[#FFFFFF12] rounded-lg mr-3 space-y-1.5"}
      style={{
        width: Dimensions.get('window').width - 32,
      }}
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

export default CommentShowItem