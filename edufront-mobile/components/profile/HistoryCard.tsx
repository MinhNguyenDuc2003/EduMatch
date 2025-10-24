import { formatDate } from "@/lib/utils";
import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Badge } from "../ui/badge";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Text } from "../ui/text";

interface HistoryCardProps {
  edu: {
    [key: string]: any;
  };
}

const HistoryDetail = ({ edu }: HistoryCardProps) => {
  return (
    <View className="flex gap-2">
      <Text className="font-semibold text-gray-900">{edu.institutionName}</Text>
      <View className=" text-gray-600 space-y-1 flex flex-col">
        <View className="flex flex-col gap-2">
          <View className="flex flex-row items-center justify-between">
            <Text className="font-medium text-xs">Type:</Text>
            <Text className="text-xs">{edu.institutionType}</Text>
          </View>
          <View className="flex flex-row items-center justify-between">
            <Text className="font-medium text-xs">Degree:</Text>
            <Text className="text-xs">{edu.degreeType}</Text>
          </View>
          <View className="flex flex-row items-center justify-between">
            <Text className="font-medium text-xs">Major:</Text>
            <Text className="text-xs">{edu.majorName}</Text>
          </View>
          <View className="flex flex-row items-center justify-between">
            <Text className="font-medium text-xs">Category:</Text>
            <Text className="text-xs">{edu.majorCategory}</Text>
          </View>
          <View className="flex flex-row items-center justify-between">
            <Text className="font-medium text-xs">GPA:</Text>
            <Text className="text-xs">{edu.gpa}</Text>
          </View>
          <View className="flex flex-row items-center justify-between">
            <Text className="font-medium text-xs">Class Rank:</Text>
            <Text className="text-xs">{edu.classRank}</Text>
          </View>
          <View className="flex flex-row items-center justify-between">
            <Text className="font-medium text-xs">Class Size:</Text>
            <Text className="text-xs">{edu.classSize}</Text>
          </View>
          <View className="flex flex-row items-center justify-between">
            <Text className="font-medium text-xs">Graduation:</Text>
            <Text className="text-xs">{edu.graduationYear}</Text>
          </View>
          <View className="flex flex-row items-center justify-between">
            <Text className="font-medium text-xs">Enrollment:</Text>
            <Text className="text-xs">
              {formatDate(edu.enrollmentStartDate)} -{" "}
              {formatDate(edu.enrollmentEndDate)}
            </Text>
          </View>
          <View className="flex flex-row items-center justify-between">
            <Text className="font-medium text-xs">Location:</Text>
            <Text className="text-xs">
              {edu.state}, {edu.country}
            </Text>
          </View>
        </View>

        <View className="mt-2 flex flex-row gap-2">
          {edu.isDualEnrolled && (
            <Badge className="px-2 py-0.5 bg-purple-100  text-xs rounded">
              <Text className="text-xs text-purple-700">Dual Enrolled</Text>
            </Badge>
          )}
          {edu.isTransfer && (
            <Badge className="px-2 py-0.5 bg-blue-100  text-xs rounded">
              <Text className="text-xs text-blue-700">Transfer</Text>
            </Badge>
          )}
          {edu.isReturningStudent && (
            <Badge className="px-2 py-0.5 bg-orange-100  text-xs rounded">
              <Text className="text-xs text-orange-700">Returning</Text>
            </Badge>
          )}
        </View>
        {edu.notes && (
          <View className="mt-2 pt-2 border-t border-gray-200">
            <Text className="text-sm">
              <Text className="font-medium">Notes:</Text> {edu.notes}
            </Text>
          </View>
        )}
      </View>
    </View>
  );
};

const HistoryCard = ({ edu }: HistoryCardProps) => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <View className="space-y-2">
          <Text className="font-semibold text-xs text-gray-900">
            {edu.institutionName}
          </Text>
          <View className="flex flex-row items-center justify-between">
            <View className="flex flex-row gap-1">
              <Text className="font-bold text-xs text-gray-600">Major:</Text>
              <Text className="text-xs">{edu.majorName}</Text>
            </View>
            <View className="flex flex-row gap-1">
              <Text className="font-bold text-xs text-gray-600">GPA:</Text>
              <Text className="text-xs">{edu.gpa}</Text>
            </View>
          </View>
        </View>
      </DialogTrigger>
      <DialogContent className="min-w-[400px] bg-[#FAFAF6]">
        <DialogTitle>History Details</DialogTitle>
        <HistoryDetail edu={edu} />
      </DialogContent>
    </Dialog>
  );
};

export default HistoryCard;

const styles = StyleSheet.create({});
