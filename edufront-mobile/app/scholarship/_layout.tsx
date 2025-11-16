import { Stack } from "expo-router";

export default function HomeLayout() {
  return (
    <Stack >
      <Stack.Screen
        name="scholarship"
        options={{
          title: "Scholarship",
          headerLargeTitle: true,
          headerLargeTitleShadowVisible: false,
        }}
      />
    </Stack>
  );
}
