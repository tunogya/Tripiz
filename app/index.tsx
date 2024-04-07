import { View, Text, Pressable, ScrollView } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { memo, useMemo } from "react";
import { router } from "expo-router";
import { useAuth0 } from "react-native-auth0";
import { OneSignal } from "react-native-onesignal";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";

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
        return null
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
          <Text className={"text-white font-bold text-xl"}>无尽旅途</Text>
        </View>
      </View>
      <ScrollView showsVerticalScrollIndicator={false} className={"pt-4"}>
        <View className={"px-3 flex flex-col space-y-3"}>
          {lastTravel && (
            <Pressable
              onPress={() => {
                router.navigate(`travels/${lastTravel.id}`)
              }}
              className={
                "w-full flex items-center justify-center py-4 bg-[#1ED760] rounded-lg"
              }
            >
              <Text className={"text-black font-medium"}>继续旅行</Text>
              <Text className={"text-black font-medium text-xs"}>{ lastTravel.title }</Text>
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
              新旅途
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
            <Text className={"text-white font-medium"}>历史旅途</Text>
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
            <Text className={"text-white text-xs"}>选项</Text>
          </Pressable>
          {user ? (
            <View className={"space-y-3"}>
              <Pressable
                onPress={async () => {
                  await clearSession();
                }}
                className={
                  "w-full flex items-center justify-center py-4 bg-[#292929] rounded-lg"
                }
              >
                <Text className={"text-white text-xs"}>退出</Text>
              </Pressable>
              <Text className={"text-[#A7A7A7] w-full text-center text-xs"}>
                {user?.email}
              </Text>
            </View>
          ) : (
            <View>
              <Pressable
                onPress={async () => {
                  await logIn();
                }}
                className={
                  "w-full flex items-center justify-center py-4 bg-[#292929] rounded-lg"
                }
              >
                <Text className={"text-white text-xs"}>登陆账号</Text>
              </Pressable>
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
}

export default memo(Page);
