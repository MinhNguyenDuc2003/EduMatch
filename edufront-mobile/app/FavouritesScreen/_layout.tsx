import { Slot, Stack } from "expo-router";

export default function Layout() {
  return <>
    <Stack.Screen
        options={{
          title: "Favourites", // 👈 đổi tên header tại đây
        }}
      />
      <Slot />
  </>
}
