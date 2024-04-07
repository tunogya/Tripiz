import { View, Text, Pressable, ScrollView } from "react-native";
import UserAvatar from "../containers/HomeScreen/UserAvatar";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { memo } from "react";
import {useDispatch} from "react-redux";
import { router } from "expo-router";
import {useAuth0} from "react-native-auth0";
import {OneSignal} from "react-native-onesignal";

function Page() {
  const insets = useSafeAreaInsets();
  const dispatch = useDispatch();
  const { clearSession, authorize, user } = useAuth0();

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
      console.log(e)
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
          {
            user && (
              <UserAvatar size={32} />
            )
          }
          <Text className={"text-white font-bold text-xl"}>无尽旅行</Text>
        </View>
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        className={"pt-4"}
      >
        <View className={"px-3 flex flex-col space-y-3"}>
          <Pressable className={"w-full flex items-center justify-center py-4 bg-[#1ED760] rounded-lg"}>
            <Text className={"text-black font-medium"}>继续旅行</Text>
          </Pressable>
          <Pressable
            onPress={() => {
              router.push("new");
            }}
            className={"w-full flex items-center justify-center py-4 bg-[#272727] rounded-lg"}>
            <Text className={"text-white font-medium"}>新建旅行</Text>
          </Pressable>
          <Pressable className={"w-full flex items-center justify-center py-4 bg-[#272727] rounded-lg"}>
            <Text className={"text-white font-medium"}>历史旅行</Text>
          </Pressable>
          <View className={"h-4"}></View>
          <Pressable
            onPress={() => {
              router.push('options')
            }}
            className={"w-full flex items-center justify-center py-4 bg-[#272727] rounded-lg"}
          >
            <Text className={"text-white text-xs"}>选项</Text>
          </Pressable>
          {
            user ? (
              <View className={"space-y-3"}>
                <Pressable
                  onPress={async () => {
                    await clearSession();
                  }}
                  className={"w-full flex items-center justify-center py-4 bg-[#272727] rounded-lg"}>
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
                  className={"w-full flex items-center justify-center py-4 bg-[#272727] rounded-lg"}>
                  <Text className={"text-white text-xs"}>登陆账号</Text>
                </Pressable>
              </View>
            )
          }
        </View>
      </ScrollView>
    </View>
  );
}

export default memo(Page);
