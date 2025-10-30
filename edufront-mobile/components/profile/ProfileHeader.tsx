import React from "react";
import { View } from "react-native";
import { Text } from "../ui/text";

interface ProfileHeaderProps {
  name: string;
  role: string;
  avatarUrl?: string;
  stats: {
    matchedScholarships: number;
    matchedResearchOpportunities: number;
    scholarshipAmount: string;
  };
}

const ProfileHeader = ({
  name,
  role,
  avatarUrl,
  stats,
}: ProfileHeaderProps) => {
  return (
    <View className="bg-[#FAFAF6] rounded-md flex gap-6 border border-[#828282] p-6 ">
      <View className="flex flex-col gap-2 items-center justify-center">
        <View className="w-48 h-24 bg-gray-300 rounded-md flex items-center justify-center flex-shrink-0"></View>
        <View className="flex flex-col items-center justify-center">
          <Text className="text-lg font-bold text-primary-brand" variant="h2">
            {name}
          </Text>
          <Text className="text-lg text-gray-600">{role}</Text>
        </View>
      </View>

      <View className="flex flex-col gap-2 w-full justify-center items-center">
        <View className="bg-[#0B5C8C] flex flex-row items-center justify-between rounded-md px-4 py-2 min-w-full">
          <Text className="font-semibold text-md text-white">
            {stats.matchedScholarships}
          </Text>
          <Text className="text-md text-white">Matched Scholarships</Text>
        </View>
        <View className="bg-[#0B5C8C]  flex flex-row items-center justify-between rounded-md px-4 py-2 min-w-full">
          <Text className="font-semibold text-md text-white">
            {stats.matchedResearchOpportunities}
          </Text>
          <Text className="text-md text-white">
            Matched Research Opportunities
          </Text>
        </View>
        <View className="bg-[#0B5C8C] flex flex-row items-center justify-between rounded-md px-4 py-2 min-w-full">
          <Text className="font-semibold text-md text-white">
            {stats.scholarshipAmount}
          </Text>
          <Text className="text-md text-white">
            Matched Scholarships Amount
          </Text>
        </View>
      </View>
    </View>
  );
};

export default ProfileHeader;
