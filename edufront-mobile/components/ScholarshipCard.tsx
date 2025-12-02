import { router } from "expo-router";
import { HeartIcon } from "lucide-react-native";
import React from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";

const ScholarshipCard = ({ item }: { item: Scholarship }) => {
  return (
    <Pressable
      onPress={() => {
        router.push(`/scholarshipdetails/${item.id}` as any);
      }}
      className="bg-blue-50 rounded-2xl flex gap-3 p-3 cursor-pointer border border-primary-brand "
    >
      {/* Header: Logo + Organization */}
      <View className="flex-row items-center">
        <Image
          source={{ uri: item.providerProfileVo.logoUrl }}
          className="w-16 h-16 rounded-sm mr-3"
        />
        <View className="flex-1">
          <Text className="text-md font-semibold text-gray-800 line-clamp-2">
            {item.title}
          </Text>
          <Text className="text-sm text-gray-500">{item.university}</Text>
        </View>
      </View>

      {/* Details */}
      <View className="flex-row justify-between items-center ">
        <View className="flex-row gap-2 items-center">
          <Text className="text-sm text-gray-800 font-medium bg-gray-200 p-1 rounded-2xl">
            {item.fundingAmount}
          </Text>
          <Text className="text-sm text-gray-800 font-medium bg-gray-200 p-1 rounded-2xl">
            {item.country}
          </Text>
          {/* <Text className="text-sm text-gray-800 font-medium bg-gray-200 p-2 rounded-2xl">{item.availableSlots}</Text> */}
        </View>
        <View className="border border-green-500 flex items-center rounded-full p-2 ">
          <HeartIcon size={16} color={"#22c55e"} />
        </View>
      </View>
    </Pressable>
  );
};

export default ScholarshipCard;

const styles = StyleSheet.create({});
