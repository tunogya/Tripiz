import { memo } from "react";
import { Pressable, Text, View } from "react-native";
import { Link } from "expo-router";

const LibraryShowItem = ({ item, showType }) => {
  return (
    <Link href={`/posts/${item._id}`} asChild>
      <Pressable className={"h-20 flex flex-row my-2 mx-4 space-x-3"}>
        <View className={"h-20 w-20 bg-[#FFFFFF12]"}></View>
        <View className={"flex justify-center"}>
          <Text className={"text-white font-bold"}>
            {item.text}
          </Text>
          {showType && <Text className={"text-[#B3B3B3]"}>{item.category}</Text>}
        </View>
      </Pressable>
    </Link>
  )
};

export default memo(LibraryShowItem);
