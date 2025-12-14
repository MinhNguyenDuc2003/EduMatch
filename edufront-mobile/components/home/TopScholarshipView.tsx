import { useGetTopViewedScholarshipsQuery } from "@/state/api";
import { router } from "expo-router";
import React from "react";
import { Image, Pressable, ScrollView, View } from "react-native";
import { Skeleton } from "../ui/skeleton";
import { Text } from "../ui/text";

const TopScholarshipView = () => {
  const { data, isLoading } = useGetTopViewedScholarshipsQuery();

  return (
    <View className="gap-4">
      <View className="flex-row justify-between items-center">
        <Text className="text-xl font-bold text-gray-900">Featured</Text>
        <Text
          className="text-sm font-semibold text-primary-brand"
          onPress={() => router.push("/(routes)/scholarships")}
        >
          View all
        </Text>
      </View>

      {isLoading ? (
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {Array.from({ length: 3 }).map((_, index) => (
            <Skeleton
              key={index}
              className="w-[280px] h-[180px] mr-4 rounded-2xl"
            />
          ))}
        </ScrollView>
      ) : (
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ gap: 16 }}
        >
          {data?.slice(0, 5).map((item) => (
            <Pressable
              key={item.id.toString()}
              onPress={() => {
                router.push({
                  pathname: "/(routes)/scholarshipdetails/[slug]",
                  params: { slug: item.slug },
                });
              }}
              className="w-[280px] h-[180px] bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden relative"
            >
              <Image
                source={{
                  uri:
                    item.providerProfileVo.logoUrl ||
                    "https://placehold.co/600x400/3d6cb9/ffffff?text=Scholarship",
                }}
                className="w-full h-full object-cover absolute"
                blurRadius={2}
              />
              <View className="absolute inset-0 bg-black/40" />
              <View className="flex-1 justify-end p-4">
                <View className="bg-white/20 self-start px-2 py-0.5 rounded-md mb-2 backdrop-blur-md">
                  <Text className="text-white text-xs font-medium">
                    {item.country}
                  </Text>
                </View>
                <Text
                  className="text-white text-lg font-bold leading-6 mb-1"
                  numberOfLines={2}
                >
                  {item.title}
                </Text>
                <Text
                  className="text-gray-200 text-sm font-medium"
                  numberOfLines={1}
                >
                  {item.university}
                </Text>
              </View>
            </Pressable>
          ))}
        </ScrollView>
      )}
    </View>
  );
};

export default TopScholarshipView;
