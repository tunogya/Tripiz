import {useWindowDimensions, View, Text, Pressable, TextInput, ScrollView} from "react-native";
import {memo, useState} from "react";
import {SceneMap, TabBar, TabView} from "react-native-tab-view";
import {Ionicons} from "@expo/vector-icons";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../store/store";
import {updateDraft} from "../reducers/dreams/draftSlice";

const StoryRoute = () => {
  const {title, description} = useSelector((state: RootState) => state.draft);
  const dispatch = useDispatch();

  return (
    <ScrollView className={"flex-1 mt-4 px-3 space-y-4"}>
      <View className={"bg-[#242424] rounded-xl px-3 py-4"}>
        <TextInput
          value={title}
          placeholder={"Add a title"}
          placeholderTextColor={"#B3B3B3"}
          className={"font-bold text-white"}
          onChangeText={(text) => {
            dispatch(updateDraft({title: text}))
          }}
        />
      </View>
      <View className={"bg-[#242424] rounded-xl px-3 py-4"}>
        <TextInput
          value={description}
          placeholder={"Write your dream here..."}
          placeholderTextColor={"#B3B3B3"}
          multiline={true}
          className={"h-40 rounded-lg text-white"}
          onChangeText={(text) => {
            dispatch(updateDraft({description: text}))
          }}
        />
      </View>
      <View className={"bg-[#242424] rounded-xl p-3"}>
        <View className={"flex flex-row items-center space-x-1"}>
          <Ionicons name="mic" size={20} color="white"/>
          <Text className={"font-bold text-white"}>Voice recording</Text>
        </View>
        <View className={"h-20"}>
          <Pressable className={""}>
          </Pressable>
        </View>
      </View>
      <View className={"h-20"}></View>
    </ScrollView>
  )
};

const DetailsRoute = () => {
  const {rate, dreamLength, sleepQuality, isPersonally, notes} = useSelector((state: RootState) => state.draft);
  const dispatch = useDispatch();

  return (
    <ScrollView className={"flex-1 pt-4 px-3 space-y-8"}>
      <View className={"space-y-3"}>
        <Text className={"text-white text-3xl font-bold"}>
          General
        </Text>
        <View className={"bg-[#242424] rounded-xl p-4 space-y-3"}>
          <Text className={"font-bold text-white"}>
            Rate
          </Text>
          <View className={'flex flex-row justify-center space-x-1.5'}>
            {
              [1, 2, 3, 4, 5].map((item, index) => (
                <Pressable
                  key={index}
                  onPress={() => {
                    dispatch(updateDraft({rate: item}))
                  }}
                  className={`${item === rate ? "bg-white" : ""} w-12 h-12 border border-[#727272] rounded-lg flex items-center justify-center`}>
                  <Text className={`${item === rate ? "text-black" : "text-[#B3B3B3]"} font-bold`}>{item}</Text>
                </Pressable>
              ))
            }
          </View>
          <View className={"flex flex-row justify-around"}>
            <Text className={"font-bold text-[#B3B3B3]"}>Very bad</Text>
            <Text className={"font-bold text-[#B3B3B3]"}>Very good</Text>
          </View>
        </View>
        <View className={"bg-[#242424] rounded-xl p-4 space-y-3"}>
          <Text className={"font-bold text-white"}>
            Dream length
          </Text>
          <View className={'flex flex-row justify-center space-x-1.5'}>
            {
              [1, 2, 3, 4, 5].map((item, index) => (
                <Pressable
                  key={index}
                  onPress={() => {
                    dispatch(updateDraft({dreamLength: item}))
                  }}
                  className={`${item === dreamLength ? "bg-white" : ""} w-12 h-12 border border-[#727272] rounded-lg flex items-center justify-center`}>
                  <Text className={`${item === dreamLength ? "text-black" : "text-[#B3B3B3]"} font-bold`}>{item}</Text>
                </Pressable>
              ))
            }
          </View>
          <View className={"flex flex-row justify-around"}>
            <Text className={"font-bold text-[#B3B3B3]"}>Very short</Text>
            <Text className={"font-bold text-[#B3B3B3]"}>Very long</Text>
          </View>
        </View>
        <View className={"bg-[#242424] rounded-xl p-4 space-y-3"}>
          <Text className={"font-bold text-white"}>
            Sleep quality
          </Text>
          <View className={'flex flex-row justify-center space-x-1.5'}>
            {
              [1, 2, 3, 4, 5].map((item, index) => (
                <Pressable
                  key={index}
                  onPress={() => {
                    dispatch(updateDraft({sleepQuality: item}))
                  }}
                  className={`${item === sleepQuality ? "bg-white" : ""} w-12 h-12 border border-[#727272] rounded-lg flex items-center justify-center`}>
                  <Text className={`${item === sleepQuality ? "text-black" : "text-[#B3B3B3]"} font-bold`}>{item}</Text>
                </Pressable>
              ))
            }
          </View>
          <View className={"flex flex-row justify-around"}>
            <Text className={"font-bold text-[#B3B3B3]"}>Very bad</Text>
            <Text className={"font-bold text-[#B3B3B3]"}>Very good</Text>
          </View>
        </View>
        <View className={"bg-[#242424] rounded-xl p-4 space-y-3"}>
          <Text className={"font-bold text-white"}>
            Personally in the dream
          </Text>
          <View className={"flex flex-row justify-center space-x-1.5"}>
            {
              [false, true].map((item, index) => (
                <Pressable className={"w-28 h-12 border border-[#727272] rounded-lg flex items-center justify-center"}>
                  <Text className={"font-bold text-[#B3B3B3]"}>
                    {item ? "Yes" : "No"}
                  </Text>
                </Pressable>
              ))
            }
          </View>
        </View>
      </View>
      <View className={"space-y-3"}>
        <Text className={"text-white text-3xl font-bold"}>
          Notes
        </Text>
        <View className={"bg-[#242424] rounded-xl px-3 py-4"}>
          <TextInput
            multiline={true}
            placeholderTextColor={"#B3B3B3"}
            placeholder={"Write down anything else you want about your dream"}
            className={"font-bold h-40 text-white"}
          />
        </View>
      </View>
      <View className={"h-20"}></View>
    </ScrollView>
  )
};

