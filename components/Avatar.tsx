import { Image } from "expo-image";
import { FC, memo } from "react";
import { View, Text } from "react-native";
import useMetadata from "./useMetadata";

const Avatar: FC<{
  publicKey: string;
  classname?: string;
}> = ({ classname, publicKey }) => {
  const { picture } = useMetadata(publicKey);

  if (picture === undefined) {
    return <View className={"w-10 h-10"}></View>;
  }

  if (picture) {
    return (
      <Image
        contentFit={"cover"}
        cachePolicy={"memory-disk"}
        source={{
          uri: picture,
        }}
        className={classname ? classname : "w-10 h-10 rounded-full bg-gray-400"}
      />
    );
  }

  return (
    <View
      className={
        classname
          ? classname
          : "w-10 h-10 rounded-full bg-gray-400 items-center justify-center"
      }
    >
      <Text className={"font-bold text-center"}>
        {publicKey?.slice(0, 2).toUpperCase()}
      </Text>
    </View>
  );
};

export default memo(Avatar);
