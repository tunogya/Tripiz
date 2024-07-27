import {
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  Pressable,
} from "react-native";
import { memo } from "react";
import { t } from "../../i18n";
import { useSelector } from "react-redux";
import { useWebSocket } from "components/WebSocketProvider";
import { RootState } from "store/store";
import { finalizeEvent } from "nostr-tools";
import { useRealm } from "@realm/react";
import { Image } from "expo-image";
import { selectPublicKey } from "reducers/account/accountSlice";
import useMetadata from "../../components/useMetadata";
import { Buffer } from "buffer";
import { router } from "expo-router";

const Page = () => {
  const { privateKey } = useSelector((state: RootState) => state.account);
  const publicKey = useSelector(selectPublicKey);
  const { send } = useWebSocket();
  const realm = useRealm();
  const { name, about, picture } = useMetadata(publicKey);

  const shuffle = async () => {
    const randomNumber = Math.floor(Math.random() * 10000);
    const newPicture = `https://www.larvalabs.com/cryptopunks/cryptopunk${randomNumber.toString().padStart(4, "0")}.png`;
    try {
      const event = finalizeEvent(
        {
          kind: 0,
          created_at: Math.floor(Date.now() / 1000),
          tags: [],
          content: JSON.stringify({
            name: name || "",
            about: about || "",
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
      <View className={"px-4 py-2 space-y-1"}>
        <View className={"flex flex-row justify-between"}>
          <Text className={"text-white font-medium text-[16px]"}>
            {t("Name")}
          </Text>
          <Pressable
            onPress={() => {
              router.navigate("edit/name");
            }}
          >
            <Text className={"text-[#1DB954] font-medium text-[14px]"}>
              {t("Edit")}
            </Text>
          </Pressable>
        </View>
        <Text className={"text-[#B3B3B3]"}>{name || "-"}</Text>
      </View>
      <View className={"px-4 py-2 space-y-1"}>
        <View className={"flex flex-row justify-between"}>
          <Text className={"text-white font-medium text-[16px]"}>
            {t("About")}
          </Text>
          <Pressable
            onPress={() => {
              router.navigate("edit/about");
            }}
          >
            <Text className={"text-[#1DB954] font-medium text-[14px]"}>
              {t("Edit")}
            </Text>
          </Pressable>
        </View>
        <Text className={"text-[#B3B3B3]"}>{about || "-"}</Text>
      </View>
      <View className={"px-4 py-2 space-y-1"}>
        <View className={"flex flex-row justify-between"}>
          <Text className={"text-white font-medium text-[16px]"}>
            {t("Picture")}
          </Text>
          <TouchableOpacity onPress={shuffle}>
            <Text className={"text-[#1DB954] font-medium text-[14px]"}>
              {t("Shuffle")}
            </Text>
          </TouchableOpacity>
        </View>
        <View>
          {picture ? (
            <Image
              contentFit={"cover"}
              cachePolicy={"memory-disk"}
              source={{
                uri: picture,
              }}
              className={"w-24 h-24 bg-gray-400"}
            />
          ) : (
            <View
              className={"w-24 h-24 bg-gray-400 items-center justify-center"}
            >
              <Text className={"font-bold text-center"}>
                {publicKey?.slice(0, 2).toUpperCase()}
              </Text>
            </View>
          )}
        </View>
      </View>
      <View
        style={{
          height: 80,
        }}
      ></View>
    </ScrollView>
  );
};

export default memo(Page);
