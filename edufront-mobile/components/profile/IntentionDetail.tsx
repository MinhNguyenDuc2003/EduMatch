import { formatDate } from "@/lib/utils";
import { Intention } from "@/types/profile";
import {
  ArrowRightLeft,
  BookOpen,
  Building2,
  Calendar,
  CalendarCheck,
  GraduationCap,
  RefreshCw,
  User,
} from "lucide-react-native";
import React from "react";
import { View } from "react-native";
import { Badge } from "../ui/badge";
import { Text } from "../ui/text";

interface IntentionDetailProps {
  intention: Intention;
}

const IntentionDetail = ({ intention }: IntentionDetailProps) => {
  return (
    <View className="flex ">
      <View className="flex flex-row items-start gap-3  pb-3 border-b border-gray-200">
        <View className="p-2 bg-blue-50 rounded-lg">
          <Building2 size={20} color="#2563eb" />
        </View>
        <View className="">
          <Text className="font-semibold text-gray-900 text-base ">
            {intention.intendedInstitution}
          </Text>
          <Text className="text-xs text-gray-500 mt-1">
            {intention.intendedState && intention.intendedCountry
              ? `${intention.intendedState}, ${intention.intendedCountry}`
              : intention.intendedCountry || intention.intendedState || ""}
          </Text>
        </View>
      </View>

      <View className="flex gap-1 mb-4">
        <Text className="font-semibold text-gray-900 text-base ">
          Academic Infomation
        </Text>

        <View className="flex flex-row items-center justify-between gap-3">
          <View className="flex flex-row items-center gap-2">
            <GraduationCap size={20} color="#4b5563" />
            <Text className="text-xs text-gray-600 font-bold ">
              Degree Type
            </Text>
          </View>
          <Text className="text-xs font-medium text-gray-900">
            {intention.degreeType}
          </Text>
        </View>

        <View className="flex flex-row items-center justify-between gap-3">
          <View className="flex flex-row items-center gap-2">
            <BookOpen size={20} color="#4b5563" />
            <Text className="text-xs text-gray-600 font-bold ">
              Major Category
            </Text>
          </View>
          <Text className="text-xs font-medium text-gray-900">
            {intention.intendedMajorCategory}
          </Text>
        </View>

        <View className="flex flex-row items-center justify-between gap-3">
          <View className="flex flex-row items-center gap-2">
            <BookOpen size={20} color="#4b5563" />
            <Text className="text-xs text-gray-600 font-bold ">Major Name</Text>
          </View>
          <Text className="text-xs font-medium text-gray-900">
            {intention.intendedMajorName}
          </Text>
        </View>

        {intention.academicClassification && (
          <View className="flex flex-row items-center justify-between gap-3">
            <View className="flex flex-row items-center gap-2">
              <User size={20} color="#4b5563" />
              <Text className="text-xs text-gray-600 font-bold ">
                Academic Classification
              </Text>
            </View>
            <Text className="text-xs font-medium text-gray-900">
              {intention.academicClassification}
            </Text>
          </View>
        )}
      </View>

      <View className="flex gap-1 mb-4 border-t border-gray-200">
        <Text className="font-semibold text-gray-900 text-base ">Timeline</Text>

        <View className="flex flex-row items-center justify-between gap-3">
          <View className="flex flex-row items-center gap-2">
            <Calendar size={20} color="#4b5563" />
            <Text className="text-xs text-gray-600 font-bold ">
              Expected Start Date
            </Text>
          </View>
          <Text className="text-xs font-medium text-gray-900">
            {intention.expectedStartDate
              ? formatDate(intention.expectedStartDate)
              : "Not specified"}
          </Text>
        </View>

        <View className="flex flex-row items-center justify-between gap-3">
          <View className="flex flex-row items-center gap-2">
            <CalendarCheck size={20} color="#4b5563" />
            <Text className="text-xs text-gray-600 font-bold ">
              Expected Graduation Year
            </Text>
          </View>
          <Text className="text-xs font-medium text-gray-900">
            {intention.expectedGraduationYear}
          </Text>
        </View>
      </View>

      <View className="flex gap-1 mb-4 pt-3 border-t border-gray-200">
        <Text className="font-semibold text-gray-900 text-base ">
          Student Status
        </Text>
        <View className="flex flex-row items-center justify-between gap-3">
          <View className="flex flex-row items-center gap-2">
            <ArrowRightLeft size={20} color="#4b5563" />
            <Text className="text-xs text-gray-600 font-bold ">
              Transfer Student
            </Text>
          </View>
          <Badge
            className={`inline-block px-2 py-1`}
            style={{
              backgroundColor: intention.isTransferStudent
                ? "#dbeafe"
                : "#f3f4f6",
            }}
          >
            <Text
              className={`text-xs font-medium `}
              style={{
                color: intention.isTransferStudent ? "#1d4ed8" : "#4b5563",
              }}
            >
              {intention.isTransferStudent ? "Yes" : "No"}
            </Text>
          </Badge>
        </View>

        <View className="flex flex-row items-center justify-between gap-3">
          <View className="flex flex-row items-center gap-2">
            <RefreshCw size={20} color="#4b5563" />
            <Text className="text-xs text-gray-600 font-bold ">
              Returning Student
            </Text>
          </View>
          <Badge
            className={`inline-block px-2 py-1`}
            style={{
              backgroundColor: intention.isTransferStudent
                ? "#dcfce7"
                : "#f3f4f6",
            }}
          >
            <Text
              className="text-xs font-medium "
              style={{
                color: intention.isReturningStudent ? "#15803d" : "#4b5563",
              }}
            >
              {intention.isReturningStudent ? "Yes" : "No"}
            </Text>
          </Badge>
        </View>
      </View>

      <View className="flex flex-row items-center justify-between  pt-3 border-t border-gray-200">
        <Text className="font-semibold text-gray-900 text-base ">Notes</Text>
        <Text className="text-xs font-medium text-gray-900">
          {intention.notes}
        </Text>
      </View>
    </View>
  );
};

export default IntentionDetail;
