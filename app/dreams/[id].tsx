import { View, Text, ScrollView, Pressable, Image } from "react-native";
import React, {memo, useEffect} from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Feather, Ionicons } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import { router, useLocalSearchParams } from "expo-router";
import { Dimensions } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { ensureString } from "../../utils/ensureString";
import { updateOneDream } from "../../reducers/dreams/dreamSlice";
import { LinearGradient } from "expo-linear-gradient";
import fetch from "node-fetch";

const Page = () => {
  const { id } = useLocalSearchParams();
  const insets = useSafeAreaInsets();
  const screenWidth = Dimensions.get("window").width;
  const { entities } = useSelector((state: RootState) => state.dream);
  const dispatch = useDispatch();
  const item = id ? entities?.[ensureString(id)] : null;

  const paraphrase = async (item: any) => {
    const data = await fetch(`https://tripiz.abandon.ai/api/chat/completions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        "model": "gpt-4o",
        "messages": [
          {
            "role": "system",
            "content": "你是一个写作大师，当你收到用户的文字时，你需要将用户的话使用更艺术的形式进行修饰回复，记得使用用户原本的语言，不要试图和用户直接交谈，不要参杂其他的信息。"
          },
          {
            "role": "user",
            "content": item.description,
          }
        ],
        "temperature": 1,
        "top_p": 1,
        "n": 1,
        "stream": false,
      })
    })
      .then((res) => res.json());
    if (data?.id) {
      dispatch(updateOneDream({
        id: item.id,
        changes: {
          paraphrase: data?.id,
        }
      }))
    }
  }

  const poll = async (item: any) => {
    if (item.paraphrase === "" || item.choices.length > 0) {
      return;
    }
    const data = await fetch(`https://tripiz.abandon.ai/api/poll?id=${item.paraphrase}`)
      .then((res) => res.json());
    if (data?.id) {
      dispatch(updateOneDream({
        id: item.id,
        changes: {
          choices: data?.choices.map((item: any) => item.message.content),
        }
      }))
    }
  }

  useEffect(() => {
    if (!item.paraphrase || item.choices.length > 0) {
      return
    }
    const interval = setInterval(() => {
      poll(item);
    }, 3000);
    return () => clearInterval(interval);
  }, [item.paraphrase, item.choices]);

  useEffect(() => {
    if (item.paraphrase === "") {
      paraphrase(item);
    }
  }, [item.paraphrase]);

  return (
    <View className={"flex flex-1 h-full bg-[#121212] relative"}>
      <Pressable
        className={"absolute left-4 z-50 rounded-full overflow-hidden"}
        style={{
          top: insets.top,
        }}
        onPress={() => router.back()}
      >
        <BlurView
          intensity={20}
          tint={"dark"}
          className={"items-center justify-center w-8 h-8"}
        >
          <Ionicons name="chevron-back-sharp" size={20} color="white" />
        </BlurView>
      </Pressable>
      <View
        className={"w-full absolute top-0 left-0 z-0"}
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
      <ScrollView className={"h-full w-full absolute top-0 left-0 z-10"}>
        <View
          className={"justify-end"}
          style={{
            height: screenWidth * 0.99,
          }}
        >
          <LinearGradient colors={["transparent", "rgba(18,18,18,0.8)"]}>
            <Text className={"text-white text-5xl font-bold p-4"}>
              {item.title}
            </Text>
          </LinearGradient>
        </View>
        <View className={"h-full bg-[#121212]"}>
          <View className={"p-4 space-y-4"}>
            <View className={"flex flex-row justify-between"}>
              <View className={"flex flex-row space-x-2 items-center"}>
                <View
                  className={
                    "bg-green-500 h-5 w-5 rounded-full items-center justify-center"
                  }
                >
                  <Ionicons name="moon-sharp" size={16} color="#121212" />
                </View>
                <Text className={"text-white font-bold"}>Dream</Text>
              </View>
              <Text className={"text-[#B3B3B3] font-medium"}>
                {item.rate} Star · {new Date(item.date).toLocaleDateString()}
              </Text>
            </View>
            <Text className={"text-[#B3B3B3] font-medium"}>
              {item.description}
            </Text>
          </View>
          {
            item.choices.length > 0 && (
              <View className={"space-y-2 rounded-lg m-4"}>
                <Text className={"text-white font-semibold"}>优化建议</Text>
                {
                  item.choices.map((content: string, index) => (
                    <Pressable
                      key={index}
                      className={"p-3 bg-yellow-900 rounded-lg"}
                      onPress={() => {
                        dispatch(updateOneDream({
                          id: item.id,
                          changes: {
                            description: content,
                            choices: [],
                          }
                        }))
                      }}
                    >
                      <Text className={"text-white font-semibold"}>{content}</Text>
                    </Pressable>
                  ))
                }
              </View>
            )
          }
          <View
            style={{
              height: insets.bottom + 200,
            }}
          ></View>
        </View>
      </ScrollView>
      <BlurView
        intensity={100}
        tint={"dark"}
        className={
          "flex flex-row items-center justify-between px-4 py-2 w-full absolute left-0 bottom-0 bg-[#121212] z-50"
        }
        style={{
          paddingBottom: insets.bottom,
        }}
      >
        <View className={"flex flex-row items-center space-x-6"}>
          <Pressable
            className={"w-8 h-10 border-2 border-[#B3B3B3] rounded"}
          ></Pressable>
          <Pressable
            className={"h-6 w-6 rounded-full items-center justify-center"}
            onPress={() => {
              dispatch(
                updateOneDream({
                  id: item.id,
                  changes: {
                    favoured: !item.favoured,
                  },
                }),
              );
            }}
          >
            {item.favoured ? (
              <Ionicons
                name="checkmark-circle-sharp"
                size={26}
                color="rgb(34,197,94)"
              />
            ) : (
              <Ionicons name="add-circle-outline" size={26} color="#B3B3B3" />
            )}
          </Pressable>
          <Pressable
            className={"h-6 w-6 rounded-full items-center justify-center"}
          >
            <Ionicons name="ellipsis-horizontal" size={20} color="#B3B3B3" />
          </Pressable>
        </View>
        <View className={"flex flex-row items-center space-x-4"}>
          <Pressable
            className={
              "bg-green-500 h-12 w-12 rounded-full items-center justify-center"
            }
            onPress={() => {
              router.navigate(`edit/dreams/${item.id}`);
            }}
          >
            <Feather name="edit" size={24} color="#121212" />
          </Pressable>
        </View>
      </BlurView>
    </View>
  );
};

export default memo(Page);
