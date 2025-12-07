import React from "react";
import { Text, View } from "react-native";
import CustomFormField from "../CustomFormField";

const Activities = () => {
  return (
    <View className="flex flex-col gap-4">
      <Text className="font-semibold text-lg">Activities</Text>

      <CustomFormField
        name="applicantProfile.favoriteActivities"
        label="Favorite Activities"
        placeholder="Favorite Activities"
        inlineLabel
        isBorder
      />

      <CustomFormField
        name="applicantProfile.sportsParticipated"
        label="Sports Participated"
        placeholder="Sports Participated"
        inlineLabel
        isBorder
      />

      <CustomFormField
        name="applicantProfile.studentActivities"
        label="Student Activities"
        placeholder="Student Activities"
        inlineLabel
        isBorder
      />

      <CustomFormField
        name="applicantProfile.organizationsJoined"
        label="Organizations Joined"
        placeholder="Organizations Joined"
        inlineLabel
        isBorder
      />

      <CustomFormField
        name="applicantProfile.researchExperience"
        label="Research Experience"
        placeholder="Research Experience"
        inlineLabel
        isBorder
      />

      <CustomFormField
        name="applicantProfile.careerGoals"
        label="Career Goals"
        placeholder="Career Goals"
        inlineLabel
        isBorder
      />

      <CustomFormField
        name="applicantProfile.researchInterest"
        label="Research Interest"
        placeholder="Research Interest"
        inlineLabel
        isBorder
      />

      <CustomFormField
        name="applicantProfile.extracurricularActivities"
        label="Extracurricular Activities"
        placeholder="Extracurricular Activities"
        inlineLabel
        isBorder
      />
    </View>
  );
};

export default Activities;
