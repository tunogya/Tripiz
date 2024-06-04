import {
  View,
  Text,
  Pressable,
  TextInput,
  ActivityIndicator,
  FlatList,
} from "react-native";
import { memo, useEffect, useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import AddDreamButton from "../../components/AddButton";
import LibraryShowItem from "../../components/LibraryShowItem";
import useSWR from "swr";
import Avatar from "../../components/Avatar";
import { router } from "expo-router";
import { t } from "../../i18n";
import { API_HOST_NAME } from "../../utils/const";
import { useSelector } from "react-redux";
import { selectPublicKey } from "../../reducers/account/accountSlice";

const Page = () => {
  const insets = useSafeAreaInsets();
  const [query, setQuery] = useState("");
  const [typingTimeout, setTypingTimeout] = useState(null);
  const publicKey = useSelector(selectPublicKey);

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
    <View className={"flex flex-1 h-full bg-[#121212]"}>
      <View
        style={{
          paddingTop: insets.top + 20,
        }}
      >
        <View className={"p-4 flex flex-row space-x-3 items-center"}>
          <Pressable
            onPress={() => {
              router.navigate(`account`);
            }}
          >
            <Avatar />
          </Pressable>
          <Text className={"text-white font-bold text-2xl"}>{t("Search")}</Text>
        </View>
        <View className={"px-4 pb-4"}>
          <View
            className={
              "flex flex-row bg-white rounded-lg h-12 px-3 items-center space-x-3"
            }
          >
            <Ionicons name="search" size={24} color="black" />
            <TextInput
              value={query}
              onChangeText={(text) => {
                setQuery(text);
              }}
              placeholderTextColor={"#B3B3B3"}
              placeholder={t("Search dot dot dot")}
              className={"flex-1 h-full text-[16px]"}
            />
            {query && (
              <Pressable
                onPress={() => {
                  setQuery("");
                }}
              >
                <Ionicons name="close" size={24} color="black" />
              </Pressable>
            )}
          </View>
        </View>
      </View>
      <View className={"flex-1"}>
        <FlatList
          data={data || []}
          scrollEventThrottle={1000}
          keyExtractor={(item: any) => item._id}
          ListHeaderComponent={() => <View className={"h-3"}></View>}
          ListFooterComponent={() => (
            <View>
              {isLoading && (
                <ActivityIndicator size={"small"} color="#B3B3B3" />
              )}
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
      <AddDreamButton />
    </View>
  );
};

export default memo(Page);
