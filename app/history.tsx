import {View, Text, ScrollView, FlatList} from "react-native";
import {useSafeAreaInsets} from "react-native-safe-area-context";

const History = () => {
  const insets = useSafeAreaInsets();

  return (
    <FlatList
      data={["1", "2", "3"]}
      renderItem={({item}) => (
        <View className={"bg-[#292929] p-3 my-1.5 rounded-lg"}>
          <Text className={"text-white"}>{item}</Text>
        </View>
      )}
      style={{
        paddingBottom: insets.bottom + 12,
      }}
      className={"flex h-full bg-[#121212] px-3"}
    />
  )
}

export default History;