const LucidityRoute = () => {
  const { lucidity, controllability, vividness} = useSelector((state: RootState) => state.draft);
  const dispatch = useDispatch();

  return (
    <ScrollView className={"flex-1 pt-4 px-3 space-y-3"}>
      <View className={"bg-[#242424] rounded-xl p-4 space-y-3"}>
        <Text className={"font-bold text-white"}>
          Lucid dream
        </Text>
        <View className={"flex flex-row justify-center space-x-1.5"}>
          {
            [false, true].map((item, index) => (
              <Pressable className={"w-28 h-12 border border-[#727272] rounded-lg flex items-center justify-center"}>
                <Text className={"font-bold text-[#B3B3B3]"}>
                  {item ? "Yes" : "No"}
                </Text>
              </Pressable>
            ))
          }
        </View>
      </View>
      <View className={"bg-[#242424] rounded-xl p-4 space-y-3"}>
        <Text className={"font-bold text-white"}>
          Can control dream
        </Text>
        <View className={"flex flex-row justify-center space-x-1.5"}>
          {
            [false, true].map((item, index) => (
              <Pressable className={"w-28 h-12 border border-[#727272] rounded-lg flex items-center justify-center"}>
                <Text className={"font-bold text-[#B3B3B3]"}>
                  {item ? "Yes" : "No"}
                </Text>
              </Pressable>
            ))
          }
        </View>
      </View>
      <View className={"bg-[#242424] rounded-xl p-4 space-y-3"}>
        <Text className={"font-bold text-white"}>
          Vividness
        </Text>
        <View className={'flex flex-row justify-center space-x-1.5'}>
          {
            [1, 2, 3, 4, 5].map((item, index) => (
              <Pressable
                key={index}
                onPress={() => {
                  dispatch(updateDraft({vividness: item}))
                }}
                className={`${item === vividness ? "bg-white" : ""} w-12 h-12 border border-[#727272] rounded-lg flex items-center justify-center`}>
                <Text className={`${item === vividness ? "text-black" : "text-[#B3B3B3]"} font-bold`}>{item}</Text>
              </Pressable>
            ))
          }
        </View>
        <View className={"flex flex-row justify-around"}>
          <Text className={"font-bold text-[#B3B3B3]"}>Very vague</Text>
          <Text className={"font-bold text-[#B3B3B3]"}>Very vivid</Text>
        </View>
      </View>
      <View className={"h-20"}></View>
    </ScrollView>
  )
};

const renderScene = SceneMap({
  story: StoryRoute,
  details: DetailsRoute,
  lucidity: LucidityRoute,
});

const Page = () => {
  const layout = useWindowDimensions();
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    {key: 'story', title: 'Story'},
    {key: 'details', title: 'Details'},
    {key: 'lucidity', title: 'Lucidity'},
  ]);

  return (
    <View className={"bg-[#121212] flex flex-1"}>
      <View className={"flex justify-center items-center pt-2"}>
        <View className={"w-10 h-1 bg-[#B3B3B3] rounded-full"}></View>
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
        <Pressable
          className={`bg-[#B3B3B3] rounded-full py-3 px-6 items-center justify-center flex flex-row space-x-1`}>
          <Ionicons name="checkmark-done-sharp" size={20} color="#121212"/>
          <Text className={"font-bold"}>Save dream</Text>
        </Pressable>
      </View>
      <TabView
        navigationState={{index, routes}}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{width: layout.width}}
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
            renderLabel={({route, color}) => (
              <Text style={{color: color, fontWeight: "bold", fontSize: 16}}>{route.title}</Text>
            )}
          />
        )}
      />
    </View>
  )
}

export default memo(Page)