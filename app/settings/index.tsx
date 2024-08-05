import { ScrollView, View, Text, Pressable } from "react-native";
import { memo } from "react";
import { useSelector } from "react-redux";
import {
  selectNostrPublicKey,
  selectPublicKey,
} from "../../reducers/account/accountSlice";
import Avatar from "../../components/Avatar";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { t } from "../../i18n";
import useMetadata from "components/useMetadata";

const Page = () => {
  const publicKey = useSelector(selectPublicKey);
  const nostrPublicKey = useSelector(selectNostrPublicKey);
  const { name, picture } = useMetadata(publicKey);

  return (
    <ScrollView className={"bg-[#121212] flex flex-1"}>
      <View className={"px-4 py-2 flex flex-row justify-between items-center"}>
        <View className={"flex flex-row items-center space-x-3"}>
          <Avatar
            key={publicKey}
            classname={
              "w-14 h-14 rounded-full items-center justify-center bg-gray-400"
            }
            publicKey={publicKey}
          />
          <View className={"space-y-1.5 flex-1 mr-10"}>
            <Text className={"text-[#B3B3B3] font-medium"} numberOfLines={2}>
              {nostrPublicKey}
            </Text>
          </View>
        </View>
      </View>
      <Pressable
        onPress={() => {
          router.navigate("settings/account");
        }}
      >
        <View
          className={"px-4 py-2 flex flex-row justify-between items-center"}
        >
          <Text className={"text-white font-medium text-[16px]"}>
            {t("Account")}
          </Text>
          <Ionicons name="chevron-forward-outline" size={24} color="white" />
        </View>
      </Pressable>
      <Pressable
        onPress={() => {
          router.navigate("settings/metadata");
        }}
      >
        <View
          className={"px-4 py-2 flex flex-row justify-between items-center"}
        >
          <Text className={`${!picture || !name ? "text-[#1DB954]" : "text-white" } font-medium text-[16px]`}>
            {t("Metadata")}
          </Text>
          <Ionicons name="chevron-forward-outline" size={24} color="white" />
        </View>
      </Pressable>
      <Pressable
        onPress={() => {
          router.navigate("settings/storage");
        }}
      >
        <View
          className={"px-4 py-2 flex flex-row justify-between items-center"}
        >
          <Text className={"text-white font-medium text-[16px]"}>
            {t("Storage")}
          </Text>
          <Ionicons name="chevron-forward-outline" size={24} color="white" />
        </View>
      </Pressable>
      <Pressable
        onPress={() => {
          router.navigate("settings/about");
        }}
      >
        <View
          className={"px-4 py-2 flex flex-row justify-between items-center"}
        >
          <Text className={"text-white font-medium text-[16px]"}>
            {t("About")}
          </Text>
          <Ionicons name="chevron-forward-outline" size={24} color="white" />
        </View>
      </Pressable>
    </ScrollView>
  );
};

export default memo(Page);
