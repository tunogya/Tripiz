import {ScrollView, View, Text, Pressable} from "react-native";
import {memo, useState} from "react";
import {useSelector} from "react-redux";
import {selectNostrPublicKey, selectPublicKey} from "../../reducers/account/accountSlice";
import Avatar from "../../components/Avatar";
import {Ionicons} from "@expo/vector-icons";
import {router} from "expo-router";
import {finalizeEvent} from "nostr-tools";
import {Buffer} from "buffer";
import {RootState} from "../../store/store";
import {useRealm} from "@realm/react";
import {useWebSocket} from "../../components/WebSocketProvider";

const Page = () => {
  const publicKey = useSelector(selectPublicKey);
  const nostrPublicKey = useSelector(selectNostrPublicKey);
  const { privateKey } = useSelector((state: RootState) => state.account);
  const { send } = useWebSocket();
  const realm = useRealm();

  const randomPicture = async () => {
    const randomNumber = Math.floor(Math.random() * 10000);
    const newPicture = `https://www.larvalabs.com/cryptopunks/cryptopunk${randomNumber.toString().padStart(4, "0")}.png`;
    try {
      const event = finalizeEvent(
        {
          kind: 0,
          created_at: Math.floor(Date.now() / 1000),
          tags: [],
          content: JSON.stringify({
            picture: newPicture,
          }),
        },
        Buffer.from(privateKey, "hex"),
      );
      realm.write(() => {
        realm.create("Event", event);
      });
      send(JSON.stringify(["EVENT", event]));
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <ScrollView className={"bg-[#121212] flex flex-1"}>
      <View className={"px-4 py-2 flex flex-row justify-between items-center"}>
        <View className={"flex flex-row items-center space-x-3"}>
          <Avatar
            classname={
              "w-14 h-14 rounded-full items-center justify-center"
            }
            publicKey={publicKey}
          />
          <View className={"space-y-1.5 flex-1 mr-10"}>
            <Text className={"text-[#B3B3B3] font-medium"} numberOfLines={1}>
              {nostrPublicKey}
            </Text>
            <Pressable
              hitSlop={8}
              onPress={randomPicture}
            >
              <Text className={"text-[#1DB954] text-xs font-medium"}>
                Shuffle Avatar
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
      <Pressable
        onPress={() => {
          router.navigate("settings/account");
        }}
      >
        <View className={"px-4 py-2 flex flex-row justify-between items-center"}>
          <Text className={"text-white font-medium"}>
            Account
          </Text>
          <Ionicons name="chevron-forward-outline" size={24} color="white" />
        </View>
      </Pressable>
      <Pressable
        onPress={() => {
          router.navigate("settings/storage");
        }}
      >
        <View className={"px-4 py-2 flex flex-row justify-between items-center"}>
          <Text className={"text-white font-medium"}>
            Storage
          </Text>
          <Ionicons name="chevron-forward-outline" size={24} color="white" />
        </View>
      </Pressable>
      <Pressable
        onPress={() => {
          router.navigate("settings/about");
        }}
      >
        <View className={"px-4 py-2 flex flex-row justify-between items-center"}>
          <Text className={"text-white font-medium"}>
            About
          </Text>
          <Ionicons name="chevron-forward-outline" size={24} color="white" />
        </View>
      </Pressable>
    </ScrollView>
  )
}

export default memo(Page)