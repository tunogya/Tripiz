import {
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  TextInput,
  KeyboardAvoidingView,
  Platform, Keyboard, Pressable, FlatList, Image, Dimensions
} from "react-native";
import React, {memo, useEffect, useState} from "react";
import {useSafeAreaInsets} from "react-native-safe-area-context";
import {BlurView} from "expo-blur";
import {useLocalSearchParams} from "expo-router";
import useSWR from "swr";
import {useSelector} from "react-redux";
import {RootState} from "../../store/store";
import CommentShowItem from "../../components/CommentShowItem";
import {Ionicons} from "@expo/vector-icons";
import {t} from "../../i18n";
import PostMoreModal from "../../components/PostMoreModal";

const Page = () => {
  const {id} = useLocalSearchParams();
  const insets = useSafeAreaInsets();
  const screenWidth = Dimensions.get("window").width;
  const {address} = useSelector((state: RootState) => state.user);
  const [isFocused, setIsFocused] = useState(false);
  const [comment, setComment] = useState({
    text: "",
    entities: {},
    category: "reflections",
    user: address,
  })
  const [status, setStatus] = useState("idle");
  const [index, setIndex] = useState(0);
  const { version} = useSelector((state: RootState) => state.ui);

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

  useEffect(() => {
    mutate();
  }, [version]);

  const {
    data: comments,
    isLoading: isCommentLoading,
    mutate: mutateComment
  } = useSWR(`https://tripiz.abandon.ai/api/posts/${id}/replies`, (url: string) => fetch(url, {
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
          entities: comment.entities,
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

  if (isLoading) {
    return (
      <View
        className={"flex flex-1 h-full bg-[#121212] relative"}
      >
        <ActivityIndicator size={"small"} color="#B3B3B3"/>
      </View>
    )
  }

  return (
    <View
      className={"flex flex-1 h-full bg-[#121212] relative"}
    >
      <ScrollView
        className={"h-full w-full"}
      >
        {/*{*/}
        {/*  data.entities && data.entities?.media?.length > 0 && (*/}
        {/*    <View*/}
        {/*      className={"w-full relative"}*/}
        {/*      style={{*/}
        {/*        width: screenWidth,*/}
        {/*        height: screenWidth * 0.99,*/}
        {/*      }}*/}
        {/*    >*/}
        {/*      <View className={"absolute w-full h-full justify-center items-center z-50"}>*/}
        {/*        {*/}
        {/*          data.entities?.media?.length > 1 && (*/}
        {/*            <View className={"w-full flex flex-row justify-between items-center px-4"}>*/}
        {/*              <Pressable*/}
        {/*                className={"w-10 h-10 rounded-full relative overflow-hidden"}*/}
        {/*                onPress={() => {*/}
        {/*                  setIndex((index - 1 + data.entities?.media?.length) % data.entities?.media?.length);*/}
        {/*                }}*/}
        {/*              >*/}
        {/*                <BlurView*/}
        {/*                  intensity={20}*/}
        {/*                  tint={"dark"}*/}
        {/*                  style={{*/}
        {/*                    position: "absolute",*/}
        {/*                    left: 0,*/}
        {/*                    bottom: 0,*/}
        {/*                    right: 0,*/}
        {/*                    top: 0,*/}
        {/*                  }}*/}
        {/*                  className={"items-center justify-center"}*/}
        {/*                >*/}
        {/*                  <Ionicons name="chevron-back" size={24} color="white"/>*/}
        {/*                </BlurView>*/}
        {/*              </Pressable>*/}
        {/*              <Pressable*/}
        {/*                className={"w-10 h-10 rounded-full relative overflow-hidden"}*/}
        {/*                onPress={() => {*/}
        {/*                  setIndex((index + 1 + data.entities?.media?.length) % data.entities?.media?.length);*/}
        {/*                }}*/}
        {/*              >*/}
        {/*                <BlurView*/}
        {/*                  intensity={20}*/}
        {/*                  tint={"dark"}*/}
        {/*                  style={{*/}
        {/*                    position: "absolute",*/}
        {/*                    left: 0,*/}
        {/*                    bottom: 0,*/}
        {/*                    right: 0,*/}
        {/*                    top: 0,*/}
        {/*                  }}*/}
        {/*                  className={"items-center justify-center"}*/}
        {/*                >*/}
        {/*                  <Ionicons name="chevron-forward" size={24} color="white"/>*/}
        {/*                </BlurView>*/}
        {/*              </Pressable>*/}
        {/*            </View>*/}
        {/*          )*/}
        {/*        }*/}
        {/*      </View>*/}
        {/*      <Image*/}
        {/*        className={"w-full h-full"}*/}
        {/*        resizeMode={"cover"}*/}
        {/*        source={{*/}
        {/*          uri: data.entities?.media?.[index]?.media_url_https,*/}
        {/*        }}*/}
        {/*      />*/}
        {/*    </View>*/}
        {/*  )*/}
        {/*}*/}
        <View className={"p-4"}>
          <Text
            className={"text-white font-medium leading-5"}
          >
            {data.text}
          </Text>
          <Text className={"text-[#B3B3B3] text-xs font-medium mt-3"}>
            {new Date(data.updatedAt).toLocaleDateString().replaceAll('/', '-')}
          </Text>
        </View>
        <View className={"px-4"}>
          <View className={"w-full border-b mt-6 p-1.5 h-[1px] border-[#2F2F2F]"}></View>
        </View>
        <View className={"py-3 space-y-3"}>
          <Text className={"text-white font-bold text-2xl px-4"}>
            {t("Comments")}
          </Text>
          <FlatList
            scrollEnabled={false}
            data={comments}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={() => (
              !isCommentLoading && (
                <View className={"w-full px-4"}>
                  <Text className={"text-[#B3B3B3] text-xs"}>
                    {t("No comments")}
                  </Text>
                </View>
              )
            )}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item}: any) => (
              <CommentShowItem item={item}/>
            )}
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
      <PostMoreModal />
    </View>
  );
};

export default memo(Page);
