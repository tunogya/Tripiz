import { memo } from "react";
import { Pressable, Text, View } from "react-native";
import { Link } from "expo-router";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";

const LibraryShowItem = ({ item, showType }) => {
  const { entities: dreams } = useSelector((state: RootState) => state.dream);
  const { entities: memories } = useSelector(
    (state: RootState) => state.memory,
  );
  const { entities: reflections } = useSelector(
    (state: RootState) => state.reflection,
  );

  if (item.type === "reflection") {
    return (
      <Link href={`/reflections/${item.id}`} asChild>
        <Pressable className={"h-20 flex flex-row my-2 mx-4 space-x-3"}>
          <View className={"h-20 w-20 bg-[#FFFFFF12]"}></View>
          <View className={"flex justify-center"}>
            <Text className={"text-white font-bold text-lg"}>
              {reflections[item.id].title}
            </Text>
            {showType && <Text className={"text-[#B3B3B3]"}>Reflection</Text>}
          </View>
        </Pressable>
      </Link>
    );
  }

  if (item.type === "memory") {
    return (
      <Link href={`/memories/${item.id}`} asChild>
        <Pressable className={"h-20 flex flex-row my-2 mx-4 space-x-3"}>
          <View className={"h-20 w-20 bg-[#FFFFFF12]"}></View>
          <View className={"flex justify-center"}>
            <Text className={"text-white font-bold text-lg"}>
              {memories[item.id].title}
            </Text>
            {showType && <Text className={"text-[#B3B3B3]"}>Memory</Text>}
          </View>
        </Pressable>
      </Link>
    );
  }

  if (item.type === "dream") {
    return (
      <Link href={`/dreams/${item.id}`} asChild>
        <Pressable className={"h-20 flex flex-row my-2 mx-4 space-x-3"}>
          <View className={"h-20 w-20 bg-[#FFFFFF12]"}></View>
          <View className={"flex justify-center"}>
            <Text className={"text-white font-bold text-lg"}>
              {dreams[item.id].title}
            </Text>
            {showType && <Text className={"text-[#B3B3B3]"}>Dream</Text>}
          </View>
        </Pressable>
      </Link>
    );
  }

  return null;
};

export default memo(LibraryShowItem);
