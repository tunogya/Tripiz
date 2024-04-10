import "ts-node/register"; // Add this to import TypeScript files
import { ExpoConfig } from "expo/config";

// In SDK 46 and lower, use the following import instead:
// import { ExpoConfig } from '@expo/config-types';

const config: ExpoConfig = {
  scheme: "tripiz",
  name: "TripIz",
  slug: "tripiz",
  android: {
    package: "ai.abandon.tripin",
  },
  ios: {
    bundleIdentifier: "ai.abandon.tripin",
  },
  plugins: ["expo-localization", "expo-router"],
  extra: {
    eas: {
      projectId: "2ea4444b-6c97-48cb-8372-92bbdc477513",
    },
  },
};

export default config;
