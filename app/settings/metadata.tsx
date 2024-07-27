import { ScrollView, View, Text } from "react-native";
import { memo } from "react";
import { t } from "../../i18n";
import { useSelector } from "react-redux";
import { useWebSocket } from "components/WebSocketProvider";
import { RootState } from "store/store";
import { finalizeEvent } from "nostr-tools";
import { useRealm } from "@realm/react";
import Avatar from "components/Avatar";
import { selectPublicKey } from "reducers/account/accountSlice";
import useMetadata from "../../components/useMetadata";

const Page = () => {
  const { privateKey } = useSelector((state: RootState) => state.account);
  const publicKey = useSelector(selectPublicKey);
  const { send } = useWebSocket();
  const realm = useRealm();
  const { name, about } = useMetadata(publicKey);
  
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
      <View
        className={"px-4 py-2 space-y-1"}
      >
        <Text className={"text-white font-medium text-[16px]"}>
          {t("Name")}
        </Text>
        <Text className={"text-[#B3B3B3]"}>{name || "-"}</Text>
      </View>
      <View
        className={"px-4 py-2 space-y-1"}
      >
        <Text className={"text-white font-medium text-[16px]"}>
          {t("About")}
        </Text>
        <Text className={"text-[#B3B3B3]"}>{about || "-"}</Text>
      </View>
      <View
        className={"px-4 py-2 space-y-1"}
      >
        <Text className={"text-white font-medium text-[16px]"}>
          {t("Picture")}
        </Text>
        <View>
          <Avatar publicKey={publicKey} classname={"w-24 h-24"}/>
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
