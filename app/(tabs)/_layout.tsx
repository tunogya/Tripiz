import React, { memo } from "react";
import { Tabs } from "expo-router";
import { BlurView } from "expo-blur";
import Svg, { Path } from "react-native-svg";

function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "white",
        tabBarStyle: {
          borderTopWidth: 0,
          position: "absolute",
          bottom: 0,
          left: 0,
        },
        tabBarHideOnKeyboard: true,
        tabBarBackground: () => (
          <BlurView
            intensity={10}
            tint={"dark"}
            style={{
              position: "absolute",
              left: 0,
              bottom: 0,
              right: 0,
              top: 0,
            }}
          ></BlurView>
        ),
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          headerShown: false,
          tabBarIcon: ({ color, size, focused }) =>
            focused ? (
              <Svg width={size} height={size} viewBox="0 0 24 24">
                <Path
                  fill={color}
                  d="M13.5 1.515a3 3 0 0 0-3 0L3 5.845a2 2 0 0 0-1 1.732V21a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-6h4v6a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V7.577a2 2 0 0 0-1-1.732l-7.5-4.33z"
                ></Path>
              </Svg>
            ) : (
              <Svg width={size} height={size} viewBox="0 0 24 24">
                <Path
                  fill={color}
                  d="M12.5 3.247a1 1 0 0 0-1 0L4 7.577V20h4.5v-6a1 1 0 0 1 1-1h5a1 1 0 0 1 1 1v6H20V7.577l-7.5-4.33zm-2-1.732a3 3 0 0 1 3 0l7.5 4.33a2 2 0 0 1 1 1.732V21a1 1 0 0 1-1 1h-6.5a1 1 0 0 1-1-1v-6h-3v6a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V7.577a2 2 0 0 1 1-1.732l7.5-4.33z"
                ></Path>
              </Svg>
            ),
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: "Search",
          headerShown: false,
          tabBarIcon: ({ color, size, focused }) =>
            focused ? (
              <Svg width={size} height={size} viewBox="0 0 24 24">
                <Path fill={color}
                  d="M15.356 10.558c0 2.623-2.16 4.75-4.823 4.75-2.664 0-4.824-2.127-4.824-4.75s2.16-4.75 4.824-4.75c2.664 0 4.823 2.127 4.823 4.75z"></Path>
                <Path fill={color}
                  d="M1.126 10.558c0-5.14 4.226-9.28 9.407-9.28 5.18 0 9.407 4.14 9.407 9.28a9.157 9.157 0 0 1-2.077 5.816l4.344 4.344a1 1 0 0 1-1.414 1.414l-4.353-4.353a9.454 9.454 0 0 1-5.907 2.058c-5.18 0-9.407-4.14-9.407-9.28zm9.407-7.28c-4.105 0-7.407 3.274-7.407 7.28s3.302 7.279 7.407 7.279 7.407-3.273 7.407-7.28c0-4.005-3.302-7.278-7.407-7.278z"></Path>
              </Svg>
            ) : (
              <Svg width={size} height={size} viewBox="0 0 24 24">
                <Path fill={color}
                      d="M1.126 10.558c0-5.14 4.226-9.28 9.407-9.28 5.18 0 9.407 4.14 9.407 9.28a9.157 9.157 0 0 1-2.077 5.816l4.344 4.344a1 1 0 0 1-1.414 1.414l-4.353-4.353a9.454 9.454 0 0 1-5.907 2.058c-5.18 0-9.407-4.14-9.407-9.28zm9.407-7.28c-4.105 0-7.407 3.274-7.407 7.28s3.302 7.279 7.407 7.279 7.407-3.273 7.407-7.28c0-4.005-3.302-7.278-7.407-7.278z"></Path>
              </Svg>
            ),
        }}
      />
      <Tabs.Screen
        name="library"
        options={{
          title: "Library",
          headerShown: false,
          tabBarIcon: ({color, size, focused}) =>
            focused ? (
              <Svg width={size} height={size} viewBox="0 0 24 24">
                <Path
                  fill={color}
                  d="M3 22a1 1 0 0 1-1-1V3a1 1 0 0 1 2 0v18a1 1 0 0 1-1 1zM15.5 2.134A1 1 0 0 0 14 3v18a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V6.464a1 1 0 0 0-.5-.866l-6-3.464zM9 2a1 1 0 0 0-1 1v18a1 1 0 1 0 2 0V3a1 1 0 0 0-1-1z"
                ></Path>
              </Svg>
            ) : (
              <Svg width={size} height={size} viewBox="0 0 24 24">
                <Path
                  fill={color}
                  d="M14.5 2.134a1 1 0 0 1 1 0l6 3.464a1 1 0 0 1 .5.866V21a1 1 0 0 1-1 1h-6a1 1 0 0 1-1-1V3a1 1 0 0 1 .5-.866zM16 4.732V20h4V7.041l-4-2.309zM3 22a1 1 0 0 1-1-1V3a1 1 0 0 1 2 0v18a1 1 0 0 1-1 1zm6 0a1 1 0 0 1-1-1V3a1 1 0 0 1 2 0v18a1 1 0 0 1-1 1z"
                ></Path>
              </Svg>
            ),
        }}
      />
    </Tabs>
  );
}

export default memo(TabLayout);
