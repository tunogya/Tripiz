import {Pressable, Text, View} from "react-native";
import {useSafeAreaInsets} from "react-native-safe-area-context";
import {memo} from "react";
import AddDreamButton from "../../components/AddButton";
import {useSelector} from "react-redux";
import {RootState} from "../../store/store";
import Avatar from "../../components/Avatar";
import {router} from "expo-router";
import Feed from "../../components/Feed";
import {FlashList} from "@shopify/flash-list";

function Page() {
  const insets = useSafeAreaInsets();

  const {address} = useSelector((state: RootState) => state.user);

  return (
    <View
      className={"flex flex-1 h-full bg-[#121212]"}
    >
      <View
        style={{
          paddingTop: insets.top + 20,
        }}
      >
        <View className={"p-4 flex flex-row items-center space-x-3"}>
          <Pressable
            onPress={() => {
              router.navigate(`account`);
            }}
          >
            <Avatar/>
          </Pressable>
          <Text className={"text-white font-bold text-2xl"}>
            {address.slice(0, 7)}...{address.slice(-5)}
          </Text>
        </View>
      </View>
      <View className={"flex-1 px-4"}>
        <FlashList
          data={[{
            _id: "0",
            text: "简介: 影片为庆祝哥斯拉诞生70周年的纪念作品，也是东宝第30部哥斯拉大作。故事设定在二战后的日本，哥斯拉的出现仿佛要给已经变得一无所有（归0）的日本再添一击，将这个国家打到负值（负1.0）。",
            category: "reflection",
            entities: {
              media: [
                {
                  id: "0000",
                  url: "https://www.larvalabs.com/cryptopunks/cryptopunk0000.png",
                  media_url: "https://www.larvalabs.com/cryptopunks/cryptopunk0000.png",
                  media_url_https: "https://www.larvalabs.com/cryptopunks/cryptopunk0000.png",
                  type: "photo",
                },
                {
                  id: "0001",
                  url: "https://www.larvalabs.com/cryptopunks/cryptopunk0001.png",
                  media_url: "https://www.larvalabs.com/cryptopunks/cryptopunk0001.png",
                  media_url_https: "https://www.larvalabs.com/cryptopunks/cryptopunk0001.png",
                  type: "photo",
                },
                {
                  id: "0002",
                  url: "https://www.larvalabs.com/cryptopunks/cryptopunk0002.png",
                  media_url: "https://www.larvalabs.com/cryptopunks/cryptopunk0002.png",
                  media_url_https: "https://www.larvalabs.com/cryptopunks/cryptopunk0002.png",
                  type: "photo",
                },
                {
                  id: "0003",
                  url: "https://www.larvalabs.com/cryptopunks/cryptopunk0003.png",
                  media_url: "https://www.larvalabs.com/cryptopunks/cryptopunk0003.png",
                  media_url_https: "https://www.larvalabs.com/cryptopunks/cryptopunk0003.png",
                  type: "photo",
                },
              ]
            }
          }]}
          showsVerticalScrollIndicator={false}
          estimatedItemSize={10}
          ListEmptyComponent={() => (
            <Text className={"text-[#B3B3B3] px-4 text-xs"}>404</Text>
          )}
          ListFooterComponent={() => (
            <View
              style={{
                height: insets.bottom + 80,
              }}
            ></View>
          )}
          renderItem={({item}) => (
            <Feed item={item}/>
          )}
        />
      </View>
      <AddDreamButton/>
    </View>
  );
}

export default memo(Page);
