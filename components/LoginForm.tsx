import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../store/store";
import {memo, useEffect} from "react";
import {initialize, selectPublicKey} from "../reducers/account/accountSlice";
import Purchases from "react-native-purchases";
import {Alert} from "react-native";
import {updatePurchasesEntitlementInfo} from "../reducers/purchase/purchaseSlice";

const LoginForm = () => {
  const {privateKey} = useSelector((state: RootState) => state.account);
  const publicKey = useSelector(selectPublicKey);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!privateKey) {
      dispatch(initialize());
    }
  }, []);

  // Switching accounts
  useEffect(() => {
    const login = async () => {
      if (!publicKey) {
        return
      }
      try {
        await Purchases.logIn(publicKey);
      } catch (e) {
        Alert.alert('Error identifying user', e.message);
      }
    }
    login();
  }, [publicKey]);

  useEffect(() => {
    const fetchUserInfo = async () => {
      const customerInfo = await Purchases.getCustomerInfo();
      if (typeof customerInfo.entitlements.active?.["Premium"] !== 'undefined') {
        const purchasesEntitlementInfo = customerInfo.entitlements.active["Premium"];
        dispatch(updatePurchasesEntitlementInfo(purchasesEntitlementInfo))
      } else {
        dispatch(updatePurchasesEntitlementInfo(undefined))
      }
    }
    fetchUserInfo();
  }, []);

  return null;
};

export default memo(LoginForm);
