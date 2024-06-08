import { View, Text, ScrollView, Dimensions, Alert } from "react-native";
import { memo, useEffect, useMemo, useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import AddDreamButton from "../../components/AddButton";
import { useDispatch, useSelector } from "react-redux";
import FreeBlock from "../../components/FreeBlock";
import PremiumBlock from "../../components/PremiumBlock";
import Purchases from "react-native-purchases";
import RestorePurchasesButton from "../../components/RestorePurchasesButton";
import PackageItem from "../../components/PackageItem";
import { RootState } from "../../store/store";
import { updatePackage } from "../../reducers/purchase/purchaseSlice";
import { t } from "../../i18n";
import {Link} from "expo-router";

const Page = () => {
  const insets = useSafeAreaInsets();
  const screenWidth = Dimensions.get("window").width;
  const [x, setX] = useState(0);
  const { packages, purchasesEntitlementInfo } = useSelector(
    (state: RootState) => state.purchase,
  );
  const dispatch = useDispatch();

  const array = [
    [t("Have ads"), t("No ads")],
    [t("Limited access"), t("No limited")],
    [t("No AI"), t("New AI features")],
  ];

  const currentIndex = useMemo(() => {
    const round = Math.round(x / 280);
    if (round <= 0) {
      return 0;
    } else if (round >= array.length - 1) {
      return array.length - 1;
    }
    return round;
  }, [x, array]);

  useEffect(() => {
    // Get current available packages
    const getPackages = async () => {
      try {
        const offerings = await Purchases.getOfferings();
        if (
          offerings.current !== null &&
          offerings.current.availablePackages.length !== 0
        ) {
          dispatch(updatePackage(offerings.current.availablePackages));
        }
      } catch (e) {
        Alert.alert("Error getting offers", e.message);
      }
    };

    getPackages();
  }, []);

  const currentPlan = useMemo(() => {
    if (purchasesEntitlementInfo && purchasesEntitlementInfo?.isActive) {
      if (
        purchasesEntitlementInfo.productIdentifier ===
        "ai.abandon.tripiz.monthly.premium.family"
      ) {
        return t("Premium Family");
      } else if (
        purchasesEntitlementInfo.productIdentifier ===
        "ai.abandon.tripiz.monthly.premium.standard"
      ) {
        return t("Premium Standard");
      }
      // {
      // "billingIssueDetectedAt": null,
      // "billingIssueDetectedAtMillis": null,
      // "expirationDate": "2024-06-07T08:01:44Z",
      // "expirationDateMillis": 1717747304000,
      // "identifier": "Premium",
      // "isActive": true,
      // "isSandbox": true,
      // "latestPurchaseDate": "2024-06-07T07:56:44Z",
      // "latestPurchaseDateMillis": 1717747004000,
      // "originalPurchaseDate": "2024-06-07T07:38:49Z",
      // "originalPurchaseDateMillis": 1717745929000,
      // "ownershipType": "PURCHASED",
      // "periodType": "NORMAL",
      // "productIdentifier": "ai.abandon.tripiz.monthly.premium.family",
      // "productPlanIdentifier": null,
      // "store": "APP_STORE",
      // "unsubscribeDetectedAt": null,
      // "unsubscribeDetectedAtMillis": null,
      // "verification": "NOT_REQUESTED",
      // "willRenew": true
      // }
      return t("Premium");
    } else {
      return t("Tripiz Free");
    }
  }, [purchasesEntitlementInfo]);

  return (
    <View className={"flex flex-1 h-full bg-[#121212]"}>
      <ScrollView
        className={"space-y-6"}
        showsVerticalScrollIndicator={false}
        style={{
          paddingTop: insets.top + 20,
        }}
      >
        <View className={"pt-8 px-4"}>
          <Text className={"text-white text-3xl font-bold text-center"}>
            {t("Premium first month free trial")}
          </Text>
        </View>
        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          className={""}
          onScroll={(event) => {
            setX(event.nativeEvent.contentOffset.x);
          }}
        >
          <View style={{ width: screenWidth / 2 - 140 - 6 }} />
          {array.map((item, index) => (
            <View
              key={index}
              className={
                "w-[280px] h-[140px] mx-1.5 rounded-lg overflow-hidden flex flex-row"
              }
            >
              <FreeBlock text={item[0]} />
              <PremiumBlock text={item[1]} />
            </View>
          ))}
          <View style={{ width: screenWidth / 2 - 140 - 8 }} />
        </ScrollView>
        <View
          className={
            "w-full flex flex-row items-center justify-center space-x-3"
          }
        >
          {array.map((item, index) => (
            <View
              key={index}
              className={`w-2 h-2 ${currentIndex === index ? "bg-white" : "bg-[#7C7C7C]"} rounded-full`}
            ></View>
          ))}
        </View>
        <View className={"px-4 space-y-4"}>
          <View
            className={
              "bg-[#333333] rounded-lg flex flex-row items-center px-8 py-5 justify-between"
            }
          >
            <Text className={"text-white font-bold text-xl"}>
              {currentPlan}
            </Text>
            <Text className={"text-white text-xs"}>{t("Current plan")}</Text>
          </View>
        </View>
        {packages &&
          packages.map((item, index) => (
            <View key={index}>
              <PackageItem key={index} purchasePackage={item} />
            </View>
          ))}
        <View className={"space-y-4"}>
          <RestorePurchasesButton />
          <View className={"flex flex-row space-x-3 justify-center"}>
            <Link href={""} className={""}>
              <Text className={"text-center text-[#B3B3B3] text-xs underline"}>
                {t("Privacy policy")}
              </Text>
            </Link>
            <Link href={""} className={""}>
              <Text className={"text-center text-[#B3B3B3] text-xs underline"}>
                {t("Terms of use")}
              </Text>
            </Link>
          </View>

        </View>
        <View
          style={{
            height: insets.bottom + 200,
          }}
        ></View>
      </ScrollView>
      <AddDreamButton />
    </View>
  );
};

export default memo(Page);
