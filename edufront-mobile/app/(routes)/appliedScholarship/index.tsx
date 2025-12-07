import AppliedApplication from "@/components/AppliedApplication";
import { Button } from "@/components/ui/button";
import { useGetAppliedApplicationQuery } from "@/state/api";
import { router } from "expo-router";
import React from "react";
import { ActivityIndicator, FlatList, Text, View } from "react-native";

const index = () => {
  const { data: appliedScholarships, isLoading: appliedScholarshipsLoading } =
    useGetAppliedApplicationQuery();

  return (
    <View className="flex-1 ">
      <FlatList
        data={appliedScholarships}
        renderItem={({ item }) => <AppliedApplication item={item} />}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          appliedScholarshipsLoading ? (
            <ActivityIndicator size="large" className="text-primary-300 mt-5" />
          ) : (
            <View className="flex flex-col gap-2 items-center justify-center">
              <Text className="text-lg text-center font-bold">
                No applications submitted
              </Text>
              <Text className="text-center">
                Once you apply to a scholarship, it will show up here so you can
                monitor application status and next steps.
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
