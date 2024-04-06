import { FC, memo } from "react";
import FastImage from "react-native-fast-image";
import { View } from "react-native";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

const UserAvatar: FC<{
  size: number;
}> = ({ size }) => {
  const { user } = useSelector((state: RootState) => state.user);

  if (user?.picture) {
    return (
      /*@ts-ignore*/
      <FastImage
        style={{ width: size, height: size, borderRadius: size / 2 }}
        source={{
          uri: user.picture,
          priority: FastImage.priority.high,
        }}
        resizeMode={FastImage.resizeMode.contain}
      />
    );
  } else {
    return (
      <View
        // @ts-ignore
        className={"rounded-full bg-gray-200"}
        style={{ width: size, height: size }}
      />
    );
  }
};

export default memo(UserAvatar);
