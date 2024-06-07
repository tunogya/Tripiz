import {memo} from "react";
import {Alert, Text, TouchableOpacity} from "react-native";
import Purchases from "react-native-purchases";
import {useDispatch} from "react-redux";
import {updatePurchasesEntitlementInfo} from "../reducers/purchase/purchaseSlice";

const RestorePurchasesButton = () => {
  const dispatch = useDispatch();

  return (
    <TouchableOpacity
      className={"p-4"}
      hitSlop={4}
      onPress={async () => {
        try {
          const customerInfo = await Purchases.restorePurchases();
          if (typeof customerInfo.entitlements.active["Premium"] !== 'undefined') {
            const purchasesEntitlementInfo = customerInfo.entitlements.active["Premium"];
            dispatch(updatePurchasesEntitlementInfo(purchasesEntitlementInfo))
            if (purchasesEntitlementInfo.isActive) {
              Alert.alert('Success', 'Restored purchases');
            }
          }
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