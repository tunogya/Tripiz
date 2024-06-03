import {memo, useEffect, useRef} from "react";
import * as Notifications from "expo-notifications";
import {Platform} from "react-native";
import * as Device from "expo-device";
import Constants from "expo-constants";
import {useSelector} from "react-redux";
import {RootState} from "../store/store";
import {ethers} from "ethers";
import {API_HOST_NAME} from "../utils/const";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

async function registerForPushNotificationsAsync() {
  if (Platform.OS === "android") {
    await Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }

  if (Device.isDevice) {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      return;
    }
    const projectId =
      Constants?.expoConfig?.extra?.eas?.projectId ??
      Constants?.easConfig?.projectId;
    if (!projectId) {
      return;
    }
    try {
      return (
        await Notifications.getExpoPushTokenAsync({
          projectId,
        })
      ).data;
    } catch (e: unknown) {
      return;
    }
  } else {
    return;
  }
}

const Notification = () => {
  const notificationListener = useRef<Notifications.Subscription>();
  const responseListener = useRef<Notifications.Subscription>();
  const { address, privateKey } = useSelector((state: RootState) => state.user);
  const wallet = new ethers.Wallet(privateKey);

  const updateExpoPushToken = async (expoPushToken: string) => {
    try {
      const sig = wallet.signMessageSync(expoPushToken);
      await fetch(`${API_HOST_NAME}/users`, {
        method: "POST",
        headers: {
          "Tripiz-User": address,
          "Tripiz-Signature": sig,
        },
        body: JSON.stringify({
          user: address,
          expoPushToken: expoPushToken,
          signature: sig,
        })
      })
    } catch (e) {
      console.log(e)
    }
  }

  useEffect(() => {
    registerForPushNotificationsAsync().then((token) => {
      if (token) {
        updateExpoPushToken(token);
      }
    });

    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        // console.log(notification);
      });

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        // console.log(response);
      });

    return () => {
      notificationListener.current &&
        Notifications.removeNotificationSubscription(
          notificationListener.current,
        );
      responseListener.current &&
        Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  return null;
};

export default memo(Notification);
