import { router } from "expo-router";
import { memo } from "react";
import { Pressable, View, Text } from "react-native";
import useMetadata from "./useMetadata";
import { useSelector } from "react-redux";
import { selectPublicKey } from "reducers/account/accountSlice";
import { t } from "i18n";

const Tips = () => {
  const publicKey = useSelector(selectPublicKey);
  const { name, picture } = useMetadata(publicKey);

  if (name && picture) {
    return null;
  }

  return (
    <View className={"px-3"}>
      <Pressable
        onPress={() => {
          router.navigate("settings/metadata");
        }}
        className={"bg-white px-1.5 py-1 rounded"}
      >
        <Text className={"text-center text-xs"}>{t("Update Metadata")}</Text>
      </Pressable>
    </View>
  );
};

export default memo(Tips);
