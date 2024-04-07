import { useLocalSearchParams } from 'expo-router';
import {Text, View} from 'react-native';
import {useSafeAreaInsets} from "react-native-safe-area-context";
import {useSelector} from "react-redux";
import {RootState} from "../../store/store";
import {useMemo} from "react";

export function ensureString(value: string | string[]) {
  if (Array.isArray(value)) {
    return value[0];
  }
  return value;
}

export default function Page() {
  const { id } = useLocalSearchParams();
  const insets = useSafeAreaInsets();
  const { entities } = useSelector((state: RootState) => state.travel)

  const travel = entities?.[ensureString(id)]

  return (
    <View
      style={{
        paddingBottom: insets.bottom + 12,
      }}
      className={"flex h-full bg-[#121212] px-3"}
    >
      <Text className={"text-white"}>Travel: {travel.id}</Text>
      <Text className={"text-white"}>Travel: {travel.title}</Text>
      <Text className={"text-white"}>Travel: {travel.timestamp.start}</Text>
    </View>
  );
}