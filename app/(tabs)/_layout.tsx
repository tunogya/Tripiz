import React, { memo } from "react";
import { Tabs } from "expo-router";
import { BlurView } from "expo-blur";
import Svg, { Path } from "react-native-svg";
import { t } from "../../i18n";

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
          title: t("Search"),
          headerShown: false,
          tabBarIcon: ({ color, size, focused }) =>
            focused ? (
              <Svg width={size} height={size} viewBox="0 0 24 24">
                <Path
                  fill={color}
                  d="M15.356 10.558c0 2.623-2.16 4.75-4.823 4.75-2.664 0-4.824-2.127-4.824-4.75s2.16-4.75 4.824-4.75c2.664 0 4.823 2.127 4.823 4.75z"
                ></Path>
                <Path
                  fill={color}
                  d="M1.126 10.558c0-5.14 4.226-9.28 9.407-9.28 5.18 0 9.407 4.14 9.407 9.28a9.157 9.157 0 0 1-2.077 5.816l4.344 4.344a1 1 0 0 1-1.414 1.414l-4.353-4.353a9.454 9.454 0 0 1-5.907 2.058c-5.18 0-9.407-4.14-9.407-9.28zm9.407-7.28c-4.105 0-7.407 3.274-7.407 7.28s3.302 7.279 7.407 7.279 7.407-3.273 7.407-7.28c0-4.005-3.302-7.278-7.407-7.278z"
                ></Path>
              </Svg>
            ) : (
              <Svg width={size} height={size} viewBox="0 0 24 24">
                <Path
                  fill={color}
                  d="M1.126 10.558c0-5.14 4.226-9.28 9.407-9.28 5.18 0 9.407 4.14 9.407 9.28a9.157 9.157 0 0 1-2.077 5.816l4.344 4.344a1 1 0 0 1-1.414 1.414l-4.353-4.353a9.454 9.454 0 0 1-5.907 2.058c-5.18 0-9.407-4.14-9.407-9.28zm9.407-7.28c-4.105 0-7.407 3.274-7.407 7.28s3.302 7.279 7.407 7.279 7.407-3.273 7.407-7.28c0-4.005-3.302-7.278-7.407-7.278z"
                ></Path>
              </Svg>
            ),
        }}
      />
      <Tabs.Screen
        name="library"
        options={{
          title: t("Library"),
          headerShown: false,
          tabBarIcon: ({ color, size, focused }) =>
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
      <Tabs.Screen
        name="premium"
        options={{
          // href: null,
          title: t("Premium"),
          headerShown: false,
          tabBarIcon: ({color, size}) =>
            <Svg width={size} height={size} viewBox="0 0 760 696">
              <Path
                d="M264.688 694.445H117.185C-41.7065 554.104 -95.9871 84.379 328.62 4.25391C676.281 -42.873 853.423 311.965 710.104 554.104C677.442 614.825 578.992 705.709 424.166 694.445C319.554 681.009 242.827 653.118 174.492 521.263C80.5192 307.391 232.027 167.009 347.798 151.871C467.056 136.278 513.886 185.238 542.956 207.93C654.037 294.638 631.296 554.104 452.292 554.104C370.484 547.927 328.327 512.5 308.5 475C285 430.554 285.5 371.5 311.184 332.677C339.373 297.661 394.5 270 446.5 322.5C474.728 351 459.944 405.429 430.673 424.852C449.62 440.523 485.27 429.392 504.716 402.06C515.389 388.103 522.363 344.095 504.716 311.964C496.5 288.747 454.733 234.581 369.768 244.046C284.802 253.511 233.181 341.529 242.838 424.852C260.622 517.105 328.62 609.626 474.728 599.577C618.848 575.93 678.4 440.524 662.333 332.677C644.689 214.246 555.28 111.329 409.52 96.775C289.131 88.5898 175.07 157.763 126.022 257.561C79.6434 364.982 88.1547 458.016 126.022 538.935C165.425 623.14 217.896 668.733 264.688 694.445Z"
                fill={color}/>
            </Svg>
        }}
      />
    </Tabs>
  );
}

export default memo(TabLayout);
