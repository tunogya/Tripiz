import {
  View, Text, ScrollView, Dimensions, Alert,
} from "react-native";
import {memo, useEffect, useMemo, useState} from "react";
import {useSafeAreaInsets} from "react-native-safe-area-context";
import AddDreamButton from "../../components/AddButton";
import {useDispatch, useSelector} from "react-redux";
import FreeBlock from "../../components/FreeBlock";
import PremiumBlock from "../../components/PremiumBlock";
import Purchases from "react-native-purchases";
import RestorePurchasesButton from "../../components/RestorePurchasesButton";
import PackageItem from "../../components/PackageItem";
import {RootState} from "../../store/store";
import {updatePackage} from "../../reducers/purchase/purchaseSlice";

const Page = () => {
  const insets = useSafeAreaInsets();
  const screenWidth = Dimensions.get("window").width;
  const [x, setX] = useState(0);
  const { packages, purchasesEntitlementInfo } = useSelector((state: RootState) => state.purchase);
  const dispatch = useDispatch();

  const array = [
    ["有广告", "无广告"],
    ["有广告", "无广告"],
    ["有广告", "无广告"],
  ]

  const currentIndex = useMemo(() => {
    const round = Math.round(x / 280);
    if (round <= 0) {
      return 0
    } else if (round >= array.length - 1) {
      return array.length - 1
    }
    return round
  }, [x, array]);

  useEffect(() => {
    // Get current available packages
    const getPackages = async () => {
      try {
        const offerings = await Purchases.getOfferings();
        if (offerings.current !== null && offerings.current.availablePackages.length !== 0) {
          dispatch(updatePackage(offerings.current.availablePackages));
        }
      } catch (e) {
        Alert.alert('Error getting offers', e.message);
      }
    };

    getPackages();
  }, []);

  const currentPlan = useMemo(() => {
    if (purchasesEntitlementInfo && purchasesEntitlementInfo?.isActive) {
      return "Premium"
    } else {
      return "Tripiz Free"
    }
  }, [purchasesEntitlementInfo])

  return (
    <View className={"flex flex-1 h-full bg-[#121212]"}>
      <ScrollView
        className={"space-y-6"}
        showsVerticalScrollIndicator={false}
        style={{
          paddingTop: insets.top + 20,
        }}
      >
        <View className={"pt-10"}>
          <Text className={"text-white text-3xl font-bold text-center"}>Premium 首月免费试用</Text>
        </View>
        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          className={""}
          onScroll={(event) => {
            setX(event.nativeEvent.contentOffset.x);
          }}
        >
          <View style={{width: screenWidth / 2 - 140 - 6}}/>
          {
            array.map((item, index) => (
              <View key={index} className={"w-[280px] h-[140px] mx-1.5 rounded-lg overflow-hidden flex flex-row"}>
                <FreeBlock text={item[0]}/>
                <PremiumBlock text={item[1]}/>
              </View>
            ))
          }
          <View style={{width: screenWidth / 2 - 140 - 8}}/>
        </ScrollView>
        <View className={"w-full flex flex-row items-center justify-center space-x-3"}>
          {
            array.map((item, index) => (
              <View key={index}
                    className={`w-2 h-2 ${currentIndex === index ? "bg-white" : "bg-[#7C7C7C]"} rounded-full`}></View>
            ))
          }
        </View>
        <View className={"px-4 space-y-4"}>
          <View className={"bg-[#333333] rounded-lg flex flex-row items-center px-8 py-5 justify-between"}>
            <Text className={"text-white font-bold text-xl"}>{currentPlan}</Text>
            <Text className={"text-white text-xs"}>当前使用计划</Text>
          </View>
        </View>
        {
          packages && packages.map((item, index) => (
            <View key={index}>
              <PackageItem key={index} purchasePackage={item}/>
            </View>
          ))
        }
        <RestorePurchasesButton/>
        <View style={{
          height: insets.bottom + 200,
        }}></View>
      </ScrollView>
      <AddDreamButton/>
    </View>
  );
};

export default memo(Page);
