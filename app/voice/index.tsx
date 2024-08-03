import { memo } from "react"
import { View, Text, Pressable } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Ionicons from '@expo/vector-icons/Ionicons';
import { router } from "expo-router";

const Voice = () => {
    const insets = useSafeAreaInsets();

    return (
        <View
            className={"flex flex-1 h-full bg-[#121212] relative"}
            style={{
                paddingTop: insets.top,
                paddingBottom: insets.bottom,
            }}
        >
            <View className={"h-full w-full left-0 top-0 justify-center items-center"}>
            </View>
            <View
                className={"absolute left-0 w-full z-10"}
                style={{
                    bottom: insets.bottom,
                }}
            >
                <View className={"flex flex-row justify-between p-4"}>
                    <Pressable className={"w-14 h-14 rounded-full bg-[#2F2F2F] flex items-center justify-center"}>
                        <Ionicons name="pause" size={24} color="#A7A7A7" />
                    </Pressable>
                    <Pressable
                        onPress={() => {
                            router.back();
                        }}
                        className={"w-14 h-14 rounded-full bg-red-500 flex items-center justify-center"}
                    >
                        <Ionicons name="close" size={28} color="white" />
                    </Pressable>
                </View>
            </View>
        </View>
    )
}

export default memo(Voice)