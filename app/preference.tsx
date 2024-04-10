import {TextInput, View} from "react-native";
import {memo} from "react";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../store/store";
import {setPreference} from "../reducers/config/configSlice";

const Preference = () => {
  const { preference } = useSelector((state: RootState) => state.config);
  const dispatch = useDispatch();

  return (
    <View className={"flex h-full bg-[#121212] p-3 space-y-3"}>
      <TextInput
        value={preference}
        onChangeText={(text) => {
          dispatch(setPreference(text))
        }}
        className={"p-3 bg-white rounded h-[80%]"}
        multiline={true}
        numberOfLines={10}
        maxLength={512}
      />
    </View>
  )
}

export default memo(Preference)