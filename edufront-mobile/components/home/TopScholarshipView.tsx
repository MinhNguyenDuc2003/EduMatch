import { useGetTopViewedScholarshipsQuery } from "@/state/api";
import React from "react";
import { View } from "react-native";
import ScholarshipCard from "../ScholarshipCard";
import { Skeleton } from "../ui/skeleton";
import { Text } from "../ui/text";

const TopScholarshipView = () => {
  const { data, isLoading } = useGetTopViewedScholarshipsQuery();

  return (
    <View className="gap-4 ">
      <View className="flex-row justify-between items-center ">
        <Text className="text-xl font-bold">Top viewed scholarships</Text>
        <Text className="text-md font-normal text-primary-brand">View all</Text>
      </View>
      {isLoading ? (
        // TODO: Add loading skeleton
        <>
          {Array.from({ length: 5 }).map((_, index) => (
            <Skeleton key={index} className="w-full h-20" />
          ))}
        </>
      ) : (
        <>
          {data?.slice(0, 5).map((item) => (
            <ScholarshipCard key={item.id.toString()} item={item} />
          ))}
        </>
      )}
    </View>
  );
};

export default TopScholarshipView;
