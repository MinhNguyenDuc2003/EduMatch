import { IApplicantProfile } from "@/lib/schemas";
import { Plus, Trash2 } from "lucide-react-native";
import React from "react";
import { useFieldArray, useFormContext } from "react-hook-form";
import { Text, View } from "react-native";
import CustomFormField from "../CustomFormField";
import { Button } from "../ui/button";

const Skills = () => {
  const { control } = useFormContext<IApplicantProfile>();

  const PROFICIENCY_LEVELS = [
    { value: "Beginner", label: "Beginner" },
    { value: "Intermediate", label: "Intermediate" },
    { value: "Advanced", label: "Advanced" },
    { value: "Expert", label: "Expert" },
  ];

  const { fields, append, remove } = useFieldArray({
    control,
    name: "applicantProfile.skills",
  });

  const handleAddSkill = () => {
    append({
      skillName: "",
      proficiencyLevel: "",
      yearsExperience: 0,
    });
  };
  return (
    <View className="flex flex-col gap-4">
      <View className="flex flex-row items-center justify-between">
        <Text className="text-lg font-bold">Skills</Text>
        <Button
          variant="ghost"
          className="py-1 px-2 h-fit bg-none"
          onPress={handleAddSkill}
        >
          <Plus className="mr-2" size={16} color="black" />
        </Button>
      </View>

      {fields.map((field, index) => (
        <View
          key={field.id}
          className="border-2 border-gray-400 rounded-lg p-2 flex flex-col gap-2"
        >
          <View className="flex flex-row items-center justify-between mb-2">
            <Text className="font-semibold ">Skill {index + 1}</Text>
            <Button
              variant="ghost"
              className="py-1 px-2 h-fit bg-none"
              onPress={() => remove(index)}
            >
              <Trash2 className="mr-2" size={16} color="red" />
            </Button>
          </View>

          <CustomFormField
            name={`applicantProfile.skills.${index}.skillName`}
            label="Skill Name"
            placeholder="Enter skill name"
            inlineLabel
            isBorder
          />

          <CustomFormField
            name={`applicantProfile.skills.${index}.proficiencyLevel`}
            label="Proficiency Level"
            type="select"
            placeholder="Select proficiency level"
            options={PROFICIENCY_LEVELS}
            inlineLabel
            isBorder
          />

          <CustomFormField
            name={`applicantProfile.skills.${index}.yearsExperience`}
            label="Years of Experience"
            type="number"
            placeholder="Enter years of experience"
            inlineLabel
            isBorder
          />
        </View>
      ))}
    </View>
  );
};

export default Skills;
