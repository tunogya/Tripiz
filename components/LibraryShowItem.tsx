import { memo } from "react";
import { Pressable, Text, View } from "react-native";
import { Link } from "expo-router";

const LibraryShowItem = ({ item, showType }) => {
  if (item.type === "dream") {
    return (
      <Link href={`/dreams/${item.id}`} asChild>
        <Pressable className={"h-20 flex flex-row my-2 mx-4 space-x-3"}>
          <View className={"h-20 w-20 bg-[#FFFFFF12]"}></View>
          <View className={"flex justify-center"}>
            <Text className={"text-white font-bold text-lg"}>{item.title}</Text>
            {showType && <Text className={"text-[#B3B3B3]"}>{item.type}</Text>}
          </View>
        </Pressable>
      </Link>
    );
  }

  return null;
};

export default memo(LibraryShowItem);
