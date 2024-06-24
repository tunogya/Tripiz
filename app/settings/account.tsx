import { ScrollView, View, Text, Pressable } from "react-native";
import { memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  recovery,
  selectNostrPrivateKey,
  selectNostrPublicKey,
} from "../../reducers/account/accountSlice";
import QRCode from "react-native-qrcode-svg";
import Clipboard from "@react-native-clipboard/clipboard";
import { t } from "../../i18n";
import * as ImagePicker from "expo-image-picker";
import { Camera } from "expo-camera";
import { decodeKey } from "../../utils/nostrUtil";

const Page = () => {
  const nostrPublicKey = useSelector(selectNostrPublicKey);
  const nostrPrivateKey = useSelector(selectNostrPrivateKey);
  const dispatch = useDispatch();

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      const data = await Camera.scanFromURLAsync(result.assets[0].uri);
      if (data?.[0] && data[0]?.data) {
        try {
          const nostrPrivateKey = decodeKey(data[0]?.data);
          if (!nostrPrivateKey) {
            return;
          }
          dispatch(recovery(nostrPrivateKey));
        } catch (e) {
          alert(t("Import Nostr Key failed"));
        }
      } else {
        alert(t("No Qr code found"));
      }
    }
  };

  return (
    <ScrollView className={"bg-[#121212] flex flex-1"}>
      <Pressable
        onPress={() => {
          Clipboard.setString(nostrPublicKey);
        }}
        className={"px-4 py-2 space-y-1"}
      >
        <Text className={"text-white font-medium"}>{t("Public Key")}</Text>
        <Text className={"text-[#B3B3B3] text-xs"}>{nostrPublicKey}</Text>
      </Pressable>
      <Pressable
        onPress={() => {
          Clipboard.setString(nostrPrivateKey);
        }}
        className={"px-4 py-2 space-y-1"}
      >
        <Text className={"text-white font-medium"}>{t("Private Key")}</Text>
        <Text className={"text-[#B3B3B3] text-xs"}>{nostrPrivateKey}</Text>
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
        <Text className={"text-white font-medium"}>{t("What is Nostr")}</Text>
        <Text className={"text-[#B3B3B3] text-xs"}>
          {t("Nostr description")}
        </Text>
      </View>
      <Pressable onPress={pickImage} className={"px-4 py-2 space-y-1"}>
        <Text className={"text-white font-medium"}>
          {t("I already have a Nostr account")}
        </Text>
        <Text className={"text-[#B3B3B3] underline text-xs"}>
          {t(`Import my Nostr key`)}
        </Text>
      </Pressable>
    </ScrollView>
  );
};

export default memo(Page);
