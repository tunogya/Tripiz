import {FC, memo} from "react";
import {Pressable, Text, View} from "react-native";
import {router} from "expo-router";
import {t} from "../i18n";

const LibraryShowItem: FC<{
  item: {
    _id: string,
    text: string,
    category: string,
  },
  showType: boolean
}> = ({item, showType}) => {
  return (
    <Pressable
      className={"h-20 flex flex-row my-2 px-4 space-x-3"}
      onPress={() => {
        router.push(`/posts/${item._id}`)
      }}
    >
      <View
        className={`h-20 w-20 bg-[#FFFFFF12] ${item.category === "reflections" ? "" : (item.category === "dreams" ? "rounded-full" : "rounded-xl")}`}></View>
      <View className={"flex justify-center flex-1"}>
        <Text className={"text-white font-bold"} numberOfLines={2}>
          {item.text}
        </Text>
        {showType && <Text className={"text-[#B3B3B3]"}>{t(item.category)}</Text>}
      </View>
    </Pressable>
  )
};

export default memo(LibraryShowItem);
