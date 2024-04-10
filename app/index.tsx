import { View, Text, Pressable, ScrollView } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { memo, useMemo } from "react";
import { router } from "expo-router";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { t } from "../i18n";

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
        <View className={"px-3 flex flex-col space-y-3"}>
          {lastTravel && (
            <Pressable
              onPress={() => {
                router.navigate(`travels/${lastTravel.id}`);
              }}
              className={
                "w-full flex items-center justify-center py-4 bg-[#1ED760] rounded-xl"
              }
            >
              <Text className={"text-black font-medium text-lg"}>
                {t("continueTravel")}
              </Text>
              <Text className={"text-black font-medium text-xs"}>
                {lastTravel.title}
              </Text>
            </Pressable>
          )}
          <Pressable
            onPress={() => {
              if (!key || !model || !gateway) {
                router.navigate(`optionsOpenAI`);
              } else {
                router.navigate("new");
              }
            }}
            className={`w-full flex items-center justify-center py-4 ${lastTravel ? "bg-[#292929]" : "bg-[#1ED760]"} rounded-lg`}
          >
            <Text
              className={`${lastTravel ? "text-white" : "text-black"} font-medium`}
            >
              {t("newTravel")}
            </Text>
          </Pressable>
          <Pressable
            onPress={() => {
              router.navigate("history");
            }}
            className={
              "w-full flex items-center justify-center py-4 bg-[#292929] rounded-lg"
            }
          >
            <Text className={"text-white font-medium"}>
              {t("historyTravel")}
            </Text>
          </Pressable>
          <View className={"h-4"}></View>
          <Pressable
            onPress={() => {
              router.navigate("options");
            }}
            className={
              "w-full flex items-center justify-center py-4 bg-[#292929] rounded-lg"
            }
          >
            <Text className={"text-white font-semibold"}>{t("option")}</Text>
          </Pressable>
        </View>
      </ScrollView>
    </View>
  );
}

export default memo(Page);
