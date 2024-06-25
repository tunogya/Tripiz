import { useSafeAreaInsets } from "react-native-safe-area-context";
import { memo, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectPublicKey } from "../reducers/account/accountSlice";
import useSWR from "swr";
import { API_HOST_NAME } from "../utils/const";
import { FlashList } from "@shopify/flash-list";
import { Event } from "../app/Event";
import {
  ActivityIndicator,
  Pressable,
  TextInput,
  View,
  Text,
} from "react-native";
import LibraryShowItem from "./LibraryShowItem";
import { Ionicons } from "@expo/vector-icons";
import { t } from "../i18n";

const SearchForm = ({ onClose }) => {
  const insets = useSafeAreaInsets();
  const [query, setQuery] = useState("");
  const publicKey = useSelector(selectPublicKey);
  const [typingTimeout, setTypingTimeout] = useState(null);

  const { data, isLoading, mutate } = useSWR(
    query
      ? `${API_HOST_NAME}/accounts/${publicKey}/search/all?query=${query}`
      : undefined,
    (url) =>
      fetch(url, {
        method: "GET",
      })
        .then((res) => res.json())
        .then((res) => res.data),
  );

  useEffect(() => {
    if (query.length > 0) {
      if (typingTimeout) {
        clearTimeout(typingTimeout);
      }
      const timeout = setTimeout(() => {
        mutate();
      }, 1000);
      setTypingTimeout(timeout);
    }
  }, [query]);

  return (
    <View className={"absolute w-screen h-screen z-50 bg-[#121212]"}>
      <View
        className={
          "px-4 pb-2 flex flex-row items-center space-x-3 bg-[#1A1A1A]"
        }
        style={{
          paddingTop: insets.top + 8,
        }}
      >
        <View
          className={
            "flex flex-row flex-1 h-8 rounded-lg p-1 items-center space-x-3 bg-[#2A2A2A]"
          }
        >
          <Ionicons name="search" size={20} color="white" />
          <TextInput
            autoFocus={true}
            value={query}
            onChangeText={(text) => {
              setQuery(text);
            }}
            placeholderTextColor={"#B3B3B3"}
            placeholder={t("Search dot dot dot")}
            className={"flex-1 text-white h-full"}
            maxLength={1024}
          />
        </View>
        <Pressable
          hitSlop={4}
          className={"h-8 items-center justify-center"}
          onPress={() => {
            setQuery("");
            onClose();
          }}
        >
          <Text className={"text-white"}>{t("Cancel")}</Text>
        </Pressable>
      </View>
      <FlashList
        data={data || []}
        estimatedItemSize={200}
        keyExtractor={(item: Event) => item.id}
        ListHeaderComponent={() => <View className={"h-1"} />}
        ListFooterComponent={() => (
          <View>
            {isLoading && <ActivityIndicator size={"small"} color="#B3B3B3" />}
            <View
              style={{
                height: insets.bottom + 80,
              }}
            ></View>
          </View>
        )}
        renderItem={({ item }) => (
          <LibraryShowItem item={item} showType={true} />
        )}
      />
    </View>
  );
};

export default memo(SearchForm);
