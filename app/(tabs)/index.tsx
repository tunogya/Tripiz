import { View, Text, ScrollView } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { memo, useMemo } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { t } from "../../i18n";

function Page() {
  const insets = useSafeAreaInsets();
  const { ids, entities } = useSelector((state: RootState) => state.travel);
  const { key, model, gateway } = useSelector(
    (state: RootState) => state.config,
  );

  const lastTravel = useMemo(() => {
    if (ids.length > 0) {
      const lastId = ids[ids.length - 1];
      const travel = entities?.[lastId];
      if (travel.timestamp.end > new Date().getTime() / 1000) {
        return travel;
      } else {
        return null;
      }
    } else {
      return null;
    }
  }, [ids]);

  return (
    <View
      className={"flex flex-1 h-full bg-[#121212]"}
      style={{
        paddingTop: insets.top + 20,
      }}
    >
      <View className={"flex flex-row items-center justify-between px-5 pb-2"}>
        <View className={"flex flex-row items-center space-x-3"}>
          <Text className={"text-white font-bold text-xl"}>{t("Tripiz")}</Text>
        </View>
      </View>
      <ScrollView showsVerticalScrollIndicator={false} className={"pt-4"}>
      </ScrollView>
    </View>
  );
}

export default memo(Page);
