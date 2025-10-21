import { CITIZENSHIP_STATUS, ETHNICITIES, RACES, RELIGIONS } from "@/constants";
import React from "react";
import { ScrollView, View } from "react-native";
import CustomFormField from "../CustomFormField";
import { Text } from "../ui/text";

const StudentInformation = () => {
  return (
    <ScrollView style={{ height: 500 }}>
      <View>
        <Text className="font-bold text-gray-900 mb-2">I. Personal</Text>
        <Text variant="h4" className="text-xs text-gray-600 mb-4">
          Provide your personal details and academic background to help us
          understand your qualifications.
        </Text>

        <View className="flex flex-col gap-4">
          <CustomFormField
            name="applicantProfile.firstName"
            label="First Name"
            placeholder="First Name"
            inlineLabel
            isBorder
          />

          <CustomFormField
            name="applicantProfile.lastName"
            label="Last Name"
            placeholder="Last Name"
            inlineLabel
            isBorder
          />

          <CustomFormField
            name="applicantProfile.contactName"
            label="Contact Name"
            placeholder="Add Info"
            inlineLabel
            isBorder
          />

          <CustomFormField
            name="applicantProfile.religion"
            label="Religion"
            type="select"
            placeholder="Select Religion"
            options={RELIGIONS}
            inlineLabel
            isBorder
          />

          <CustomFormField
            name="applicantProfile.overallGpa"
            label="Overall GPA"
            type="number"
            placeholder="3.8"
            inlineLabel
            isBorder
          />

          <CustomFormField
            name="applicantProfile.ethnicity"
            label="Ethnicity"
            type="select"
            placeholder="Select Ethnicity"
            options={ETHNICITIES}
            inlineLabel
            isBorder
          />

          <CustomFormField
            name="applicantProfile.race"
            label="Race"
            type="select"
            placeholder="Select Race"
            options={RACES}
            inlineLabel
            isBorder
          />

          <CustomFormField
            name="applicantProfile.hometown"
            label="Hometown"
            placeholder="Add Info"
            inlineLabel
            isBorder
          />

          <CustomFormField
            name="applicantProfile.citizenshipStatus"
            label="Citizenship Status"
            type="select"
            placeholder="Select Citizenship Status"
            options={CITIZENSHIP_STATUS}
            inlineLabel
            isBorder
          />

          <CustomFormField
            name="applicantProfile.disabilities"
            label="Disabilities"
            placeholder="Add Info"
            inlineLabel
            isBorder
          />

          <CustomFormField
            name="applicantProfile.medicalConditions"
            label="Medical Conditions"
            placeholder="Add Info"
            inlineLabel
            isBorder
          />
          <CustomFormField
            name="applicantProfile.militaryFamilyHistory"
            label="Military Family History"
            type="switch"
            className="mb-4 "
            inlineLabel
            isBorder
          />
        </View>
      </View>

      <View>
        <Text className="font-bold text-gray-900 mb-2">II. Address</Text>
        <Text variant="h4" className="text-xs text-gray-600 mb-4">
          Provide your address information for contact and correspondence
          purposes.
        </Text>

        <View className="flex flex-col gap-4">
          <CustomFormField
            name="addressPostVm.contactName"
            label="Contact Name"
            placeholder="Contact Name"
            inlineLabel
            isBorder
          />

          <CustomFormField
            name="addressPostVm.phone"
            label="Phone"
            placeholder="Phone Number"
            inlineLabel
            isBorder
          />

          <CustomFormField
            name="addressPostVm.addressLine1"
            label="Address Line 1"
            placeholder="Street Address"
            inlineLabel
            isBorder
          />

          <CustomFormField
            name="addressPostVm.addressLine2"
            label="Address Line 2"
            placeholder="Apartment, Suite, etc. (Optional)"
            inlineLabel
            isBorder
          />

          <CustomFormField
            name="addressPostVm.city"
            label="City"
            placeholder="City"
            inlineLabel
            isBorder
          />

          <CustomFormField
            name="addressPostVm.zipCode"
            label="Zip Code"
            placeholder="Zip Code"
            inlineLabel
            isBorder
          />
        </View>
      </View>
    </ScrollView>
  );
};

export default StudentInformation;
