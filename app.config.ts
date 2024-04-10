import "ts-node/register"; // Add this to import TypeScript files
import { ExpoConfig } from "expo/config";

// In SDK 46 and lower, use the following import instead:
// import { ExpoConfig } from '@expo/config-types';

const config: ExpoConfig = {
  scheme: "endless-travel",
  name: "Endless Travel",
  slug: "endless-travel",
  android: {
    package: "ai.abandon.endless_travel",
  },
  ios: {
    bundleIdentifier: "ai.abandon.endless-travel",
  },
  plugins: ["expo-localization", "expo-router"],
  extra: {
    eas: {
      projectId: "560098d9-8c5b-4575-a97e-2acce22e7ed4",
    },
  },
};

export default config;
