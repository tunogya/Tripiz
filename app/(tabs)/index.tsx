import {FlatList, Pressable, Text, TextInput, View,} from "react-native";
import {memo, useMemo, useState} from "react";
import {useSafeAreaInsets} from "react-native-safe-area-context";
import {Ionicons} from "@expo/vector-icons";
import LibraryShowItem from "../../components/LibraryShowItem";
import Avatar from "../../components/Avatar";
import {router} from "expo-router";
import {t} from "../../i18n";
import {useSelector} from "react-redux";
import {selectPublicKey} from "../../reducers/account/accountSlice";
import {useQuery} from "@realm/react";
import {Event} from "../Event";

const Page = () => {
  const insets = useSafeAreaInsets();
  const [query, setQuery] = useState("");
  const publicKey = useSelector(selectPublicKey);

  const DATA = useQuery(Event);

  const filterData = useMemo(() => {
    if (query) {
      return DATA.filtered('content TEXT $0', query)
    } else {
      return []
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
            <Avatar publicKey={publicKey} />
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
              maxLength={1024}
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
          data={filterData}
          scrollEventThrottle={1000}
          keyExtractor={(item: any) => item.id}
          ListHeaderComponent={() => <View className={"h-3"}></View>}
          ListFooterComponent={() => (
            <View
              style={{
                height: insets.bottom + 80,
              }}
            ></View>
          )}
          renderItem={({ item }) => (
            <LibraryShowItem item={item} showType={true} />
          )}
        />
      </View>
    </View>
  );
};

export default memo(Page);
