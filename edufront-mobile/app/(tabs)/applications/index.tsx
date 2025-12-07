import ApplicationCard from "@/components/ApplicationCard";
import { Button } from "@/components/ui/button";
import { useGetApplicationsQuery } from "@/state/api";
import { router } from "expo-router";
import React from "react";
import { ActivityIndicator, FlatList, Text, View } from "react-native";

const index = () => {
  const { data: applications, isLoading: applicationsLoading } =
    useGetApplicationsQuery();

  return (
    <FlatList
      data={applications}
      ListHeaderComponent={() => (
        <Button
          className="bg-primary-brand p-2 rounded-xl"
          onPress={() => router.push("/(routes)/application/create")}
        >
          <Text className="text-white">Create Application</Text>
        </Button>
      )}
      renderItem={({ item }) => <ApplicationCard application={item} />}
      keyExtractor={(item) => item.toString()}
      contentContainerClassName="p-4 gap-4"
      showsVerticalScrollIndicator={false}
      ListEmptyComponent={
        applicationsLoading ? (
          <ActivityIndicator size="large" className="text-primary-300 mt-5" />
        ) : (
          <View className="flex flex-col gap-2 items-center justify-center">
            <Text className="text-lg text-center font-bold">
              You are not created any applications yet
            </Text>
            <Text className="text-center">
              Once you create an application, it will show up here so you can
              monitor application status and next steps.
            </Text>
          </View>
        )
      }
    />
  );
};

export default index;
