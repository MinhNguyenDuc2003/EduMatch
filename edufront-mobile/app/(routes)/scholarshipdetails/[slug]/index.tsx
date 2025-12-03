import { ApplicationModal } from "@/components/scholarshipDetail/ApplicationModal";
import { ScholarshipHeader } from "@/components/scholarshipDetail/ScholarshipHeader";
import { ScholarshipInfoTab } from "@/components/scholarshipDetail/ScholarshipInfoTab";
import {
  useFollowScholarshipMutation,
  useGetApplicationsQuery,
  useGetScholarshipBySlugQuery,
  useUnfollowScholarshipMutation,
} from "@/state/api";
import { router, useLocalSearchParams } from "expo-router";
import React, { useRef, useState } from "react";
import { Animated, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const ScholarshipDetail = () => {
  const { slug } = useLocalSearchParams();

  const { data: dataScholarship, isLoading: isLoadingScholarship } =
    useGetScholarshipBySlugQuery(slug as string, {
      skip: !slug,
    });

  const { data: dataApplications, isLoading: isLoadingApplications } =
    useGetApplicationsQuery(undefined, {
      skip: !slug,
    });

  const [followScholarship, { isLoading: isLoadingFollow }] =
    useFollowScholarshipMutation();
  const [unfollowScholarship, { isLoading: isLoadingUnfollow }] =
    useUnfollowScholarshipMutation();

  const scaleHeart = useRef(new Animated.Value(1)).current;

  const [showApplicationModal, setShowApplicationModal] = useState(false);
  const [selectedApplicationId, setSelectedApplicationId] = useState<
    string | null
  >(null);

  const handleSubmitApplication = async (applicationId: string) => {
    // try {
    //   const res = await apiClientService.post(
    //     "/api/scholarship/applications-scholarship",
    //     {
    //       scholarshipId: id,
    //       applicationId: applicationId,
    //       status: "Pending",
    //     }
    //   );
    //   console.log("SUCCESS:", res);
    //   alert("Application created successfully!");
    //   setShowCreateModal(false);
    // } catch (err: any) {
    //   console.log("ERROR:", err.response?.data || err);
    //   alert("Failed to submit application");
    // }
  };

  const handleFollow = async () => {
    if (!dataScholarship) return;
    if (dataScholarship.isFollow === 1) {
      await unfollowScholarship({ scholarshipId: dataScholarship.id });
    } else {
      await followScholarship({ scholarshipId: dataScholarship.id });
    }
    Animated.sequence([
      Animated.spring(scaleHeart, { toValue: 1.4, useNativeDriver: true }),
      Animated.spring(scaleHeart, { toValue: 1, useNativeDriver: true }),
    ]).start();
  };

  if (isLoadingScholarship) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text className="text-gray-400">Loading scholarship...</Text>
      </View>
    );
  }

  if (!dataScholarship) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text className="text-gray-400">Scholarship not found</Text>
      </View>
    );
  }

  const provider = dataScholarship.providerProfileVo;

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScholarshipHeader
        bannerUrl={provider.bannerUrl}
        logoUrl={provider.logoUrl}
        organizationName={provider.organizationName}
        organizationType={provider.organizationType}
        isFollow={dataScholarship.isFollow}
        scaleHeart={scaleHeart}
        onFollowPress={handleFollow}
      />

      {/* Tab Content */}
      <View className="flex-1 mt-8 mb-8">
        <ScholarshipInfoTab scholarship={dataScholarship} />
      </View>

      {/* Apply Button */}
      <TouchableOpacity
        className="bg-primary-brand p-2 rounded-xl absolute bottom-4 left-4 right-4 z-10"
        onPress={() => setShowApplicationModal(true)}
      >
        <Text className="text-white text-center font-bold text-lg">
          Apply Now
        </Text>
      </TouchableOpacity>

      {/* Application Modal */}
      <ApplicationModal
        visible={showApplicationModal}
        applications={dataApplications || []}
        selectedApplicationId={selectedApplicationId}
        onSelectApplication={setSelectedApplicationId}
        onClose={() => setShowApplicationModal(false)}
        onSubmit={() => {
          if (!selectedApplicationId) return;
          handleSubmitApplication(selectedApplicationId);
          setShowApplicationModal(false);
        }}
        onCreateNew={() => {
          setShowApplicationModal(false);
          router.push(`/(routes)/application/[id]`);
        }}
      />
    </SafeAreaView>
  );
};

export default ScholarshipDetail;
