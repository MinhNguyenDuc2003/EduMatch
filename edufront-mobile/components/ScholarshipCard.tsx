import { router } from "expo-router";
import { Clock } from "lucide-react-native";
import React from "react";
import { Image, Pressable, Text, View } from "react-native";

const ScholarshipCard = ({ item }: { item: Scholarship }) => {
  const isClosingSoon =
    item.endDate && item.endDate < Date.now() + 7 * 24 * 60 * 60 * 1000;

  return (
    <Pressable
      onPress={() => {
        router.push({
          pathname: "/(routes)/scholarshipdetails/[slug]",
          params: { slug: item.slug },
        });
      }}
      className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm"
    >
      <View className="flex-row gap-4">
        <Image
          source={{ uri: item.providerProfileVo.logoUrl }}
          className="w-16 h-16 rounded-xl bg-gray-50 bg-contain"
        />
        <View className="flex-1 gap-1">
          <View className="flex-row justify-between items-start">
            <Text
              className="flex-1 text-base font-bold text-gray-900 leading-5 pr-2"
              numberOfLines={2}
            >
              {item.title}
            </Text>
            {isClosingSoon && (
              <View className="bg-red-50 px-2 py-0.5 rounded text-xs ">
                <Text className="text-[10px] font-bold text-red-600">
                  CLOSING SOON
                </Text>
              </View>
            )}
          </View>
          <Text className="text-sm font-medium text-gray-500" numberOfLines={1}>
            {item.university}
          </Text>
        </View>
      </View>

      <View className="mt-4 pt-4 border-t border-gray-50 flex-row items-center justify-between">
        <View className="flex-row gap-2">
          <View className="bg-blue-50 px-2.5 py-1 rounded-md">
            <Text className="text-xs font-semibold text-blue-700">
              {item.fundingAmount}
            </Text>
          </View>
          <View className="bg-gray-100 px-2.5 py-1 rounded-md">
            <Text className="text-xs font-semibold text-gray-600">
              {item.country}
            </Text>
          </View>
        </View>

        <View className="flex-row items-center gap-1">
          <Clock size={12} color="#9ca3af" />
          <Text className="text-xs text-gray-400">Apply now</Text>
        </View>
      </View>
    </Pressable>
  );
};

export default ScholarshipCard;
