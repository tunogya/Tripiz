import {ScrollView, Text, View} from "react-native";
import {memo, useEffect, useState} from "react";
import {useRealm} from "@realm/react";
import fs from 'react-native-fs';

const Page = () => {
  const realm = useRealm();
  const [size, setSize] = useState(0);

  useEffect(() => {
    fs.stat(realm.path)
      .then((stats) => {
        setSize(stats.size)
      })
      .catch((err) => {
        console.error('Error getting file size:', err);
      });
  }, []);

  return (
    <ScrollView className={"bg-[#121212] flex flex-1"}>
      <View
        className={"px-4 py-2 flex flex-row justify-between items-center"}>
        <Text className={"text-white font-medium"}>
          Used
        </Text>
        <Text className={"text-[#B3B3B3] text-xs"}>
          {parseFloat((size / 1024 / 1024).toFixed(3))} MB
        </Text>
      </View>
    </ScrollView>
  )
}

export default memo(Page)