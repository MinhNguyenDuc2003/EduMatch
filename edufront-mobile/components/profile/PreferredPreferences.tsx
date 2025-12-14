import React from "react";
import { Text, View } from "react-native";
import CustomFormField from "../CustomFormField";

const PreferredPreferences = () => {
  return (
    <View className="flex flex-col gap-4">
      <Text className="font-semibold text-lg">Preferred Preferences</Text>

      <CustomFormField
        name="applicantProfile.preferredScholarshipType"
        label="Preferred Scholarship Type"
        placeholder="Select Preferred Scholarship Type"
        inlineLabel
        isBorder
      />

      <CustomFormField
        name="applicantProfile.preferredCountry"
        label="Preferred Country"
        placeholder="Select Preferred Country"
        inlineLabel
        isBorder
      />

      <CustomFormField
        name="applicantProfile.preferredMajor"
        label="Preferred Major"
        placeholder="Select Preferred Major"
        inlineLabel
        isBorder
      />
    </View>
  );
};

export default PreferredPreferences;
