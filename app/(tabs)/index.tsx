import { View, ScrollView } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { memo, useState } from "react";
import AddDreamButton from "../../components/AddButton";
import { useDispatch } from "react-redux";
import { updateValue } from "../../reducers/ui/uiSlice";

function Page() {
  const insets = useSafeAreaInsets();
  const dispatch = useDispatch();

  const [lastScrollPosition, setLastScrollPosition] = useState(0);

  const handleScroll = (event: any) => {
    const currentScrollPosition = event.nativeEvent.contentOffset.y;

    if (currentScrollPosition > lastScrollPosition) {
      dispatch(
        updateValue({
          scroll2Down: false,
        }),
      );
    } else {
      dispatch(
        updateValue({
          scroll2Down: true,
        }),
      );
    }
    setLastScrollPosition(currentScrollPosition);
  };

  return (
    <View className={"flex flex-1 bg-[#121212]"}>
      <ScrollView
        onScroll={handleScroll}
        scrollEventThrottle={1000}
        showsVerticalScrollIndicator={false}
        style={{
          paddingTop: insets.top + 20,
          paddingBottom: insets.bottom + 66,
        }}
      >
      </ScrollView>
      <AddDreamButton />
    </View>
  );
}

export default memo(Page);
