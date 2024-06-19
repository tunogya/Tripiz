import {
  View,
  Text,
  ScrollView,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  Dimensions,
  FlatList,
} from "react-native";
import React, { memo, useMemo, useRef, useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { BlurView } from "expo-blur";
import { router, useLocalSearchParams } from "expo-router";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import CommentShowItem from "../../components/CommentShowItem";
import { Ionicons } from "@expo/vector-icons";
import { t } from "../../i18n";
import PostMoreModal from "../../components/PostMoreModal";
import { Image } from "expo-image";
import { API_HOST_NAME } from "../../utils/const";
import { ensureString } from "../../utils/ensureString";
import { LinearGradient } from "expo-linear-gradient";
import { finalizeEvent } from "nostr-tools";
import Clipboard from "@react-native-clipboard/clipboard";
import { Buffer } from "buffer";
import { useObject, useQuery, useRealm } from "@realm/react";
import { Event } from "../Event";

const Page = () => {
  const { id } = useLocalSearchParams();
  const insets = useSafeAreaInsets();
  const screenWidth = Dimensions.get("window").width;
  const screenHeight = Dimensions.get("window").height;
  const [isFocused, setIsFocused] = useState(false);
  const [text, setText] = useState("");
  const { privateKey } = useSelector((state: RootState) => state.account);
  // const [comments, setComments] = useState([]);
  const [isLoadingComments, setIsLoadingComments] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const inputRef = useRef(undefined);
  const data = useObject(Event, id);
  const comments = useQuery(Event, (events) => {
    return events.filtered("kind == $0", 1).sorted("created_at", true);
  });
  const realm = useRealm();

  const filterComments = useMemo(() => {
    return comments.filter((item) => {
      const e = item.tags.find((tag: any[]) => tag?.[0] === "e")?.[1];
      return e === id;
    });
  }, [comments, id]);

  const newComment = async () => {
    try {
      let e = ensureString(id);
      const event = finalizeEvent(
        {
          kind: 1,
          created_at: Math.floor(Date.now() / 1000),
          tags: [
            ["e", e],
            ["category", "reflections"],
          ],
          content: text,
        },
        Buffer.from(privateKey, "hex"),
      );
      realm.write(() => {
        return new Event(realm, event);
      });
      setText("");
    } catch (e) {
      console.log(e);
    }
  };

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
          <Pressable
            className={"w-10 h-10 items-center justify-center"}
            onPress={() => {
              setShowModal(true);
            }}
          >
            <Ionicons name="ellipsis-horizontal" size={24} color="white" />
          </Pressable>
        </BlurView>
      </View>
      <View>
        <ScrollView
          showsVerticalScrollIndicator={false}
          className={"w-full"}
          style={{
            height: screenHeight - insets.bottom,
          }}
        >
          {screenWidth && (
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
          <View className={"px-2"}>
            <View
              className={"w-full border-b h-[1px] border-[#FFFFFF12]"}
            ></View>
          </View>
          <View className={"space-y-3"}>
            <FlatList
              data={filterComments}
              scrollEnabled={false}
              showsVerticalScrollIndicator={false}
              renderItem={({ item }: any) => (
                <CommentShowItem
                  item={item}
                  onPressCallback={() => {
                    if (inputRef) {
                      inputRef.current.focus();
                    }
                    // setReplyEvent(item);
                  }}
                />
              )}
              ListEmptyComponent={() =>
                !isLoadingComments && (
                  <View className={"w-full p-4"}>
                    <Text className={"text-[#B3B3B3] text-xs"}>
                      {t("No comments")}
                    </Text>
                  </View>
                )
              }
              // @ts-ignore
              keyExtractor={(item, index) => item.id}
            />
          </View>
          <View style={{ height: 400 }}></View>
        </ScrollView>
      </View>
      <KeyboardAvoidingView
        className={
          "absolute left-0 w-full z-50 bg-[#121212] border-t border-[#FFFFFF12]"
        }
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
            ref={inputRef}
            value={text}
            maxLength={12800}
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
              className={
                "bg-green-500 h-10 px-4 rounded-full items-center justify-center"
              }
              onPress={newComment}
            >
              <Text className={"font-bold"}>{t("Send")}</Text>
            </Pressable>
          )}
        </View>
      </KeyboardAvoidingView>
      {showModal && (
        <PostMoreModal
          post={data}
          onCopy={() => {
            if (data?.content) {
              Clipboard.setString(data?.content);
              setShowModal(false);
            }
          }}
          onClose={() => {
            setShowModal(false);
          }}
        />
      )}
    </View>
  );
};

export default memo(Page);
