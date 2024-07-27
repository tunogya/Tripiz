import { router } from "expo-router";
import { memo } from "react";
import {Pressable, View, Text } from "react-native";
import useMetadata from "./useMetadata";
import { useSelector } from "react-redux";
import { selectPublicKey } from "reducers/account/accountSlice";

const Tips = () => {
    const publicKey = useSelector(selectPublicKey);
    const { name, picture } = useMetadata(publicKey);
    
    if (name && picture) {
        return null;
    }
    
    return (
        <View className={"px-4 py-2"}>
            <Pressable
              onPress={() => {
                router.navigate("settings/metadata")
              }}
              className={"bg-white py-4 rounded"}>
              <Text className={"text-center font-medium"}>Update Metadata</Text>
            </Pressable>
        </View>
    )
}

export default memo(Tips);