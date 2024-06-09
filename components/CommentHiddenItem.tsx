import { Pressable, Text, View } from "react-native";
import React, { memo } from "react";
import {t} from "../i18n";

const CommentHiddenItem = ({ rowData, onDelete }) => {
  return (
    <View className={"h-full w-full flex flex-row items-center"}>
      <View className={"w-10 h-full bg-[#121212]"}></View>
      <Pressable
        className={
          "bg-red-500 h-full flex-1 justify-end flex flex-row items-center"
        }
        onPress={onDelete}
      >
        <Text className={"w-[100px] text-center font-bold text-white"}>
          {t("Delete")}
        </Text>
      </Pressable>
    </View>
  );
};

export default memo(CommentHiddenItem);
