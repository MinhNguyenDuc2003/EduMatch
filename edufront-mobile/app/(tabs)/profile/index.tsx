import { StatCard } from "@/components/profile/StatCard";
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { useAuth } from "@/hooks/useAuth";
import {
  useGetAppliedApplicationQuery,
  useGetFollowedProvidersQuery,
  useGetRecommendedScholarshipsQuery,
  useGetTrackedScholarshipsQuery,
} from "@/state/api";
import { router } from "expo-router";
import {
  ArrowBigUp,
  BookMarked,
  BriefcaseBusiness,
  Building2,
  Check,
  Gem,
} from "lucide-react-native";
import React, { useMemo } from "react";
import { Pressable, ScrollView, TouchableOpacity, View } from "react-native";

const index = () => {
  const { user, subscriptions } = useAuth();

  const {
    data: recommendedScholarships,
    isLoading: recommendedScholarshipsLoading,
  } = useGetRecommendedScholarshipsQuery({
    topK: 10,
  });

  const { data: appliedScholarships, isLoading: appliedScholarshipsLoading } =
    useGetAppliedApplicationQuery();

  const { data: followedProviders, isLoading: followedProvidersLoading } =
    useGetFollowedProvidersQuery();

  const { data: trackedScholarships, isLoading: trackedScholarshipsLoading } =
    useGetTrackedScholarshipsQuery();

  const userSubscription = useMemo(() => {
    return subscriptions.find(
      (userSubscription) => userSubscription.userType === "APPLICANT"
    );
  }, [subscriptions]);

  const totalDays = userSubscription
    ? Math.ceil(
        (userSubscription.endDate - new Date().getTime()) /
          (1000 * 60 * 60 * 24)
      )
    : null;

  return (
    <ScrollView className="flex-1 bg-white">
      <View>
        <View className="bg-primary-brand h-32 relative" />

        <Pressable
          className="absolute -bottom-14 left-4 right-4 bg-white rounded-lg p-4 shadow-sm"
          onPress={() => router.push("/(routes)/applicantProfile")}
        >
          <View className="flex flex-row gap-4 items-center justify-center">
            <View className="bg-primary-brand w-16 h-16 rounded-full flex items-center justify-center">
              <Text className="text-white font-bold text-2xl">
                {user?.firstName[0].toUpperCase()}
              </Text>
            </View>
            <View className="flex flex-col gap-1">
              <Text className="text-lg font-bold">
                {user?.firstName} {user?.lastName}
              </Text>
              <Text className="text-sm text-gray-500">{user?.email}</Text>
              <Button
                variant="ghost"
                className="p-0 h-fit flex items-center justify-start"
              >
                <TouchableOpacity
                  onPress={() => router.push("/(routes)/subscriptionPlan")}
                >
                  {userSubscription ? (
                    <View className="flex flex-row items-center gap-1 bg-primary-brand px-2 rounded-md">
                      <Gem size={12} color="white" />
                      <Text className="text-xs text-white">
                        Premium ({totalDays} days left)
                      </Text>
                    </View>
                  ) : (
                    <View className="flex flex-row items-center gap-1 bg-gray-400 px-2 rounded-md">
                      <ArrowBigUp size={12} color="white" />
                      <Text className="text-xs text-white">
                        Upgrade account
                      </Text>
                    </View>
                  )}
                </TouchableOpacity>
              </Button>
            </View>
          </View>
        </Pressable>
      </View>

      <View className="flex flex-col gap-3 p-4 mt-12">
        <Text className="text-lg font-bold">Scholarship Management</Text>

        <View className="flex gap-3 w-full">
          <StatCard
            icon={Check}
            label="Recommended Scholarship"
            value={
              recommendedScholarshipsLoading
                ? "..."
                : recommendedScholarships?.length || 0
            }
            iconColor="#059669"
            onPress={() => router.push("/(routes)/recommededScholarships")}
          />
          <StatCard
            icon={BriefcaseBusiness}
            label="Applied Scholarship"
            value={
              appliedScholarshipsLoading
                ? "..."
                : appliedScholarships?.length || 0
            }
            iconColor="#2563eb"
            onPress={() => router.push("/(routes)/appliedScholarship")}
          />
          <StatCard
            icon={BookMarked}
            label="Saved Scholarship"
            value={
              trackedScholarshipsLoading
                ? "..."
                : trackedScholarships?.length || 0
            }
            iconColor="#db2777"
            onPress={() => router.push("/(routes)/savedScholarships")}
          />
          <StatCard
            icon={Building2}
            label="Saved Provider"
            value={
              followedProvidersLoading ? "..." : followedProviders?.length || 0
            }
            iconColor="#d97706"
            onPress={() => router.push("/(routes)/savedProviders")}
          />
        </View>
      </View>
    </ScrollView>
  );
};

export default index;
