import {
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  TextInput,
  KeyboardAvoidingView,
  Platform, Keyboard, Pressable, Dimensions
} from "react-native";
import React, {memo, useEffect, useRef, useState} from "react";
import {useSafeAreaInsets} from "react-native-safe-area-context";
import {BlurView} from "expo-blur";
import {router, useLocalSearchParams} from "expo-router";
import useSWR from "swr";
import {useSelector} from "react-redux";
import {RootState} from "../../store/store";
import CommentShowItem from "../../components/CommentShowItem";
import {Ionicons} from "@expo/vector-icons";
import {t} from "../../i18n";
import PostMoreModal from "../../components/PostMoreModal";
import PostMoreButton from "../../components/PostMoreButton";
import {SwipeListView} from "react-native-swipe-list-view";
import CommentHiddenItem from "../../components/CommentHiddenItem";
import * as Crypto from "expo-crypto";
import {SvgUri} from "react-native-svg";

const Page = () => {
  const {id} = useLocalSearchParams();
  const insets = useSafeAreaInsets();
  const screenWidth = Dimensions.get("window").width;
  const {address} = useSelector((state: RootState) => state.user);
  const [isFocused, setIsFocused] = useState(false);
  const [comment, setComment] = useState({
    text: "",
    category: "reflections",
    user: address,
  })
  const [status, setStatus] = useState("idle");
  const {version} = useSelector((state: RootState) => state.ui);

  const {data, isLoading, mutate} = useSWR(`https://tripiz.abandon.ai/api/posts/${id}`, (url: string) => fetch(url, {
      method: "GET",
      headers: {
        "Tripiz-User": address,
        "Tripiz-Signature": "Signature",
      }
    })
      .then((res) => res.json())
      .then((res) => res.data)
  );

  const [hash, setHash] = useState<string | undefined>(undefined);

  const getHash = async (data: string) => {
    const _hash = await Crypto.digestStringAsync(
      Crypto.CryptoDigestAlgorithm.SHA256,
      data,
    )
    setHash(`0x${_hash}`);
  }

  useEffect(() => {
    if (data && data?.text) {
      getHash(data?.text);
    }
  }, [data]);

  const {
    data: comments,
    isLoading: isCommentLoading,
    mutate: mutateComment
  } = useSWR(id ? `https://tripiz.abandon.ai/api/posts/${id}/replies` : undefined, (url: string) => fetch(url, {
      method: "GET",
      headers: {
        "Tripiz-User": address,
        "Tripiz-Signature": "Signature",
      }
    })
      .then((res) => res.json())
      .then((res) => res.data)
  );

  const newComment = async () => {
    try {
      setStatus("loading");
      await fetch(`https://tripiz.abandon.ai/api/posts`, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
          "Tripiz-User": address,
          "Tripiz-Signature": "Signature",
        },
        body: JSON.stringify({
          parent_post_id: id,
          text: comment.text,
          category: comment.category,
          user: comment.user,
        })
      }).then((res) => res.json());
      setComment({
        ...comment,
        text: "",
      });
      setStatus("success");
      setTimeout(() => {
        setStatus("idle");
        Keyboard.dismiss();
        mutateComment();
      }, 1_000)
    } catch (e) {
      setStatus("error");
      setTimeout(() => {
        setStatus("idle");
      }, 3_000)
    }
  }

  useEffect(() => {
    mutate();
    mutateComment();
    if (swipeListViewRef.current) {
      swipeListViewRef.current.closeAllOpenRows();
    }
  }, [version]);

  const scrollViewRef = useRef(null);
  const swipeListViewRef = useRef(null);

  const handleSwipeValueChange = (swipeData) => {
    const { value } = swipeData;
    if (scrollViewRef.current) {
      scrollViewRef.current.setNativeProps({ scrollEnabled: Math.abs(value) <= 10 });
    }
  };

  if (isLoading) {
    return (
      <View
        className={"flex flex-1 h-full bg-[#121212] relative"}
        style={{
          paddingTop: insets.top + 20,
        }}
      >
        <View className={"flex flex-row h-12 items-center justify-between px-4"}>
          <Pressable
            hitSlop={4}
            onPress={() => {
              router.back();
            }}
          >
            <Ionicons name="chevron-back" size={24} color="white"/>
          </Pressable>
          <PostMoreButton/>
        </View>
        <ActivityIndicator size={"small"} color="#B3B3B3"/>
      </View>
    )
  }

  return (
    <View
      className={"flex flex-1 h-full bg-[#121212] relative"}
      style={{
        paddingTop: insets.top + 20,
      }}
    >
      <View className={"flex flex-row h-12 items-center justify-between px-4"}>
        <Pressable
          hitSlop={4}
          onPress={() => {
            router.back();
          }}
        >
          <Ionicons name="chevron-back" size={24} color="white"/>
        </Pressable>
        <PostMoreButton/>
      </View>
      <ScrollView
        ref={scrollViewRef}
        className={"h-full w-full"}
      >
        {
          screenWidth && hash && (
            <View className={"bg-[#FFFFFF12]"}
              style={{
              width: screenWidth,
              height: screenWidth,
            }}>
              <SvgUri
              width={`${screenWidth}`}
              height={`${screenWidth}`}
              uri={`https://tripiz.abandon.ai/api/autoglyphs?hash=${hash}`}
            />
            </View>
          )
        }
        <View className={"p-4"}>
          <Text
            className={"text-white font-medium text-[16px] leading-5"}
          >
            {data.text}
          </Text>
          <Text className={"text-[#B3B3B3] text-xs font-medium mt-5"}>
            {new Date(data.updatedAt).toLocaleDateString().replaceAll('/', '-')}
          </Text>
        </View>
        <View className={"px-4"}>
          <View className={"w-full border-b h-[1px] border-[#FFFFFF12]"}>
          </View>
        </View>
        <View className={"py-3 space-y-3"}>
          <Text className={"text-white font-medium text-[16px] px-4"}>
            {t("Comments")}
          </Text>
          <SwipeListView
            ref={swipeListViewRef}
            data={comments}
            scrollEnabled={false}
            showsVerticalScrollIndicator={false}
            disableRightSwipe
            useAnimatedList={true}
            renderItem={({item}: any) => (
              <CommentShowItem item={item}/>
            )}
            renderHiddenItem={(rowData, rowMap) => (
              <CommentHiddenItem rowData={rowData}/>
            )}
            ListEmptyComponent={() => (
              !isCommentLoading && (
                <View className={"w-full px-4"}>
                  <Text className={"text-[#B3B3B3] text-xs"}>
                    {t("No comments")}
                  </Text>
                </View>
              )
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
        <View style={{paddingBottom: 200 + insets.bottom}}></View>
      </ScrollView>
      <KeyboardAvoidingView
        keyboardVerticalOffset={64}
        className={"absolute left-0 bottom-0 w-full z-50"}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <BlurView
          intensity={10}
          tint={"dark"}
          className={
            "flex w-full bg-[#121212]"
          }
        >
          <View className={"px-4 h-16 flex justify-center items-center flex-row space-x-3"}>
            <TextInput
              value={comment.text}
              placeholder={t("Talk something")}
              placeholderTextColor={"#B3B3B3"}
              autoFocus={false}
              className={"bg-[#2F2F2F] h-10 rounded-full px-4 text-white flex-1"}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              onChangeText={(text) => {
                setComment({
                  ...comment,
                  text: text,
                })
              }}
            />
            {
              isFocused && (
                <Pressable
                  disabled={status !== "idle"}
                  className={"bg-green-500 h-10 px-4 rounded-full items-center justify-center"}
                  onPress={newComment}
                >
                  <Text className={"font-bold"}>
                    {status === "idle" && t("Send")}
                    {status === "success" && t("Success")}
                    {status === "error" && t("Error")}
                    {status === "loading" && t("Sending")}
                  </Text>
                </Pressable>
              )
            }
          </View>
          <View style={{
            height: insets.bottom,
          }}></View>
        </BlurView>
      </KeyboardAvoidingView>
      <PostMoreModal/>
    </View>
  );
};

export default memo(Page);
