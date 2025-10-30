import { COUNTRY_CODES, PHONE_TYPES } from "@/constants";
import { IProfileForm } from "@/lib/schemas";
import { Plus, Trash2 } from "lucide-react-native";
import React from "react";
import { useFieldArray, useFormContext } from "react-hook-form";
import { ScrollView, View } from "react-native";
import CustomFormField from "../CustomFormField";
import { Button } from "../ui/button";
import { Text } from "../ui/text";

const PhoneNumbers = () => {
  const { control } = useFormContext<IProfileForm>();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "applicantProfile.phoneNumbers",
  });

  const handleAddPhone = () => {
    append({
      phoneType: "",
      countryCode: "+1",
      phoneNumber: "",
      isInternational: false,
    });
  };

  return (
    <ScrollView style={{ height: 500 }}>
      <View>
        <View className="flex flex-row items-center justify-between">
          <Text className="font-bold text-gray-900 mb-2">Phone Numbers</Text>
          <Button
            // variant="custom"
            className="bg-[#00B8D9] text-white px-3 py-2 rounded-md flex items-center gap-1 h-fit"
            onPress={handleAddPhone}
          >
            <Plus size={12} color="white" />
            <Text className="font-medium text-xs">Add</Text>
          </Button>
        </View>
        <Text variant="h4" className="text-xs text-gray-600 mb-4">
          Describe the phone numbers you want (you can add more phone numbers if
          you want)
        </Text>

        <View className="flex flex-col gap-2">
          {fields.map((field, index) => (
            <View
              key={field.id}
              className="flex flex-row items-center justify-center border border-gray-200 rounded-lg px-4 py-2 gap-3"
            >
              <View className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center text-sm font-medium text-gray-600 border border-gray-700">
                <Text>{index + 1}</Text>
              </View>

              <View className="flex flex-col gap-2 flex-1">
                <CustomFormField
                  name={`applicantProfile.phoneNumbers.${index}.phoneNumber`}
                  label="Phone Number"
                  placeholder="Enter phone number"
                  inlineLabel
                  isBorder
                />

                <CustomFormField
                  name={`applicantProfile.phoneNumbers.${index}.phoneType`}
                  label="Phone Type"
                  type="select"
                  placeholder="Select type"
                  options={PHONE_TYPES}
                  inlineLabel
                  isBorder
                />

                <CustomFormField
                  name={`applicantProfile.phoneNumbers.${index}.countryCode`}
                  label="Country Code"
                  type="select"
                  placeholder="Select code"
                  options={COUNTRY_CODES}
                  inlineLabel
                  isBorder
                />

                <CustomFormField
                  name={`applicantProfile.phoneNumbers.${index}.isInternational`}
                  label="International"
                  type="switch"
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
      </View>
    </ScrollView>
  );
};

export default PhoneNumbers;
