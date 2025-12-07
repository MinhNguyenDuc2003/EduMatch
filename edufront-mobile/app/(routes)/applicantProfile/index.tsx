import Activities from "@/components/profile/Activities";
import Certificates from "@/components/profile/Certificates";
import EducationHistory from "@/components/profile/EducationHistory";
import Intentions from "@/components/profile/Intentions";
import Preferences from "@/components/profile/Preferences";
import PreferredPreferences from "@/components/profile/PreferredPreferences";
import Skills from "@/components/profile/Skills";
import StudentInformation from "@/components/profile/StudentInformation";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Text } from "@/components/ui/text";
import { DEFAULT_PROFILE_FORM_VALUES } from "@/constants";
import { applicantProfileSchema, IApplicantProfile } from "@/lib/schemas";
import {
  useCreateProfileMutation,
  useGetProfileQuery,
  useUpdateProfileMutation,
} from "@/state/api";
import { zodResolver } from "@hookform/resolvers/zod";
import { router } from "expo-router";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { ScrollView, View } from "react-native";

const index = () => {
  const { data: profileData, isLoading: isLoadingProfile } =
    useGetProfileQuery();
  const [createProfile, { isLoading: isLoadingCreateProfile }] =
    useCreateProfileMutation();
  const [updateProfile, { isLoading: isLoadingUpdateProfile }] =
    useUpdateProfileMutation();

  const methods = useForm<IApplicantProfile>({
    reValidateMode: "onSubmit",
    mode: "onChange",
    resolver: zodResolver(applicantProfileSchema),
    defaultValues: DEFAULT_PROFILE_FORM_VALUES,
  });

  useEffect(() => {
    if (profileData) {
      const formData = {
        applicantProfile: {
          ...DEFAULT_PROFILE_FORM_VALUES.applicantProfile,
          ...profileData.applicantProfile,
        },
      };
      methods.reset(formData);
    }
  }, [profileData, methods]);

  const onSubmit = async (data: IApplicantProfile) => {
    try {
      // Call API to update or create student info
      if (profileData?.applicantProfile) {
        await updateProfile(data)
          .unwrap()
          .then(() => {
            router.push("/(tabs)/profile");
          });
      } else {
        await createProfile(data)
          .unwrap()
          .then(() => {
            router.push("/(tabs)/profile");
          });
      }
    } catch (error) {
      console.log("Error updating student info:", error);
      throw error;
    }
  };

  return (
    <ScrollView className="flex-1 p-4">
      <Form {...methods}>
        <View className="flex flex-col gap-4">
          <StudentInformation />
          <PreferredPreferences />
          <Activities />
          <Preferences />
          <Intentions />
          <EducationHistory />
          <Skills />
          <Certificates />
        </View>
        <Button
          className="bg-primary-brand p-0 rounded-xl mt-4"
          disabled={isLoadingCreateProfile || isLoadingUpdateProfile}
          onPress={methods.handleSubmit(onSubmit)}
        >
          <Text className="text-white">
            {profileData?.applicantProfile
              ? "Update Profile"
              : "Create Profile"}
          </Text>
        </Button>
      </Form>
    </ScrollView>
  );
};

export default index;
