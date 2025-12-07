import { router, Stack } from "expo-router";
import { ArrowLeft } from "lucide-react-native";
import { TouchableOpacity } from "react-native";

export default function Layout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: "Saved Scholarships",
          headerShadowVisible: true,
          headerBackVisible: true,
          headerLeft: () => (
            <TouchableOpacity onPress={() => router.back()} className="p-2">
              <ArrowLeft size={20} />
            </TouchableOpacity>
          ),
        }}
      />
    </Stack>
  );
}
