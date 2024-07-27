import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Keyboard,
  Platform,
} from "react-native";
import { memo, useEffect, useMemo, useState } from "react";
import { router } from "expo-router";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { t } from "../../i18n";
import { finalizeEvent } from "nostr-tools";
import { Buffer } from "buffer";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Svg, { Circle } from "react-native-svg";
import { useRealm } from "@realm/react";
import { useWebSocket } from "../../components/WebSocketProvider";
import useMetadata from "components/useMetadata";
import { selectPublicKey } from "reducers/account/accountSlice";

const Page = () => {
  const insets = useSafeAreaInsets();
  const { privateKey } = useSelector((state: RootState) => state.account);
  const [text, setText] = useState("");
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  const realm = useRealm();
  const { send } = useWebSocket();
  const publicKey = useSelector(selectPublicKey);
  const { name, about, picture } = useMetadata(publicKey);

  const save = async () => {
    try {
      const event = finalizeEvent(
        {
          kind: 0,
          created_at: Math.floor(Date.now() / 1000),
          tags: [],
          content: JSON.stringify({
            name: name || "",
            about: text,
            picture: picture || "",
          }),
        },
        Buffer.from(privateKey, "hex"),
      );
      realm.write(() => {
        realm.create("Event", event);
      });
      send(JSON.stringify(["EVENT", event]));
      router.back();
    } catch (e) {
      console.log(e);
    }
  };

  const strokeDashoffset = useMemo(() => {
    return (1 - text.length / 256) * Math.PI * 2 * 10;
  }, [text]);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      (event) => {
        setKeyboardHeight(event.endCoordinates.height);
      },
    );

    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        setKeyboardHeight(0);
      },
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  return (
    <View
      className={`bg-[#121212] flex flex-1`}
      style={{
        paddingTop: 8,
      }}
    >
      <View className={"flex-row justify-between px-3 py-1 items-center"}>
        <TouchableOpacity
          hitSlop={12}
          className={`px-1 h-8 items-center justify-center`}
          onPress={() => {
            router.back();
          }}
        >
          <Text className={`text-white font-medium text-[16px]`}>
            {t("Cancel")}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          hitSlop={12}
          disabled={text === ""}
          className={`px-4 h-8 items-center justify-center border ${text === "" ? "border-[#FFFFFF12]" : "border-[#1DB954]"}  rounded-full`}
          onPress={save}
        >
          <Text
            className={`font-bold ${text === "" ? "text-[#B3B3B3]" : "text-[#1DB954]"}`}
          >
            {t("Save")}
          </Text>
        </TouchableOpacity>
      </View>
      <View className={"flex-1"}>
        <TextInput
          multiline
          autoFocus={true}
          placeholder={about ? about : t(`About`)}
          placeholderTextColor={"#B3B3B3"}
          className={`text-white text-[18px] px-5 py-3`}
          value={text}
          onChangeText={(text) => {
            setText(text);
          }}
          maxLength={256}
        />
      </View>
      <View
        className={
          "flex flex-row h-12 border-t border-[#FFFFFF12] items-center justify-end"
        }
      >
        <View className={"flex flex-row"}>
          <View className={"h-12 w-12 items-center justify-center -rotate-90"}>
            <Svg height="24" width="24">
              <Circle
                cx="12"
                cy="12"
                r="10"
                stroke="#FFFFFF12"
                strokeWidth="2"
                fill="transparent"
              />
              <Circle
                cx="12"
                cy="12"
                r="10"
                origin="12,12"
                stroke="#1DB954"
                strokeWidth="2"
                strokeLinecap="round"
                fill="transparent"
                strokeDasharray={[Math.PI * 2 * 10]}
                strokeDashoffset={strokeDashoffset}
              />
            </Svg>
          </View>
        </View>
      </View>
      {Platform.OS === "ios" && (
        <View
          style={{
            height: keyboardHeight ? keyboardHeight : insets.bottom,
          }}
        ></View>
      )}
    </View>
  );
};

export default memo(Page);
