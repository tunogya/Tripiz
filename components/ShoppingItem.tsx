import { View, Text } from "react-native";
import { FC, memo } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import moment from "moment";
import {t} from "../i18n";

const ShoppingItem: FC<{
  id: string;
}> = ({ id }) => {
  const { entities } = useSelector((state: RootState) => state.shopping);

  const shopping = entities[id];

  return (
    <View
      className={
        "flex flex-row space-x-3 justify-between py-1 border-b border-[#292929]"
      }
    >
      <View className={"flex flex-row space-x-3"}>
        <Text className={"text-white font-semibold min-w-[48px]"}>
          {shopping.amount * -1}
        </Text>
        <Text className={"text-[#A7A7A7] text-xs truncate"}>
          {shopping.description || t("noDescription")}
        </Text>
      </View>
      <Text className={"text-[#A7A7A7] text-xs"}>
        {moment(shopping.timestamp * 1000)
          .startOf("minutes")
          .fromNow()}
      </Text>
    </View>
  );
};

export default memo(ShoppingItem);
