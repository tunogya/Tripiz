import {
  View,
  Text,
  Pressable,
  TextInput,
} from "react-native";
import {memo, useEffect, useState} from "react";
import {router, useLocalSearchParams} from "expo-router";
import {ensureString} from "../../../utils/ensureString";
import useSWR from "swr";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../store/store";
import {increaseVersion} from "../../../reducers/ui/uiSlice";
import {t} from "../../../i18n";
import {ethers} from "ethers";

const Page = () => {
  const {id, category} = useLocalSearchParams();
  const {address, privateKey} = useSelector((state: RootState) => state.user);
  const [post, setPost] = useState({
    text: "",
    category: ensureString(category) || "reflections"
  })
  const [status, setStatus] = useState("idle");
  const dispatch = useDispatch();
  const [updated, setUpdated] = useState(false);

  const wallet = new ethers.Wallet(privateKey);

  const {data} = useSWR(id !== "new" ? `https://tripiz.abandon.ai/api/posts/${id}` : undefined, (url: string) => fetch(url, {
    method: "GET",
    headers: {
      "Tripiz-User": address,
      "Tripiz-Signature": wallet.signMessageSync(address),
    }
  }).then((res) => res.json()).then((res) => res.data));

  useEffect(() => {
    if (data && !updated) {
      setUpdated(true);
      setPost({
        ...post,
        text: data.text,
      })
    }
  }, [data, updated])

  const save = async () => {
    setStatus("loading");
    const sig = wallet.signMessageSync(post.text);
    try {
      if (ensureString(id) === "new") {
        await fetch(`https://tripiz.abandon.ai/api/posts/`, {
          method: "POST",
          headers: {
            "Tripiz-User": address,
            "Tripiz-Signature": sig,
          },
          body: JSON.stringify({
            text: post.text,
            category: post.category,
            user: address,
            signature: sig,
          })
        })
      } else {
        await fetch(`https://tripiz.abandon.ai/api/posts/${ensureString(id)}`, {
          method: "PUT",
          headers: {
            "Tripiz-User": address,
            "Tripiz-Signature": sig,
          },
          body: JSON.stringify({
            text: post.text,
            signature: sig,
          })
        })
      }
      dispatch(increaseVersion());
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
            {status === "idle" && "Post"}
            {status === "error" && "Error"}
            {status === "success" && "Success"}
            {status === "loading" && "Waiting"}
          </Text>
        </Pressable>
      </View>
      <View className={"px-4 flex-1"}>
        <TextInput
          multiline
          numberOfLines={5}
          placeholder={t("Content")}
          placeholderTextColor={"#B3B3B3"}
          className={"text-white text-[16px] py-3 flex-1"}
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
