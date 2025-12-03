import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { useAuth } from "@/hooks/useAuth";
import { ArrowBigUp } from "lucide-react-native";
import React from "react";
import { ScrollView, View } from "react-native";

const index = () => {
  const { user } = useAuth();

  return (
    <ScrollView className="flex-1 bg-white">
      <View>
        <View className="bg-primary-brand h-32 relative" />

        <View className="absolute -bottom-14 left-4 right-4 bg-white rounded-lg p-4 shadow-sm">
          <View className="flex flex-row gap-4 items-center justify-center">
            <View className="bg-primary-brand w-16 h-16 rounded-full flex items-center justify-center">
              <Text className="text-white font-bold text-2xl">
                {user?.firstName[0].toUpperCase()}
              </Text>
            </View>
            <View className="flex flex-col gap-1">
              <Text className="text-lg font-bold">
                {user?.firstName} {user?.lastName}
              </Text>
              <Text className="text-sm text-gray-500">{user?.email}</Text>
              <Button
                variant="ghost"
                className="p-0 h-fit flex items-center justify-start"
              >
                <View className="bg-gray-400 text-white p-0 px-2 rounded-md flex flex-row items-center justify-start gap-1">
                  <ArrowBigUp size={12} color="white" />
                  <Text className="text-xs text-white">Update account</Text>
                </View>
              </Button>
            </View>
          </View>
        </View>
      </View>

      <View className="flex flex-col gap-4 p-4 mt-12">
        <Text className="text-lg font-bold">Scholarship Management</Text>
      </View>
    </ScrollView>
  );
};

export default index;
