import { View, Text, ScrollView, Pressable } from "react-native";
import { memo, useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import AddDreamButton from "../../components/AddButton";
import { Ionicons } from "@expo/vector-icons";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { FlashList } from "@shopify/flash-list";
import LibraryShowItem from "../../components/LibraryShowItem";

const Page = () => {
  const insets = useSafeAreaInsets();

  const FILTERS = ["Memories", "Dreams", "Reflections"];
  const [filter, setFilter] = useState("");
  const { entities: dreams, ids: dreamIds } = useSelector(
    (state: RootState) => state.dream,
  );
  const { entities: memories, ids: memoryIds } = useSelector(
    (state: RootState) => state.memory,
  );
  const { entities: reflections, ids: reflectionIds } = useSelector(
    (state: RootState) => state.reflection,
  );

  const DATA = dreamIds.map((id) => ({ id: id, date: dreams[id].date, type: "dream"}))
    .concat(memoryIds.map((id) => ({ id: id, date: memories[id].date, type: "memory" })))
    .concat(reflectionIds.map((id) => ({ id: id, date: reflections[id].date, type: "reflection" })))
    .sort((a, b) => b.date - a.date);

  return (
    <View className={"flex flex-1 bg-[#121212]"}>
      <View
        className={"shadow shadow-black bg-[#121212]"}
        style={{
          paddingTop: insets.top + 20,
        }}
      >
        <View className={"px-4 flex flex-row justify-between items-center"}>
          <Text className={"text-white font-bold text-2xl"}>Library</Text>
          <Pressable hitSlop={8}>
            <Ionicons name="search-sharp" size={24} color="white" />
          </Pressable>
        </View>
        <ScrollView
          horizontal
          className={"flex flex-row py-4"}
          showsHorizontalScrollIndicator={false}
        >
          <View className={"w-3"}></View>
          {filter && (
            <Pressable
              hitSlop={4}
              className={
                "h-6 w-6 items-center justify-center bg-[#FFFFFF12] rounded-full mr-1.5"
              }
              onPress={() => {
                setFilter("");
              }}
            >
              <Ionicons name="close" size={16} color="white" />
            </Pressable>
          )}
          {FILTERS.map((item, index) =>
            !filter || (filter && filter === item) ? (
              <Pressable
                hitSlop={4}
                key={index}
                className={`px-3 py-1 ${filter === item ? "bg-green-500" : "bg-[#FFFFFF12]"} rounded-full mx-1`}
                onPress={() => {
                  setFilter(item);
                }}
              >
                <Text
                  className={`${filter === item ? "text-black" : "text-white"} text-[14px]`}
                >
                  {item}
                </Text>
              </Pressable>
            ) : null,
          )}
          <View className={"w-3"}></View>
        </ScrollView>
      </View>
      <View className={"flex-1"}>
        <FlashList
          data={DATA}
          keyExtractor={(item) => item.id}
          estimatedItemSize={8}
          ListHeaderComponent={() => <View className={"h-2"}></View>}
          ListFooterComponent={() => (
            <View
              style={{
                height: insets.bottom + 80,
              }}
            ></View>
          )}
          renderItem={({ item }) => (
            <LibraryShowItem item={item} showType={!filter} />
          )}
        />
      </View>
      <AddDreamButton />
    </View>
  );
};

export default memo(Page);
