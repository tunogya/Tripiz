import { View, Text } from "react-native";
import { memo } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { FlashList } from "@shopify/flash-list";
import LikeTaskItem from "../components/LikeTaskItem";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { t } from "../i18n";

const LikeTask = () => {
  const { ids } = useSelector((state: RootState) => state.likeTask);
  const insets = useSafeAreaInsets();

  return (
    <View className={"flex flex-1 bg-[#121212] w-full h-full px-3"}>
      <FlashList
        data={ids}
        estimatedItemSize={20}
        keyExtractor={(index) => index.toString()}
        renderItem={({ item }) => <LikeTaskItem id={item} />}
        ListHeaderComponent={() => (
          <View>
            {ids.length === 0 && (
              <Text className={"text-[#A7A7A7] text-center py-3"}>
                {t("noLikeTasks")}
              </Text>
            )}
          </View>
        )}
        ListFooterComponent={() => (
          <View
            style={{
              height: insets.bottom + 12,
            }}
          />
        )}
      />
    </View>
  );
};

export default memo(LikeTask);
