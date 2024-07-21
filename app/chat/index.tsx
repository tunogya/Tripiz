import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Keyboard,
  Platform,
} from "react-native";
import React, { memo, useEffect, useState } from "react";
import { router } from "expo-router";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { t } from "../../i18n";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

const Page = () => {
  const insets = useSafeAreaInsets();
  const { privateKey } = useSelector((state: RootState) => state.account);
  const [text, setText] = useState("");
  const [keyboardHeight, setKeyboardHeight] = useState(0);

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
      </View>
      <View className={"flex-1"}>
      </View>
      <View
        className={
          "flex flex-row border-t border-[#FFFFFF12] items-end justify-between px-3 py-2 space-x-3"
        }
      >
        <View className={"flex-1 max-h-60"}>
          <TextInput
            multiline
            autoFocus={true}
            focusable={true}
            placeholder={t("Ask AI anything")}
            placeholderTextColor={"#B3B3B3"}
            className={`text-white text-[18px]`}
            value={text}
            onChangeText={(text) => {
              setText(text);
            }}
            maxLength={1024}
          />
        </View>
        <View className={"w-8"}>
          <TouchableOpacity>
            <Ionicons name="arrow-up-circle" size={32} color="#1DB954" />
          </TouchableOpacity>
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
