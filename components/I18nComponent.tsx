import {useSelector} from "react-redux";
import {RootState} from "../store/store";
import {useEffect} from "react";
import {i18n} from "../i18n";

const I18nComponent = () => {
  const { locale } = useSelector((state: RootState) => state.config )

  useEffect(() => {
    i18n.locale = locale;
  }, [locale])

  return null
}

export default I18nComponent