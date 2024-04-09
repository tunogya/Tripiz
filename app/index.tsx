import { View, Text, Pressable, ScrollView } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { memo, useMemo } from "react";
import { router } from "expo-router";
import { useAuth0 } from "react-native-auth0";
import { OneSignal } from "react-native-onesignal";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { t } from "../i18n";

function Page() {
  const insets = useSafeAreaInsets();
  const { clearSession, authorize, user } = useAuth0();
  const { ids, entities } = useSelector((state: RootState) => state.travel);

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

  const logIn = async () => {
    try {
      const credentials = await authorize({
        scope: "openid profile email offline_access",
        audience: "https://api.abandon.ai",
      });
      if (credentials) {
        OneSignal.login(user.sub);
        if (user.email) {
          OneSignal.User.addEmail(user.email);
        }
        router.replace("home");
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <View
      className={"flex flex-1 h-full bg-[#121212]"}
      style={{
        paddingTop: insets.top + 20,
      }}
    >
      <View className={"flex flex-row items-center justify-between px-5 pb-2"}>
        <View className={"flex flex-row items-center space-x-3"}>
          <Text className={"text-white font-bold text-xl"}>
            {t("EndlessTravel")}
          </Text>
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
                "w-full flex items-center justify-center py-4 bg-[#1ED760] rounded-lg"
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
              router.navigate("new");
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
            <Text className={"text-white text-xs"}>{t("option")}</Text>
          </Pressable>
          {/*{user ? (*/}
          {/*  <View*/}
          {/*    className={*/}
          {/*      "flex flex-row items-center space-x-2 justify-center py-3"*/}
          {/*    }*/}
          {/*  >*/}
          {/*    <Text className={"text-[#A7A7A7] text-xs"}>{user?.email}</Text>*/}
          {/*    <Pressable*/}
          {/*      className={"border px-2 py-0.5 rounded-full border-[#A7A7A7]"}*/}
          {/*      onPress={async () => {*/}
          {/*        await clearSession();*/}
          {/*      }}*/}
          {/*    >*/}
          {/*      <Text className={"text-white text-[10px] font-semibold"}>*/}
          {/*        {t("logout")}*/}
          {/*      </Text>*/}
          {/*    </Pressable>*/}
          {/*  </View>*/}
          {/*) : (*/}
          {/*  <View>*/}
          {/*    <Pressable*/}
          {/*      onPress={async () => {*/}
          {/*        await logIn();*/}
          {/*      }}*/}
          {/*      className={*/}
          {/*        "w-full flex items-center justify-center py-4 bg-[#292929] rounded-lg"*/}
          {/*      }*/}
          {/*    >*/}
          {/*      <Text className={"text-white text-xs"}>{t("login")}</Text>*/}
          {/*    </Pressable>*/}
          {/*  </View>*/}
          {/*)}*/}
        </View>
      </ScrollView>
    </View>
  );
}

export default memo(Page);
