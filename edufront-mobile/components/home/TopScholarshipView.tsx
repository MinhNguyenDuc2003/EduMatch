import { useGetTopViewedScholarshipsQuery } from "@/state/api";
import React from "react";
import { FlatList, View } from "react-native";
import ScholarshipCard from "../ScholarshipCard";
import { Text } from "../ui/text";

const TopScholarshipView = () => {
  const { data, isLoading } = useGetTopViewedScholarshipsQuery();

  if (isLoading) {
    // TODO: Add loading skeleton
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <FlatList
      ListHeaderComponent={
        <View className="flex-row justify-between items-center pb-5">
          <Text className="text-xl font-bold">Top lượt xem nhiều nhất</Text>
          <Text className="text-md font-normal text-primary-brand">
            Xem tất cả
          </Text>
        </View>
      }
      data={data ? data.slice(0, 5) : []}
      renderItem={({ item }) => <ScholarshipCard item={item} />}
      keyExtractor={(item) => item.id.toString()}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingBottom: 16 }}
    />
  );
};

export default TopScholarshipView;
