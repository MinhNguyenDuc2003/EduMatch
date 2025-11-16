import { PortalHost } from "@rn-primitives/portal";
import { Icon, Label, NativeTabs } from "expo-router/unstable-native-tabs";

export default function RootLayout() {
  return (
    <>
      <NativeTabs >
        <NativeTabs.Trigger name="home">
          <Label>Home</Label>
          <Icon
            sf={{ default: "house", selected: "house" }}
            drawable="home_drawable"
          />
        </NativeTabs.Trigger>
        <NativeTabs.Trigger name="profile">
          <Label>Profile</Label>
          <Icon
            sf={{ default: "person", selected: "person" }}
            drawable="profile_drawable"
          />
        </NativeTabs.Trigger>
      </NativeTabs>
      <PortalHost />
    </>
  );
}
