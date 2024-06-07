import {
  View,
  Text,
  TouchableOpacity,
  Pressable,
  ScrollView,
} from "react-native";
import {memo, useEffect, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import QRCode from "react-native-qrcode-svg";
import Clipboard from "@react-native-clipboard/clipboard";
import { BlurView } from "expo-blur";
import { increaseVersion } from "../../reducers/ui/uiSlice";
import { t } from "../../i18n";
import {
  recovery,
  selectNostrPrivateKey,
  selectNostrPublicKey, selectPublicKey,
} from "../../reducers/account/accountSlice";
import Avatar from "../../components/Avatar";
import * as ImagePicker from "expo-image-picker";
import { Camera } from "expo-camera";
import { decodeKey } from "../../utils/nostrUtil";
import {API_HOST_NAME} from "../../utils/const";
import {finalizeEvent} from "nostr-tools";
import useSWR from "swr";
import { Buffer } from "buffer";

const Page = () => {
  const nostrPublicKey = useSelector(selectNostrPublicKey);
  const nostrPrivateKey = useSelector(selectNostrPrivateKey);
  const [show, setShow] = useState(false);
  const { privateKey } = useSelector((state: RootState) => state.account);
  const { version } = useSelector((state: RootState) => state.ui);
  const publicKey = useSelector(selectPublicKey);
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
          dispatch(increaseVersion());
        } catch (e) {
          alert(t("Import Nostr Key failed"));
        }
      } else {
        alert(t("No Qr code found"));
      }
    }
  };

  const randomPicture = async () => {
    const randomNumber = Math.floor(Math.random() * 10000);
    const newPicture = `https://www.larvalabs.com/cryptopunks/cryptopunk${randomNumber.toString().padStart(4, "0")}.png`
    try {
      const event = finalizeEvent(
        {
          kind: 0,
          created_at: Math.floor(Date.now() / 1000),
          tags: [],
          content: JSON.stringify({
            picture: newPicture
          }),
        },
        Buffer.from(privateKey, "hex"),
      );
      await fetch(`${API_HOST_NAME}/accounts`, {
        method: "POST",
        body: JSON.stringify(event),
      }).then((res) => res.json());
      dispatch(increaseVersion());
    } catch (e) {
      console.log(e)
    }
  };

  const {data, mutate} = useSWR(publicKey ? `${API_HOST_NAME}/accounts/${publicKey}` : undefined, (url) => fetch(url).then((res) => res.json()));

  useEffect(() => {
    mutate()
  }, [version]);

  return (
    <View className={"bg-[#121212] flex flex-1"}>
      <View className={"flex justify-center items-center py-2"}>
        <View className={"w-10 h-1 bg-[#B3B3B3] rounded-full"}></View>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className={"items-center py-20 space-y-8 px-4"}>
          <TouchableOpacity
            onPress={() => {
              Clipboard.setString(nostrPublicKey);
            }}
          >
            <Text className={"text-white text-xl font-bold"}>
              {nostrPublicKey.slice(0, 7)}...{nostrPublicKey.slice(-5)}
            </Text>
          </TouchableOpacity>
          <View className={"bg-white p-3 rounded-lg relative"}>
            {!show && (
              <BlurView
                intensity={60}
                tint="systemThickMaterialLight"
                className={
                  "absolute w-64 h-64 m-3 z-50 flex items-center justify-center"
                }
              >
                <View className={"p-0.5 bg-white rounded-full overflow-hidden"}>
                  <Avatar classname={"w-20 h-20 rounded-full items-center justify-center"} publicKey={publicKey} />
                </View>
              </BlurView>
            )}
            <QRCode
              color={"#121212"}
              size={256}
              logoSize={80}
              logoBackgroundColor={"white"}
              logoBorderRadius={50}
              logo={{
                uri: data?.picture || undefined,
              }}
              value={nostrPrivateKey}
            />
            <Text className={"text-black text-center pt-2 font-bold"}>
              {t("Nostr Private Key")}
            </Text>
          </View>
          <View className={"flex flex-row space-x-3"}>
            <TouchableOpacity
              className={"bg-[#FFFFFF12] px-4 py-2 rounded-full"}
              onPress={randomPicture}
            >
              <Text className={"text-white"}>{t("Shuffle Avatar")}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              className={"bg-[#FFFFFF12] px-4 py-2 rounded-full"}
              onPress={() => {
                setShow(!show);
              }}
            >
              <Text className={"text-white"}>
                {show ? t("Hide Private Key") : t("Show Private Key")}
              </Text>
            </TouchableOpacity>
          </View>
          <View>
            <Text className={"text-[#B3B3B3]"}>
              {t("Be sure you have backup this private key")}
            </Text>
          </View>
          <View className={"pt-8"}>
            <Pressable onPress={pickImage}>
              <Text className={"text-red-500 underline"}>
                {t(`Import My Nostr Key`)}
              </Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default memo(Page);
