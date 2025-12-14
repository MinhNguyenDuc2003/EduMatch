import { Text } from "@/components/ui/text";
import { LucideIcon } from "lucide-react-native";
import React from "react";
import { Pressable, View } from "react-native";

interface StatCardProps {
  icon: LucideIcon;
  label: string;
  value: number | string;
  iconColor?: string;
  onPress?: () => void;
}

export const StatCard: React.FC<StatCardProps> = ({
  icon: Icon,
  label,
  value,
  iconColor = "#3d6cb9",
  onPress,
}) => {
  return (
    <Pressable onPress={onPress}>
      <View className="bg-gray-100 p-4 rounded-lg flex  gap-2">
        <View className="flex flex-row items-center justify-between">
          <View className="flex flex-row items-center gap-2">
            <Icon size={24} color={iconColor} />
            <Text className="text-sm">{label}</Text>
          </View>
          <Text className="text-lg font-bold">{value}</Text>
        </View>
      </View>
    </Pressable>
  );
};
