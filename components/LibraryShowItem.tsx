import React, {FC, memo} from "react";
import {Pressable, Text, View} from "react-native";
import {router} from "expo-router";
import {t} from "../i18n";
import {Image} from "expo-image";
import {API_HOST_NAME} from "../utils/const";

const LibraryShowItem: FC<{
  item: {
    id: string;
    content: string;
    tags: [][];
  };
  showType: boolean;
}> = ({item, showType}) => {
  // @ts-ignore
  const category = item?.tags?.find((tag: any[]) => tag?.[0] === "category")?.[1];

  return (
    <Pressable
      className={"h-16 flex flex-row my-2 px-4 space-x-3"}
      onPress={() => {
        router.navigate(`/posts/${item.id}`);
      }}
    >
      <View
        className={`h-16 w-16 bg-[#FFFFFF12] ${category === "reflections" ? "" : category === "dreams" ? "rounded-full" : "rounded-xl"} overflow-hidden`}
      >
        <Image
          className={"w-16 h-16"}
          source={`${API_HOST_NAME}/autoglyphs?hash=0x${item.id}`}
          contentFit="cover"
          cachePolicy={"memory-disk"}
        />
      </View>
      <View className={"flex justify-center flex-1"}>
        <Text
          className={"text-white font-medium text-[18px]"}
          numberOfLines={1}
        >
          {item.content}
        </Text>
        <View className={"flex flex-row space-x-1 items-center"}>
          {showType && <Text className={"text-[#B3B3B3]"}>{t(category)}</Text>}
        </View>
      </View>
    </Pressable>
  );
};

export default memo(LibraryShowItem);
