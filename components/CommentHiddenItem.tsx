import {Pressable, Text, View} from "react-native";
import React, {FC, memo, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../store/store";
import {ethers} from "ethers";
import {increaseVersion} from "../reducers/ui/uiSlice";
import {RowMap} from "react-native-swipe-list-view";

const CommentHiddenItem: FC<{
  item: {
    _id: string,
    key: string,
  },
  rowMap: RowMap<unknown>,
}> = ({item, rowMap}) => {
  const [status, setStatue] = useState("idle");
  const {address, privateKey} = useSelector((state: RootState) => state.user);
  const wallet = new ethers.Wallet(privateKey);
  const dispatch = useDispatch();

  const deleteComment = async () => {
    try {
      setStatue("loading");
      await fetch(`https://tripiz.abandon.ai/api/posts/${item._id}`, {
        method: "DELETE",
        headers: {
          "Tripiz-User": address,
          "Tripiz-Signature": wallet.signMessageSync(address),
        }
      })
      dispatch(increaseVersion());
      rowMap[item.key].closeRow()
      setStatue("success");
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
          Delete
        </Text>
      </Pressable>
    </View>
  )
}

export default memo(CommentHiddenItem)