import {View, Text, ScrollView, Pressable} from "react-native";
import {memo, useState} from "react";
import {useSafeAreaInsets} from "react-native-safe-area-context";
import AddDreamButton from "../../components/AddDreamButton";
import {Ionicons} from "@expo/vector-icons";

const Page = () => {
  const insets = useSafeAreaInsets();

  const FILTERS = ["Dreams", "People", "Objects", "Characters", "Places", "Themes", "Actions"];
  const [filter, setFilter] = useState("");

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
              filter && (
                <Pressable
                  className={"h-6 w-6 items-center justify-center bg-[#FFFFFF12] rounded-full mr-1.5"}
                  onPress={() => {
                    setFilter("");
                  }}
                >
                  <Ionicons name="close" size={16} color="white" />
                </Pressable>
              )
            }
            {
              FILTERS.map((item, index) => (
                !filter || (filter && filter === item) ? (
                  <Pressable
                    key={index}
                    className={`px-3 py-1 ${filter === item ? "bg-green-500" : "bg-[#FFFFFF12]"} rounded-full mx-1`}
                    onPress={() => {
                      setFilter(item);
                    }}
                  >
                    <Text className={`${filter === item ? "text-black" : "text-white"} text-[14px]`}>{item}</Text>
                  </Pressable>
                ) : null
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