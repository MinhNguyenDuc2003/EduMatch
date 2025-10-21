import React from "react";
import { View } from "react-native";
import { Text } from "../ui/text";

interface SkillCardProps {
  skill: {
    [key: string]: any;
  };
}

const SkillCard = ({ skill }: SkillCardProps) => {
  return (
    <View className="flex flex-col gap-1">
      <Text className="text-xs font-bold text-gray-900 ">
        {skill.skillName}
      </Text>
      <View className="flex flex-col gap-0.5">
        {skill.proficiencyLevel && (
          <View className="flex flex-row items-center text-xs">
            <Text className="font-bold text-xs text-gray-600 w-44">Level:</Text>
            <Text className="text-xs">{skill.proficiencyLevel}</Text>
          </View>
        )}
        {skill.yearsExperience > 0 && (
          <View className="flex flex-row items-center text-xs">
            <Text className="font-bold text-xs text-gray-600 w-44">
              Experience:
            </Text>
            <Text className="text-xs">{skill.yearsExperience} years</Text>
          </View>
        )}
      </View>
    </View>
  );
};

export default SkillCard;
