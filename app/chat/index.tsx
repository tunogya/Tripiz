import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Keyboard,
  Platform,
  Pressable,
} from "react-native";
import React, { memo, useEffect, useRef, useState } from "react";
import { router } from "expo-router";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { t } from "../../i18n";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const Page = () => {
  const insets = useSafeAreaInsets();
  const { privateKey } = useSelector((state: RootState) => state.account);
  const [text, setText] = useState("");
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  const inputRef = useRef(undefined);
  const [isFocused, setIsFocused] = useState(false);

  const newComment = async () => {
    try {
    } catch (e) {
      console.log(e);
    }
  };

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
          "flex flex-row border-t border-[#FFFFFF12] items-end justify-between px-3 space-x-3"
        }
      >

      </View>
      <View
        className={
          "px-4 h-16 flex justify-center items-center flex-row space-x-3"
        }
      >
        <TextInput
          ref={inputRef}
          value={text}
          maxLength={12800}
          placeholder={t("Talk something")}
          placeholderTextColor={"#B3B3B3"}
          autoFocus={false}
          className={
            "bg-[#2F2F2F] h-10 rounded-full px-4 text-white flex-1 text-[16px]"
          }
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          onChangeText={(text) => {
            setText(text);
          }}
        />
        {isFocused && (
          <Pressable
            className={
              "bg-green-500 h-10 px-4 rounded-full items-center justify-center"
            }
            onPress={newComment}
          >
            <Text className={"font-bold"}>{t("Send")}</Text>
          </Pressable>
        )}
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
