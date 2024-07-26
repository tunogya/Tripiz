import { FlatList, Pressable, Text, View } from "react-native";
import React, { memo, useEffect } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Avatar from "../../components/Avatar";
import { router } from "expo-router";
import { t } from "../../i18n";
import { useDispatch, useSelector } from "react-redux";
import { selectPublicKey } from "../../reducers/account/accountSlice";
import { useWebSocket } from "../../components/WebSocketProvider";
import PersonaItem from "../../components/PersonaItem";
import { useQuery, useRealm } from "@realm/react";
import { Persona } from "../Persona";
import { RootState } from "store/store";
import { Ionicons } from "@expo/vector-icons";
import { initialize } from "../../reducers/account/accountSlice";

const Page = () => {
  const insets = useSafeAreaInsets();
  const { privateKey } = useSelector((state: RootState) => state.account);
  const publicKey = useSelector(selectPublicKey);
  const { connected } = useWebSocket();
  const dispatch = useDispatch();
  const realm = useRealm();

  const personas = useQuery(Persona, (events) => {
    return events.sorted("created_at", true);
  });

  useEffect(() => {
    try {
      realm.write(() => {
        realm.create(
          "Persona",
          { privateKey: privateKey, created_at: Math.floor(Date.now() / 1000) },
          false,
        );
      });
    } catch (e) {
      console.log(e);
    }
  }, [privateKey]);

  return (
    <View className={"flex flex-1 h-full bg-[#121212] relative"}>
      <View
        style={{
          paddingTop: insets.top,
        }}
        className={"flex-1"}
      >
        <View
          className={"px-4 pb-2 pt-9 flex flex-row space-x-3 items-center justify-between"}
        >
          <View className={"flex flex-row space-x-3 items-center"}>
            <Pressable
              onPress={() => {
                router.navigate(`settings`);
              }}
            >
              <Avatar publicKey={publicKey} key={publicKey}/>
            </Pressable>
            <Text className={"text-white font-bold text-2xl"}>
              {t("Home")}
              {!connected && t("connecting")}
            </Text>
          </View>
          <View className={"flex flex-row space-x-3 items-center"}>
            <Pressable
              className={"items-center justify-center flex h-10 w-10"}
              onPress={() => {
                dispatch(initialize());
              }}
            >
              <Ionicons name="add" size={32} color="white" />
            </Pressable>
          </View>
        </View>
        <FlatList
          data={personas}
          className={"px-4 py-2"}
          numColumns={2}
          keyExtractor={(item) => item.privateKey}
          renderItem={({ item, index }) => (
            <PersonaItem item={item} index={index}/>
          )}
          ListEmptyComponent={() => (
            <View>
              <Text className={"text-white"}>loading...</Text>
            </View>
          )}
        />
        <View
          style={{
            height: 80,
          }}
        ></View>
      </View>
    </View>
  );
};

export default memo(Page);
