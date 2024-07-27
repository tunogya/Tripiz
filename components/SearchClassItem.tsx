import { Pressable, Text, View } from "react-native";
import { memo } from "react";
import { router } from "expo-router";
import { t } from "../i18n";

const SearchClassItem = ({ item, index }) => {
  return (
    <View className={`w-[50%] ${index % 2 === 0 ? "pr-2" : "pl-2"} mb-4`}>
      <Pressable
        onPress={() => {
          router.navigate(`class/${item.class}`);
        }}
        style={{
          backgroundColor: item.color,
        }}
        className={"p-2 h-28 rounded"}
      >
        <Text className={"text-white font-semibold"}>{t(item.class)}</Text>
      </Pressable>
    </View>
  );
};

export default memo(SearchClassItem);
