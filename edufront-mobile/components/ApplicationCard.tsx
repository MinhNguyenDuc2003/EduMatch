import { router } from "expo-router";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

const ApplicationCard = ({ application }: { application: Application }) => {
  return (
    <Pressable
      onPress={() =>
        router.push({
          pathname: "/(routes)/application/[id]",
          params: {
            id: application.id,
          },
        })
      }
      className="bg-blue-50 rounded-2xl flex gap-2 p-4 cursor-pointer border border-primary-brand"
    >
      <Text className="text-md font-semibold text-gray-800 line-clamp-2">
        {application.applicationName}
      </Text>
      <Text className="text-sm text-gray-500">{application.fullName}</Text>

      <View className="flex flex-col gap-2">
        <View className="flex flex-row gap-2 items-center justify-between">
          <Text className="text-sm text-gray-600">GPA</Text>
          <Text className="text-sm font-bold text-gray-900">
            {application.gpa.toFixed(2)}
          </Text>
        </View>
        <View className="flex flex-row gap-2 items-center justify-between">
          <Text className="text-sm text-gray-600">Major</Text>
          <Text className="text-sm font-bold text-gray-900">
            {application.major}
          </Text>
        </View>
        <View className="flex flex-row gap-2 items-center justify-between">
          <Text className="text-sm text-gray-600">Skills</Text>
          <Text className="text-sm font-bold text-gray-900 line-clamp-1">
            {application.skills}
          </Text>
        </View>
      </View>
    </Pressable>
  );
};

export default ApplicationCard;

const styles = StyleSheet.create({});
