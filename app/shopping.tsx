import {
  View,
  Text,
  TextInput,
  Pressable,
  ScrollView,
  FlatList,
} from "react-native";
import { useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { ensureString } from "./travels/[id]";
import ShoppingItem from "../components/ShoppingItem";
import { addOneShopping, Shopping } from "../reducers/shopping/shoppingSlice";
import uuid from "react-native-uuid";
import { updateOneTravel } from "../reducers/travel/travelSlice";
import { FlashList } from "@shopify/flash-list";

const Page = () => {
  const { travelId } = useLocalSearchParams();
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const { entities: travels } = useSelector((state: RootState) => state.travel);
  const dispatch = useDispatch();
  const travel = travels[ensureString(travelId)];

  return (
    <ScrollView
      className={"flex h-full bg-[#121212] px-3 space-y-6"}
      showsVerticalScrollIndicator={false}
    >
      <View className={"space-y-3"}>
        <Text className={"text-white font-semibold"}>消费金额</Text>
        <TextInput
          className={"p-3 bg-white rounded"}
          placeholder={"0"}
          value={amount}
          onChangeText={(e) => {
            setAmount(e);
          }}
        />
      </View>
      <View className={"space-y-3"}>
        <Text className={"text-white font-semibold"}>描述(可选)</Text>
        <TextInput
          className={"p-3 bg-white rounded"}
          placeholder={"消费描述"}
          value={description}
          onChangeText={(e) => {
            setDescription(e);
          }}
        />
      </View>
      <View className={"py-3"}>
        <Pressable
          className={"bg-[#1ED760] p-3 rounded-lg flex items-center"}
          onPress={() => {
            const shopping: Shopping = {
              id: uuid.v4().toString(),
              timestamp: Math.floor(new Date().getTime() / 1000),
              description: description,
              amount: Number(amount || 0),
            };
            dispatch(addOneShopping(shopping));
            dispatch(
              updateOneTravel({
                id: travel.id,
                changes: {
                  shoppingIds: [...travel.shoppingIds, shopping.id],
                  available: travel.available - shopping.amount,
                },
              }),
            );
          }}
        >
          <Text className={"text-black font-semibold"}>记录</Text>
        </Pressable>
      </View>
      <View>
        <Text className={"text-white text-center font-semibold text-lg"}>
          消费明细
        </Text>
        <Text className={"text-[#A7A7A7] text-xs text-center"}>
          合计 {(travel.budget - travel.available).toFixed(0)}
        </Text>
      </View>
      <View className={"px-3 py-2 bg-[#181818] min-h-[240px] rounded-lg"}>
        <FlashList
          estimatedItemSize={10}
          // scrollEnabled={false}
          data={travel.shoppingIds}
          keyExtractor={(item) => item}
          renderItem={({ item }) => <ShoppingItem id={item} />}
          ListHeaderComponent={() => (
            <View>
              {travel.shoppingIds.length === 0 && (
                <Text className={"text-[#A7A7A7] text-xs"}>
                  还没有消费记录。
                </Text>
              )}
            </View>
          )}
        />
      </View>
    </ScrollView>
  );
};

export default Page;
