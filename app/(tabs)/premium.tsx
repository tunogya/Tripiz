import {
  View, Text, ScrollView, Dimensions,
} from "react-native";
import {memo, useMemo, useState} from "react";
import {useSafeAreaInsets} from "react-native-safe-area-context";
import AddDreamButton from "../../components/AddButton";
import {useSelector} from "react-redux";
import {selectPublicKey} from "../../reducers/account/accountSlice";
import FreeBlock from "../../components/FreeBlock";
import PremiumBlock from "../../components/PremiumBlock";
import Svg, {Path} from "react-native-svg";

const Page = () => {
  const insets = useSafeAreaInsets();
  const publicKey = useSelector(selectPublicKey);
  const screenWidth = Dimensions.get("window").width;
  const [x, setX] = useState(0);

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

  return (
    <View className={"flex flex-1 h-full bg-[#121212]"}>
      <ScrollView
        className={"space-y-6"}
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
              <View key={index} className={`w-2 h-2 ${currentIndex === index ? "bg-white" : "bg-[#7C7C7C]"} rounded-full`}></View>
            ))
          }
        </View>
        <View className={"px-4 space-y-4"}>
          <View className={"bg-[#333333] rounded-lg flex flex-row items-center px-8 py-5 justify-between"}>
            <Text className={"text-white font-bold text-xl"}>Tripiz Free</Text>
            <Text className={"text-white text-xs"}>当前使用计划</Text>
          </View>
        </View>
        <View className={"px-4"}>
          <View className={"bg-[#242424] rounded-lg overflow-hidden relative"}>
            <View className={"flex flex-row"}>
              <View className={"p-2 bg-[#F8D4D7] rounded-br-lg"}>
                <Text className={"text-xs font-bold"}>首月免费试用</Text>
              </View>
              <View className={"flex-1"} />
            </View>
            <View className={"flex flex-row items-center px-4 pt-5 pb-2 space-x-2"}>
              <View className={"w-6 h-6"}>
                <Svg width="24" height="24" viewBox="0 0 760 696" fill="none">
                  <Path
                    d="M264.688 694.445H117.185C-41.7065 554.104 -95.9871 84.379 328.62 4.25391C676.281 -42.873 853.423 311.965 710.104 554.104C677.442 614.825 578.992 705.709 424.166 694.445C319.554 681.009 242.827 653.118 174.492 521.263C80.5192 307.391 232.027 167.009 347.798 151.871C467.056 136.278 513.886 185.238 542.956 207.93C654.037 294.638 631.296 554.104 452.292 554.104C370.484 547.927 328.327 512.5 308.5 475C285 430.554 285.5 371.5 311.184 332.677C339.373 297.661 394.5 270 446.5 322.5C474.728 351 459.944 405.429 430.673 424.852C449.62 440.523 485.27 429.392 504.716 402.06C515.389 388.103 522.363 344.095 504.716 311.964C496.5 288.747 454.733 234.581 369.768 244.046C284.802 253.511 233.181 341.529 242.838 424.852C260.622 517.105 328.62 609.626 474.728 599.577C618.848 575.93 678.4 440.524 662.333 332.677C644.689 214.246 555.28 111.329 409.52 96.775C289.131 88.5898 175.07 157.763 126.022 257.561C79.6434 364.982 88.1547 458.016 126.022 538.935C165.425 623.14 217.896 668.733 264.688 694.445Z"
                    fill="white"/>
                </Svg>
              </View>
              <Text className={"text-white font-bold text-[14px]"}>Premium</Text>
            </View>
            <View className={"px-4 py-2"}>
              <Text className={"text-[#F8D4D7] text-2xl font-bold"}>Standard</Text>
            </View>
            <View className={"px-4 py-2 space-y-1"}>
              <View className={"flex flex-row items-center space-x-2"}>
                <View className={"w-1.5 h-1.5 bg-white rounded-full mx-1"}></View>
                <Text className={"text-white"}>一个Premium高级账户</Text>
              </View>
              <View className={"flex flex-row items-center space-x-2"}>
                <View className={"w-1.5 h-1.5 bg-white rounded-full mx-1"}></View>
                <Text className={"text-white"}>你可以随时取消订阅</Text>
              </View>
            </View>
            <View className={"p-4"}>
              <Text className={"text-xs text-[#A7A7A7] text-center"}>免费 1 个月，之后每月 30 人民币。条款和条件适用。</Text>
            </View>
          </View>
        </View>
      </ScrollView>
      <AddDreamButton/>
    </View>
  );
};

export default memo(Page);
