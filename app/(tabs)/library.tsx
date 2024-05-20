import { View, Text, ScrollView, Pressable } from "react-native";
import { memo, useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import AddDreamButton from "../../components/AddButton";
import { Ionicons } from "@expo/vector-icons";
import {useDispatch, useSelector} from "react-redux";
import { FlashList } from "@shopify/flash-list";
import LibraryShowItem from "../../components/LibraryShowItem";
import { updateValue } from "../../reducers/ui/uiSlice";
import useSWR from "swr";
import {RootState} from "../../store/store";

const Page = () => {
  const insets = useSafeAreaInsets();

  const FILTERS = ["Memories", "Dreams", "Reflections"];
  const [filter, setFilter] = useState("");
  const dispatch = useDispatch();
  const { address } = useSelector((state: RootState) => state.user);
  const { data, mutate, isLoading } = useSWR(address ? `http://localhost:3000/api/users/${address}/posts?category=${filter.toLowerCase()}` : undefined, (url: string) => fetch(url)
    .then((res) => res.json())
    .then((res) => res.data)
  );

  const [lastScrollPosition, setLastScrollPosition] = useState(0);

  const handleScroll = (event: any) => {
    const currentScrollPosition = event.nativeEvent.contentOffset.y;

    if (currentScrollPosition > lastScrollPosition) {
      dispatch(
        updateValue({
          scroll2Down: false,
        }),
      );
    } else {
      dispatch(
        updateValue({
          scroll2Down: true,
        }),
      );
    }
    setLastScrollPosition(currentScrollPosition);
  };

  return (
    <View className={"flex flex-1 bg-[#121212]"}>
      <View
        className={"shadow shadow-black bg-[#121212]"}
        style={{
          paddingTop: insets.top + 20,
        }}
      >
        <View className={"p-4 flex flex-row justify-between items-center"}>
          <Text className={"text-white font-bold text-2xl"}>Library</Text>
          <Pressable hitSlop={8}>
            <Ionicons name="search-sharp" size={24} color="white" />
          </Pressable>
        </View>
        <ScrollView
          horizontal
          className={"flex flex-row pb-4"}
          showsHorizontalScrollIndicator={false}
        >
          <View className={"w-3"}></View>
          {filter && (
            <Pressable
              hitSlop={4}
              className={
                "h-8 w-8 items-center justify-center bg-[#FFFFFF12] rounded-full mr-1.5"
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
                className={`px-4 h-8 items-center justify-center ${filter === item ? "bg-[#1DB954]" : "bg-[#FFFFFF12]"} rounded-full mx-1`}
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
          data={data}
          onScroll={handleScroll}
          scrollEventThrottle={1000}
          keyExtractor={(item: any) => item._id}
          estimatedItemSize={8}
          ListEmptyComponent={() => (
            isLoading ? (
              <View className={"px-4"}>
                <Text className={"text-white"}>Loading</Text>
              </View>
            ) : (
              <View className={"px-4"}>
                <Text className={"text-white"}>No {filter} content</Text>
              </View>
            )
          )}
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
