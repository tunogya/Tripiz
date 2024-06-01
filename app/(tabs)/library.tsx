import {View, Text, ScrollView, Pressable, RefreshControl, ActivityIndicator, FlatList} from "react-native";
import {memo, useEffect, useState} from "react";
import {useSafeAreaInsets} from "react-native-safe-area-context";
import AddDreamButton from "../../components/AddButton";
import {Ionicons} from "@expo/vector-icons";
import {useSelector} from "react-redux";
import LibraryShowItem from "../../components/LibraryShowItem";
import {RootState} from "../../store/store";
import Avatar from "../../components/Avatar";
import {router} from "expo-router";
import {t} from "../../i18n";
import {ethers} from "ethers";

const Page = () => {
  const insets = useSafeAreaInsets();

  const FILTERS = ["Memories", "Dreams", "Reflections"];
  const [filter, setFilter] = useState("");
  const [refreshing, setRefreshing] = useState(false);
  const {address, privateKey} = useSelector((state: RootState) => state.user);
  const { version} = useSelector((state: RootState) => state.ui);
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);
  const [nextSkip, setNextSkip] = useState<number | null>(0);
  const [hasNext, setHasNext] = useState(true);

  const wallet = new ethers.Wallet(privateKey);

  const fetchData = async (category: string, skip: number) => {
    setIsLoading(true);
    const result = await fetch(`https://tripiz.abandon.ai/api/users/${address}/posts?category=${category}&skip=${skip}`, {
      method: "GET",
      headers: {
        "Tripiz-User": address,
        "Tripiz-Signature": wallet.signMessageSync(address),
      }
    })
      .then((res) => res.json());
    setIsLoading(false);

    if (skip === 0) {
      setData(result.data)
    } else {
      setData([
        ...data,
        ...result.data,
      ])
    }
    setHasNext(result.pagination.hasNext);
    setNextSkip(result.pagination.nextSkip);
  }

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchData(filter.toLowerCase(), 0);
    setRefreshing(false);
  };

  // fetch data when filter changed, or version changed
  useEffect(() => {
    setData([]);
    setNextSkip(0);
    fetchData(filter.toLowerCase(), 0);
  }, [filter, version]);

  return (
    <View className={"flex flex-1 bg-[#121212]"}>
      <View
        className={"shadow shadow-black bg-[#121212]"}
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
          <Text className={"text-white font-bold text-2xl"}>
            {t("Library")}
          </Text>
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
                "h-8 w-8 items-center justify-center bg-[#FFFFFF12] rounded-full mr-1.5"
              }
              onPress={() => {
                setFilter("");
              }}
            >
              <Ionicons name="close" size={16} color="white"/>
            </Pressable>
          )}
          {FILTERS.map((item, index) =>
            !filter || (filter && filter === item) ? (
              <Pressable
                hitSlop={4}
                key={index}
                className={`px-4 h-8 items-center justify-center ${filter === item ? "bg-[#1DB954]" : "bg-[#FFFFFF12]"} rounded-full mx-1`}
                onPress={() => {
                  setFilter(item);
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
          data={data}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              colors={['#B3B3B3']}
              progressBackgroundColor="#121212"
              tintColor="#B3B3B3"
              title="Loading..."
              titleColor="#B3B3B3"
            />
          }
          scrollEventThrottle={1000}
          keyExtractor={(item: any) => item._id}
          onEndReached={async () => {
            if (hasNext) {
              await fetchData(filter.toLowerCase(), nextSkip);
            }
          }}
          onEndReachedThreshold={0.3}
          ListEmptyComponent={() => (
            !isLoading && (
              <View className={"px-4"}>
                <Text className={"text-[#B3B3B3] text-xs"}>{t(`No content`)}</Text>
              </View>
            )
          )}
          ListHeaderComponent={() => <View className={"h-3"}></View>}
          ListFooterComponent={() => (
            <View>
              { isLoading && (
                <ActivityIndicator size={"small"} color="#B3B3B3" />
              )}
              <View
                style={{
                  height: insets.bottom + 80,
                }}
              ></View>
            </View>
          )}
          renderItem={({item}) => (
            <LibraryShowItem item={item} showType={!filter}/>
          )}
        />
      </View>
      <AddDreamButton/>
    </View>
  );
};

export default memo(Page);
