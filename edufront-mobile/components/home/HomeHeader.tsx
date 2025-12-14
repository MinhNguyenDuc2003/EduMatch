import { useAuth } from "@/hooks/useAuth";
import { router } from "expo-router";
import { Bell } from "lucide-react-native";
import React from "react";
import { Image, Pressable, Text, View } from "react-native";

const HomeHeader = () => {
  const { user } = useAuth();

  return (
    <View className="flex-row justify-between items-center mb-4 pt-2">
      <View className="flex-row items-center gap-3">
        <Pressable onPress={() => router.push("/(tabs)/profile")}>
          <Image
            source={{
              uri: "https://api.dicebear.com/7.x/avataaars/png?seed=Felix",
            }}
            className="w-10 h-10 rounded-full bg-gray-200 border border-gray-100"
          />
        </Pressable>
        <View>
          <Text className="text-sm text-gray-500 font-medium">
            Welcome back,
          </Text>
          <Text className="text-lg font-bold text-gray-900">
            {user?.firstName} {user?.lastName} 👋
          </Text>
        </View>
      </View>

      <Pressable
        onPress={() => router.push("/(tabs)/notifications")}
        className="w-10 h-10 bg-white rounded-full items-center justify-center border border-gray-100 shadow-sm"
      >
        <Bell size={20} color="#374151" />
        <View className="absolute top-2 right-2.5 w-2 h-2 bg-red-500 rounded-full border border-white" />
      </Pressable>
    </View>
  );
};

export default HomeHeader;
