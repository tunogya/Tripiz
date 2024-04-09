import { View, Text, Pressable } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { removeAllTravels } from "../reducers/travel/travelSlice";
import { removeAllTasks } from "../reducers/task/taskSlice";
import { removeAllShopping } from "../reducers/shopping/shoppingSlice";
import { FlashList } from "@shopify/flash-list";
import HistoryTravelItem from "../components/HistoryTravelItem";

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
          <HistoryTravelItem travel={entities?.[item]} />
        )}
        ListFooterComponent={() => (
          <View>
            {ids.length > 0 ? (
              <Pressable
                className={"flex items-center py-3"}
                onPress={() => {
                  dispatch(removeAllTravels());
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
