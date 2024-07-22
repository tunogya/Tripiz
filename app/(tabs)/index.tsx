import {FlatList, Pressable, ScrollView, Text, View} from "react-native";
import {memo} from "react";
import {useSafeAreaInsets} from "react-native-safe-area-context";
import Avatar from "../../components/Avatar";
import {router} from "expo-router";
import {t} from "../../i18n";
import {useSelector} from "react-redux";
import {selectPublicKey} from "../../reducers/account/accountSlice";
import {useWebSocket} from "../../components/WebSocketProvider";
import PersonaItem from "../../components/PersonaItem";

const Page = () => {
    const insets = useSafeAreaInsets();
    const publicKey = useSelector(selectPublicKey);
    const {connected} = useWebSocket();

    return (
        <View className={"flex flex-1 h-full bg-[#121212] relative"}>
            <ScrollView
                style={{
                    marginTop: insets.top,
                }}
                stickyHeaderIndices={[1]}
                className={"flex-1"}
            >
                <View className={"px-4 pt-9 pb-2 flex flex-row space-x-3 items-center"}>
                    <Pressable
                        onPress={() => {
                            router.navigate(`settings`);
                        }}
                    >
                        <Avatar publicKey={publicKey}/>
                    </Pressable>
                    <Text className={"text-white font-bold text-2xl"}>
                        {t("Home")}{!connected && t("connecting")}
                    </Text>
                </View>
                <FlatList
                    data={[1,2,3,4]}
                    className={"px-4 py-2"}
                    numColumns={2}
                    scrollEnabled={false}
                    renderItem={({ item, index }) => (
                        <PersonaItem item={item} index={index} />
                    )}
                />
                <View
                    style={{
                        height: 80,
                    }}
                ></View>
            </ScrollView>
        </View>
    );
};

export default memo(Page);
