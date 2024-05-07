import {View, Text, ScrollView, Pressable} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { memo } from "react";
import AddDreamButton from "../../components/AddButton";
import {useDispatch} from "react-redux";
import {removeAllDreams} from "../../reducers/dreams/dreamSlice";
import {removeAllMemories} from "../../reducers/memories/memorySlice";
import {removeAllReflections} from "../../reducers/reflections/reflectionSlice";

function Page() {
  const insets = useSafeAreaInsets();
  const dispatch = useDispatch();

  return (
    <View className={"flex flex-1 bg-[#121212]"}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{
          paddingTop: insets.top + 20,
          paddingBottom: insets.bottom + 66,
        }}
      >
        <Pressable
          className={"p-3 bg-red-500 rounded-full"}
          onPress={() => {
            dispatch(removeAllDreams());
            dispatch(removeAllMemories());
            dispatch(removeAllReflections());
          }}
        >
          <Text className={"text-white font-bold"}>
            Clear All DATA
          </Text>
        </Pressable>
      </ScrollView>
      <AddDreamButton />
    </View>
  );
}

export default memo(Page);
