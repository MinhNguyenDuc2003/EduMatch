import translationEn from "@/assets/locales/en/translation.json";
import translationVi from "@/assets/locales/vi/translation.json";
import AsyncStorage from "@react-native-async-storage/async-storage";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { NativeModules, Platform } from "react-native";

const resources = {
  en: { translation: translationEn },
  vi: { translation: translationVi },
};

const getDeviceLanguage = () => {
  const locale =
    Platform.OS === "ios"
      ? NativeModules.SettingsManager.settings.AppleLocale ||
        NativeModules.SettingsManager.settings.AppleLanguages[0]
      : NativeModules.I18nManager.localeIdentifier;
  return locale ? locale.split("_")[0] : "en";
};

const initI18n = async () => {
  const savedLanguage = await AsyncStorage.getItem("language");
  //   const language = savedLanguage || getDeviceLanguage();
  const language = savedLanguage || "en";
  i18n.use(initReactI18next).init({
    resources,
    lng: language,
    fallbackLng: "en",
    interpolation: {
      escapeValue: false,
    },
    react: {
      useSuspense: false,
    },
  });
};

initI18n();

export default i18n;
