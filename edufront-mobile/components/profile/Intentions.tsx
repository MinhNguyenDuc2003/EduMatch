import {
  COUNTRIES,
  MAJOR_CATEGORIES,
  MAJOR_NAMES,
  STUDY_LEVELS,
} from "@/constants";
import { IApplicantProfile } from "@/lib/schemas";
import { Trash2 } from "lucide-react-native";
import React from "react";
import { useFieldArray, useFormContext } from "react-hook-form";
import { Text, View } from "react-native";
import CustomFormField from "../CustomFormField";
import { Button } from "../ui/button";

const Intentions = () => {
  const { control } = useFormContext<IApplicantProfile>();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "applicantProfile.intentions",
  });

  const handleAddIntention = () => {
    append({
      intendedInstitution: "",
      intendedState: "",
      intendedCountry: "",
      degreeType: "",
      intendedMajorCategory: "",
      intendedMajorName: "",
      academicClassification: "",
      expectedStartDate: "",
      expectedGraduationYear: 0,
      isTransferStudent: false,
      isReturningStudent: false,
      notes: "",
    });
  };

  return (
    <View className="flex flex-col gap-4">
      <Text className="font-semibold text-lg">Intentions</Text>

      <View className="flex flex-col gap-4">
        {fields.map((field, index) => (
          <View
            key={index}
            className="border-2 border-gray-400 rounded-lg p-2 flex flex-col gap-2"
          >
            <View className="flex flex-row items-center justify-between mb-2">
              <Text className="font-semibold ">Intention {index + 1}</Text>
              <Button
                variant="ghost"
                className="py-1 px-2 h-fit bg-none"
                onPress={() => remove(index)}
              >
                <Trash2 className="mr-2" size={16} color="red" />
              </Button>
            </View>

            <CustomFormField
              name={`applicantProfile.intentions.${index}.intendedInstitution`}
              label="Intended Institution"
              placeholder="Enter intended institution"
              inlineLabel
              isBorder
            />

            <CustomFormField
              name={`applicantProfile.intentions.${index}.intendedState`}
              label="Intended State"
              placeholder="Enter intended state"
              inlineLabel
              isBorder
            />

            <CustomFormField
              name={`applicantProfile.intentions.${index}.intendedCountry`}
              label="Intended Country"
              placeholder="Enter intended country"
              type="select"
              options={COUNTRIES}
              inlineLabel
              isBorder
            />

            <CustomFormField
              name={`applicantProfile.intentions.${index}.degreeType`}
              label="Degree Type"
              placeholder="Enter degree type"
              type="select"
              options={STUDY_LEVELS}
              inlineLabel
              isBorder
            />

            <CustomFormField
              name={`applicantProfile.intentions.${index}.intendedMajorCategory`}
              label="Intended Major Category"
              placeholder="Enter intended major category"
              type="select"
              options={MAJOR_CATEGORIES}
              inlineLabel
              isBorder
            />

            <CustomFormField
              name={`applicantProfile.intentions.${index}.intendedMajorName`}
              label="Intended Major Name"
              placeholder="Enter intended major name"
              type="select"
              options={MAJOR_NAMES}
              inlineLabel
              isBorder
            />

            <CustomFormField
              name={`applicantProfile.intentions.${index}.academicClassification`}
              label="Academic Classification"
              placeholder="Enter academic classification"
              inlineLabel
              isBorder
            />

            <CustomFormField
              name={`applicantProfile.intentions.${index}.expectedStartDate`}
              label="Expected Start Date"
              placeholder="Enter expected start date"
              type="date"
              inlineLabel
              isBorder
            />

            <CustomFormField
              name={`applicantProfile.intentions.${index}.expectedGraduationYear`}
              label="Expected Graduation Year"
              type="number"
              placeholder="Enter expected graduation year"
              inlineLabel
              isBorder
            />

            <CustomFormField
              name={`applicantProfile.intentions.${index}.isTransferStudent`}
              label="Is Transfer Student"
              placeholder="Enter is transfer student"
              type="switch"
              inlineLabel
              isBorder
            />

            <CustomFormField
              name={`applicantProfile.intentions.${index}.isReturningStudent`}
              label="Is Returning Student"
              type="switch"
              placeholder="Enter is returning student"
              inlineLabel
              isBorder
            />

            <CustomFormField
              name={`applicantProfile.intentions.${index}.notes`}
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

export default Intentions;
