import HomeBanner from "@/components/home/HomeBanner";
import HomeHeader from "@/components/home/HomeHeader";
import SearchBar from "@/components/home/SearchBar";
import TopScholarshipView from "@/components/home/TopScholarshipView";
import ScholarshipCard from "@/components/ScholarshipCard";
import { usePageScholarshipsQuery } from "@/state/api";
import { router } from "expo-router";
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
    <SafeAreaView className="flex-1 bg-gray-50 px-4">
      <FlatList
        ListHeaderComponent={() => (
          <View className="gap-6 mb-2">
            <HomeHeader />
            <View className="gap-4">
              <SearchBar />
            </View>
            <View>
              {/* <Text className="text-lg font-bold mb-3 text-gray-900">Highlights</Text> */}
              <HomeBanner />
            </View>
            <TopScholarshipView />
            <View className="flex-row justify-between items-center mt-2">
              <Text className="text-xl font-bold text-gray-900">
                Recommended
              </Text>
              <Text
                className="text-sm font-semibold text-primary-brand"
                onPress={() => router.push("/(routes)/scholarships")}
              >
                View all
              </Text>
            </View>
          </View>
        )}
        data={scholarships}
        renderItem={({ item }) => <ScholarshipCard item={item} />}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
        contentContainerClassName="pb-4"
        ItemSeparatorComponent={() => <View className="h-3" />}
      />
    </SafeAreaView>
  );
};

export default Home;
