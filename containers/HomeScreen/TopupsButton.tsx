import { Pressable, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { memo, useState } from "react";

const TopupsButton = () => {
  const [loading, setLoading] = useState(false);

  return (
    <Pressable
      disabled={loading}
      // @ts-ignore
      className={`px-4 py-2.5 rounded-full flex flex-row items-center space-x-1 shadow-xl ${loading ? "bg-gray-500" : "bg-gray-800"}`}
      onPress={async () => {}}
    >
      <Ionicons name="add" size={20} color="white" />
      {/*@ts-ignore*/}
      <Text className={"text-white font-bold"}>Top-ups</Text>
    </Pressable>
  );
};

export default memo(TopupsButton);
