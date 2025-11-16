import { Stack } from "expo-router";

export default function HomeLayout() {
  return (
    <Stack >
      <Stack.Screen
        name="ScholarshipDetail"
        options={{
          title: "Scholarship Detail",
          headerLargeTitle: true,
          headerLargeTitleShadowVisible: false,
        }}
      />
    </Stack>
  );
}
