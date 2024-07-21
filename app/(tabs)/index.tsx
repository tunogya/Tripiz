import { Pressable, ScrollView, Text, View } from "react-native";
import { memo } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import Avatar from "../../components/Avatar";
import { router } from "expo-router";
import { t } from "../../i18n";
import { useSelector } from "react-redux";
import { selectPublicKey } from "../../reducers/account/accountSlice";
import { useWebSocket } from "../../components/WebSocketProvider";

const Page = () => {
  const insets = useSafeAreaInsets();
  const publicKey = useSelector(selectPublicKey);
  const { connected } = useWebSocket();

  return (
    <View className={"flex flex-1 h-full bg-[#121212] relative"}>
      <ScrollView
        style={{
          marginTop: insets.top,
        }}
        stickyHeaderIndices={[1]}
        className={"flex-1"}
      >
        <View className={"px-4 pt-9 pb-2 flex flex-row space-x-3 items-center"}>
          <Pressable
            onPress={() => {
              router.navigate(`settings`);
            }}
          >
            <Avatar publicKey={publicKey} />
          </Pressable>
          <Text className={"text-white font-bold text-2xl"}>
            {t("Home")}{!connected && t("connecting")}
          </Text>
        </View>
        <View className={"px-4 pb-4 pt-2 bg-[#121212]"}>
          <Pressable
            onPress={() => {
              router.navigate(`chat`);
            }}
            className={
              "flex flex-row bg-white rounded-lg h-12 px-3 items-center space-x-3"
            }
          >
            <Ionicons name="sparkles-sharp" size={24} color="black" />
            <Text className={"flex-1 text-[16px] text-[#B3B3B3]"}>
              {t("Ask AI anything")}
            </Text>
          </Pressable>
        </View>
        <View
          style={{
            height: 80,
          }}
        ></View>
      </ScrollView>
    </View>
  );
};

export default memo(Page);
