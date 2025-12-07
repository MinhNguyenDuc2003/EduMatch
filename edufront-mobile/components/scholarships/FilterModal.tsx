import { XIcon } from "lucide-react-native";
import React, { useState } from "react";
import { FlatList, Modal, Pressable, TextInput, View } from "react-native";
import { Text } from "../ui/text";

type FilterOption = {
  value: string;
  label: string;
};

type FilterModalProps = {
  visible: boolean;
  onClose: () => void;
  title: string;
  options: FilterOption[];
  selectedValue: string;
  onSelect: (value: string) => void;
  searchable?: boolean;
  searchPlaceholder?: string;
};

const FilterModal = ({
  visible,
  onClose,
  title,
  options,
  selectedValue,
  onSelect,
  searchable = true,
  searchPlaceholder = "Search...",
}: FilterModalProps) => {
  const [search, setSearch] = useState("");

  const filteredOptions = searchable
    ? options.filter((option) =>
        option.label.toLowerCase().includes(search.toLowerCase())
      )
    : options;

  const handleSelect = (value: string) => {
    onSelect(value);
    onClose();
    setSearch("");
  };

  const handleClose = () => {
    onClose();
    setSearch("");
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={handleClose}
    >
      <View className="justify-end flex-1">
        <View className="bg-white rounded-t-3xl px-4">
          <View className="flex-row items-center justify-between py-2">
            <Text className="text-lg font-semibold">{title}</Text>
            <Pressable onPress={handleClose}>
              <XIcon size={24} />
            </Pressable>
          </View>
          {searchable && (
            <TextInput
              placeholder={searchPlaceholder}
              placeholderTextColor="#9ca3af"
              className="border border-gray-300 rounded-lg p-3 mb-4"
              value={search}
              onChangeText={setSearch}
            />
          )}
          <FlatList
            data={filteredOptions}
            keyExtractor={(item) => item.value}
            renderItem={({ item }) => {
              const isSelected = selectedValue === item.value;
              return (
                <Pressable
                  onPress={() => handleSelect(item.value)}
                  className={`p-4 border-b ${isSelected ? "bg-blue-50" : ""}`}
                >
                  <Text
                    className={
                      isSelected ? "font-semibold text-primary-brand" : ""
                    }
                  >
                    {item.label}
                  </Text>
                </Pressable>
              );
            }}
            showsVerticalScrollIndicator={true}
            style={{ height: 500 }}
            contentContainerStyle={{ paddingBottom: 20 }}
          />
        </View>
      </View>
    </Modal>
  );
};

export default FilterModal;
