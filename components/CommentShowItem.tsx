import { Pressable, Text, TouchableOpacity, View } from "react-native";
import React, { FC, memo, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { selectPublicKey } from "../reducers/account/accountSlice";
import Avatar from "./Avatar";
import { API_HOST_NAME } from "../utils/const";
import useSWR from "swr";
import Clipboard from "@react-native-clipboard/clipboard";
import { BottomSheet, BottomSheetRef } from "react-native-sheet";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const CommentShowItem: FC<{
  item: {
    id: string;
    pubkey: string;
    content: string;
    created_at: number;
  };
}> = ({ item }) => {
  const insets = useSafeAreaInsets();
  const myPublicKey = useSelector(selectPublicKey);
  const { data } = useSWR(`${API_HOST_NAME}/accounts/${item.pubkey}`, (url) =>
    fetch(url).then((res) => res.json()),
  );

  const name = item.pubkey === myPublicKey ? "Me" : data?.name || "Anonymous";
  const [numberOfLines, setNumberOfLines] = useState(5);
  const bottomSheet = useRef<BottomSheetRef>(null);

  return (
    <View>
      <View className={"px-4 pt-4 flex flex-row space-x-3 bg-[#121212]"}>
        <Avatar publicKey={item.pubkey} />
        <View className={"space-y-1.5 pb-4 flex-1 border-b border-[#FFFFFF12]"}>
          <View className={"flex flex-row justify-between items-end"}>
            <Text
              className={"text-[#B3B3B3] text-[16px] w-[200px]"}
              numberOfLines={1}
            >
              {name}
            </Text>
            <Text className={"text-[#B3B3B3] text-xs"}>
              {new Date(item.created_at * 1000)
                .toLocaleDateString()
                .replaceAll("/", "-")
                .replace(`${new Date().getFullYear()}-`, "")}
            </Text>
          </View>
          <Pressable
            className={"flex flex-row items-end flex-wrap"}
            onLongPress={() => bottomSheet.current?.show()}
          >
            <Text
              className={"text-white text-[16px] leading-5"}
              numberOfLines={numberOfLines}
            >
              {item.content}
            </Text>
          </Pressable>
          <View className={"flex flex-row items-center justify-between"}>
            <View className={"flex flex-row items-center"}>
              <Pressable
                onPress={() => {
                  if (numberOfLines) {
                    setNumberOfLines(undefined);
                  } else {
                    setNumberOfLines(5);
                  }
                }}
              >
                <Text className={"text-[#1DB954] font-medium"}>
                  {numberOfLines ? "全文" : "收起"}
                </Text>
              </Pressable>
            </View>
            <View></View>
          </View>
        </View>
      </View>
      <BottomSheet
        height={232 + insets.bottom}
        ref={bottomSheet}
        backdropClosesSheet={true}
        draggable={false}
        borderRadius={12}
        openTime={200}
        closeTime={200}
      >
        <View className={"bg-[#121212] flex-1"}>
          <View className={"h-14 items-center justify-center"}>
            <Text
              className={"text-[#B3B3B3] px-8 text-[12px]"}
              numberOfLines={1}
            >
              {name}: {item.content}
            </Text>
          </View>
          <TouchableOpacity
            className={"border-t border-[#FFFFFF12] h-14 justify-center "}
            onPress={() => {
              bottomSheet.current?.hide();
            }}
          >
            <Text className={"text-white text-[16px] text-center"}>回复</Text>
          </TouchableOpacity>
          <TouchableOpacity
            className={"border-t border-[#FFFFFF12] h-14 justify-center"}
            onPress={() => {
              Clipboard.setString(item.content);
              bottomSheet.current?.hide();
            }}
          >
            <Text className={"text-white text-[16px] text-center"}>复制</Text>
          </TouchableOpacity>
          <View className={"h-2 bg-[#FFFFFF12]"}></View>
          <TouchableOpacity
            className={"border-t border-[#FFFFFF12] h-14 justify-center"}
            onPress={() => {
              bottomSheet.current?.hide();
            }}
          >
            <Text className={"text-white text-[16px] text-center"}>取消</Text>
          </TouchableOpacity>
        </View>
      </BottomSheet>
    </View>
  );
};

export default memo(CommentShowItem);
