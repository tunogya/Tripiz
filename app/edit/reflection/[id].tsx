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
import { SceneMap, TabView } from "react-native-tab-view";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {removeOneReflection, updateOneReflection} from "../../../reducers/reflections/reflectionSlice";
import {router, useLocalSearchParams} from "expo-router";
import {ensureString} from "../../../utils/ensureString";

const DetailsRoute = () => {
  const { id } = useLocalSearchParams();
  const insets = useSafeAreaInsets();
  const dispatch = useDispatch();
  const { entities } = useSelector((state: RootState) => state.reflection);

  const reflection = id ? entities?.[ensureString(id)] : null;

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
          <Text className={"text-white text-3xl font-bold"}>Reflection</Text>
          <View className={"bg-[#242424] rounded-xl px-3 py-4"}>
            <TextInput
              value={reflection.title}
              placeholder={"Add a title"}
              placeholderTextColor={"#B3B3B3"}
              className={"font-bold text-white"}
              onChangeText={(text) => {
                dispatch(updateOneReflection({
                  id: ensureString(id),
                  changes: {
                    title: text
                  }
                }))
              }}
            />
          </View>
          <View className={"bg-[#242424] rounded-xl px-3 py-4"}>
            <TextInput
              value={reflection.description}
              multiline={true}
              placeholderTextColor={"#B3B3B3"}
              onChangeText={(text) => {
                dispatch(updateOneReflection({
                  id: ensureString(id),
                  changes: {
                    description: text
                  }
                }))
              }}
              placeholder={
                "Write down anything else you want about your reflection"
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
  details: DetailsRoute,
});

const Page = () => {
  const { id } = useLocalSearchParams();
  const layout = useWindowDimensions();
  const [index, setIndex] = useState(0);
  const [routes] = useState([{ key: "details", title: "Details" }]);
  const { entities } = useSelector((state: RootState) => state.reflection);
  const dispatch = useDispatch();
  const reflection = id ? entities?.[ensureString(id)] : null;

  const save = async () => {
    if (!reflection.title && !reflection.description) {
      dispatch(removeOneReflection(reflection.id))
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
        renderTabBar={(props) => null}
      />
    </View>
  );
};

export default memo(Page);
