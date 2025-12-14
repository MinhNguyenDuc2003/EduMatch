import { useAuth } from "@/hooks/useAuth";
import { AuthContext } from "@/providers/authProviders";
import { router } from "expo-router";
import { LogOut } from "lucide-react-native";
import React, { useContext } from "react";
import { Image, Pressable, Text, View } from "react-native";

const HomeHeader = () => {
  const { user } = useAuth();
  const { signOut } = useContext(AuthContext);

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
        onPress={() => signOut()}
        className="w-10 h-10 bg-white rounded-full items-center justify-center border border-gray-100 shadow-sm"
      >
        <LogOut size={20} color="#374151" />
      </Pressable>
    </View>
  );
};

export default HomeHeader;
