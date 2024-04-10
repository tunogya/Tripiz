import "ts-node/register"; // Add this to import TypeScript files
import { ExpoConfig } from "expo/config";

// In SDK 46 and lower, use the following import instead:
// import { ExpoConfig } from '@expo/config-types';

const config: ExpoConfig = {
  scheme: "tripin",
  name: "TripIn",
  slug: "endless-travel",
  android: {
    package: "ai.abandon.tripin",
  },
  ios: {
    bundleIdentifier: "ai.abandon.tripin",
  },
  plugins: ["expo-localization", "expo-router"],
  extra: {
    eas: {
      projectId: "560098d9-8c5b-4575-a97e-2acce22e7ed4",
    },
  },
};

export default config;
