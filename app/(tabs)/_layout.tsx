import React, { memo } from "react";
import { Tabs } from "expo-router";
import { BlurView } from "expo-blur";
import { Octicons } from "@expo/vector-icons";

function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "white",
        tabBarStyle: {
          borderTopWidth: 0,
          backgroundColor: "#121212",
          position: "absolute",
        },
        tabBarHideOnKeyboard: true,
        tabBarBackground: () => <BlurView tint="dark" intensity={20} />,
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Octicons name="home" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: "Search",
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Octicons name="package" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="library"
        options={{
          title: "Applications",
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Octicons name="package" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="premium"
        options={{
          title: "Premium",
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Octicons name="package" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}

export default memo(TabLayout);
