import {useWindowDimensions, View, Text, Pressable, TextInput, ScrollView} from "react-native";
import {memo, useState} from "react";
import {SceneMap, TabBar, TabView} from "react-native-tab-view";
import {Ionicons} from "@expo/vector-icons";

const StoryRoute = () => (
  <ScrollView className={"flex-1 mt-4 px-3 space-y-4"}>
    <View className={"bg-white rounded-xl px-3 py-4"}>
      <TextInput
        placeholder={"Add a title"}
        className={"font-bold"}
      />
    </View>
    <View className={"bg-white rounded-xl px-3 py-4"}>
      <TextInput
        placeholder={"Write your dream here..."}
        multiline={true}
        className={"h-40 rounded-lg"}
      />
    </View>
    <View className={"bg-white rounded-xl p-3"}>
      <View className={"flex flex-row items-center space-x-1"}>
        <Ionicons name="mic" size={20} color="black" />
        <Text className={"font-bold"}>Voice recording</Text>
      </View>
      <View className={"h-20"}>
        <Pressable className={""}>
        </Pressable>
      </View>
    </View>
    <View className={"h-20"}></View>
  </ScrollView>
);

const DetailsRoute = () => (
  <ScrollView className={"flex-1 pt-4 px-3 space-y-8"}>
    <View className={"space-y-3"}>
      <Text className={"text-white text-3xl font-bold"}>
        General
      </Text>
      <View className={"bg-white rounded-xl p-4"}>
        <Text className={"font-bold"}>
          Date
        </Text>
      </View>
      <View className={"bg-white rounded-xl p-4"}>
        <Text className={"font-bold"}>
          Type
        </Text>
      </View>
      <View className={"bg-white rounded-xl p-4"}>
        <Text className={"font-bold"}>
          Rate
        </Text>
      </View>
      <View className={"bg-white rounded-xl p-4"}>
        <Text className={"font-bold"}>
          Images
        </Text>
      </View>
      <View className={"bg-white rounded-xl p-4"}>
        <Text className={"font-bold"}>
          Dream length
        </Text>
      </View>
      <View className={"bg-white rounded-xl p-4"}>
        <Text className={"font-bold"}>
          Sleep quality
        </Text>
      </View>
      <View className={"bg-white rounded-xl p-4"}>
        <Text className={"font-bold"}>
          Personally in the dream
        </Text>
      </View>
    </View>
    <View className={"space-y-3"}>
      <Text className={"text-white text-3xl font-bold"}>
        Emotions
      </Text>
      <View className={"bg-white rounded-xl p-4"}>
        <Text className={"font-bold"}>
          Emotions
        </Text>
      </View>
      <View className={"bg-white rounded-xl p-4"}>
        <Text className={"font-bold"}>
          Corresponds to mood
        </Text>
      </View>
    </View>
    <View className={"space-y-3"}>
      <Text className={"text-white text-3xl font-bold"}>
        Context
      </Text>
    </View>
    <View className={"space-y-3"}>
      <Text className={"text-white text-3xl font-bold"}>
        Notes
      </Text>
      <View className={"bg-white rounded-xl px-3 py-4"}>
        <TextInput
          multiline={true}
          placeholder={"Write down anything else you want about your dream"}
          className={"font-bold h-40"}
        />
      </View>
    </View>
    <View className={"h-20"}></View>
  </ScrollView>
);

const SymbolsRoute = () => (
  <ScrollView className={"flex-1 pt-4 px-3 space-y-3"}>
    <View className={"bg-white rounded-xl p-4"}>
      <Text className={"font-bold"}>
        People
      </Text>
    </View>
    <View className={"bg-white rounded-xl p-4"}>
      <Text className={"font-bold"}>
        Objects
      </Text>
    </View>
    <View className={"bg-white rounded-xl p-4"}>
      <Text className={"font-bold"}>
        Characters
      </Text>
    </View>
    <View className={"bg-white rounded-xl p-4"}>
      <Text className={"font-bold"}>
        Places
      </Text>
    </View>
    <View className={"bg-white rounded-xl p-4"}>
      <Text className={"font-bold"}>
        Themes
      </Text>
    </View>
    <View className={"bg-white rounded-xl p-4"}>
      <Text className={"font-bold"}>
        Actions
      </Text>
    </View>
    <View className={"h-20"}></View>
  </ScrollView>
);

const LucidityRoute = () => (
  <ScrollView className={"flex-1 pt-4 px-3 space-y-3"}>
    <View className={"bg-white rounded-xl p-4"}>
      <Text className={"font-bold"}>
        Lucid dream
      </Text>
    </View>
    <View className={"bg-white rounded-xl p-4"}>
      <Text className={"font-bold"}>
        Can control dream
      </Text>
    </View>
    <View className={"bg-white rounded-xl p-4"}>
      <Text className={"font-bold"}>
        Vividness
      </Text>
    </View>
    <View className={"h-20"}></View>
  </ScrollView>
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
      <View className={"flex justify-center items-center py-0.5"}>
        <View className={"w-10 h-1 bg-white rounded-full"}></View>
      </View>
      <View className={"flex-row justify-between p-3 items-center"}>
        <View></View>
        {/*<Pressable*/}
        {/*  className={"items-center justify-center flex flex-row space-x-1"}*/}
        {/*  onPress={() => {*/}
        {/*  }}*/}
        {/*>*/}
        {/*  <Ionicons name="refresh-sharp" size={20} color="white" />*/}
        {/*  <Text className={"text-white font-bold"}>Clear all</Text>*/}
        {/*</Pressable>*/}
        <Pressable className={"bg-white rounded-full py-3 px-6 items-center justify-center flex flex-row space-x-1"}>
          <Ionicons name="checkmark-done-sharp" size={16} color="#121212" />
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