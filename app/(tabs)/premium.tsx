import {
  View, Text, ScrollView, Dimensions,
} from "react-native";
import {memo} from "react";
import {useSafeAreaInsets} from "react-native-safe-area-context";
import AddDreamButton from "../../components/AddButton";
import {useSelector} from "react-redux";
import {selectPublicKey} from "../../reducers/account/accountSlice";
import FreeBlock from "../../components/FreeBlock";
import PremiumBlock from "../../components/PremiumBlock";

const Page = () => {
  const insets = useSafeAreaInsets();
  const publicKey = useSelector(selectPublicKey);
  const screenWidth = Dimensions.get("window").width;

  return (
    <View className={"flex flex-1 h-full bg-[#121212]"}>
      <ScrollView
        className={"space-y-6"}
        style={{
          paddingTop: insets.top + 20,
        }}
      >
        <View className={"pt-8"}>
          <Text className={"text-white text-3xl font-bold text-center"}>Premium 一个月免费</Text>
        </View>
        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          className={""}
        >
          <View style={{width: screenWidth / 2 - 140 - 6}}/>
          <View className={"w-[280px] h-[140px] mx-1.5 rounded-lg overflow-hidden flex flex-row"}>
            <FreeBlock text={"有广告"}/>
            <PremiumBlock text={"无广告"}/>
          </View>
          <View className={"w-[280px] h-[140px] mx-1.5 rounded-lg overflow-hidden flex flex-row"}>
            <FreeBlock text={"有广告"}/>
            <PremiumBlock text={"无广告"}/>
          </View>
          <View className={"w-[280px] h-[140px] mx-1.5 rounded-lg overflow-hidden flex flex-row"}>
            <FreeBlock text={"有广告"}/>
            <PremiumBlock text={"无广告"}/>
          </View>
          <View style={{width: screenWidth / 2 - 140 - 8}}/>
        </ScrollView>
        <View className={"w-full flex flex-row items-center justify-center space-x-3"}>
          <View className={"w-2 h-2 bg-white rounded-full"}></View>
          <View className={"w-2 h-2 bg-[#7C7C7C] rounded-full"}></View>
          <View className={"w-2 h-2 bg-[#7C7C7C] rounded-full"}></View>
          <View className={"w-2 h-2 bg-[#7C7C7C] rounded-full"}></View>
        </View>
        <View className={"px-4"}>
          <Text className={"text-center text-[#B8B8B8]"}>Hello</Text>
        </View>
        <View className={"px-4"}>
          <View className={"bg-[#333333] rounded-lg flex flex-row items-center px-8 py-5 justify-between"}>
            <Text className={"text-white font-bold text-xl"}>Tripiz 免费</Text>
            <Text className={"text-white"}>正在使用中</Text>
          </View>
        </View>
        <View className={"px-4"}>
          <View className={"bg-[#242424] h-60 rounded-lg"}>

          </View>
        </View>
      </ScrollView>
      <AddDreamButton/>
    </View>
  );
};

export default memo(Page);
