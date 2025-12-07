import {
  COUNTRIES,
  INSTITUTION_TYPES,
  MAJOR_CATEGORIES,
  MAJOR_NAMES,
  STUDY_LEVELS,
} from "@/constants";
import { IApplicantProfile } from "@/lib/schemas";
import { Plus, Trash2 } from "lucide-react-native";
import React from "react";
import { useFieldArray, useFormContext } from "react-hook-form";
import { Text, View } from "react-native";
import CustomFormField from "../CustomFormField";
import { Button } from "../ui/button";

const EducationHistory = () => {
  const { control } = useFormContext<IApplicantProfile>();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "applicantProfile.educationHistories",
  });

  const handleAddEducation = () => {
    append({
      institutionName: "",
      institutionType: "",
      state: "",
      country: "",
      degreeType: "",
      majorCategory: "",
      majorName: "",
      gpa: 0,
      classRank: "",
      classSize: 0,
      enrollmentStartDate: "",
      enrollmentEndDate: "",
      graduationYear: 0,
      isDualEnrolled: false,
      isTransfer: false,
      isReturningStudent: false,
      notes: "",
    });
  };

  return (
    <View className="flex flex-col gap-4">
      <View className="flex flex-row items-center justify-between">
        <Text className="text-lg font-bold">Education History</Text>
        <Button
          variant="ghost"
          className="py-1 px-2 h-fit bg-none"
          onPress={handleAddEducation}
        >
          <Plus className="mr-2" size={16} color="black" />
        </Button>
      </View>

      <View className="flex flex-col gap-4">
        {fields.map((field, index) => (
          <View
            key={field.id}
            className="border-2 border-gray-400 rounded-lg p-2 flex flex-col gap-2"
          >
            <View className="flex flex-row items-center justify-between mb-2">
              <Text className="font-semibold ">Education {index + 1}</Text>
              <Button
                variant="ghost"
                className="py-1 px-2 h-fit bg-none"
                onPress={() => remove(index)}
              >
                <Trash2 className="mr-2" size={16} color="red" />
              </Button>
            </View>

            <CustomFormField
              name={`applicantProfile.educationHistories.${index}.institutionName`}
              label="Institution Name"
              placeholder="Enter institution name"
              inlineLabel
              isBorder
            />

            <CustomFormField
              name={`applicantProfile.educationHistories.${index}.institutionType`}
              label="Institution Type"
              type="select"
              placeholder="Select institution type"
              options={INSTITUTION_TYPES}
              inlineLabel
              isBorder
            />

            <CustomFormField
              name={`applicantProfile.educationHistories.${index}.state`}
              label="State"
              placeholder="Enter state"
              inlineLabel
              isBorder
            />

            <CustomFormField
              name={`applicantProfile.educationHistories.${index}.country`}
              label="Country"
              placeholder="Enter country"
              type="select"
              options={COUNTRIES}
              inlineLabel
              isBorder
            />

            <CustomFormField
              name={`applicantProfile.educationHistories.${index}.degreeType`}
              label="Degree Type"
              type="select"
              placeholder="Select degree type"
              options={STUDY_LEVELS}
              inlineLabel
              isBorder
            />

            <CustomFormField
              name={`applicantProfile.educationHistories.${index}.majorCategory`}
              label="Major Category"
              type="select"
              placeholder="Select major category"
              options={MAJOR_CATEGORIES}
              inlineLabel
              isBorder
            />

            <CustomFormField
              name={`applicantProfile.educationHistories.${index}.majorName`}
              label="Major Name"
              type="select"
              placeholder="Select major name"
              options={MAJOR_NAMES}
              inlineLabel
              isBorder
            />

            <CustomFormField
              name={`applicantProfile.educationHistories.${index}.gpa`}
              label="GPA"
              type="number"
              placeholder="3.8"
              inlineLabel
              isBorder
            />

            <CustomFormField
              name={`applicantProfile.educationHistories.${index}.classRank`}
              label="Class Rank"
              placeholder="Enter class rank"
              inlineLabel
              isBorder
            />

            <CustomFormField
              name={`applicantProfile.educationHistories.${index}.classSize`}
              label="Class Size"
              type="number"
              placeholder="200"
              inlineLabel
              isBorder
            />

            <CustomFormField
              name={`applicantProfile.educationHistories.${index}.enrollmentStartDate`}
              label="Enrollment Start Date"
              type="date"
              inlineLabel
              isBorder
            />

            <CustomFormField
              name={`applicantProfile.educationHistories.${index}.enrollmentEndDate`}
              label="Enrollment End Date"
              type="date"
              inlineLabel
              isBorder
            />

            <CustomFormField
              name={`applicantProfile.educationHistories.${index}.graduationYear`}
              label="Graduation Year"
              type="number"
              placeholder="Enter graduation year"
              inlineLabel
              isBorder
            />

            <CustomFormField
              name={`applicantProfile.educationHistories.${index}.isDualEnrolled`}
              label="Dual Enrolled"
              type="switch"
              inlineLabel
              isBorder
            />

            <CustomFormField
              name={`applicantProfile.educationHistories.${index}.isTransfer`}
              label="Transfer Student"
              type="switch"
              inlineLabel
              isBorder
            />

            <CustomFormField
              name={`applicantProfile.educationHistories.${index}.isReturningStudent`}
              label="Returning Student"
              type="switch"
              inlineLabel
              isBorder
            />

            <CustomFormField
              name={`applicantProfile.educationHistories.${index}.notes`}
              label="Notes"
              placeholder="Enter notes"
              inlineLabel
              isBorder
            />
          </View>
        ))}
      </View>
    </View>
  );
};

export default EducationHistory;
