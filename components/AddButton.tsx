import { Pressable, View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { memo, useEffect, useState } from "react";
import { router } from "expo-router";
import { BlurView } from "expo-blur";
import { useNavigationState } from "@react-navigation/core";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import uuid from "react-native-uuid";
import { addOneDream } from "../reducers/dreams/dreamSlice";
import { addOneReflection } from "../reducers/reflections/reflectionSlice";
import { addOneMemory } from "../reducers/memories/memorySlice";

const AddButton = () => {
  const insets = useSafeAreaInsets();
  const [openMore, setOpenMore] = useState(false);
  const route = useNavigationState((state) => state.routes[state.index]);
  const { scroll } = useSelector((state: RootState) => state.ui);
  const dispatch = useDispatch();

  useEffect(() => {
    setOpenMore(false);
  }, [route.path]);

  const normalView = () => (
    <View
      className={
        "absolute flex flex-row items-center bg-white rounded-full shadow"
      }
      style={{
        right: 20,
        bottom: insets.bottom + 66,
      }}
    >
      <Pressable
        onPress={() => {
          const id = uuid.v4().toString();
          dispatch(
            addOneDream({
              id: id,
              title: "",
              description: "",
              date: new Date().getTime(),
              rate: 3,
            }),
          );
          router.navigate(`edit/dreams/${id}`);
        }}
        className={
          "items-center justify-center flex flex-row h-12 pl-4 pr-3 space-x-3"
        }
      >
        <Ionicons name="moon-outline" size={24} color="#121212" />
        {!scroll && <Text className={"font-semibold text-lg"}>New dream</Text>}
      </Pressable>
      <View className={"bg-[#121212] w-0.5 h-8 opacity-20"}></View>
      <Pressable
        className={
          "items-center justify-center flex flex-row h-12 pl-3 pr-4 space-x-1"
        }
        onPress={() => {
          setOpenMore(true);
        }}
      >
        <Ionicons name="chevron-up" size={24} color="#121212" />
      </Pressable>
    </View>
  );

  const openMoreView = () => (
    <View className={"absolute w-full h-full"}>
      <BlurView intensity={100} tint="dark">
        <View className={"relative w-full h-full"}>
          <Pressable
            onPress={() => {
              setOpenMore(false);
            }}
            className={"absolute w-full h-full"}
          ></Pressable>
          <View
            className={"absolute flex items-end space-y-3"}
            style={{
              right: 20,
              bottom: insets.bottom + 66,
            }}
          >
            <Pressable
              className={"flex flex-row space-x-6 items-center"}
              onPress={() => {
                setOpenMore(false);
                const id = uuid.v4().toString();
                dispatch(
                  addOneReflection({
                    id: id,
                    title: "",
                    description: "",
                    date: new Date().getTime(),
                  }),
                );
                router.push(`edit/reflections/${id}`);
              }}
            >
              <Text className={"text-white text-lg font-semibold"}>
                New reflection
              </Text>
              <View className={"bg-[#242424] p-2 rounded-full mx-1"}>
                <Ionicons name="flash-outline" size={24} color="white" />
              </View>
            </Pressable>
            <Pressable
              className={"flex flex-row space-x-6 items-center"}
              onPress={() => {
                setOpenMore(false);
                const id = uuid.v4().toString();
                dispatch(
                  addOneMemory({
                    id: id,
                    title: "",
                    description: "",
                    date: new Date().getTime(),
                    rate: 3,
                  }),
                );
                router.push(`edit/memories/${id}`);
              }}
            >
              <Text className={"text-white text-lg font-semibold"}>
                New memory
              </Text>
              <View className={"bg-[#242424] p-2 rounded-full mx-1"}>
                <Ionicons name="sunny-outline" size={24} color="white" />
              </View>
            </Pressable>
            <Pressable
              className={"flex flex-row space-x-6 items-center h-12"}
              onPress={() => {
                setOpenMore(false);
                const id = uuid.v4().toString();
                dispatch(
                  addOneDream({
                    id: id,
                    title: "",
                    description: "",
                    date: new Date().getTime(),
                    rate: 3,
                  }),
                );
                router.push(`edit/dreams/${id}`);
              }}
            >
              <Text className={"text-white text-lg font-semibold"}>
                New dream
              </Text>
              <View
                className={
                  "bg-white h-12 w-12 rounded-full flex items-center justify-center"
                }
              >
                <Ionicons name="moon-outline" size={24} color="black" />
              </View>
            </Pressable>
          </View>
        </View>
      </BlurView>
    </View>
  );

  if (openMore) {
    return openMoreView();
  } else {
    return normalView();
  }
};

export default memo(AddButton);
