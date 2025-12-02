import { I18nProvider } from "@/shared/providers/i18n-provider";
import { PortalHost } from "@rn-primitives/portal";
import { useFonts } from "expo-font";
import { SplashScreen, Stack } from "expo-router";
import { useEffect } from "react";
import { LogBox, StatusBar } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import ToastManager from "toastify-react-native";
import "./global.css";
import Providers from "./providers";

SplashScreen.preventAutoHideAsync();
LogBox.ignoreAllLogs();

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <I18nProvider>
      <Providers>
        <GestureHandlerRootView>
          <StatusBar barStyle={"dark-content"} />
          <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="index" />
            <Stack.Screen name="(routes)/onboarding/index" />
          </Stack>
          <ToastManager position="bottom" />
          <PortalHost />
        </GestureHandlerRootView>
      </Providers>
    </I18nProvider>
  );
}
