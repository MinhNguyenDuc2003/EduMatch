import { IApplicantProfile } from "@/lib/schemas";
import { Plus, Trash2 } from "lucide-react-native";
import React from "react";
import { useFieldArray, useFormContext } from "react-hook-form";
import { Text, View } from "react-native";
import CustomFormField from "../CustomFormField";
import { Button } from "../ui/button";

const Preferences = () => {
  const { control, watch } = useFormContext<IApplicantProfile>();

  const PREFERENCE_TYPES = [
    { value: "Location", label: "Location" },
    { value: "Institution Size", label: "Institution Size" },
    { value: "Major Focus", label: "Major Focus" },
    { value: "Campus Culture", label: "Campus Culture" },
    { value: "Career Services", label: "Career Services" },
    { value: "Research Opportunities", label: "Research Opportunities" },
    { value: "Cost", label: "Cost" },
    { value: "Financial Aid", label: "Financial Aid" },
    { value: "Diversity", label: "Diversity" },
    { value: "Athletics", label: "Athletics" },
    { value: "Other", label: "Other" },
  ];

  const { fields, append, remove } = useFieldArray({
    control,
    name: "applicantProfile.applicantPreferences",
  });

  const handleAddPreference = () => {
    append({
      type: "",
      value: "",
      weight: 0,
      note: "",
    });
  };
  return (
    <View className="flex flex-col gap-4">
      <View className="flex flex-row items-center justify-between">
        <Text className="font-semibold text-lg">Preferences</Text>
        <Button
          variant="ghost"
          className="py-1 px-2 h-fit bg-none"
          onPress={handleAddPreference}
        >
          <Plus className="mr-2" size={16} color="black" />
        </Button>
      </View>

      <View className="flex flex-col gap-4">
        {fields.map((field, index) => (
          <View
            key={index}
            className="border-2 border-gray-400 rounded-lg p-2 flex flex-col gap-2"
          >
            <View className="flex flex-row items-center justify-between mb-2">
              <Text className="font-semibold ">Preference {index + 1}</Text>
              <Button
                variant="ghost"
                className="py-1 px-2 h-fit bg-none"
                onPress={() => remove(index)}
              >
                <Trash2 className="mr-2" size={16} color="red" />
              </Button>
            </View>

            <CustomFormField
              name={`applicantProfile.applicantPreferences.${index}.type`}
              label="Type"
              type="select"
              placeholder="Select type"
              options={PREFERENCE_TYPES}
              inlineLabel
              isBorder
            />

            <CustomFormField
              name={`applicantProfile.applicantPreferences.${index}.value`}
              label="Value"
              placeholder="Enter value"
              inlineLabel
              isBorder
            />

            <CustomFormField
              name={`applicantProfile.applicantPreferences.${index}.weight`}
              label="Weight"
              type="number"
              inlineLabel
              placeholder="Enter weight (0-1)"
            />

            {/* Note */}
            <CustomFormField
              name={`applicantProfile.applicantPreferences.${index}.note`}
              label="Note"
              placeholder="Enter note"
              inlineLabel
              isBorder
            />
          </View>
        ))}
      </View>
    </View>
  );
};

export default Preferences;
