import {FC, memo} from "react";
import { Pressable, Text, View } from "react-native";
import { Link } from "expo-router";

const LibraryShowItem: FC<{
  item: {
    _id: string,
    text: string,
    category: string,
  },
  showType: boolean
}> = ({ item, showType }) => {
  return (
    <Link href={`/posts/${item._id}`} asChild>
      <Pressable className={"h-20 flex flex-row my-2 px-4 space-x-3"}>
        <View className={`h-20 w-20 bg-[#FFFFFF12] ${ item.category === "reflections" ? "" : (item.category === "dreams" ? "rounded-full" : "rounded-xl") }`}></View>
        <View className={"flex justify-center flex-1"}>
          <Text className={"text-white font-bold"} numberOfLines={2}>
            {item.text}
          </Text>
          {showType && <Text className={"text-[#B3B3B3]"}>{item.category}</Text>}
        </View>
      </Pressable>
    </Link>
  )
};

export default memo(LibraryShowItem);
