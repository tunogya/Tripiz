import {View} from "react-native";
import {memo} from "react";
import {useSafeAreaInsets} from "react-native-safe-area-context";

const Search = () => {
  const insets = useSafeAreaInsets();
  return (
    <View
      className={"flex flex-1 h-full bg-[#121212]"}
      style={{
        paddingTop: insets.top + 20,
      }}
    >
    </View>
  )
}

export default memo(Search);