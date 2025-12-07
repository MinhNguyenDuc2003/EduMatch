import ScholarshipCard from "@/components/ScholarshipCard";
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { useGetTrackedScholarshipsQuery } from "@/state/api";
import { router } from "expo-router";
import React from "react";
import { ActivityIndicator, FlatList, View } from "react-native";

const index = () => {
  const { data: trackedScholarships, isLoading: trackedScholarshipsLoading } =
    useGetTrackedScholarshipsQuery();

  if (trackedScholarshipsLoading) {
    return (
      <View className="flex-1 items-center justify-center">
        <ActivityIndicator animating size="large" />
      </View>
    );
  }

  return (
    <View className="flex-1">
      <FlatList
        data={trackedScholarships}
        renderItem={({ item }) => <ScholarshipCard item={item} />}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          trackedScholarshipsLoading ? (
            <ActivityIndicator size="large" className="text-primary-300 mt-5" />
          ) : (
            <View className="flex flex-col gap-2 items-center justify-center">
              <Text className="text-lg text-center font-bold">
                No tracked scholarships yet
              </Text>
              <Text className="text-center">
                Browse our scholarship catalog and tap the flag icon to save
                opportunities. They will appear here for quick access and
                planning.
              </Text>
              <Button
                className="bg-primary-brand p-2 rounded-xl"
                onPress={() => router.push("/scholarships")}
              >
                <Text className="text-white">Explore Scholarships</Text>
              </Button>
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
