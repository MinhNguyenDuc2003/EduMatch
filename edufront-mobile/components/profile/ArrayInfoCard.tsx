import { Pencil } from "lucide-react-native";
import React from "react";
import { View } from "react-native";
import { Button } from "../ui/button";
import { Text } from "../ui/text";

interface ArrayItem {
  [key: string]: any;
}

interface ArrayInfoCardProps {
  title: string;
  items?: ArrayItem[];
  renderItem: (item: ArrayItem, index: number) => React.ReactNode;
  emptyMessage?: string;
  onEdit?: () => void;
  className?: string;
}

const ArrayInfoCard = ({
  title,
  items,
  renderItem,
  emptyMessage = "No items added yet",
  onEdit,
  className,
}: ArrayInfoCardProps) => {
  const hasItems = items && items.length > 0;

  return (
    <View
      className={`bg-[#FAFAF6] rounded-lg border border-[#828282] p-6 relative ${className}`}
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
        {hasItems ? (
          items.map((item, index) => (
            <View key={index} className="pb-1.5 border-b border-gray-200">
              {renderItem(item, index)}
            </View>
          ))
        ) : (
          <Text className="text-sm text-gray-400 italic py-2">
            {emptyMessage}
          </Text>
        )}
      </View>
    </View>
  );
};

export default ArrayInfoCard;
