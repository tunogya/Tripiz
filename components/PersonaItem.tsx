import { memo } from "react";
import { View, Text, Pressable } from "react-native";
import { getPubkey } from "../utils/getPubkey";
import useUserInfo from "./useUserInfo";
import { Image } from "expo-image";
import { recovery } from "../reducers/account/accountSlice";
import {useDispatch} from "react-redux";

const PersonaItem = ({ item, index }) => {
  const pubkey = getPubkey(item.privateKey);
  const { name, picture } = useUserInfo(pubkey);
  const dispatch = useDispatch();

  return (
    <View className={`w-[50%] ${index % 2 === 0 ? "pr-1.5" : "pl-1.5"} mb-3`}>
      <Pressable
        onPress={() => {
          dispatch(recovery(item.privateKey));
        }}
        className={
          "h-14 rounded bg-[#292929] items-center flex flex-row space-x-3 overflow-hidden"
        }
      >
        <View className={"h-14 w-14 bg-white"}>
          {picture ? (
            <Image
              contentFit={"cover"}
              cachePolicy={"memory-disk"}
              source={{
                uri: picture,
              }}
              className={"w-14 h-14"}
            />
          ) : (
            <View
              className={
                "w-14 h-14 bg-gray-400 items-center justify-center"
              }
            >
              <Text className={"font-bold text-center"}>
                {pubkey?.slice(0, 2).toUpperCase()}
              </Text>
            </View>
          )}
        </View>
        <Text className={"text-white font-bold"}>{name}</Text>
      </Pressable>
    </View>
  );
};

export default memo(PersonaItem);
