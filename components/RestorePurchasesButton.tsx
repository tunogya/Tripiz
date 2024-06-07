import {memo} from "react";
import {Alert, Text, TouchableOpacity} from "react-native";
import Purchases from "react-native-purchases";

const RestorePurchasesButton = () => {
  return (
    <TouchableOpacity
      className={"p-4"}
      hitSlop={4}
      onPress={async () => {
        try {
          await Purchases.restorePurchases();
        } catch (e) {
          Alert.alert('Error restoring purchases', e.message);
        }
      }}
    >
      <Text className={"text-white text-center underline"}>恢复已购买的项目</Text>
    </TouchableOpacity>
  )
}

export default memo(RestorePurchasesButton)