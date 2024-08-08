import { useQuery } from "@realm/react";
import { memo, useEffect, useState } from "react";
import { FlatList, RefreshControl, View, Text } from "react-native";
import { Event } from "../app/Event";
import LibraryShowItem from "./LibraryShowItem";
import { uuid } from "expo-modules-core";
import { useWebSocket } from "./WebSocketProvider";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { t } from "i18n";

const LibraryShowList = ({ publicKey }) => {
  const [refreshing, setRefreshing] = useState(false);
  const { send } = useWebSocket();
  const insets = useSafeAreaInsets();

  const DATA = useQuery(Event, (events) => {
    return events
      .filtered("kind == $0 && pubkey == $1", 1, publicKey)
      .sorted("created_at", true);
  });

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
    <FlatList
      data={DATA}
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
      ListEmptyComponent={() => (
        <View className={"px-4"}>
          <Text className={"text-[#B3B3B3] text-xs"}>{t(`No content`)}</Text>
        </View>
      )}
      ListHeaderComponent={() => <View className={"h-3"}></View>}
      ListFooterComponent={() => (
        <View>
          <View
            style={{
              height: insets.bottom + 160,
            }}
          ></View>
        </View>
      )}
      renderItem={({ item }) => <LibraryShowItem key={item.id} item={item} />}
    />
  );
};

export default memo(LibraryShowList);
