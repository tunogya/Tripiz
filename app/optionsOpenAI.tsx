import { View, Text, TextInput, Pressable } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { setKey, setModel } from "../reducers/config/configSlice";

const OptionsOpenAI = () => {
  const { model, key } = useSelector((state: RootState) => state.config);
  const MODELS = [
    { label: "gpt-4-turbo-preview", value: "gpt-4-turbo-preview" },
    { label: "gpt-3.5-turbo", value: "gpt-3.5-turbo" },
  ];
  const dispatch = useDispatch();

  return (
    <View
      className={"flex flex-1 bg-[#121212] w-full h-full space-y-6 pt-4 px-3"}
    >
      <View className={"space-y-3"}>
        <Text className={"text-white font-medium"}>自定义API Key</Text>
        <TextInput
          inputAccessoryViewID={"api-keys"}
          className={"bg-white p-3 rounded-lg"}
          placeholder={"sk-******"}
          value={key}
          onChangeText={(input) => {
            dispatch(setKey(input));
          }}
          secureTextEntry={true}
        />
      </View>
      <View className={"space-y-3"}>
        <Text className={"text-white font-medium"}>模型</Text>
        <Dropdown
          data={MODELS}
          value={model}
          style={{
            backgroundColor: "white",
            borderRadius: 6,
            paddingHorizontal: 12,
            paddingVertical: 2,
          }}
          itemTextStyle={{
            fontSize: 14,
          }}
          selectedTextStyle={{
            fontSize: 14,
          }}
          placeholderStyle={{
            fontSize: 14,
          }}
          labelField={"label"}
          valueField={"value"}
          onChange={(item) => {
            dispatch(setModel(item));
          }}
          renderItem={(item) => (
            <View className={"px-3 py-1.5"}>
              <Text>{item.label}</Text>
            </View>
          )}
        />
      </View>
      <View className={"flex flex-row justify-end"}>
        <Pressable hitSlop={4}>
          <Text className={"text-white text-xs"}>点此测试服务</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default OptionsOpenAI;
