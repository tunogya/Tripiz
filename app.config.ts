import "ts-node/register"; // Add this to import TypeScript files
import { ExpoConfig } from "expo/config";

// In SDK 46 and lower, use the following import instead:
// import { ExpoConfig } from '@expo/config-types';

const config: ExpoConfig = {
  scheme: "endless-travel",
  name: "Endless Travel",
  slug: "endless-travel",
  android: {
    package: "ai.abandon.endless-travel",
  },
  ios: {
    bundleIdentifier: "ai.abandon.endless-travel",
  },
  plugins: ["expo-localization", "expo-router"],
  extra: {
    eas: {
      // projectId: "e35443ed-dc74-4f8b-8af6-dd74361107fd",
    },
    oneSignalAppId: "ec6a05ac-5e74-4d0b-b846-6dd008c59846",
  },
};

export default config;
