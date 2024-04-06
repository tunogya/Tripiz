import { View, Text, Pressable, ScrollView } from "react-native";
import UserAvatar from "../containers/HomeScreen/UserAvatar";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { memo } from "react";
import {useDispatch, useSelector} from "react-redux";
import { router } from "expo-router";
import {useAuth0} from "react-native-auth0";
import {RootState} from "../store/store";

function Page() {
  const insets = useSafeAreaInsets();
  const dispatch = useDispatch();
  const { clearSession } = useAuth0();
  const { user } = useSelector((state: RootState) => state.user);

  return (
    <View
      className={"flex flex-1 h-full bg-[#121212]"}
      style={{
        paddingTop: insets.top + 20,
      }}
    >
      <View className={"flex flex-row items-center justify-between px-5 pb-2"}>
        <View className={"flex flex-row items-center space-x-3"}>
          <UserAvatar size={32} />
          <Text className={"text-white font-bold text-xl"}>无尽旅行</Text>
        </View>
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        className={"pt-4"}
      >
        <View className={"px-3 flex flex-col space-y-3"}>
          <Pressable className={"w-full flex items-center justify-center py-4 bg-[#1ED760] rounded"}>
            <Text className={"text-black font-medium"}>继续旅行</Text>
          </Pressable>
          <Pressable
            onPress={() => {
              router.push("/new");
            }}
            className={"w-full flex items-center justify-center py-4 bg-[#272727] rounded"}>
            <Text className={"text-white font-medium"}>新旅行</Text>
          </Pressable>
          <Pressable className={"w-full flex items-center justify-center py-4 bg-[#272727] rounded"}>
            <Text className={"text-white font-medium"}>加载旅行</Text>
          </Pressable>
          <Pressable className={"w-full flex items-center justify-center py-4 bg-[#272727] rounded"}>
            <Text className={"text-white text-xs"}>选项</Text>
          </Pressable>
          <Pressable
            onPress={async () => {
              await clearSession();
            }}
            className={"w-full flex items-center justify-center py-4 bg-[#272727] rounded"}>
            <Text className={"text-white text-xs"}>退出</Text>
          </Pressable>
          <Text className={"text-[#A7A7A7] w-full text-center text-xs"}>
            {user?.email}
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}

export default memo(Page);
