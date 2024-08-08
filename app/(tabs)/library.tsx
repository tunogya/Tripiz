import { View, Text, Pressable } from "react-native";
import React, { memo, useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useSelector } from "react-redux";
import Avatar from "../../components/Avatar";
import { router } from "expo-router";
import { t } from "../../i18n";
import { selectPublicKey } from "../../reducers/account/accountSlice";
import Svg, { Path } from "react-native-svg";
import SearchForm from "../../components/SearchForm";
import LibraryShowList from "../../components/LibraryShowList";

const Page = () => {
  const insets = useSafeAreaInsets();
  const [showSearchForm, setShowSearchForm] = useState(false);
  const publicKey = useSelector(selectPublicKey);

  return (
    <View className={"flex flex-1 bg-[#121212] relative"}>
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
              <Avatar publicKey={publicKey} key={publicKey} />
            </Pressable>
            <Text className={"text-white font-bold text-2xl"}>
              {t("Library")}
            </Text>
          </View>
          <View className={"flex flex-row space-x-3 items-center"}>
            <Pressable
              className={"items-center justify-center flex h-10 w-10"}
              onPress={() => {
                setShowSearchForm(true);
              }}
            >
              <Svg width={24} height={24} viewBox="0 0 24 24">
                <Path
                  fill={"white"}
                  d="M1.126 10.558c0-5.14 4.226-9.28 9.407-9.28 5.18 0 9.407 4.14 9.407 9.28a9.157 9.157 0 0 1-2.077 5.816l4.344 4.344a1 1 0 0 1-1.414 1.414l-4.353-4.353a9.454 9.454 0 0 1-5.907 2.058c-5.18 0-9.407-4.14-9.407-9.28zm9.407-7.28c-4.105 0-7.407 3.274-7.407 7.28s3.302 7.279 7.407 7.279 7.407-3.273 7.407-7.28c0-4.005-3.302-7.278-7.407-7.278z"
                ></Path>
              </Svg>
            </Pressable>
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
      </View>
      <View className={"flex-1"}>
        <LibraryShowList publicKey={publicKey} key={publicKey} />
      </View>
      {showSearchForm && (
        <SearchForm onClose={() => setShowSearchForm(false)} />
      )}
    </View>
  );
};

export default memo(Page);
