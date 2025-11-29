import { Slot, Stack } from "expo-router";

export default function Layout() {
  return <>
    <Stack.Screen
        options={{
          title: "Scholarship Detail", // 👈 đổi tên header tại đây
        }}
      />
      <Slot />
  </>
}
