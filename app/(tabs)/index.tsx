import {View, Text } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { memo } from "react";
import AddDreamButton from "../../components/AddButton";
import {useSelector} from "react-redux";
import {RootState} from "../../store/store";

function Page() {
  const insets = useSafeAreaInsets();
  const { address } = useSelector((state: RootState) => state.user);

  return (
    <View
      className={"flex flex-1 h-full bg-[#121212]"}
    >
      <View
        style={{
          paddingTop: insets.top + 20,
        }}
      >
        <View className={"p-4 flex flex-row justify-between items-center"}>
          <Text className={"text-white font-bold text-2xl"}>
            {address.slice(0, 6)}...{address.slice(-6)}
          </Text>
        </View>
      </View>
      <View className={"flex-1"}>
      </View>
      <AddDreamButton/>
    </View>
  );
}

export default memo(Page);
