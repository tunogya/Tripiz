import { Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRoute } from "@react-navigation/core";
import { useDispatch } from "react-redux";
import { updateCurrentPost } from "../reducers/ui/uiSlice";
import { memo } from "react";

const PostMoreButton = () => {
  const route = useRoute();
  const id = route.params?.["id"];
  const dispatch = useDispatch();

  return (
    <Pressable
      className={"w-10 h-10 items-center justify-center"}
      onPress={() => {
        dispatch(updateCurrentPost(id));
      }}
    >
      <Ionicons name="ellipsis-horizontal" size={24} color="white" />
    </Pressable>
  );
};

export default memo(PostMoreButton);
