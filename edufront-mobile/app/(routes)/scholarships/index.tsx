import ScholarshipCard from "@/components/ScholarshipCard";
import Header from "@/components/scholarships/Header";
import usePagination from "@/hooks/usePagination";
import React from "react";
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const index = () => {
  const {
    data,
    refreshing,
    totalResult,
    loadingMore,
    handleRefresh,
    loadMore,
    initialLoader,
  } = usePagination();

  const renderFooter = () => {
    if (!loadingMore || data.length < 8) return null; // Show footer loader only for subsequent pages
    return <ActivityIndicator animating size="large" />;
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      <View className="flex-1">
        <Header />
        <FlatList
          ListHeaderComponent={() => (
            <View className="flex-row items-center">
              <Text className="text-lg text-primary-brand ">
                {totalResult || 0}{" "}
              </Text>
              <Text className="text-lg text-gray-500">results found</Text>
            </View>
          )}
          data={data}
          renderItem={({ item }) => <ScholarshipCard item={item} />}
          keyExtractor={(item) => item.id.toString()}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            initialLoader ? (
              <ActivityIndicator
                size="large"
                className="text-primary-300 mt-5"
              />
            ) : (
              <View className="flex-1 items-center justify-center">
                <Text className="text-gray-500">No results found</Text>
              </View>
            )
          }
          contentContainerClassName="gap-4 p-4"
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
          }
          contentContainerStyle={{ paddingBottom: 50 }}
          ListFooterComponent={renderFooter}
          onEndReached={loadMore}
          onEndReachedThreshold={0.1}
        />
      </View>
    </SafeAreaView>
  );
};

export default index;
