import { View, Text, TextInput, Pressable, ScrollView } from "react-native";
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
import { t } from "../i18n";

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
        <Text className={"text-white font-bold"}>{t("shopping")}</Text>
        <TextInput
          className={"p-3 bg-white rounded"}
          placeholder={"0"}
          value={amount}
          onChangeText={(text) => {
            const numericValue = text.replace(/[^0-9.]/g, "");
            const split = numericValue.split(".");
            if (split.length > 2) {
              const decimalPart = split.pop();
              setAmount(
                split.join(".") +
                  (decimalPart ? "." + decimalPart.replace(/\./g, "") : ""),
              );
            } else {
              setAmount(numericValue);
            }
          }}
          keyboardType={"numeric"}
        />
      </View>
      <View className={"space-y-3"}>
        <Text className={"text-white font-bold"}>{t("description")}</Text>
        <TextInput
          className={"p-3 bg-white rounded"}
          placeholder={t("description")}
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
          <Text className={"text-black font-semibold"}>{t("record")}</Text>
        </Pressable>
      </View>
      <View>
        <Text className={"text-white text-center font-semibold text-lg"}>
          {t("detail")}
        </Text>
        <Text className={"text-[#A7A7A7] text-xs text-center"}>
          {t("total")} {(travel.budget - travel.available).toFixed(0)}
        </Text>
      </View>
      <View className={"px-3 py-2 bg-[#181818] min-h-[240px] rounded-lg"}>
        <FlashList
          estimatedItemSize={10}
          data={travel.shoppingIds}
          keyExtractor={(item, index) => `${item}-${index}`}
          renderItem={({ item }) => <ShoppingItem id={item} />}
          ListHeaderComponent={() => (
            <View>
              {travel.shoppingIds.length === 0 && (
                <Text className={"text-[#A7A7A7] text-xs"}>
                  {t("noShoppingRecords")}
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
