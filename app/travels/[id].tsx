import { useLocalSearchParams } from 'expo-router';
import {Text, View} from 'react-native';
import {useSafeAreaInsets} from "react-native-safe-area-context";

export default function Page() {
  const { id } = useLocalSearchParams();
  const insets = useSafeAreaInsets();

  return (
    <View
      style={{
        paddingBottom: insets.bottom + 12,
      }}
      className={"flex h-full bg-[#121212] px-3"}
    >
      <Text className={"text-white"}>Travel: {id}</Text>
    </View>
  );
}