import {View, Text, TextInput} from "react-native";
import {Dropdown} from "react-native-element-dropdown";

const OptionsOpenAI = () => {
  const MODELS = [
    {label: "gpt-3.5-turbo-1106", value: "gpt-3.5-turbo-1106"},
    {label: "gpt-4-1106-preview", value: "gpt-4-1106-preview"},
  ]

  return (
    <View className={"flex flex-1 bg-[#121212] w-full h-full space-y-6 pt-5 px-3"}>
      <View className={"space-y-3"}>
        <Text className={"text-white font-medium"}>自定义API Key</Text>
        <TextInput
          inputAccessoryViewID={"api-keys"}
          className={"bg-white p-3 rounded-lg"}
        />
      </View>
      <View className={"space-y-3"}>
        <Text className={"text-white font-medium"}>模型</Text>
        <Dropdown
          data={MODELS}
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
          onChange={() => {

          }}
          renderItem={(item) => (
            <View className={"px-3 py-1.5"}>
              <Text>{item.label}</Text>
            </View>
          )}
        />
      </View>
    </View>
  );
}

export default OptionsOpenAI;