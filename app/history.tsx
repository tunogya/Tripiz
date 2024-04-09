import { View, Text, Pressable } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { removeAllTravels } from "../reducers/travel/travelSlice";
import { removeAllTasks } from "../reducers/task/taskSlice";
import { removeAllShopping } from "../reducers/shopping/shoppingSlice";
import { FlashList } from "@shopify/flash-list";
import HistoryTravelItem from "../components/HistoryTravelItem";
import { t } from "../i18n";

const History = () => {
  const insets = useSafeAreaInsets();
  const { entities, ids } = useSelector((state: RootState) => state.travel);
  const dispatch = useDispatch();

  return (
    <View className={"flex h-full bg-[#121212] px-3 min-h-20 relative"}>
      <FlashList
        data={ids.reverse()}
        estimatedItemSize={20}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <HistoryTravelItem id={item} />
        )}
        ListHeaderComponent={() => (
          <View>
            {ids.length === 0 && (
              <Text className={"text-[#A7A7A7] text-center py-3"}>{t("noHistory")}</Text>
            )}
          </View>
        )}
        ListFooterComponent={() => (
          <View
            style={{
              minHeight: insets.bottom + 20,
            }}
          />
        )}
      />
      <View
        className={"absolute w-full"}
        style={{
          bottom: insets.bottom + 12,
        }}
      >
        {ids.length > 0 && (
          <Pressable
            className={"flex items-center"}
            onPress={() => {
              dispatch(removeAllTravels());
              dispatch(removeAllTasks());
              dispatch(removeAllShopping());
            }}
          >
            <Text className={"text-red-500 text-xs font-medium text-center"}>
              {t("clearAll")}
            </Text>
          </Pressable>
        )}
      </View>
    </View>
  );
};

export default History;
