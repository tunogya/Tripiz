import { View, Text, FlatList, Pressable } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { router } from "expo-router";
import { removeAllTravels } from "../reducers/travel/travelSlice";
import { removeAllFootPrints } from "../reducers/footPrint/footPrintSlice";
import { removeAllTasks } from "../reducers/task/taskSlice";
import { removeAllShopping } from "../reducers/shopping/shoppingSlice";
import { FlashList } from "@shopify/flash-list";

const History = () => {
  const insets = useSafeAreaInsets();
  const { entities, ids } = useSelector((state: RootState) => state.travel);
  const dispatch = useDispatch();

  return (
    <View className={"flex h-full bg-[#121212] px-3 min-h-20"}>
      <FlashList
        data={ids}
        estimatedItemSize={20}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <Pressable
            onPress={() => {
              router.push(`travels/${entities[item].id}`);
              // router.push(`logs/${entities[item].id}`)
            }}
            className={"bg-[#292929] p-3 my-1.5 rounded-lg"}
          >
            <Text className={"text-white"}>{entities[item].id}</Text>
            <Text className={"text-white"}>{entities[item].budget}</Text>
            <Text className={"text-white"}>
              {entities[item].timestamp.start}
            </Text>
            <Text className={"text-white"}>
              {entities[item].timestamp?.end}
            </Text>
          </Pressable>
        )}
        ListFooterComponent={() => (
          <View>
            {ids.length > 0 ? (
              <Pressable
                className={"flex items-center py-3"}
                onPress={() => {
                  dispatch(removeAllTravels());
                  dispatch(removeAllFootPrints());
                  dispatch(removeAllTasks());
                  dispatch(removeAllShopping());
                }}
              >
                <Text className={"text-red-500 text-xs font-medium"}>
                  一键清空
                </Text>
              </Pressable>
            ) : (
              <Text className={"text-white text-center py-4 text-xs"}>
                没有历史
              </Text>
            )}
            <View
              style={{
                minHeight: insets.bottom * 2,
              }}
            />
          </View>
        )}
      />
    </View>
  );
};

export default History;
