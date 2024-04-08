import {View, Text} from "react-native";
import {FC, memo} from "react";

const ShoppingItem: FC<{
  id: string
}> = ({ id }) => {

  return (
    <View>
      <Text>{id}</Text>
    </View>
  )
}

export default memo(ShoppingItem)