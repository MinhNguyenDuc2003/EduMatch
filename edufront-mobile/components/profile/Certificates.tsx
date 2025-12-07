import { IApplicantProfile } from "@/lib/schemas";
import { Plus, Trash2 } from "lucide-react-native";
import React from "react";
import { useFieldArray, useFormContext } from "react-hook-form";
import { Text, View } from "react-native";
import CustomFormField from "../CustomFormField";
import { Button } from "../ui/button";

const Certificates = () => {
  const { control } = useFormContext<IApplicantProfile>();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "applicantProfile.certificates",
  });

  const handleAddCertificate = () => {
    append({
      certificateName: "",
      issuedBy: "",
      issueDate: "",
      expiryDate: "",
      score: "",
    });
  };

  return (
    <View className="flex flex-col gap-4">
      <View className="flex flex-row items-center justify-between">
        <Text className="text-lg font-bold">Certificates</Text>
        <Button
          variant="ghost"
          className="py-1 px-2 h-fit bg-none"
          onPress={handleAddCertificate}
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
            <Text className="font-semibold ">Certificate {index + 1}</Text>
            <Button
              variant="ghost"
              className="py-1 px-2 h-fit bg-none"
              onPress={() => remove(index)}
            >
              <Trash2 className="mr-2" size={16} color="red" />
            </Button>
          </View>

          <CustomFormField
            name={`applicantProfile.certificates.${index}.certificateName`}
            label="Certificate Name"
            placeholder="Enter certificate name"
            inlineLabel
            isBorder
          />

          <CustomFormField
            name={`applicantProfile.certificates.${index}.issuedBy`}
            label="Issued By"
            placeholder="Enter issued by"
            inlineLabel
            isBorder
          />

          <CustomFormField
            name={`applicantProfile.certificates.${index}.issueDate`}
            label="Issue Date"
            type="date"
            placeholder="Enter issue date"
            inlineLabel
            isBorder
          />

          <CustomFormField
            name={`applicantProfile.certificates.${index}.expiryDate`}
            label="Expiry Date"
            type="date"
            placeholder="Enter expiry date"
            inlineLabel
            isBorder
          />

          <CustomFormField
            name={`applicantProfile.certificates.${index}.score`}
            label="Score"
            type="number"
            placeholder="Enter score"
            inlineLabel
            isBorder
          />
        </View>
      ))}
    </View>
  );
};

export default Certificates;
