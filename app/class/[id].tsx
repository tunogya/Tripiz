import {
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    RefreshControl,
    ActivityIndicator, Pressable,
} from "react-native";
import React, { memo, useState } from "react";
import {Link, router, useLocalSearchParams } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { t } from "../../i18n";
import { ensureString } from "../../utils/ensureString";
import useSWR from "swr";
import { useSelector } from "react-redux";
import { selectPublicKey } from "../../reducers/account/accountSlice";
import ContentClassItem from "../../components/ContentClassItem";

const Page = () => {
  const { id } = useLocalSearchParams();
  const [scrollY, setScrollY] = useState(0);
  const insets = useSafeAreaInsets();
  const pubkey = useSelector(selectPublicKey);
  const [refreshing, setRefreshing] = useState(false);

  const { data, isLoading, mutate } = useSWR(
    pubkey
      ? `https://tripiz.abandon.ai/api/accounts/${pubkey}/category?key=${ensureString(id).toLowerCase()}`
      : undefined,
    (url) => fetch(url).then((res) => res.json()),
  );

  const handleScroll = (event: any) => {
    setScrollY(event.nativeEvent.contentOffset.y);
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await mutate();
    setRefreshing(false);
  };

  return (
    <View className={"flex flex-1 h-full bg-[#121212] relative"}>
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={["#B3B3B3"]}
            progressBackgroundColor="#121212"
            tintColor="#B3B3B3"
            title="Loading..."
            titleColor="#B3B3B3"
          />
        }
        stickyHeaderIndices={[0]}
        className={"flex flex-1 h-full"}
        style={{
          marginTop: insets.top,
        }}
        scrollEventThrottle={1000}
        onScroll={handleScroll}
      >
        <View
          className={
            "w-full flex flex-row items-center justify-between bg-[#121212]"
          }
        >
          <TouchableOpacity
            onPress={() => {
              router.back();
            }}
            className={"w-10 h-10 items-center justify-center"}
          >
            <Ionicons name="chevron-back" size={28} color="white" />
          </TouchableOpacity>
          <View
            style={{
              opacity: Math.min(scrollY, 48) / 48,
            }}
          >
            <Text className={"text-white font-bold text-[16px]"}>
              {t(ensureString(id))}
            </Text>
          </View>
          <View className={"w-10"}></View>
        </View>
        <Text className={"text-white px-4 py-2 font-bold text-2xl"}>
          {t(ensureString(id))}
        </Text>
        {isLoading && <ActivityIndicator size={"small"} color="#B3B3B3" />}
        {data &&
          Object.keys(data)
            .sort((a, b) => a.localeCompare(b))
            .map((item) => (
            <ContentClassItem key={item} category={item} value={data[item]} />
          ))}
        {data && Object.keys(data).length === 0 && (
          <View className={"px-4"}>
            <Text className={"text-[#B3B3B3] text-xs"}>{t("No content")}</Text>
            <Pressable
              onPress={() => {
                router.navigate("edit/posts")
              }}
              className={"mt-6 bg-[#1DB954] p-4 rounded-full"}>
              <Text className={"text-black font-medium text-center"}>Record Now</Text>
            </Pressable>
          </View>
        )}
        <View
          style={{
            height: insets.bottom + 80,
          }}
        ></View>
      </ScrollView>
    </View>
  );
};

export default memo(Page);
