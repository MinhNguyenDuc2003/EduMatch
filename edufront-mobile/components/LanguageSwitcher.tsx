import {
  NativeSelectScrollView,
  Option,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Updates from "expo-updates";
import React from "react";
import { useTranslation } from "react-i18next";
import { I18nManager } from "react-native";

export function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const changeLanguage = async (option: Option) => {
    if (!option) return;
    const lng = option.value;
    const currentLangIsRtl = i18n.language === "vi";
    const newLangIsRtl = lng === "vi";
    await i18n.changeLanguage(lng);
    await AsyncStorage.setItem("language", lng);
    if (currentLangIsRtl !== newLangIsRtl) {
      I18nManager.forceRTL(newLangIsRtl);
      await Updates.reloadAsync();
    }
  };
  return (
    <Select onValueChange={changeLanguage}>
      <SelectTrigger>
        <SelectValue placeholder="Select a language" />
      </SelectTrigger>
      <SelectContent
        className="bg-white border-customgreys-dirtyGrey shadow max-h-64 overflow-y-auto w-[200px]"
        style={{ backgroundColor: "#fff" }}
      >
        <NativeSelectScrollView>
          <SelectItem value="en" label="English" key={"en"} />
          <SelectItem value="vi" label="Vietnamese" key={"vi"} />
        </NativeSelectScrollView>
      </SelectContent>
    </Select>
  );
}
