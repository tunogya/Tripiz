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
import { RootState } from "../../store/store";
import { clearDraft, updateDraft } from "../../reducers/reflections/reflectionDraftSlice";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import uuid from "react-native-uuid";
import { addOneDream } from "../../reducers/dreams/dreamSlice";
import { router } from "expo-router";

const DetailsRoute = () => {
  const insets = useSafeAreaInsets();
  const { notes } = useSelector(
    (state: RootState) => state.reflectionDraft,
  );
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
      <ScrollView className={"flex-1 pt-4 px-3 space-y-8"}>
        <View className={"space-y-3"}>
          <Text className={"text-white text-3xl font-bold"}>Reflection</Text>
          <View className={"bg-[#242424] rounded-xl px-3 py-4"}>
            <TextInput
              value={notes}
              multiline={true}
              placeholderTextColor={"#B3B3B3"}
              onChangeText={(text) => {
                dispatch(updateDraft({ notes: text }));
              }}
              placeholder={"Write down anything else you want about your dream"}
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
  const layout = useWindowDimensions();
  const [index, setIndex] = useState(0);
  const draft = useSelector((state: RootState) => state.dreamDraft);
  const [routes] = useState([
    { key: "details", title: "Details" },
  ]);
  const dispatch = useDispatch();

  const canSave = draft.title && draft.description;

  const save = async () => {
    const newDream = {
      ...draft,
      id: uuid.v4().toString(),
      date: new Date().getTime(),
    };
    dispatch(addOneDream(newDream));
    dispatch(clearDraft());
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
          className={`${canSave ? "bg-white" : "bg-[#B3B3B3]"} rounded-full py-3 px-6 items-center justify-center flex flex-row space-x-1`}
          onPress={async () => {
            await save();
          }}
        >
          <Ionicons name="checkmark-done-sharp" size={20} color="#121212" />
          <Text className={"font-bold"}>Save</Text>
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
