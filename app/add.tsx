import {useWindowDimensions, View, Text, Pressable, TextInput} from "react-native";
import {memo, useState} from "react";
import {SceneMap, TabBar, TabView} from "react-native-tab-view";
import {Ionicons} from "@expo/vector-icons";
import {router} from "expo-router";

const StoryRoute = () => (
  <View className={"flex-1 mt-4 px-3 space-y-4"}>
    <TextInput
      placeholder={"Add a title"}
      className={"p-4 bg-white rounded-lg font-bold"}
    />
    <TextInput
      placeholder={"Write your dream here"}
      multiline={true}
      numberOfLines={5}
      className={"p-4 bg-white h-40 rounded-lg"}
    />
  </View>
);

const DetailsRoute = () => (
  <View style={{ flex: 1}} >

  </View>
);

const SymbolsRoute = () => (
  <View style={{ flex: 1}} >

  </View>
);

const LucidityRoute = () => (
  <View style={{ flex: 1}} >

  </View>
);

const renderScene = SceneMap({
  story: StoryRoute,
  details: DetailsRoute,
  symbols: SymbolsRoute,
  lucidity: LucidityRoute,
});


const Page = () => {
  const layout = useWindowDimensions();
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'story', title: 'Story' },
    { key: 'details', title: 'Details' },
    { key: 'symbols', title: 'Symbols' },
    { key: 'lucidity', title: 'Lucidity' },
  ]);

  return (
    <View className={"bg-[#121212] flex flex-1"}>
      <View className={"flex-row justify-between p-3 items-center"}>
        <Pressable
          className={"p-1.5"}
          onPress={() => {
            router.back()
          }}
        >
          <Ionicons name="chevron-down" size={20} color="white" />
        </Pressable>
        <Pressable className={"bg-white rounded-full py-3 px-6 items-center justify-center flex flex-row space-x-1"}>
          <Ionicons name="checkmark" size={20} color="#121212" />
          <Text className={"font-bold"}>Save dream</Text>
        </Pressable>
      </View>
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: layout.width }}
        renderTabBar={props => (
          <TabBar
            {...props}
            scrollEnabled={true}
            tabStyle={{
              width: "auto",
              marginLeft: 3,
            }}
            indicatorStyle={{
              backgroundColor: "white",
              width: 0.382,
            }}
            style={{
              backgroundColor: "#121212"
            }}
            activeColor={"white"}
            renderLabel={({ route, color }) => (
              <Text style={{ color: color, fontWeight: "bold", fontSize: 16 }}>{route.title}</Text>
            )}
          />
        )}
      />
    </View>
  )
}

export default memo(Page)