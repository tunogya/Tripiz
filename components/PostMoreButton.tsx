import {Pressable} from "react-native";
import {Ionicons} from "@expo/vector-icons";
import {useRoute} from "@react-navigation/core";
import {useDispatch, useSelector} from "react-redux";
import {updateCurrentPost} from "../reducers/ui/uiSlice";
import {memo} from "react";
import {RootState} from "../store/store";

const PostMoreButton = () => {
  const route = useRoute();
  const id = route.params?.["id"];
  const dispatch = useDispatch();
  const { currentPost } = useSelector((state: RootState) => state.ui);

  if (currentPost) {
    return (
      <Pressable onPress={() => {
        dispatch(updateCurrentPost(""));
      }}>
        <Ionicons name="close" size={24} color="white" />
      </Pressable>
    )
  }

  return (
    <Pressable onPress={() => {
      dispatch(updateCurrentPost(id));
    }}>
      <Ionicons name="ellipsis-horizontal" size={24} color="white" />
    </Pressable>
  )
}

export default memo(PostMoreButton);