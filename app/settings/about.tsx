import { ScrollView, Text, View } from "react-native";
import { memo } from "react";
import Constants from "expo-constants";
import { t } from "../../i18n";
import { Link } from "expo-router";

const Page = () => {
  return (
    <ScrollView className={"bg-[#121212] flex flex-1"}>
      <View className={"px-4 py-2 flex flex-row justify-between items-center"}>
        <Text className={"text-white font-medium"}>
          {t("Version")}
        </Text>
        <Text className={"text-[#B3B3B3] text-xs"}>
          {Constants.easConfig.version}
        </Text>
      </View>
      <View className={"px-4 py-2 flex flex-row justify-between items-center"}>
        <Text className={"text-white font-medium"}>
          {t("Device Name")}
        </Text>
        <Text className={"text-[#B3B3B3] text-xs"}>{Constants.deviceName}</Text>
      </View>
      {Constants.debugMode && (
        <View
          className={"px-4 py-2 flex flex-row justify-between items-center"}
        >
          <Text className={"text-white font-medium"}>
            {t("Mode")}
          </Text>
          <Text className={"text-[#B3B3B3] text-xs"}>Debug</Text>
        </View>
      )}
      <View className={"h-4"}></View>
      <Link
        href={"https://www.abandon.ai/docs/policies/Legal/terms-of-use"}
        className={"py-1"}
      >
        <Text className={"text-[#B3B3B3] text-center text-xs underline"}>
          {t("Terms of use")}
        </Text>
      </Link>
      <Link
        href={"https://www.abandon.ai/docs/policies/Legal/privacy-policy"}
        className={"py-1"}
      >
        <Text className={"text-[#B3B3B3] text-center text-xs underline"}>
          {t("Privacy policy")}
        </Text>
      </Link>
    </ScrollView>
  );
};

export default memo(Page);
