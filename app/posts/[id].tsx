import {
  View,
  Text,
  ScrollView,
  Image,
  ActivityIndicator,
  TextInput,
  KeyboardAvoidingView,
  Platform
} from "react-native";
import React, {memo, useState} from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { BlurView } from "expo-blur";
import { useLocalSearchParams } from "expo-router";
import { Dimensions } from "react-native";
import useSWR from "swr";
import {useDispatch, useSelector} from "react-redux";
import {updateValue} from "../../reducers/ui/uiSlice";
import {RootState} from "../../store/store";

const Page = () => {
  const { id } = useLocalSearchParams();
  const insets = useSafeAreaInsets();
  const { scroll2Down } = useSelector((state: RootState) => state.ui);
  const screenWidth = Dimensions.get("window").width;
  const [isFocused, setIsFocused] = useState(false);
  const dispatch = useDispatch();

  const [lastScrollPosition, setLastScrollPosition] = useState(0);

  const handleScroll = (event: any) => {
    const currentScrollPosition = event.nativeEvent.contentOffset.y;

    if (currentScrollPosition > lastScrollPosition) {
      dispatch(
        updateValue({
          scroll2Down: false,
        }),
      );
    } else {
      dispatch(
        updateValue({
          scroll2Down: true,
        }),
      );
    }
    setLastScrollPosition(currentScrollPosition);
  };

  const { data, isLoading } = useSWR(`https://tripiz.abandon.ai/api/posts/${id}`, (url: string) => fetch(url)
    .then((res) => res.json())
    .then((res) => res.data)
  );

  if (isLoading) {
    return (
      <View
        className={"flex flex-1 h-full bg-[#121212] relative"}
      >
        <ActivityIndicator size={"small"} color="#B3B3B3" />
      </View>
    )
  }

  return (
    <View
      className={"flex flex-1 h-full bg-[#121212] relative"}
    >
      <ScrollView
        onScroll={handleScroll}
        className={"h-full w-full"}
      >
        {
          data.entities && data.entities?.media?.length > 0 && (
            <View
              className={"w-full"}
              style={{
                height: screenWidth * 0.99,
              }}
            >
              <Image
                className={"w-full h-full"}
                source={{
                  uri: "https://preview.qiantucdn.com/58pic/20231114/00058PICChzpR3rwfa86b_PIC2018_PIC2018.jpg!qt_h320",
                }}
              />
            </View>
          )
        }
        <View className={"px-3"}>
          <Text className={"text-[#B3B3B3] font-medium text-lg"}>
            {data.text}
          </Text>
          <Text className={"text-[#B3B3B3] text-xs font-medium mt-3"}>
            {new Date(data.updatedAt).toLocaleDateString().replaceAll('/', '-')}
          </Text>
          <View className={"w-full border-b p-1.5 h-[1px] border-[#2F2F2F]"}></View>
        </View>
        <View className={"p-3"} style={{
          minHeight: Dimensions.get("window").height - 96 - insets.bottom - insets.top,
        }}>
          <Text className={"text-white font-semibold text-lg"}>评论</Text>
        </View>
        <View style={{ paddingBottom: 64 + insets.bottom  }}></View>
      </ScrollView>
      <KeyboardAvoidingView
        keyboardVerticalOffset={64}
        className={"absolute left-0 bottom-0 w-full z-50"}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <BlurView
          intensity={scroll2Down ? 100 : 10}
          tint={"dark"}
          className={
            "flex w-full bg-[#121212]"
          }
        >
          <View className={"px-3 h-16 flex justify-center items-center flex-row space-x-3"}>
            <TextInput
              placeholder={"Talk something..."}
              placeholderTextColor={"#B3B3B3"}
              autoFocus={false}
              className={"bg-[#2F2F2F] h-10 rounded-full px-4 text-white flex-1"}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
            />
            {
              isFocused && (
                <View className={"bg-green-500 h-10 px-3 rounded-full items-center justify-center"}>
                  <Text className={"font-bold"}>Send</Text>
                </View>
              )
            }
          </View>
          <View style={{
            height: insets.bottom,
          }}></View>
        </BlurView>
      </KeyboardAvoidingView>
    </View>
  );
};

export default memo(Page);
