import {View, Text, ScrollView, Pressable} from "react-native";
import {memo} from "react";
import {useSafeAreaInsets} from "react-native-safe-area-context";
import AddDreamButton from "../../components/AddDreamButton";

const Page = () => {
  const insets = useSafeAreaInsets();
  return (
    <View className={"flex flex-1 bg-[#121212]"}>
      <View
        style={{
          paddingBottom: insets.bottom + 66,
        }}
      >
        <View
          className={"shadow shadow-black bg-[#121212]"}
          style={{
            paddingTop: insets.top + 20,
          }}
        >
          <ScrollView
            horizontal
            className={"flex flex-row py-3"}
            showsHorizontalScrollIndicator={false}
          >
            <View className={"w-3"}></View>
            {
              ["Dreams", "People", "Objects", "Characters", "Places", "Themes", "Actions"].map((item, index) => (
                <Pressable key={index} className={"px-3 py-1 bg-[#FFFFFF12] rounded-full mx-1"}>
                  <Text className={"text-white text-[14px]"}>{item}</Text>
                </Pressable>
              ))
            }
            <View className={"w-3"}></View>
          </ScrollView>
        </View>
      </View>
      <AddDreamButton />
    </View>
  )
}

export default memo(Page);