import { View, Text, ScrollView } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { memo } from "react";
import AddDreamButton from "../../components/AddButton";

function Page() {
  const insets = useSafeAreaInsets();

  return (
    <View className={"flex flex-1 bg-[#121212]"}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{
          paddingTop: insets.top + 20,
          paddingBottom: insets.bottom + 66,
        }}
      >
        <Text className={"text-white"}>Tripiz</Text>
      </ScrollView>
      <AddDreamButton />
    </View>
  );
}

export default memo(Page);
