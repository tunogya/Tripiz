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
import CheckUser from "../components/CheckUser";
import {SWRConfig} from "swr";
import {AppState} from "react-native";
import PostMoreButton from "../components/PostMoreButton";

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
      <SWRConfig
        value={{
          provider: () => new Map(),
          isOnline() {
            /* Customize the network state detector */
            return true
          },
          isVisible() {
            /* Customize the visibility state detector */
            return true
          },
          initFocus(callback) {
            let appState = AppState.currentState

            const onAppStateChange = (nextAppState: any) => {
              /* If it's resuming from background or inactive mode to active one */
              if (appState.match(/inactive|background/) && nextAppState === 'active') {
                callback()
              }
              appState = nextAppState
            }

            // Subscribe to the app state change events
            const subscription = AppState.addEventListener('change', onAppStateChange)

            return () => {
              subscription.remove()
            }
          },
          initReconnect(callback) {
            /* Register the listener with your state provider */
          }
        }}
      >
        <PersistGate loading={null} persistor={persistor}>
          <Notification />
          <CheckUser />
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
                name="edit/posts/[id]"
                options={{
                  presentation: "modal",
                  title: "",
                  headerShown: false,
                  headerTintColor: "white",
                  headerBackTitleVisible: false,
                  headerStyle: {
                    backgroundColor: "#121212",
                  },
                }}
              />
              <Stack.Screen
                name="posts/[id]"
                options={{
                  headerShown: true,
                  title: "",
                  headerBackTitleVisible: false,
                  headerTintColor: "white",
                  headerStyle: {
                    backgroundColor: "#121212",
                  },
                  headerRight: () => <PostMoreButton />
                }}
              />
              <Stack.Screen
                name="account/index"
                options={{
                  presentation: "modal",
                  title: "",
                  headerShown: false,
                  headerTintColor: "white",
                  headerBackTitleVisible: false,
                  headerStyle: {
                    backgroundColor: "#121212",
                  },
                }}
              />
            </Stack>
          </SafeAreaProvider>
        </PersistGate>
      </SWRConfig>
    </Provider>
  );
}
