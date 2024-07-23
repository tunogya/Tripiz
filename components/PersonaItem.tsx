import { memo } from "react";
import { View, Text, Pressable } from "react-native";
import { getPubkey } from "../utils/getPubkey";
import useUserInfo from "./useUserInfo";
import { Image } from "expo-image";

const PersonaItem = ({ item, index }) => {
  const pubkey = getPubkey(item.privateKey);
  const { name, picture } = useUserInfo(pubkey);

  return (
    <View className={`w-[50%] ${index % 2 === 0 ? "pr-1.5" : "pl-1.5"} mb-3`}>
      <Pressable
        onPress={() => {}}
        className={
          "h-14 rounded bg-[#292929] items-center flex flex-row space-x-3 overflow-hidden"
        }
      >
        <View className={"h-14 w-14 bg-white"}>
          {picture && (
            <Image
              contentFit={"cover"}
              cachePolicy={"memory-disk"}
              source={{
                uri: picture,
              }}
              className={"w-14 h-14"}
            />
          )}
        </View>
        <Text className={"text-white font-bold"}>{name}</Text>
      </Pressable>
    </View>
  );
};

export default memo(PersonaItem);
