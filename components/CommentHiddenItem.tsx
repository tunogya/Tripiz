import {Pressable, Text, View} from "react-native";
import React, {FC, memo, useState} from "react";
import {useDispatch} from "react-redux";
import {increaseVersion} from "../reducers/ui/uiSlice";
import {API_HOST_NAME} from "../utils/const";

const CommentHiddenItem: FC<{
  rowData: any,
}> = ({rowData}) => {
  const [status, setStatue] = useState("idle");
  const dispatch = useDispatch();

  const deleteComment = async () => {
    try {
      setStatue("loading");
      await fetch(`${API_HOST_NAME}/posts/${rowData.item._id}`, {
        method: "DELETE",
      })
      dispatch(increaseVersion());
      setStatue("success");
      setTimeout(() => {
        setStatue("idle");
      }, 1_000)
    } catch (e) {
      setStatue("error");
      setTimeout(() => {
        setStatue("idle");
      }, 3_000)
      console.log(e)
    }
  }

  return (
    <View className={"h-full w-full flex flex-row items-center"}>
      <View className={"w-10 h-full bg-[#121212]"}></View>
      <Pressable
        disabled={status !== "idle"}
        className={"bg-red-500 h-full flex-1 justify-end flex flex-row items-center"}
        onPress={deleteComment}
      >
        <Text className={"w-[100px] text-center font-bold text-white"}>
          { status === "loading" && "Waiting" }
          { status === "idle" && "Delete" }
          { status === "success" && "Success" }
          { status === "error" && "Error" }
        </Text>
      </Pressable>
    </View>
  )
}

export default memo(CommentHiddenItem)