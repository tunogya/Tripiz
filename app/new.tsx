import { View, Text, Pressable, TextInput, ScrollView } from "react-native";
import { memo, useEffect, useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { router } from "expo-router";
import {t} from "../i18n";

function Page() {
  const insets = useSafeAreaInsets();
  const [duration, setDuration] = useState("4h");
  const [budget, setBudget] = useState("100");
  const [location, setLocation] = useState("");
  const [showDurationInput, setShowDurationInput] = useState(false);
  const [showBudgetInput, setShowBudgetInput] = useState(false);

  const INTERVALS = ["1h", "2h", "4h", "6h", "8h", "12h", "other"];

  const BUDGETS = ["100", "500", "1000", "other"];

  useEffect(() => {
    if (duration === "other") {
      setShowDurationInput(true);
    }
  }, [duration]);

  useEffect(() => {
    if (budget === "other") {
      setShowBudgetInput(true);
    }
  }, [budget]);

  return (
    <View
      style={{
        paddingBottom: insets.bottom + 12,
      }}
      className={"flex h-full bg-[#121212]"}
    >
      <ScrollView
        style={{
          paddingTop: 16,
          paddingBottom: insets.bottom + 12,
        }}
        className={"flex space-y-6 relative"}
        showsVerticalScrollIndicator={false}
      >
        <View className={"space-y-3"}>
          <Text className={"text-white font-medium px-3"}>{t("duration")}</Text>
          <ScrollView
            horizontal={true}
            className={"space-x-2"}
            showsHorizontalScrollIndicator={false}
          >
            <View className={"w-1"}></View>
            {INTERVALS.map((item) => (
              <Pressable
                key={item}
                onPress={() => {
                  setDuration(item);
                  if (item !== "other") {
                    setShowDurationInput(false);
                  }
                }}
                className={`${item === duration ? "bg-[#1ED760]" : "bg-[#292929]"} px-3 py-1.5 rounded-full`}
              >
                <Text
                  className={`${item === duration ? "text-black" : "text-white"} text-xs`}
                >
                  {item}
                </Text>
              </Pressable>
            ))}
            <View className={"w-1"}></View>
          </ScrollView>
          {showDurationInput && (
            <View className={"px-3"}>
              <TextInput
                className={"bg-white p-2 rounded"}
                placeholder={"1D"}
                onChangeText={(e) => setDuration(e)}
              />
            </View>
          )}
        </View>
        <View className={"space-y-3"}>
          <Text className={"text-white font-medium px-3"}>
            {t("budget")}
          </Text>
          <View className={"space-x-2 flex flex-row"}>
            <View className={"w-1"}></View>
            {BUDGETS.map((item) => (
              <Pressable
                key={item}
                onPress={() => {
                  setBudget(item);
                  if (item !== "other") {
                    setShowBudgetInput(false);
                  }
                }}
                className={`${item === budget ? "bg-[#1ED760]" : "bg-[#292929]"} px-3 py-1.5 rounded-full`}
              >
                <Text
                  className={`${item === budget ? "text-black" : "text-white"} text-xs`}
                >
                  {item}
                </Text>
              </Pressable>
            ))}
            <View className={"w-1"}></View>
          </View>
          {showBudgetInput && (
            <View className={"px-3"}>
              <TextInput
                className={"bg-white p-2 rounded"}
                placeholder={"2000"}
                onChangeText={(e) => setBudget(e)}
              />
            </View>
          )}
        </View>
        <View className={"space-y-3 px-3"}>
          <Text className={"text-white font-medium"}>{t("location")}</Text>
          <TextInput
            className={"bg-white p-2 rounded"}
            placeholder={"上海市"}
            onChangeText={(e) => setLocation(e)}
          />
        </View>
      </ScrollView>
      <View className={"pt-8 flex space-y-3 px-3"}>
        <Pressable
          onPress={() => {
            router.push(
              `newTask?duration=${duration}&location=${location}&budget=${budget}`,
            );
          }}
          className={"py-3 w-full bg-[#1ED760] flex rounded items-center"}
        >
          <Text className={"text-black font-medium"}>{t("buildTasks")}</Text>
        </Pressable>
      </View>
    </View>
  );
}

export default memo(Page);
