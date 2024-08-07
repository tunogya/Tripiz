import {
  ScrollView,
  View,
  Text,
  Pressable,
  TouchableOpacity,
  Vibration,
} from "react-native";
import React, { memo } from "react";
import { useSelector } from "react-redux";
import {
  selectNostrPrivateKey,
  selectNostrPublicKey,
} from "../../reducers/account/accountSlice";
import Clipboard from "@react-native-clipboard/clipboard";
import { t } from "../../i18n";
import { router } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";

const Page = () => {
  const nostrPublicKey = useSelector(selectNostrPublicKey);
  const nostrPrivateKey = useSelector(selectNostrPrivateKey);

  return (
    <ScrollView className={"bg-[#121212] flex flex-1"}>
      <View className={"px-4 py-2 space-y-1"}>
        <View className={"flex flex-row justify-between items-center"}>
          <Text className={"text-white font-medium text-[16px]"}>
            {t("Public Key")}
          </Text>
          <Pressable
            className={"items-center rounded-full"}
            onPress={() => {
              router.navigate(
                `qrcode?value=${nostrPrivateKey}&title=Public Key`,
              );
            }}
          >
            <Ionicons name="qr-code" size={20} color="white" />
          </Pressable>
        </View>
        <TouchableOpacity
          onPress={() => {
            Clipboard.setString(nostrPublicKey);
            Vibration.vibrate();
          }}
        >
          <Text className={"text-[#B3B3B3]"}>{nostrPublicKey}</Text>
        </TouchableOpacity>
      </View>
      <View className={"px-4 py-2 space-y-1 mt-3"}>
        <View className={"flex flex-row justify-between items-center"}>
          <Text className={"text-white font-medium text-[16px]"}>
            {t("Private Key")}
          </Text>
          <Pressable
            className={"items-center rounded-full"}
            onPress={() => {
              router.navigate(
                `qrcode?value=${nostrPrivateKey}&title=Private Key`,
              );
            }}
          >
            <Ionicons name="qr-code" size={20} color="white" />
          </Pressable>
        </View>
        <TouchableOpacity
          onPress={() => {
            Clipboard.setString(nostrPrivateKey);
            Vibration.vibrate();
          }}
        >
          <Text className={"text-[#B3B3B3]"}>{nostrPrivateKey}</Text>
        </TouchableOpacity>
      </View>
      <View className={"px-4 py-2 space-y-1 mt-3"}>
        <Text className={"text-white font-medium text-[16px]"}>
          {t("What is Nostr")}
        </Text>
        <Text className={"text-[#B3B3B3]"}>{t("Nostr description")}</Text>
      </View>
      <View
        style={{
          height: 80,
        }}
      ></View>
    </ScrollView>
  );
};

export default memo(Page);
