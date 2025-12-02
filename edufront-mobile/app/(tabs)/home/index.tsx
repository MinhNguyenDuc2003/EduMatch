import HomeBanner from "@/components/home/HomeBanner";
import SearchBar from "@/components/home/SearchBar";
import TopScholarshipView from "@/components/home/TopScholarshipView";
import ScholarshipCard from "@/components/ScholarshipCard";
import { usePageScholarshipsQuery } from "@/state/api";
import React from "react";
import { FlatList, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Home = () => {
  const { data, isLoading } = usePageScholarshipsQuery({
    criteria: {
      country: "",
      studyLevel: "",
      scholarshipType: "",
    },
    sortBy: "id",
    sortDirection: "DESC",
    page: 0,
    size: 5,
  });

  const scholarships = data?.content ?? [];

  return (
    <SafeAreaView className="flex-1 bg-gray-100 px-4">
      <FlatList
        ListHeaderComponent={() => (
          <View className="gap-4">
            <SearchBar />
            <HomeBanner />
            <TopScholarshipView />
            <View className="flex-row justify-between items-center ">
              <Text className="text-xl font-bold">Scholarships</Text>
              <Text className="text-md font-normal text-primary-brand">
                All scholarships
              </Text>
            </View>
          </View>
        )}
        data={scholarships}
        renderItem={({ item }) => <ScholarshipCard item={item} />}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
        contentContainerClassName="gap-4"
      />
    </SafeAreaView>
  );
};

export default Home;
