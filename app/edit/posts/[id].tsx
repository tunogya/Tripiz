import {
  View,
  Text,
  Pressable,
  TextInput,
  ScrollView,
} from "react-native";
import {memo, useEffect, useState} from "react";
import {router, useLocalSearchParams} from "expo-router";
import {ensureString} from "../../../utils/ensureString";
import useSWR from "swr";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../store/store";
import {increaseVersion} from "../../../reducers/ui/uiSlice";
import {Ionicons} from "@expo/vector-icons";

const Page = () => {
  const { id, category } = useLocalSearchParams();
  const { address, publicKey, privateKey } = useSelector((state: RootState) => state.user);
  const [ post, setPost ] = useState({
    text: "",
    entities: {},
    category: ensureString(category) || "reflections"
  })
  const [status, setStatus] = useState("idle");
  const dispatch = useDispatch();

  const { data } = useSWR(id !== "new" ? `https://tripiz.abandon.ai/api/posts/${id}` : undefined, (url: string) => fetch(url).then((res) => res.json()));

  useEffect(() => {
    if (data) {
      console.log(data)
    }
  }, [data])

  const save = async () => {
    setStatus("loading");
    try {
      if (ensureString(id) === "new") {
        await fetch(`https://tripiz.abandon.ai/api/posts/`, {
          method: "POST",
          body: JSON.stringify({
            text: post.text,
            entities: post.entities,
            category: post.category,
            user: address,
          })
        }).then((res) => res.json());
        // send signal to mutate api
        dispatch(increaseVersion());
      } else {
        await fetch(`https://tripiz.abandon.ai/api/posts/${ensureString(id)}`, {
          method: "PUT",
          body: JSON.stringify({
            text: post.text,
            entities: post.entities,
          })
        }).then((res) => res.json());
      }
      setStatus("success")
      setTimeout(() => {
        router.back();
        setStatus("idle")
      }, 500)
    } catch (e) {
      setStatus("error")
      setTimeout(() => {
        setStatus("idle")
      }, 3000)
    }
  }

  return (
    <View className={"bg-[#121212] flex flex-1"}>
      <View className={"flex justify-center items-center pt-2"}>
        <View className={"w-10 h-1 bg-[#B3B3B3] rounded-full"}></View>
      </View>
      <View className={"flex-row justify-between p-3 items-center"}>
        <View></View>
        <Pressable
          disabled={status !== "idle"}
          className={`rounded-full items-center justify-center flex flex-row space-x-1`}
          onPress={save}
        >
          <Text className={"font-bold text-white"}>
            { status === "idle" && "Post" }
            { status === "error" && "Error" }
            { status === "success" && "Success" }
            { status === "loading" && "Waiting" }
          </Text>
        </Pressable>
      </View>
      <View className={"px-4 pb-4"}>
        <ScrollView
          horizontal
          className={"flex flex-row"}
          showsHorizontalScrollIndicator={false}
        >
          <View className={"h-10 w-10 rounded border-2 border-[#B3B3B3] flex items-center justify-center"}>
            <Ionicons name="add" size={24} color="white" />
          </View>
        </ScrollView>
      </View>
      <View className={"px-4 flex-1"}>
        <TextInput
          multiline
          numberOfLines={5}
          placeholder="Content"
          placeholderTextColor={"#B3B3B3"}
          className={"text-white py-3 flex-1"}
          value={post.text}
          onChangeText={(text) => {
            setPost({
              ...post,
              text: text,
            })
          }}
        />
      </View>
    </View>
  );
};

export default memo(Page);
