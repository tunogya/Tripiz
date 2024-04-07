import {router, SplashScreen} from "expo-router";
import {Provider} from "react-redux";
import store, {persistor} from "../store/store";
import {Auth0Provider} from "react-native-auth0";
import {SafeAreaProvider} from "react-native-safe-area-context";
import {PersistGate} from "redux-persist/integration/react";
import {useFonts, Inter_500Medium} from "@expo-google-fonts/inter";
import {useEffect} from "react";
import {Stack} from "expo-router/stack";
import {StatusBar} from "expo-status-bar";
import {LogLevel, OneSignal} from 'react-native-onesignal';
import Constants from "expo-constants";
import {Pressable} from "react-native";
import {Ionicons} from "@expo/vector-icons";

SplashScreen.preventAutoHideAsync();

const domain = "abandon.jp.auth0.com";
const clientId = "CwiT1ffw0lEl6bVWR9ka20sRkrim4D7T";

OneSignal.Debug.setLogLevel(LogLevel.Verbose);
OneSignal.initialize(Constants.expoConfig.extra.oneSignalAppId);

// Also need enable notifications to complete OneSignal setup
OneSignal.Notifications.requestPermission(true);

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
      <Auth0Provider domain={domain} clientId={clientId}>
        <PersistGate loading={null} persistor={persistor}>
          <SafeAreaProvider>
            <StatusBar style="light"/>
            <Stack>
              <Stack.Screen
                name="index"
                options={{
                  title: "首页",
                  headerShown: false
                }}
              />
              <Stack.Screen
                name="new"
                options={{
                  title: "新旅途",
                  headerTintColor: "white",
                  headerShown: true,
                  headerStyle: {
                    backgroundColor: "#121212",
                  },
                  headerLeft: () => (
                    <Pressable
                      hitSlop={4}
                      onPress={() => {
                        router.navigate('/')
                      }}
                    >
                      <Ionicons name="close" size={24} color="white" />
                    </Pressable>
                  )
                }}
              />
              <Stack.Screen
                name="newTask"
                options={{
                  title: "任务清单",
                  headerTintColor: "white",
                  headerShown: true,
                  headerStyle: {
                    backgroundColor: "#121212",
                  },
                  headerLeft: () => (
                    <Pressable
                      hitSlop={4}
                      onPress={() => {
                        router.navigate('/')
                      }}
                    >
                      <Ionicons name="close" size={24} color="white" />
                    </Pressable>
                  )
                }}
              />
              <Stack.Screen
                name="options"
                options={{
                  title: "选项",
                  headerShown: true,
                  headerTintColor: "white",
                  headerStyle: {
                    backgroundColor: "#121212",
                  },
                  headerLeft: () => (
                    <Pressable
                      hitSlop={4}
                      onPress={() => {
                        router.back()
                      }}
                    >
                      <Ionicons name="chevron-back" size={24} color="white" />
                    </Pressable>
                  )
                }}
              />
              <Stack.Screen
                name="optionsOpenAI"
                options={{
                  title: "OpenAI 配置",
                  headerShown: true,
                  headerTintColor: "white",
                  headerStyle: {
                    backgroundColor: "#121212",
                  },
                  headerLeft: () => (
                    <Pressable
                      hitSlop={4}
                      onPress={() => {
                        router.back()
                      }}
                    >
                      <Ionicons name="chevron-back" size={24} color="white" />
                    </Pressable>
                  )
                }}
              />
              <Stack.Screen
                name="optionsLanguage"
                options={{
                  title: "应用语言",
                  headerShown: true,
                  headerTintColor: "white",
                  headerStyle: {
                    backgroundColor: "#121212",
                  },
                  headerLeft: () => (
                    <Pressable
                      hitSlop={4}
                      onPress={() => {
                        router.back()
                      }}
                    >
                      <Ionicons name="chevron-back" size={24} color="white" />
                    </Pressable>
                  )
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
                  title: "历史旅途",
                  headerShown: true,
                  headerTintColor: "white",
                  headerStyle: {
                    backgroundColor: "#121212",
                  },
                  headerLeft: () => (
                    <Pressable
                      hitSlop={4}
                      onPress={() => {
                        router.navigate('/')
                      }}
                    >
                      <Ionicons name="chevron-back" size={24} color="white" />
                    </Pressable>
                  )
                }}
              />
            </Stack>
          </SafeAreaProvider>
        </PersistGate>
      </Auth0Provider>
    </Provider>
  );
}
