import { PROFICIENCY_LEVELS } from "@/constants";
import { IProfileForm } from "@/lib/schemas";
import { Plus, Trash2 } from "lucide-react-native";
import React from "react";
import { useFieldArray, useFormContext } from "react-hook-form";
import { ScrollView, View } from "react-native";
import CustomFormField from "../CustomFormField";
import { Button } from "../ui/button";
import { Text } from "../ui/text";

const Skills = () => {
  const { control } = useFormContext<IProfileForm>();

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
    <ScrollView style={{ height: 500 }}>
      <View className="flex flex-row items-center justify-between">
        <Text className="font-bold text-gray-900">Skills</Text>
        <Button
          // variant="custom"
          className="bg-[#00B8D9] text-white px-3 py-2 rounded-md flex items-center gap-1 h-fit"
          onPress={handleAddSkill}
        >
          <Plus size={12} color="white" />
          <Text className="font-medium text-xs">Add</Text>
        </Button>
      </View>
      <Text variant="h4" className="text-xs text-gray-600 mb-4">
        Describe the skills you want (you can add more skills if you want)
      </Text>

      <View className="flex flex-col gap-4">
        {fields.map((field, index) => (
          <View
            key={index}
            className="flex flex-row items-center justify-center border border-gray-200 rounded-lg px-4 py-2 gap-3"
          >
            <View className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center text-sm font-medium text-gray-600 border border-gray-700">
              <Text>{index + 1}</Text>
            </View>

            <View className="flex flex-col gap-2 flex-1">
              <CustomFormField
                name={`applicantProfile.skills.${index}.skillName`}
                label="Skill Name"
                placeholder="Enter skill name"
                className="md:col-span-10"
                inlineLabel
                isBorder
              />

              <CustomFormField
                name={`applicantProfile.skills.${index}.proficiencyLevel`}
                label="Proficiency Level"
                type="select"
                placeholder="Select level"
                options={PROFICIENCY_LEVELS}
                inlineLabel
                isBorder
              />

              <CustomFormField
                name={`applicantProfile.skills.${index}.yearsExperience`}
                label="Years Experience"
                type="number"
                placeholder="0"
                inlineLabel
                isBorder
              />

              <Button
                variant={"outline"}
                onPress={() => remove(index)}
                className="p-2 h-fit w-fit self-end"
                style={{ borderColor: "red" }}
              >
                <Trash2 size={16} color="red" />
              </Button>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

export default Skills;
