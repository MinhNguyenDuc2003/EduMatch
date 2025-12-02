import SearchBar from "@/components/home/SearchBar";
import TopScholarshipView from "@/components/home/TopScholarshipView";
import ScholarshipCard from "@/components/ScholarshipCard";
import { usePageScholarshipsQuery } from "@/state/api";
import React from "react";
import { FlatList, ScrollView, Text, View } from "react-native";
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
      <SearchBar />
      <View className="flex-1">
        {isLoading ? (
          <Text className="text-center text-gray-500 mt-10">
            Loading scholarships...
          </Text>
        ) : (
          <ScrollView showsVerticalScrollIndicator={false}>
            <TopScholarshipView />

            <FlatList
              ListHeaderComponent={() => (
                <View className="flex-row justify-between items-center pb-5">
                  <Text className="text-xl font-bold">Scholarships</Text>
                  <Text className="text-md font-normal text-primary-brand">
                    All scholarships
                  </Text>
                </View>
              )}
              data={scholarships}
              renderItem={({ item }) => <ScholarshipCard item={item} />}
              keyExtractor={(item) => item.id.toString()}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{ paddingBottom: 16 }}
            />
          </ScrollView>
        )}
      </View>
    </SafeAreaView>
  );
};

export default Home;
