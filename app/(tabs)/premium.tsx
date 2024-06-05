import {
  View,
  Text,
  Pressable,
  TextInput,
  ActivityIndicator,
  FlatList,
} from "react-native";
import { memo, useEffect, useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import AddDreamButton from "../../components/AddButton";
import LibraryShowItem from "../../components/LibraryShowItem";
import useSWR from "swr";
import Avatar from "../../components/Avatar";
import { router } from "expo-router";
import { t } from "../../i18n";
import { API_HOST_NAME } from "../../utils/const";
import { useSelector } from "react-redux";
import { selectPublicKey } from "../../reducers/account/accountSlice";

const Page = () => {
  const insets = useSafeAreaInsets();
  const [query, setQuery] = useState("");
  const [typingTimeout, setTypingTimeout] = useState(null);
  const publicKey = useSelector(selectPublicKey);

  const { data, isLoading, mutate } = useSWR(
    query
      ? `${API_HOST_NAME}/accounts/${publicKey}/search/all?query=${query}`
      : undefined,
    (url) =>
      fetch(url, {
        method: "GET",
      })
        .then((res) => res.json())
        .then((res) => res.data),
  );

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
    <View className={"flex flex-1 h-full bg-[#121212]"}>
      <View
        style={{
          paddingTop: insets.top + 20,
        }}
      >
      </View>
      <AddDreamButton />
    </View>
  );
};

export default memo(Page);
