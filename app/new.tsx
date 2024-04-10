import { View, Text, Pressable, TextInput, ScrollView } from "react-native";
import { memo, useEffect, useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { router } from "expo-router";
import { t } from "../i18n";
import {
  getCurrentPositionAsync,
  requestForegroundPermissionsAsync,
  reverseGeocodeAsync,
} from "expo-location";

function Page() {
  const insets = useSafeAreaInsets();
  const [duration, setDuration] = useState("4h");
  const [budget, setBudget] = useState("100");
  const [location, setLocation] = useState("");
  const [showDurationInput, setShowDurationInput] = useState(false);
  const [showBudgetInput, setShowBudgetInput] = useState(false);
  const [allowLocation, setAllowLocation] = useState(false);
  const INTERVALS = ["1h", "2h", "4h", "6h", "8h", "12h", "other"];

  const BUDGETS = ["100", "500", "1000", "other"];

  useEffect(() => {
    (async () => {
      let { status } = await requestForegroundPermissionsAsync();
      if (status !== "granted") {
        return;
      }
      setAllowLocation(true);
    })();
  }, []);

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

  const disabled =
    duration === "" ||
    location === "" ||
    budget === "" ||
    duration === "other" ||
    budget === "other";

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
                  className={`${item === duration ? "text-black" : "text-white"}`}
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
                className={"bg-white p-3 rounded"}
                placeholder={"1D"}
                onChangeText={(e) => setDuration(e)}
              />
            </View>
          )}
        </View>
        <View className={"space-y-3"}>
          <Text className={"text-white font-medium px-3"}>{t("budget")}</Text>
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
                  className={`${item === budget ? "text-black" : "text-white"}`}
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
                className={"bg-white p-3 rounded"}
                placeholder={"2000"}
                onChangeText={(text) => {
                  const numericValue = text.replace(/[^0-9.]/g, "");
                  const split = numericValue.split(".");
                  if (split.length > 2) {
                    const decimalPart = split.pop();
                    setBudget(
                      split.join(".") +
                        (decimalPart
                          ? "." + decimalPart.replace(/\./g, "")
                          : ""),
                    );
                  } else {
                    setBudget(numericValue);
                  }
                }}
                keyboardType={"numeric"}
              />
            </View>
          )}
        </View>
        <View className={"space-y-3 px-3"}>
          <Text className={"text-white font-medium"}>{t("location")}</Text>
          {allowLocation && (
            <Pressable
              onPress={async () => {
                const { coords } = await getCurrentPositionAsync();
                let reverseGeocode = await reverseGeocodeAsync({
                  latitude: coords.latitude,
                  longitude: coords.latitude,
                });
                if (reverseGeocode.length > 0) {
                  const { city, street, region, postalCode, country } =
                    reverseGeocode[0];
                  setLocation(
                    `${street}, ${city}, ${region}, ${postalCode}, ${country}`,
                  );
                } else {
                  setLocation(
                    `latitude: ${coords.latitude}, longitude: ${coords.longitude}`,
                  );
                }
              }}
              className={`bg-[#292929] px-3 py-1.5 rounded-full`}
            >
              <Text className={`"text-white"`}>{t("getCurrentLocation")}</Text>
            </Pressable>
          )}
          <TextInput
            className={"bg-white p-3 rounded"}
            placeholder={"..."}
            onChangeText={(e) => setLocation(e)}
          />
        </View>
      </ScrollView>
      <View className={"pt-8 flex space-y-3 px-3"}>
        {!disabled && (
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
        )}
      </View>
    </View>
  );
}

export default memo(Page);
