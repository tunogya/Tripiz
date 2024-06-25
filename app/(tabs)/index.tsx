import {FlatList, Pressable, ScrollView, Text, View} from "react-native";
import { memo, useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import Avatar from "../../components/Avatar";
import { router } from "expo-router";
import { t } from "../../i18n";
import { useSelector } from "react-redux";
import { selectPublicKey } from "../../reducers/account/accountSlice";
import SearchForm from "../../components/SearchForm";

const Page = () => {
  const insets = useSafeAreaInsets();
  const publicKey = useSelector(selectPublicKey);
  const [showSearchForm, setShowSearchForm] = useState(false);

  const list = [
    {
      label: "People",
      color: "#DB148B",
    },
    {
      label: "Emotions",
      color: "#016450",
    },
    {
      label: "Scenes",
      color: "#8400E7",
    },
    {
      label: "Time",
      color: "#E8125C",
    },
    {
      label: "Activities",
      color: "#27856A",
    },
    {
      label: "Events",
      color: "#BC5800",
    },
    {
      label: "Health",
      color: "#158A08",
    },
    {
      label: "Things",
      color: "#1E3264",
    },
  ]

  return (
    <View className={"flex flex-1 h-full bg-[#121212] relative"}>
      <ScrollView
        style={{
          marginTop: insets.top,
        }}
        stickyHeaderIndices={[1]}
        className={"flex-1"}
      >
        <View className={"px-4 pt-9 pb-2 flex flex-row space-x-3 items-center"}>
          <Pressable
            onPress={() => {
              router.navigate(`settings`);
            }}
          >
            <Avatar publicKey={publicKey} />
          </Pressable>
          <Text className={"text-white font-bold text-2xl"}>{t("Search")}</Text>
        </View>
        <View className={"px-4 pb-4 pt-2 bg-[#121212]"}>
          <Pressable
            onPress={() => {
              setShowSearchForm(true);
            }}
            className={
              "flex flex-row bg-white rounded-lg h-12 px-3 items-center space-x-3"
            }
          >
            <Ionicons name="search" size={24} color="black" />
            <Text className={"flex-1 text-[16px] text-[#B3B3B3]"}>
              {t("Search dot dot dot")}
            </Text>
          </Pressable>
        </View>
        <View className={"h-4"}></View>
        <Text className={"text-white px-4 font-semibold"}>
          View All
        </Text>
        <FlatList
          className={"p-4"}
          scrollEnabled={false}
          data={list}
          numColumns={2}
          renderItem={({item, index}) => (
            <View
              className={`w-[50%] ${index % 2 === 0 ? "pr-1.5" : "pl-1.5"} mb-3`}
            >
              <View
                style={{
                  backgroundColor: item.color,
                }}
                className={"p-2 h-24 rounded"}
              >
                <Text className={"text-white font-semibold"}>
                  {item.label}
                </Text>
              </View>
            </View>
          )}
        />
      </ScrollView>
      {showSearchForm && (
        <SearchForm onClose={() => setShowSearchForm(false)} />
      )}
    </View>
  );
};

export default memo(Page);
