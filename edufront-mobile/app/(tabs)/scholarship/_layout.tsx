import { Stack } from "expo-router";

export default function ScholarshipLayout() {
  return (
    <Stack >
      <Stack.Screen
        name="index"
        options={{
          title: "Scholarship",
          headerLargeTitle: true,
          headerLargeTitleShadowVisible: false,
        }}
      />
    </Stack>
  );
}
