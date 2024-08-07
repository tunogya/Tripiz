import { useLocalSearchParams } from "expo-router";
import { View, Text } from "react-native";
import QRCode from "react-native-qrcode-svg";
import { ensureString } from "../../utils/ensureString";

const Qrcode = () => {
  const { value, title } = useLocalSearchParams();

  return (
    <View
      className={"flex items-center pt-2 pb-8 bg-[#121212] h-full space-y-3"}
    >
      <View className={"bg-white p-3 space-y-1.5"}>
        <QRCode color={"#121212"} size={256} value={ensureString(value)} />
      </View>
      <Text className={"text-white items-center font-semibold"}>{title}</Text>
    </View>
  );
};

export default Qrcode;
