import { Pencil } from "lucide-react-native";
import React from "react";
import { View } from "react-native";
import { Button } from "../ui/button";
import { Text } from "../ui/text";

interface InfoField {
  label: string;
  value?: string;
}

interface InfoCardProps {
  title: string;
  fields: InfoField[];
  onEdit?: () => void;
  className?: string;
}

const InfoCard = ({ title, fields, onEdit, className }: InfoCardProps) => {
  return (
    <View
      className={`bg-[#FAFAF6] rounded-lg border border-[#828282] p-6 relative ${className} `}
    >
      <View className="flex flex-row items-center justify-between mb-4">
        <Text variant="h3" className="text-sm font-semibold text-gray-900">
          {title}
        </Text>
        {onEdit && (
          <Button
            // variant="custom"
            className="bg-[#00B8D9] text-white px-3 py-2 rounded-md flex items-center gap-1 h-fit"
            onPress={onEdit}
          >
            <Pencil size={12} color="white" />
            <Text className=" font-medium text-xs">Edit</Text>
          </Button>
        )}
      </View>

      <View className="flex flex-col gap-2">
        {fields.map((field, index) => (
          <View
            key={index}
            className="flex flex-row items-center justify-between gap-2 w-full"
          >
            <Text className="text-xs font-bold text-gray-600 flex-shrink-0 w-44">
              {field.label}:
            </Text>
            <Text
              className={`text-xs ${field.value ? "text-gray-900" : "text-gray-400 italic"} flex-1 `}
            >
              {field.value || "Add Info"}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
};

export default InfoCard;
