import { Pressable, Text, View } from "react-native";
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

  return (
    <View className={"flex flex-1 h-full bg-[#121212] relative"}>
      <View
        style={{
          paddingTop: insets.top + 20,
        }}
      >
        <View className={"p-4 flex flex-row space-x-3 items-center"}>
          <Pressable
            onPress={() => {
              router.navigate(`settings`);
            }}
          >
            <Avatar publicKey={publicKey} />
          </Pressable>
          <Text className={"text-white font-bold text-2xl"}>{t("Search")}</Text>
        </View>
        <View className={"px-4 pb-4"}>
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
      </View>
      {/*<View className={"flex-1"}>*/}
      {/*</View>*/}
      {showSearchForm && (
        <SearchForm onClose={() => setShowSearchForm(false)} />
      )}
    </View>
  );
};

export default memo(Page);
