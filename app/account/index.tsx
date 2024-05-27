import {View, Text, Pressable, TouchableOpacity} from "react-native";
import {memo, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../store/store";
import QRCode from "react-native-qrcode-svg";
import Clipboard from '@react-native-clipboard/clipboard';
import {BlurView} from "expo-blur";
import {Ionicons} from "@expo/vector-icons";
import {randomAvatar} from "../../reducers/ui/uiSlice";
import {t} from "../../i18n";

const Page = () => {
  const { address, privateKey } = useSelector((state: RootState) => state.user);
  const [show, setShow] = useState(false);
  const { avatar } = useSelector((state: RootState) => state.ui);
  const dispatch = useDispatch();

  return (
    <View className={"bg-[#121212] flex flex-1"}>
      <View className={"flex justify-center items-center pt-2"}>
        <View className={"w-10 h-1 bg-[#B3B3B3] rounded-full"}></View>
      </View>
      <View className={"items-center my-20 space-y-8 mx-4"}>
        <Text className={"text-white text-xl font-bold"}>{address.slice(0, 7)}...{address.slice(-5)}</Text>
        <View className={"bg-white p-3 rounded-lg relative"}>
          {
            !show && (
              <BlurView
                intensity={100} tint="dark"
                className={"absolute w-64 h-64 m-3 z-50 flex items-center justify-center"}
              >
                <Pressable onPress={() => {
                  setShow(true);
                }}>
                  <Ionicons name="eye-outline" size={30} color="white" />
                </Pressable>
              </BlurView>
            )
          }
          <QRCode
            color={'#121212'}
            size={256}
            logoSize={80}
            logoBackgroundColor={"white"}
            logoBorderRadius={50}
            logo={{
              uri:  `https://www.larvalabs.com/cryptopunks/cryptopunk${(avatar || 0)?.toString().padStart(4, '0')}.png`
            }}
            value={privateKey}
          />
          <Text className={"text-black text-center pt-2 font-bold"}>
            {t("Tripiz Private Key")}
          </Text>
        </View>
        <View className={"flex flex-row space-x-3"}>
          <TouchableOpacity
            className={"bg-[#FFFFFF12] px-4 py-2 rounded-full"}
            onPress={() => {
              dispatch(randomAvatar());
            }}
          >
            <Text className={"text-white"}>
              {t("Shuffle Avatar")}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            className={"bg-[#FFFFFF12] px-4 py-2 rounded-full"}
            onPress={() => {
              Clipboard.setString(privateKey);
            }}
          >
            <Text className={"text-white"}>
              {t("Copy Private Key")}
            </Text>
          </TouchableOpacity>
        </View>
        <View>
          <Text className={"text-[#B3B3B3]"}>
            {t("Please don't share Private Key with anyone!")}
          </Text>
        </View>
      </View>
    </View>
  )
}

export default memo(Page)