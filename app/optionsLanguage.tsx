import { Text, Pressable, FlatList, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { Ionicons } from "@expo/vector-icons";
import { setLocale } from "../reducers/config/configSlice";

const LANGUAGE = [
  { label: "简体中文", value: "zh" },
  { label: "English", value: "en" },
];

export default function Page() {
  const { locale } = useSelector((state: RootState) => state.config);
  const dispatch = useDispatch();

  const RenderItem = ({ item }) => {
    return (
      <Pressable
        onPress={() => {
          dispatch(setLocale(item.value));
        }}
        className={"px-3 py-2 flex flex-row justify-between items-center h-8"}
      >
        <Text
          className={`text-white ${item.value === locale ? "font-bold" : ""}`}
        >
          {item.label}
        </Text>
        {item.value === locale && (
          <Ionicons name="checkmark" size={20} color="white" />
        )}
      </Pressable>
    );
  };

  return (
    <FlatList
      className={"bg-[#121212] space-y-4 pt-4"}
      data={LANGUAGE}
      keyExtractor={(item) => item.value}
      renderItem={({ item }) => <RenderItem item={item} />}
    />
  );
}
