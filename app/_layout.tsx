import { router, SplashScreen } from "expo-router";
import { Provider } from "react-redux";
import store, { persistor } from "../store/store";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { PersistGate } from "redux-persist/integration/react";
import { useFonts, Inter_500Medium } from "@expo-google-fonts/inter";
import { useEffect } from "react";
import { Stack } from "expo-router/stack";
import { StatusBar } from "expo-status-bar";
import { Platform, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import "i18n";
import { t } from "../i18n";
import Notification from "../components/Notification";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontsLoaded, fontError] = useFonts({
    Inter_500Medium,
  });

  useEffect(() => {
    if (fontsLoaded || fontError) {
      // Hide the splash screen after the fonts have loaded (or an error was returned) and the UI is ready.
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  // Prevent rendering until the font has loaded or an error was returned
  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Notification />
        <SafeAreaProvider>
          <StatusBar style="light" />
          <Stack>
            <Stack.Screen
              name="index"
              options={{
                title: t("home"),
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="new"
              options={{
                title: t("newTravel"),
                headerTintColor: "white",
                headerShown: true,
                headerStyle: {
                  backgroundColor: "#121212",
                },
                headerLeft: () => (
                  <Pressable
                    hitSlop={4}
                    onPress={() => {
                      router.navigate("/");
                    }}
                  >
                    <Ionicons name="close" size={20} color="white" />
                  </Pressable>
                ),
              }}
            />
            <Stack.Screen
              name="newTask"
              options={{
                title: t("buildTasks"),
                headerTintColor: "white",
                headerShown: true,
                headerStyle: {
                  backgroundColor: "#121212",
                },
                headerLeft: () => (
                  <Pressable
                    hitSlop={4}
                    onPress={() => {
                      router.navigate("/");
                    }}
                  >
                    <Ionicons name="close" size={20} color="white" />
                  </Pressable>
                ),
              }}
            />
            <Stack.Screen
              name="options"
              options={{
                title: t("option"),
                headerShown: true,
                headerTintColor: "white",
                headerStyle: {
                  backgroundColor: "#121212",
                },
                headerLeft: () => (
                  <Pressable
                    hitSlop={4}
                    onPress={() => {
                      router.back();
                    }}
                  >
                    <Ionicons name="chevron-back" size={20} color="white" />
                  </Pressable>
                ),
              }}
            />
            <Stack.Screen
              name="likeTask"
              options={{
                title: t("likedTasks"),
                headerShown: true,
                headerTintColor: "white",
                headerStyle: {
                  backgroundColor: "#121212",
                },
                headerLeft: () => (
                  <Pressable
                    hitSlop={4}
                    onPress={() => {
                      router.back();
                    }}
                  >
                    <Ionicons name="chevron-back" size={20} color="white" />
                  </Pressable>
                ),
              }}
            />
            <Stack.Screen
              name="optionsOpenAI"
              options={{
                title: t("openaiConfig"),
                headerShown: true,
                headerTintColor: "white",
                headerStyle: {
                  backgroundColor: "#121212",
                },
                headerLeft: () => (
                  <Pressable
                    hitSlop={4}
                    onPress={() => {
                      router.back();
                    }}
                  >
                    <Ionicons name="chevron-back" size={20} color="white" />
                  </Pressable>
                ),
              }}
            />
            <Stack.Screen
              name="travels/[id]"
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="history"
              options={{
                title: t("historyTravel"),
                headerShown: true,
                headerTintColor: "white",
                gestureEnabled: false,
                headerStyle: {
                  backgroundColor: "#121212",
                },
                headerLeft: () => (
                  <Pressable
                    hitSlop={4}
                    onPress={() => {
                      router.back();
                    }}
                  >
                    <Ionicons name="chevron-back" size={20} color="white" />
                  </Pressable>
                ),
              }}
            />
            <Stack.Screen
              name="shopping"
              options={{
                presentation: "modal",
                title: t("record"),
                headerShown: true,
                headerTintColor: "white",
                headerStyle: {
                  backgroundColor: "#121212",
                },
              }}
            />
            <Stack.Screen
              name="tips"
              options={{
                presentation: "modal",
                headerShown: false,
                headerTintColor: "white",
                headerStyle: {
                  backgroundColor: "#121212",
                },
              }}
            />
            <Stack.Screen
              name="preference"
              options={{
                presentation: "modal",
                title: t("preference"),
                headerShown: true,
                headerTintColor: "white",
                headerStyle: {
                  backgroundColor: "#121212",
                },
              }}
            />
          </Stack>
        </SafeAreaProvider>
      </PersistGate>
    </Provider>
  );
}
