import { SlidersHorizontal } from "lucide-react-native";
import React, { useState } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";

const CATEGORIES = [
  "All",
  "Undergraduate",
  "Masters",
  "PhD",
  "Exchange",
  "Research",
];

const CategoryFilter = () => {
  const [selected, setSelected] = useState("All");

  return (
    <View className="flex-row gap-2 items-center mb-4">
      <Pressable className="bg-white p-2.5 rounded-xl border border-gray-200 shadow-sm">
        <SlidersHorizontal size={20} color="#374151" />
      </Pressable>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ gap: 8 }}
      >
        {CATEGORIES.map((cat) => (
          <Pressable
            key={cat}
            onPress={() => setSelected(cat)}
            className={`px-4 py-2.5 rounded-xl border ${
              selected === cat
                ? "bg-primary-brand border-primary-brand"
                : "bg-white border-gray-200"
            } shadow-sm`}
          >
            <Text
              className={`font-medium ${
                selected === cat ? "text-white" : "text-gray-600"
              }`}
            >
              {cat}
            </Text>
          </Pressable>
        ))}
      </ScrollView>
    </View>
  );
};

export default CategoryFilter;
