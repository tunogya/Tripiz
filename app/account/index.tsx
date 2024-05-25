import {View, Text, Pressable, TouchableOpacity} from "react-native";
import {memo, useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {RootState} from "../../store/store";
import {mapAddressToNumber} from "../../components/Avatar";
import QRCode from "react-native-qrcode-svg";
import Clipboard from '@react-native-clipboard/clipboard';

const Page = () => {
  const { address, privateKey } = useSelector((state: RootState) => state.user);
  const [number, setNumber] = useState<string | undefined>(undefined);

  const fetchNumber = async (address: string) => {
    const data = await mapAddressToNumber(address);
    setNumber(data.toString().padStart(4, '0'));
  };

  useEffect(() => {
    fetchNumber(address);
  }, [address]);

  return (
    <View className={"bg-[#121212] flex flex-1"}>
      <View className={"flex justify-center items-center pt-2"}>
        <View className={"w-10 h-1 bg-[#B3B3B3] rounded-full"}></View>
      </View>
      <View className={"items-center my-20 space-y-8 mx-4"}>
        <Text className={"text-white text-xl font-bold"}>{address.slice(0, 7)}...{address.slice(-5)}</Text>
        <View className={"bg-white p-3 rounded-lg"}>
          <QRCode
            color={'#121212'}
            size={256}
            logoBackgroundColor={"white"}
            logo={{
              uri: `https://www.larvalabs.com/cryptopunks/cryptopunk${number}.png`
            }}
            value={privateKey}
          />
          <Text className={"text-black text-center pt-2 font-bold"}>Tripiz Private Key</Text>
        </View>
        <TouchableOpacity
          className={"bg-[#FFFFFF12] px-4 py-2 rounded-full"}
          onPress={() => {
            Clipboard.setString(privateKey);
          }}
        >
          <Text className={"text-white"}>Copy Private Key</Text>
        </TouchableOpacity>
        <View>
          <Text className={"text-[#B3B3B3]"}>请不要分享私钥给其他人！</Text>
        </View>
      </View>
      <Pressable className={"mx-4 mt-40 items-center"}>
        <Text className={"text-red-500 font-bold"}>Delete This Account</Text>
      </Pressable>
    </View>
  )
}

export default memo(Page)