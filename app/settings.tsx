import { View, Text, TouchableOpacity } from "react-native";
import { useAuth0 } from "react-native-auth0";
import { router } from "expo-router";
import { reset } from "../reducers/cache/cacheSlice";
import { logout } from "../reducers/user/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { Octicons } from "@expo/vector-icons";

export default function Modal() {
  const { clearSession } = useAuth0();
  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.user);

  return (
    <View className={"flex flex-1 bg-[#121212] w-full h-full px-5"}>
      <View className={"flex flex-row justify-between py-1.5"}>
        <Text className={"text-white font-bold"}>Nickname</Text>
        <Text className={"text-[#A7A7A7]"}>{user?.nickname}</Text>
      </View>
      <View className={"flex flex-row justify-between py-1.5"}>
        <Text className={"text-white font-bold"}>Email</Text>
        <View className={"flex flex-row items-center space-x-1.5"}>
          <Text className={"text-[#A7A7A7]"}>{user?.email}</Text>
          <Octicons
            name={user.emailVerified ? "verified" : "unverified"}
            size={16}
            color={user.emailVerified ? "#1ED760" : "#A7A7A7"}
          />
        </View>
      </View>
      <View className={"flex flex-row justify-between py-1.5"}>
        <Text className={"text-white font-bold"}>ID</Text>
        <Text className={"text-[#A7A7A7]"}>{user?.sub}</Text>
      </View>
      <View className={"flex flex-row justify-between py-1.5 mt-10"}>
        <Text className={"text-[#A7A7A7] font-bold"}>Version</Text>
        <Text className={"text-[#A7A7A7]"}>1.0.0</Text>
      </View>
      <View className={"flex flex-row justify-between py-1.5"}>
        <Text className={"text-[#A7A7A7] font-bold"}>Support</Text>
        <Text className={"text-[#A7A7A7]"}>tom@abandon.ai</Text>
      </View>
      <View className={"items-center mt-20"}>
        <TouchableOpacity
          onPress={async () => {
            await clearSession();
            dispatch(reset());
            dispatch(logout());
            router.replace("/");
          }}
        >
          <View className={"px-8 py-3 rounded-full border-2 border-white"}>
            <Text className={"text-white font-bold"}>Log out</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}
