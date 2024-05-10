import { SplashScreen } from "expo-router";
import { Provider } from "react-redux";
import store, { persistor } from "../store/store";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { PersistGate } from "redux-persist/integration/react";
import { useFonts, Inter_500Medium } from "@expo-google-fonts/inter";
import { useEffect } from "react";
import { Stack } from "expo-router/stack";
import { StatusBar } from "expo-status-bar";
import "i18n";
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
              name="(tabs)"
              options={{
                headerShown: false,
                title: "",
              }}
            />
            <Stack.Screen
              name="edit/dreams/[id]"
              options={{
                presentation: "modal",
                title: "Add",
                headerShown: false,
                headerTintColor: "white",
                headerBackTitleVisible: false,
                headerStyle: {
                  backgroundColor: "#121212",
                },
              }}
            />
            <Stack.Screen
              name="edit/memories/[id]"
              options={{
                presentation: "modal",
                title: "Add",
                headerShown: false,
                headerTintColor: "white",
                headerBackTitleVisible: false,
                headerStyle: {
                  backgroundColor: "#121212",
                },
              }}
            />
            <Stack.Screen
              name="edit/reflections/[id]"
              options={{
                presentation: "modal",
                title: "Add",
                headerShown: false,
                headerTintColor: "white",
                headerBackTitleVisible: false,
                headerStyle: {
                  backgroundColor: "#121212",
                },
              }}
            />
            <Stack.Screen
              name="dreams/[id]"
              options={{
                headerShown: false,
                title: "Dream",
                headerBackTitleVisible: false,
                headerTintColor: "white",
                headerStyle: {
                  backgroundColor: "#121212",
                },
              }}
            />
            <Stack.Screen
              name="memories/[id]"
              options={{
                headerShown: false,
                title: "Memory",
                headerBackTitleVisible: false,
                headerTintColor: "white",
                headerStyle: {
                  backgroundColor: "#121212",
                },
              }}
            />
            <Stack.Screen
              name="reflections/[id]"
              options={{
                headerShown: false,
                title: "Reflection",
                headerBackTitleVisible: false,
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
