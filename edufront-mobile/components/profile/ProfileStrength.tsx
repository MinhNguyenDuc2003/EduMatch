import React from "react";
import { StyleSheet, View } from "react-native";
import { Text } from "../ui/text";

interface ProfileStrengthProps {
  percentage: number;
}

const ProfileStrength = ({ percentage }: ProfileStrengthProps) => {
  const size = 128;
  const strokeWidth = 10;

  return (
    <View className="bg-[#FAFAF6] rounded-lg border border-[#828282] p-6">
      <Text variant="h3" className="text-sm font-semibold text-gray-900">
        Profile Strength
      </Text>

      <View className="flex flex-col items-center">
        <View style={styles.circularProgressContainer}>
          {/* Background circle */}
          <View
            style={[
              styles.circleBackground,
              {
                width: size,
                height: size,
                borderRadius: size / 2,
                borderWidth: strokeWidth,
                borderColor: "#0B5C8C",
              },
            ]}
          />

          {/* Percentage text */}
          <View style={styles.textContainer}>
            <Text variant="h3" className="text-2xl font-bold text-[#0B5C8C]">
              {percentage}%
            </Text>
          </View>
        </View>

        {/* Descriptive text */}
        <View className="mt-4">
          <Text className="text-sm text-gray-700 font-medium text-center">
            A complete profile leads to better results.
          </Text>
          <Text className="text-xs text-gray-600 mt-1 text-center">
            Fill out each section below to improve the quality of your
            scholarship matches.
          </Text>
        </View>
      </View>
    </View>
  );
};

export default ProfileStrength;

const styles = StyleSheet.create({
  circularProgressContainer: {
    position: "relative",
    width: 128,
    height: 128,
    justifyContent: "center",
    alignItems: "center",
  },
  circleBackground: {
    position: "absolute",
  },
  progressContainer: {
    position: "absolute",
    width: 128,
    height: 128,
    justifyContent: "center",
    alignItems: "center",
  },
  textContainer: {
    position: "absolute",
    width: 128,
    height: 128,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 10,
  },
});
