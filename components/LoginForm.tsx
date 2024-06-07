import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../store/store";
import {memo, useEffect} from "react";
import {initialize, selectPublicKey} from "../reducers/account/accountSlice";
import Purchases from "react-native-purchases";
import {Alert} from "react-native";

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
      console.log(customerInfo.entitlements.active);
      /*
      {"activeSubscriptions": [], "allExpirationDates": {}, "allExpirationDatesMillis": {}, "allPurchaseDates": {}, "allPurchaseDatesMillis": {}, "allPurchasedProductIdentifiers": [], "entitlements": {"active": {}, "all": {}, "verification": "NOT_REQUESTED"}, "firstSeen": "2024-06-06T15:14:21Z", "firstSeenMillis": 1717686861000, "latestExpirationDate": null, "latestExpirationDateMillis": null, "managementURL": null, "nonSubscriptionTransactions": [], "originalAppUserId": "$RCAnonymousID:8544c255cac8444e9961d6613d05deab", "originalApplicationVersion": null, "originalPurchaseDate": null, "originalPurchaseDateMillis": null, "requestDate": "2024-06-06T15:24:20Z", "requestDateMillis": 1717687460000}
       */
    }
    fetchUserInfo();
  }, []);

  return null;
};

export default memo(LoginForm);
