import { memo, useState } from "react";
import { ActivityIndicator, View, Text, TouchableOpacity } from "react-native";
import { useDispatch } from "react-redux";
import { useAuth0 } from "react-native-auth0";
import { updateCredentials, updateUser } from "../reducers/user/userSlice";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { router } from "expo-router";
import UserAvatar from "../containers/HomeScreen/UserAvatar";
import { OneSignal } from 'react-native-onesignal';

function Page() {
  const { user, getCredentials, isLoading } = useAuth0();
  const dispatch = useDispatch();
  const { authorize, clearSession } = useAuth0();
  const insets = useSafeAreaInsets();
  const [status, setStatus] = useState("idle");

  const logIn = async () => {
    try {
      setStatus("loading");
      try {
        const credentials = await authorize({
          scope: "openid profile email offline_access",
          audience: "https://api.abandon.ai",
        });
        if (credentials) {
          dispatch(updateCredentials(credentials));
          OneSignal.login(user.sub);
          if (user.email) {
            OneSignal.User.addEmail(user.email);
          }
          setStatus("idle");
          router.replace("/home");
        } else {
          setStatus("error");
        }
      } catch (e) {
        setStatus("error");
      }
    } catch (e) {
      console.log(e);
    }
  };

  const fetchCredentials = async () => {
    if (user) {
      dispatch(updateUser(user));
      const credentials = await getCredentials(
        "openid profile email offline_access",
        0,
        {},
      );
      dispatch(updateCredentials(credentials));
    }
  };

  return (
    <View
      className={"bg-[#121212] w-full h-full flex"}
      style={{
        paddingBottom: insets.bottom + 20,
      }}
    >
      <View className={"flex-1 items-center justify-center space-y-3"}>
        {user ? (
          <View className={"flex items-center space-y-8"}>
            <UserAvatar size={60} />
            <View className={"flex items-center"}>
              <Text className={"text-white font-bold text-3xl"}>
                欢迎回来
              </Text>
              <Text className={"text-white font-semibold"}>{user.email}</Text>
            </View>
          </View>
        ) : (
          <View className={"flex items-center"}>
            <Text className={"text-white font-bold text-3xl"}>欢迎来到</Text>
            <Text className={"text-white font-bold text-3xl"}>无尽旅行</Text>
          </View>
        )}
        {(isLoading || status === "loading") && (
          <ActivityIndicator color={"white"} />
        )}
      </View>
      <View className={"px-5 space-y-3"}>
        <TouchableOpacity
          onPress={async () => {
            if (user) {
              await fetchCredentials();
              router.replace("/home");
            } else {
              await logIn();
            }
          }}
          className={
            "h-12 w-full flex items-center justify-center bg-[#1ED760] rounded-full"
          }
        >
          <Text className={"text-black font-bold"}>继续</Text>
        </TouchableOpacity>
        {user && (
          <TouchableOpacity
            onPress={async () => {
              await clearSession();
            }}
            className={
              "h-12 w-full flex items-center justify-center rounded-full"
            }
          >
            <Text className={"text-white font-bold"}>注销</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

export default memo(Page);
