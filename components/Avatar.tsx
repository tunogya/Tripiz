import { Image } from "expo-image";
import {FC, memo, useEffect, useState} from "react";
import { View, Text } from "react-native";
import useSWR from "swr";
import {API_HOST_NAME} from "../utils/const";

const Avatar: FC<{
  publicKey: string,
  classname?: string;
}> = ({ classname, publicKey }) => {
  const [picture, setPicture] = useState("");
  const {data} = useSWR(publicKey ? `${API_HOST_NAME}/accounts/${publicKey}` : undefined, (url) => fetch(url).then((res) => res.json()));

  useEffect(() => {
    if (data && data?.picture) {
      setPicture(data.picture);
    }
  }, [data]);

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
    <View className={classname ? classname : "w-10 h-10 rounded-full bg-gray-400 items-center justify-center"}>
      <Text className={"font-bold text-center"}>{publicKey?.slice(0, 2).toUpperCase()}</Text>
    </View>
  );
};

export default memo(Avatar);
