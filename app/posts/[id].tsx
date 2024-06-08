import {
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  Pressable,
  Dimensions,
  RefreshControl, TouchableOpacity,
} from "react-native";
import React, { memo, useEffect, useRef, useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { BlurView } from "expo-blur";
import { router, useLocalSearchParams } from "expo-router";
import useSWR from "swr";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import CommentShowItem from "../../components/CommentShowItem";
import { Ionicons } from "@expo/vector-icons";
import { t } from "../../i18n";
import PostMoreModal from "../../components/PostMoreModal";
import PostMoreButton from "../../components/PostMoreButton";
import { SwipeListView } from "react-native-swipe-list-view";
import CommentHiddenItem from "../../components/CommentHiddenItem";
import { Image } from "expo-image";
import { API_HOST_NAME } from "../../utils/const";
import { ensureString } from "../../utils/ensureString";
import { increaseVersion } from "../../reducers/ui/uiSlice";
import { LinearGradient } from "expo-linear-gradient";
import { finalizeEvent } from "nostr-tools";
import { Buffer } from "buffer";

const Page = () => {
  const { id } = useLocalSearchParams();
  const insets = useSafeAreaInsets();
  const screenWidth = Dimensions.get("window").width;
  const screenHeight = Dimensions.get("window").height;
  const [isFocused, setIsFocused] = useState(false);
  const [text, setText] = useState("");
  const [status, setStatus] = useState("idle");
  const { version } = useSelector((state: RootState) => state.ui);
  const { privateKey } = useSelector((state: RootState) => state.account);
  const [comments, setComments] = useState([]);
  const [isLoadingComments, setIsLoadingComments] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [nextSkip, setNextSkip] = useState<number | null>(0);
  const [hasNext, setHasNext] = useState(true);
  const dispatch = useDispatch();
  const [keyboardHeight, setKeyboardHeight] = useState(0);

  const {
    data,
    isLoading,
    mutate: fetchPost,
  } = useSWR(`${API_HOST_NAME}/posts/${id}`, (url: string) =>
    fetch(url, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((res) => res.data),
  );

  const fetchComments = async (skip: number) => {
    setIsLoadingComments(true);
    const result = await fetch(
      `${API_HOST_NAME}/posts/${id}/replies?skip=${skip}`,
      {
        method: "GET",
      },
    ).then((res) => res.json());
    setIsLoadingComments(false);

    if (skip === 0) {
      setComments(result.data);
    } else {
      setComments([...data, ...result.data]);
    }
    setHasNext(result.pagination.hasNext);
    setNextSkip(result.pagination.nextSkip);
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchComments(0);
    setRefreshing(false);
  };

  // fetch data when filter changed, or version changed
  useEffect(() => {
    setComments([]);
    setNextSkip(0);
    fetchComments(0);
  }, [version]);

  const newComment = async () => {
    try {
      setStatus("loading");
      const event = finalizeEvent(
        {
          kind: 1,
          created_at: Math.floor(Date.now() / 1000),
          tags: [["e", ensureString(id)]],
          content: text,
        },
        Buffer.from(privateKey, "hex"),
      );

      await fetch(`${API_HOST_NAME}/posts`, {
        method: "POST",
        body: JSON.stringify(event),
      }).then((res) => res.json());

      setText("");
      setStatus("success");
      setTimeout(() => {
        setStatus("idle");
        Keyboard.dismiss();
        dispatch(increaseVersion());
      }, 1_000);
    } catch (e) {
      setStatus("error");
      setTimeout(() => {
        setStatus("idle");
      }, 3_000);
    }
  };

  useEffect(() => {
    fetchPost();
    fetchComments(0);
    if (swipeListViewRef.current) {
      swipeListViewRef.current.closeAllOpenRows();
    }
  }, [version]);

  const scrollViewRef = useRef(null);
  const swipeListViewRef = useRef(null);

  const handleSwipeValueChange = (swipeData: any) => {
    const { value } = swipeData;
    if (scrollViewRef.current) {
      scrollViewRef.current.setNativeProps({
        scrollEnabled: Math.abs(value) <= 10,
      });
    }
  };

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      (event) => {
        setKeyboardHeight(event.endCoordinates.height);
      }
    );

    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardHeight(0);
      }
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  if (isLoading) {
    return (
      <View
        className={"flex flex-1 h-full bg-[#121212] relative"}
        style={{
          paddingTop: insets.top,
        }}
      >
        <View
          className={"flex flex-row h-12 items-center justify-between px-4"}
        >
          <Pressable
            hitSlop={4}
            onPress={() => {
              router.back();
            }}
          >
            <Ionicons name="chevron-back" size={24} color="white" />
          </Pressable>
          <PostMoreButton />
        </View>
        <ActivityIndicator size={"small"} color="#B3B3B3" />
      </View>
    );
  }

  return (
    <View className={"flex flex-1 h-full bg-[#121212] relative"}>
      <View
        className={
          "flex flex-row h-12 items-center justify-between px-4 absolute w-full z-50"
        }
        style={{
          top: insets.top,
        }}
      >
        <BlurView
          intensity={10}
          tint={"dark"}
          className={"rounded-full overflow-hidden"}
        >
          <Pressable
            hitSlop={4}
            onPress={() => {
              router.back();
            }}
            className={"w-10 h-10 items-center justify-center"}
          >
            <Ionicons name="chevron-back" size={24} color="white" />
          </Pressable>
        </BlurView>
        <BlurView
          intensity={10}
          tint={"dark"}
          className={"rounded-full overflow-hidden"}
        >
          <PostMoreButton />
        </BlurView>
      </View>
      <View style={{
        height: screenHeight - insets.bottom,
      }}>
        <ScrollView
          ref={scrollViewRef}
          showsVerticalScrollIndicator={false}
          className={"w-full"}
          style={{
            height: 400,
          }}
        >
          {screenWidth && data?.id && (
            <View
              className={"relative"}
              style={{
                width: screenWidth,
                height: screenWidth,
              }}
            >
              <Image
                style={{
                  width: screenWidth,
                  height: screenWidth,
                }}
                source={`${API_HOST_NAME}/autoglyphs?hash=0x${data.id}`}
                contentFit="cover"
                cachePolicy={"memory-disk"}
                transition={750}
              />
              <LinearGradient
                colors={["#12121200", "#121212"]}
                className={"h-24 absolute bottom-0 z-10 w-full"}
              />
            </View>
          )}
          <View className={"p-4"}>
            <Text className={"text-white font-medium text-[16px] leading-5"}>
              {data?.content}
            </Text>
            <Text className={"text-[#B3B3B3] text-xs font-medium mt-5"}>
              {new Date((data?.created_at || 0) * 1000)
                .toLocaleDateString()
                .replaceAll("/", "-")
                .replace(`${new Date().getFullYear()}-`, "")}
            </Text>
          </View>
          <View className={"px-4"}>
            <View className={"w-full border-b h-[1px] border-[#FFFFFF12]"}></View>
          </View>
          <View className={"py-3 space-y-3"}>
            <Text className={"text-white font-bold text-[16px] px-4"}>
              {t("Comments")}
            </Text>
            <SwipeListView
              ref={swipeListViewRef}
              data={comments}
              scrollEnabled={false}
              showsVerticalScrollIndicator={false}
              disableRightSwipe
              useAnimatedList={true}
              renderItem={({ item }: any) => <CommentShowItem item={item} />}
              renderHiddenItem={(rowData, rowMap) => (
                <CommentHiddenItem rowData={rowData} />
              )}
              refreshControl={
                <RefreshControl
                  refreshing={refreshing}
                  onRefresh={onRefresh}
                  colors={["#B3B3B3"]}
                  progressBackgroundColor="#121212"
                  tintColor="#B3B3B3"
                  title="Loading..."
                  titleColor="#B3B3B3"
                />
              }
              scrollEventThrottle={1000}
              onEndReached={async () => {
                if (hasNext) {
                  await fetchComments(nextSkip);
                }
              }}
              onEndReachedThreshold={0.3}
              ListEmptyComponent={() =>
                !isLoadingComments && (
                  <View className={"w-full px-4"}>
                    <Text className={"text-[#B3B3B3] text-xs"}>
                      {t("No comments")}
                    </Text>
                  </View>
                )
              }
              ListFooterComponent={() => (
                <View className={"p-4 my-4"}>
                  <TouchableOpacity className={"border border-[#FFFFFF12] rounded-full h-12 flex flex-row items-center space-x-3 justify-center"}>
                    <Ionicons name="sparkles-sharp" size={20} color="white" />
                    <Text className={"text-white font-medium"}>Generate comments</Text>
                  </TouchableOpacity>
                </View>
              )}
              stopLeftSwipe={0}
              stopRightSwipe={-100}
              leftOpenValue={0}
              rightOpenValue={-100}
              // @ts-ignore
              keyExtractor={(item, index) => index}
              onSwipeValueChange={handleSwipeValueChange}
            />
          </View>
          <View style={{ height: 400 }}></View>
        </ScrollView>
      </View>
      <KeyboardAvoidingView
        className={"absolute left-0 w-full z-50 bg-[#121212] border-t border-[#FFFFFF12]"}
        style={{
          bottom: insets.bottom,
        }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <View
          className={
            "px-4 h-16 flex justify-center items-center flex-row space-x-3"
          }
        >
          <TextInput
            value={text}
            placeholder={t("Talk something")}
            placeholderTextColor={"#B3B3B3"}
            autoFocus={false}
            className={
              "bg-[#2F2F2F] h-10 rounded-full px-4 text-white flex-1 text-[16px]"
            }
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            onChangeText={(text) => {
              setText(text);
            }}
          />
          {isFocused && (
            <Pressable
              disabled={status !== "idle"}
              className={
                "bg-green-500 h-10 px-4 rounded-full items-center justify-center"
              }
              onPress={newComment}
            >
              <Text className={"font-bold"}>
                {status === "idle" && t("Send")}
                {status === "success" && t("Success")}
                {status === "error" && t("Error")}
                {status === "loading" && t("Sending")}
              </Text>
            </Pressable>
          )}
        </View>
      </KeyboardAvoidingView>
      <PostMoreModal />
    </View>
  );
};

export default memo(Page);
