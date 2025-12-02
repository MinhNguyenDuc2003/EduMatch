import { Text } from "@/components/ui/text";
import { Tabs } from "expo-router";
import { Bell, Book, House, User } from "lucide-react-native";

export default function RootLayout() {
  return (
    <Tabs
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color }) => {
          let iconName;
          if (route.name === "home") {
            iconName = <House size={24} color={color} />;
          } else if (route.name === "profile") {
            iconName = <User size={24} color={color} />;
          } else if (route.name === "applications") {
            iconName = <Book size={24} color={color} />;
          } else if (route.name === "notifications") {
            iconName = <Bell size={24} color={color} />;
          }
          return iconName;
        },
        headerShown: false,
        tabBarActiveTintColor: "#3d6cb9",
        tabBarInactiveTintColor: "#8e8e93",
        tabBarLabel: ({ color }) => {
          let labelName;
          if (route.name === "home") {
            labelName = (
              <Text className="text-sm" style={{ color: color }}>
                Home
              </Text>
            );
          } else if (route.name === "profile") {
            labelName = (
              <Text className="text-sm" style={{ color: color }}>
                Profile
              </Text>
            );
          } else if (route.name === "applications") {
            labelName = (
              <Text className="text-sm" style={{ color: color }}>
                Applications
              </Text>
            );
          } else if (route.name === "notifications") {
            labelName = (
              <Text className="text-sm" style={{ color: color }}>
                Notifications
              </Text>
            );
          }
          return labelName;
        },
      })}
    >
      <Tabs.Screen name="home" />
      <Tabs.Screen name="applications" />
      <Tabs.Screen name="notifications" />
      <Tabs.Screen name="profile" />
    </Tabs>
  );
}
