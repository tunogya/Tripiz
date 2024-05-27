import { Image } from "react-native";
import { FC, memo } from "react"
import {useSelector} from "react-redux";
import {RootState} from "../store/store";

const Avatar: FC<{
  classname?: string,
}> = ({classname }) => {
  const { avatar } = useSelector((state: RootState) => state.ui);

  return (
    <Image
      resizeMode={"stretch"}
      source={{
        uri: `https://www.larvalabs.com/cryptopunks/cryptopunk${(avatar || 0)?.toString().padStart(4, '0')}.png`
      }}
      className={classname ? classname : "w-10 h-10 rounded-full bg-gray-400"}
    />
  );
};

export default memo(Avatar);