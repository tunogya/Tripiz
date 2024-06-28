import {ScrollView, Text, View} from "react-native";
import React, { memo } from "react";
import EventItem from "./EventItem";

const ContentClassItem = ({ category, value }) => {

  return (
    <View className={"py-4 space-y-4"}>
      <Text className={"text-white font-bold px-4 text-[16px]"}>
        {category}
      </Text>
      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
      >
        <View className={"w-2"}></View>
        {
          value.map((id: string) => (
            <EventItem id={id} key={id} />
          ))
        }
        <View className={"w-2"}></View>
      </ScrollView>

    </View>
  );
};

export default memo(ContentClassItem);
