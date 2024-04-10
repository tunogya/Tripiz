import { I18n, TranslateOptions } from "i18n-js";
import { getLocales } from "expo-localization";
import { en } from "./en";
import { zh } from "./zh";

export const i18n = new I18n({ en, zh });

const locale = getLocales()[0].languageCode;
i18n.locale = locale;

export const t = (key: string, option?: TranslateOptions) =>
  i18n.t(key, option);
