import {View, Text, Pressable, TextInput, ActivityIndicator} from "react-native";
import {memo, useEffect, useState} from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {Ionicons} from "@expo/vector-icons";
import AddDreamButton from "../../components/AddButton";
import {useSelector} from "react-redux";
import {RootState} from "../../store/store";
import fetch from "node-fetch";
import {FlashList} from "@shopify/flash-list";
import LibraryShowItem from "../../components/LibraryShowItem";
import useSWR from "swr";
import Avatar from "../../components/Avatar";
import {router} from "expo-router";

const Page = () => {
  const insets = useSafeAreaInsets();
  const { address } = useSelector((state: RootState) => state.user);
  const [query, setQuery] = useState("");
  const [typingTimeout, setTypingTimeout] = useState(null);
  const { data, isLoading, mutate } = useSWR(query ? `https://tripiz.abandon.ai/api/posts/search/all?query=${query}` : undefined, (url) => fetch(url, {
    method: "GET",
    headers: {
      "Tripiz-User": address,
      "Tripiz-Signature": "Signature",
    },
  }).then((res) => res.json()).then((res) => res.data));

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
    <View
      className={"flex flex-1 h-full bg-[#121212]"}
    >
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
          <Text className={"text-white font-bold text-2xl"}>Search</Text>
        </View>
        <View className={"px-4 pb-4"}>
          <View className={"flex flex-row bg-white rounded-lg h-12 px-3 items-center space-x-3"}>
            <Ionicons name="search" size={24} color="black" />
            <TextInput
              value={query}
              onChangeText={(text) => {
                setQuery(text);
              }}
              placeholderTextColor={"#B3B3B3"}
              placeholder={"Search..."}
              className={"flex-1 h-full"}
            />
            {
              query && (
                <Pressable
                  onPress={() => {
                    setQuery("");
                  }}
                >
                  <Ionicons name="close" size={24} color="black" />
                </Pressable>
              )
            }
          </View>
        </View>
      </View>
      <View className={"flex-1"}>
        <FlashList
          data={data || []}
          scrollEventThrottle={1000}
          keyExtractor={(item: any) => item._id}
          estimatedItemSize={10}
          ListHeaderComponent={() => <View className={"h-3"}></View>}
          ListFooterComponent={() => (
            <View>
              { isLoading && (
                <ActivityIndicator size={"small"} color="#B3B3B3" />
              ) }
              <View
                style={{
                  height: insets.bottom + 80,
                }}
              ></View>
            </View>
          )}
          renderItem={({item}) => (
            <LibraryShowItem item={item} showType={true}/>
          )}
        />
      </View>
      <AddDreamButton/>
    </View>
  );
};

export default memo(Page);
