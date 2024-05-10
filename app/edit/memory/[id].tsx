import {
  useWindowDimensions,
  View,
  Text,
  Pressable,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { memo, useState } from "react";
import { SceneMap, TabBar, TabView } from "react-native-tab-view";
import { Ionicons } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { router, useLocalSearchParams } from "expo-router";
import {
  removeOneMemory,
  updateOneMemory,
} from "../../../reducers/memories/memorySlice";
import { ensureString } from "../../../utils/ensureString";

const MemoryRoute = () => {
  const { id } = useLocalSearchParams();
  const insets = useSafeAreaInsets();
  const { entities } = useSelector((state: RootState) => state.memory);

  const memory = id ? entities?.[ensureString(id)] : null;
  const dispatch = useDispatch();

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      enabled
      style={{
        flex: 1,
      }}
      keyboardVerticalOffset={insets.top + 20}
    >
      <ScrollView className={"flex-1 pt-4 px-3 space-y-4"}>
        <View className={"bg-[#242424] rounded-xl px-3 py-4"}>
          <TextInput
            value={memory.title}
            placeholder={"Add a title"}
            placeholderTextColor={"#B3B3B3"}
            className={"font-bold text-white"}
            onChangeText={(text) => {
              dispatch(
                updateOneMemory({
                  id: ensureString(id),
                  changes: {
                    title: text,
                  },
                }),
              );
            }}
          />
        </View>
        <View className={"bg-[#242424] rounded-xl px-3 py-4"}>
          <TextInput
            value={memory.description}
            placeholder={"Write your memory here..."}
            placeholderTextColor={"#B3B3B3"}
            multiline={true}
            className={"h-40 rounded-lg text-white"}
            onChangeText={(text) => {
              dispatch(
                updateOneMemory({
                  id: ensureString(id),
                  changes: {
                    description: text,
                  },
                }),
              );
            }}
          />
        </View>
        <View className={"bg-[#242424] rounded-xl p-3"}>
          <View className={"flex flex-row items-center space-x-1"}>
            <Ionicons name="mic" size={20} color="white" />
            <Text className={"font-bold text-white"}>Voice recording</Text>
          </View>
          <View className={"h-20"}>
            <Pressable className={""}></Pressable>
          </View>
        </View>
        <View
          style={{
            height: insets.bottom + 80,
          }}
        ></View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const DetailsRoute = () => {
  const { id } = useLocalSearchParams();
  const insets = useSafeAreaInsets();
  const dispatch = useDispatch();
  const { entities } = useSelector((state: RootState) => state.memory);

  const memory = id ? entities?.[ensureString(id)] : null;

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      enabled
      style={{
        flex: 1,
      }}
      keyboardVerticalOffset={insets.top + 20}
    >
      <ScrollView className={"flex-1 pt-4 px-3 space-y-8"}>
        <View className={"space-y-3"}>
          <Text className={"text-white text-3xl font-bold"}>General</Text>
          <View className={"bg-[#242424] rounded-xl p-4 space-y-3"}>
            <Text className={"font-bold text-white"}>Rate</Text>
            <View className={"flex flex-row justify-center space-x-1.5"}>
              {[1, 2, 3, 4, 5].map((item, index) => (
                <Pressable
                  key={index}
                  onPress={() => {
                    dispatch(
                      updateOneMemory({
                        id: ensureString(id),
                        changes: {
                          rate: item,
                        },
                      }),
                    );
                  }}
                  className={`${item === memory.rate ? "bg-white" : ""} w-12 h-12 border border-[#727272] rounded-lg flex items-center justify-center`}
                >
                  <Text
                    className={`${item === memory.rate ? "text-black" : "text-[#B3B3B3]"} font-bold`}
                  >
                    {item}
                  </Text>
                </Pressable>
              ))}
            </View>
            <View className={"flex flex-row justify-around"}>
              <Text className={"font-bold text-[#B3B3B3]"}>Very bad</Text>
              <Text className={"font-bold text-[#B3B3B3]"}>Very good</Text>
            </View>
          </View>
        </View>
        <View className={"space-y-3"}>
          <Text className={"text-white text-3xl font-bold"}>Notes</Text>
          <View className={"bg-[#242424] rounded-xl px-3 py-4"}>
            <TextInput
              value={memory.notes}
              multiline={true}
              placeholderTextColor={"#B3B3B3"}
              onChangeText={(text) => {
                dispatch(
                  updateOneMemory({
                    id: ensureString(id),
                    changes: {
                      notes: text,
                    },
                  }),
                );
              }}
              placeholder={
                "Write down anything else you want about your memory"
              }
              className={"font-bold h-40 text-white"}
            />
          </View>
        </View>
        <View
          style={{
            height: insets.bottom + 80,
          }}
        ></View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const renderScene = SceneMap({
  story: MemoryRoute,
  details: DetailsRoute,
});

const Page = () => {
  const { id } = useLocalSearchParams();
  const layout = useWindowDimensions();
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: "story", title: "Memory" },
    { key: "details", title: "Details" },
  ]);
  const { entities } = useSelector((state: RootState) => state.memory);
  const dispatch = useDispatch();
  const memory = id ? entities?.[ensureString(id)] : null;

  const save = async () => {
    if (!memory.title && !memory.description) {
      dispatch(removeOneMemory(memory.id));
    }
    router.back();
  };

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
          className={`rounded-full items-center justify-center flex flex-row space-x-1`}
          onPress={save}
        >
          <Text className={"font-bold text-white"}>Done</Text>
        </Pressable>
      </View>
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: layout.width }}
        renderTabBar={(props) => (
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
              backgroundColor: "#121212",
            }}
            activeColor={"white"}
            renderLabel={({ route, color }) => (
              <Text style={{ color: color, fontWeight: "bold", fontSize: 16 }}>
                {route.title}
              </Text>
            )}
          />
        )}
      />
    </View>
  );
};

export default memo(Page);
