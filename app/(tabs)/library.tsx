import {
  View,
  Text,
  RefreshControl,
  ScrollView,
  Pressable,
  ActivityIndicator,
  FlatList,
} from "react-native";
import { memo, useEffect, useMemo, useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useSelector } from "react-redux";
import LibraryShowItem from "../../components/LibraryShowItem";
import Avatar from "../../components/Avatar";
import { router } from "expo-router";
import { t } from "../../i18n";
import { selectPublicKey } from "../../reducers/account/accountSlice";
import { useQuery } from "@realm/react";
import { Event } from "../Event";
import { useWebSocket } from "../../components/WebSocketProvider";
import { uuid } from "expo-modules-core";

const Page = () => {
  const insets = useSafeAreaInsets();
  const [refreshing, setRefreshing] = useState(false);
  const FILTERS = ["memories", "dreams", "reflections"];
  const [filter, setFilter] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const publicKey = useSelector(selectPublicKey);
  const { send } = useWebSocket();

  const DATA = useQuery(Event, (events) => {
    return events
      .filtered("kind == $0 && pubkey == $1", 1, publicKey)
      .sorted("created_at", true);
  });

  const filterData = useMemo(() => {
    if (filter) {
      return DATA.filter((item) => {
        const category =
          item?.tags?.find((tag: any[]) => tag?.[0] === "category")?.[1] ||
          "reflections";
        return category === filter;
      });
    } else {
      return DATA;
    }
  }, [DATA, filter]);

  const onRefresh = () => {
    setRefreshing(true);
    send(
      JSON.stringify([
        "REQ",
        uuid.v4(),
        {
          authors: [publicKey],
          kinds: [1],
          limit: 20,
          since: DATA?.[0]?.created_at || 0,
        },
      ]),
    );
    setRefreshing(false);
  };

  useEffect(() => {
    onRefresh();
  }, [publicKey]);

  return (
    <View className={"flex flex-1 bg-[#121212]"}>
      <View
        className={"shadow shadow-black bg-[#121212]"}
        style={{
          paddingTop: insets.top + 20,
        }}
      >
        <View
          className={"p-4 flex flex-row space-x-3 items-center justify-between"}
        >
          <View className={"flex flex-row space-x-3 items-center"}>
            <Pressable
              onPress={() => {
                router.navigate(`settings`);
              }}
            >
              <Avatar publicKey={publicKey} />
            </Pressable>
            <Text className={"text-white font-bold text-2xl"}>
              {t("Library")}
            </Text>
          </View>
          <View className={"flex flex-row space-x-3 items-center"}>
            <Pressable
              className={"items-center justify-center flex h-10 w-10"}
              onPress={() => {
                router.navigate("edit/posts");
              }}
            >
              <Ionicons name="add" size={32} color="white" />
            </Pressable>
          </View>
        </View>
        <ScrollView
          horizontal
          className={"flex flex-row pb-4"}
          showsHorizontalScrollIndicator={false}
        >
          <View className={"w-3"}></View>
          {filter && (
            <Pressable
              hitSlop={4}
              className={
                "h-8 w-8 items-center justify-center bg-[#FFFFFF12] rounded-full ml-1 mr-1.5"
              }
              onPress={() => {
                setFilter("");
              }}
            >
              <Ionicons name="close" size={16} color="white" />
            </Pressable>
          )}
          {FILTERS.map((item, index) =>
            !filter || (filter && filter === item) ? (
              <Pressable
                hitSlop={4}
                key={index}
                className={`px-4 h-8 items-center justify-center ${filter === item ? "bg-[#1DB954]" : "bg-[#FFFFFF12]"} rounded-full mx-1`}
                onPress={() => {
                  setFilter(item.toLowerCase());
                }}
              >
                <Text
                  className={`${filter === item ? "text-black" : "text-white"} text-[14px]`}
                >
                  {t(item)}
                </Text>
              </Pressable>
            ) : null,
          )}
          <View className={"w-3"}></View>
        </ScrollView>
      </View>
      <View className={"flex-1"}>
        <FlatList
          data={filterData as Event[]}
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
          keyExtractor={(item: any) => item.id}
          ListEmptyComponent={() =>
            !isLoading && (
              <View className={"px-4"}>
                <Text className={"text-[#B3B3B3] text-xs"}>
                  {t(`No content`)}
                </Text>
              </View>
            )
          }
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
            <LibraryShowItem key={item.id} item={item} showType={!filter} />
          )}
        />
      </View>
    </View>
  );
};

export default memo(Page);
