import { View, Image } from "react-native";
import { memo } from "react";

function Page() {
  return (
    <View
      className={"flex flex-1 h-full bg-[#121212] items-center justify-center"}
    >
      <Image
        className={"w-28 h-28"}
        source={require('../assets/icon.png')}
      />
    </View>
  );
}

export default memo(Page);
