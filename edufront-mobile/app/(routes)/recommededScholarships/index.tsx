import ScholarshipCard from "@/components/ScholarshipCard";
import { Text } from "@/components/ui/text";
import { useGetRecommendedScholarshipsQuery } from "@/state/api";
import React from "react";
import { ActivityIndicator, FlatList, View } from "react-native";

const index = () => {
  const {
    data: recommendedScholarships,
    isLoading: recommendedScholarshipsLoading,
  } = useGetRecommendedScholarshipsQuery({
    topK: 10,
  });

  if (recommendedScholarshipsLoading) {
    return (
      <View className="flex-1 items-center justify-center">
        <ActivityIndicator animating size="large" />
      </View>
    );
  }

  return (
    <View className="flex-1 ">
      <FlatList
        data={recommendedScholarships}
        renderItem={({ item }) => <ScholarshipCard item={item} />}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          recommendedScholarshipsLoading ? (
            <ActivityIndicator size="large" className="text-primary-300 mt-5" />
          ) : (
            <View className="flex flex-col gap-2 items-center justify-center">
              <Text className="text-lg text-center font-bold">
                No recommended scholarships yet
              </Text>
            </View>
          )
        }
        contentContainerClassName="p-4 gap-4"
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

export default index;
