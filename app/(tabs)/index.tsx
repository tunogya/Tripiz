import {FlatList, Pressable, RefreshControl, Text, View} from "react-native";
import {useSafeAreaInsets} from "react-native-safe-area-context";
import {memo, useMemo} from "react";
import AddDreamButton from "../../components/AddButton";
import {useSelector} from "react-redux";
import {RootState} from "../../store/store";
import Avatar from "../../components/Avatar";
import {router} from "expo-router";
import Feed from "../../components/Feed";
import useSWR from "swr";
import fetch from "node-fetch";
import {t} from "../../i18n";

function Page() {
  const insets = useSafeAreaInsets();

  const {address} = useSelector((state: RootState) => state.user);

  const { data: feeds, isLoading: isFeedsLoading, mutate: mutateFeeds } = useSWR(`https://tripiz.abandon.ai/api/users/${address}/feeds`, (url) => fetch(url, {
    method: "GET",
    headers: {
      "Tripiz-User": address,
      "Tripiz-Signature": "Signature",
    }
  }).then((res) => res.json()).then((res) => res.data));

  return (
    <View
      className={"flex flex-1 h-full bg-[#121212]"}
    >
      <View
        style={{
          paddingTop: insets.top + 20,
        }}
      >
        <View className={"p-4 flex flex-row items-center space-x-3"}>
          <Pressable
            onPress={() => {
              router.navigate(`account`);
            }}
          >
            <Avatar/>
          </Pressable>
          <Text className={"text-white font-bold text-2xl"}>
            {address.slice(0, 7)}...{address.slice(-5)}
          </Text>
        </View>
      </View>
      <View className={"flex-1 px-4"}>
        <FlatList
          data={feeds || []}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={() => (
            <Text className={"text-[#B3B3B3] text-xs"}>
              {t("No content")}
            </Text>
          )}
          refreshControl={
            <RefreshControl
              refreshing={isFeedsLoading}
              onRefresh={mutateFeeds}
              colors={['#B3B3B3']}
              progressBackgroundColor="#121212"
              tintColor="#B3B3B3"
              title="Loading..."
              titleColor="#B3B3B3"
            />
          }
          ListFooterComponent={() => (
            <View
              style={{
                height: insets.bottom + 80,
              }}
            ></View>
          )}
          renderItem={({item}: any) => (
            <Feed item={item}/>
          )}
        />
      </View>
      <AddDreamButton/>
    </View>
  );
}

export default memo(Page);
