import {Image, Text, View} from "react-native";
import {useSafeAreaInsets} from "react-native-safe-area-context";
import {memo} from "react";
import AddDreamButton from "../../components/AddButton";
import {useSelector} from "react-redux";
import {RootState} from "../../store/store";
import Avatar from "../../components/Avatar";

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
        <View className={"p-4 flex flex-row items-center space-x-3"}>
          <Avatar address={address} />
          <Text className={"text-white font-bold text-2xl"}>
            {address.slice(0, 7)}...{address.slice(-5)}
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
