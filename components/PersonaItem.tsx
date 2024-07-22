import { memo } from "react"
import { View, Text, Pressable } from "react-native"
import { router } from "expo-router";

const PersonaItem = ({ item, index }) => {
    return (
        <View className={`w-[50%] ${index % 2 === 0 ? "pr-1.5" : "pl-1.5"} mb-3`}>
            <Pressable
                onPress={() => {
                  router.navigate(`class/${item.class}`);
                }}
                className={"h-14 rounded bg-[#292929] items-center flex flex-row space-x-3 overflow-hidden"}
              >
                  <View className={"h-14 w-14 bg-white"}>
                      
                  </View>
                  <Text className={"text-white font-bold"}>{item}</Text>
              </Pressable>
        </View>
    )
}

export default memo(PersonaItem)