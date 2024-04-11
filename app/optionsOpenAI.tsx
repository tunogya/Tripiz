import {View, Text, TextInput, Pressable, Platform, KeyboardAvoidingView, ScrollView} from "react-native";
import {Dropdown} from "react-native-element-dropdown";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../store/store";
import {setGateway, setKey, setModel} from "../reducers/config/configSlice";

const OptionsOpenAI = () => {
  const {model, key, gateway} = useSelector(
    (state: RootState) => state.config,
  );
  const MODELS = [
    {label: "gpt-4-turbo-preview", value: "gpt-4-turbo-preview"},
    {label: "gpt-3.5-turbo", value: "gpt-3.5-turbo"},
  ];
  const GATEWAYS = [
    {label: "OpenAI", value: "https://api.openai.com/v1"},
    {
      label: "Cloudflare Proxy",
      value:
        "https://gateway.ai.cloudflare.com/v1/702151bcf1ad137360fb347e0353316c/endless-travel/openai",
    },
  ];
  const dispatch = useDispatch();

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView
        className={"flex flex-1 bg-[#121212] w-full h-full space-y-6 pt-4 px-3"}
      >
        <View className={"space-y-3"}>
          <Text className={"text-white font-bold"}>API Key</Text>
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
          <Text className={"text-white font-bold"}>Model</Text>
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
              dispatch(setModel(item.value));
            }}
            renderItem={(item) => (
              <View className={"px-3 py-1.5"}>
                <Text>{item.label}</Text>
              </View>
            )}
          />
        </View>
        <View className={"space-y-3"}>
          <Text className={"text-white font-bold"}>API Gateway</Text>
          <View className={"space-x-2 flex flex-row"}>
            {GATEWAYS.map((item) => (
              <Pressable
                key={item.label}
                onPress={() => {
                  dispatch(setGateway(item.value));
                }}
                className={`${item.value === gateway ? "bg-[#1ED760]" : "bg-[#292929]"} px-3 py-1.5 rounded-full`}
              >
                <Text
                  className={`${item.value === gateway ? "text-black" : "text-white"} text-xs`}
                >
                  {item.label}
                </Text>
              </Pressable>
            ))}
          </View>
          <TextInput
            inputAccessoryViewID={"api-gateway"}
            className={"bg-white p-3 rounded-lg"}
            placeholder={"API Gateway"}
            value={gateway}
            multiline={true}
            onChangeText={(input) => {
              dispatch(setGateway(input));
            }}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default OptionsOpenAI;
