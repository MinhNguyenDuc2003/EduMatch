import { ApplicationModal } from "@/components/scholarshipDetail/ApplicationModal";
import { ScholarshipHeader } from "@/components/scholarshipDetail/ScholarshipHeader";
import { ScholarshipInfoTab } from "@/components/scholarshipDetail/ScholarshipInfoTab";
import {
  useFollowProviderMutation,
  useFollowScholarshipMutation,
  useGetApplicationsQuery,
  useGetScholarshipBySlugQuery,
  useSubmitApplicationMutation,
  useUnfollowProviderMutation,
  useUnfollowScholarshipMutation,
} from "@/state/api";
import { router, useLocalSearchParams } from "expo-router";
import { HeartIcon } from "lucide-react-native";
import React, { useRef, useState } from "react";
import { Animated, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Toast } from "toastify-react-native";

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

  const [followScholarship] = useFollowScholarshipMutation();
  const [unfollowScholarship] = useUnfollowScholarshipMutation();

  const [followProvider] = useFollowProviderMutation();
  const [unfollowProvider] = useUnfollowProviderMutation();

  const [submitApplication] = useSubmitApplicationMutation();

  const scaleHeart = useRef(new Animated.Value(1)).current;

  const [showApplicationModal, setShowApplicationModal] = useState(false);
  const [selectedApplicationId, setSelectedApplicationId] = useState<
    number | null
  >(null);

  const handleSubmitApplication = async (applicationId: number) => {
    try {
      if (!dataScholarship) return;

      await submitApplication({
        scholarshipId: dataScholarship.id,
        applicationId: applicationId,
        status: "Pending",
        note: "",
      })
        .unwrap()
        .then(() => {
          Toast.success("Application submitted successfully!");
          setShowApplicationModal(false);
        });
    } catch (err: any) {
      console.log("ERROR:", err.response?.data || err);
      Toast.error("Failed to submit application");
    }
  };

  const handleFollowScholarship = async () => {
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

  const handleFollowProvider = async () => {
    if (!dataScholarship) return;
    if (dataScholarship.providerProfileVo.isFollow === 1) {
      await unfollowProvider(dataScholarship.providerProfileVo.id);
    } else {
      await followProvider(dataScholarship.providerProfileVo.id);
    }
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
        isFollow={dataScholarship.providerProfileVo.isFollow}
        scaleHeart={scaleHeart}
        onFollowPress={handleFollowProvider}
      />

      {/* Tab Content */}
      <View className="flex-1 mt-8 mb-8">
        <ScholarshipInfoTab scholarship={dataScholarship} />
      </View>

      <View className="flex flex-row items-center absolute bottom-4 left-4 right-4 z-10 gap-2">
        <TouchableOpacity
          onPress={handleFollowScholarship}
          className="p-2 rounded-lg border-primary-brand border"
        >
          <Animated.View style={{ transform: [{ scale: scaleHeart }] }}>
            <HeartIcon
              size={22}
              color={"#3d6cb9"}
              fill={dataScholarship.isFollow === 1 ? "#3d6cb9" : "transparent"}
            />
          </Animated.View>
        </TouchableOpacity>
        {/* Apply Button */}
        <TouchableOpacity
          className="bg-primary-brand p-2 rounded-xl flex-1"
          onPress={() => setShowApplicationModal(true)}
        >
          <Text className="text-white text-center font-bold text-lg">
            Apply Now
          </Text>
        </TouchableOpacity>
      </View>

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
