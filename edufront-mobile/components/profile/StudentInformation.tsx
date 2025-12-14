import {
  CITIZENSHIP_STATUS,
  COUNTRIES,
  ETHNICITIES,
  RACES,
  RELIGIONS,
  STUDY_LEVELS,
} from "@/constants";
import React from "react";
import { Text, View } from "react-native";
import CustomFormField from "../CustomFormField";

const StudentInformation = () => {
  return (
    <View className="flex flex-col gap-4">
      <Text className="font-semibold text-lg">Student Information</Text>

      <CustomFormField
        name="applicantProfile.firstName"
        label="First Name"
        placeholder="Enter your first name"
        inlineLabel
        isBorder
      />

      <CustomFormField
        name="applicantProfile.lastName"
        label="Last Name"
        placeholder="Enter your last name"
        inlineLabel
        isBorder
      />

      <CustomFormField
        name="applicantProfile.contactName"
        label="Contact Name"
        placeholder="Enter your contact name"
        inlineLabel
        isBorder
      />

      <CustomFormField
        name="applicantProfile.phoneNumber"
        label="Phone Number"
        placeholder="+1 234 567 8900"
        inlineLabel
        isBorder
      />

      <CustomFormField
        name="applicantProfile.religion"
        label="Religion"
        type="select"
        placeholder="Select your religion"
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
        name="applicantProfile.educationLevel"
        label="Education Level"
        type="select"
        placeholder="Select your education level"
        options={STUDY_LEVELS}
        inlineLabel
        isBorder
      />

      <CustomFormField
        name="applicantProfile.satScore"
        label="SAT Score"
        type="number"
        placeholder="Enter your SAT score"
        inlineLabel
        isBorder
      />

      <CustomFormField
        name="applicantProfile.actScore"
        label="ACT Score"
        type="number"
        placeholder="Enter your ACT score"
        inlineLabel
        isBorder
      />

      <CustomFormField
        name="applicantProfile.greScore"
        label="GRE Score"
        type="number"
        placeholder="Enter your GRE score"
        inlineLabel
        isBorder
      />

      <CustomFormField
        name="applicantProfile.gmatScore"
        label="GMAT Score"
        type="number"
        placeholder="Enter your GMAT score"
        inlineLabel
        isBorder
      />

      <CustomFormField
        name="applicantProfile.toeflScore"
        label="TOEFL Score"
        type="number"
        placeholder="Enter your TOEFL score"
        inlineLabel
        isBorder
      />

      <CustomFormField
        name="applicantProfile.ieltsScore"
        label="IELTS Score"
        type="number"
        placeholder="Enter your IELTS score"
        inlineLabel
        isBorder
      />

      <CustomFormField
        name="applicantProfile.languages"
        label="Languages"
        placeholder="Enter your languages"
        inlineLabel
        isBorder
      />

      <CustomFormField
        name="applicantProfile.academicAwards"
        label="Academic Awards"
        placeholder="Enter your academic awards"
        inlineLabel
        isBorder
      />

      <CustomFormField
        name="applicantProfile.publicationCount"
        label="Publication Count"
        type="number"
        placeholder="0"
        inlineLabel
        isBorder
      />

      <CustomFormField
        name="applicantProfile.ethnicity"
        label="Ethnicity"
        type="select"
        placeholder="Select your ethnicity"
        options={ETHNICITIES}
        inlineLabel
        isBorder
      />

      <CustomFormField
        name="applicantProfile.race"
        label="Race"
        type="select"
        placeholder="Select your race"
        options={RACES}
        inlineLabel
        isBorder
      />

      <CustomFormField
        name="applicantProfile.hometown"
        label="Hometown"
        placeholder="Enter your hometown"
        options={COUNTRIES}
        inlineLabel
        isBorder
      />

      <CustomFormField
        name="applicantProfile.citizenshipStatus"
        label="Citizenship Status"
        type="select"
        placeholder="Select your citizenship status"
        options={CITIZENSHIP_STATUS}
        inlineLabel
        isBorder
      />

      <CustomFormField
        name="applicantProfile.disabilities"
        label="Disabilities"
        placeholder="Enter your disabilities"
        inlineLabel
        isBorder
      />

      <CustomFormField
        name="applicantProfile.medicalConditions"
        label="Medical Conditions"
        placeholder="Enter your medical conditions"
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
  );
};

export default StudentInformation;
