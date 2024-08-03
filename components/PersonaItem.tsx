import { memo } from "react";
import { View, Text, Pressable } from "react-native";
import { getPubkey } from "../utils/getPubkey";
import useMetadata from "./useMetadata";
import { recovery, selectPublicKey } from "../reducers/account/accountSlice";
import { useDispatch, useSelector } from "react-redux";
import Avatar from "./Avatar";
import Ionicons from '@expo/vector-icons/Ionicons';
import { BlurView } from "expo-blur";
import { router } from "expo-router";

const PersonaItem = ({ item, index }) => {
  const pubkey = getPubkey(item.privateKey);
  const { name } = useMetadata(pubkey);
  const dispatch = useDispatch();
  const publicKey = useSelector(selectPublicKey);

  return (
    <View className={`w-[50%] ${index % 2 === 0 ? "pr-1" : "pl-1"} mb-2`}>
      <Pressable
        onPress={() => {
          if (pubkey !== publicKey) {
            dispatch(recovery(item.privateKey));
          } else {
            router.navigate("voice")
          }
        }}
        className={
          "h-14 rounded bg-[#292929] items-center flex flex-row space-x-3 overflow-hidden"
        }
      >
        <View className={"h-14 w-14 bg-[#3B3B3B]"}>
          {
            pubkey === publicKey && (
              <View className={"absolute z-10 w-full h-full items-center justify-center"}>
                <Ionicons name="call" size={24} color="white" />
              </View>
            )
          }
          <Avatar
            classname={"w-14 h-14 items-center justify-center bg-gray-400"}
            publicKey={pubkey}
          />
        </View>
        <Text
          className={`text-white font-bold`}
        >
          {name || "-"}
        </Text>
      </Pressable>
    </View>
  );
};

export default memo(PersonaItem);
