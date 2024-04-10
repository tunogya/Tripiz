import "ts-node/register"; // Add this to import TypeScript files
import { ExpoConfig } from "expo/config";

// In SDK 46 and lower, use the following import instead:
// import { ExpoConfig } from '@expo/config-types';

const config: ExpoConfig = {
  scheme: "tripiz",
  name: "Tripiz",
  slug: "tripiz",
  android: {
    package: "ai.abandon.tripiz",
  },
  ios: {
    bundleIdentifier: "ai.abandon.tripiz",
  },
  plugins: ["expo-localization", "expo-router"],
  extra: {
    eas: {
      projectId: "59018e25-20db-401d-a9b5-39bb4d50a764",
    },
  },
};

export default config;
