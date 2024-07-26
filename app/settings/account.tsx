import { ScrollView, View, Text, Pressable } from "react-native";
import { memo } from "react";
import { useSelector } from "react-redux";
import {
  selectNostrPrivateKey,
  selectNostrPublicKey,
} from "../../reducers/account/accountSlice";
import QRCode from "react-native-qrcode-svg";
import Clipboard from "@react-native-clipboard/clipboard";
import { t } from "../../i18n";

const Page = () => {
  const nostrPublicKey = useSelector(selectNostrPublicKey);
  const nostrPrivateKey = useSelector(selectNostrPrivateKey);

  return (
    <ScrollView className={"bg-[#121212] flex flex-1"}>
      <Pressable
        onPress={() => {
          Clipboard.setString(nostrPublicKey);
        }}
        className={"px-4 py-2 space-y-1"}
      >
        <Text className={"text-white font-medium text-[16px]"}>
          {t("Public Key")}
        </Text>
        <Text className={"text-[#B3B3B3]"}>{nostrPublicKey}</Text>
      </Pressable>
      <Pressable
        onPress={() => {
          Clipboard.setString(nostrPrivateKey);
        }}
        className={"px-4 py-2 space-y-1"}
      >
        <Text className={"text-white font-medium text-[16px]"}>
          {t("Private Key")}
        </Text>
        <Text className={"text-[#B3B3B3]"}>{nostrPrivateKey}</Text>
      </Pressable>
      <View className={"flex items-center pt-2 pb-8"}>
        <View className={"bg-white p-3 space-y-1.5"}>
          <QRCode color={"#121212"} size={256} value={nostrPrivateKey} />
          <Text className={"font-bold text-center"}>
            {t("Nostr Private Key")}
          </Text>
        </View>
      </View>
      <View className={"px-4 py-2 space-y-1"}>
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
