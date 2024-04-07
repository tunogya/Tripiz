import {Text, Pressable, FlatList} from "react-native";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../store/store";
import {Ionicons} from "@expo/vector-icons";
import {setLanguage} from "../reducers/config/configSlice";

const LANGUAGE = [
  {label: "简体中文", value: "zh"},
  {label: "英语", value: "en"},
];

export default function Page() {
  const {language} = useSelector((state: RootState) => state.config);
  const dispatch = useDispatch();

  const RenderItem = ({item}) => {
    return (
      <Pressable
        onPress={() => {
          dispatch(setLanguage(item.value));
        }}
        className={"px-3 py-2 flex flex-row justify-between items-center h-8"}
      >
        <Text className={`text-white ${item.value === language ? "font-bold" : ""}`}>
          {item.label}
        </Text>
        {
          item.value === language && (
            <Ionicons name="checkmark" size={20} color="white" />
          )
        }
      </Pressable>
    )
  };

  return (
    <FlatList
      className={"bg-[#121212] space-y-4 pt-4"}
      data={LANGUAGE}
      keyExtractor={(item) => item.value}
      renderItem={({item}) => (
        <RenderItem item={item}/>
      )}
    />
  );
}