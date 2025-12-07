import { router } from "expo-router";
import { ArrowLeft, HeartIcon } from "lucide-react-native";
import React from "react";
import { Animated, Image, Text, TouchableOpacity, View } from "react-native";

interface ScholarshipHeaderProps {
  bannerUrl: string;
  logoUrl: string;
  organizationName: string;
  organizationType: string;
  isFollow: number;
  scaleHeart: Animated.Value;
  onFollowPress: () => void;
}

export const ScholarshipHeader: React.FC<ScholarshipHeaderProps> = ({
  bannerUrl,
  logoUrl,
  organizationName,
  organizationType,
  isFollow,
  scaleHeart,
  onFollowPress,
}) => {
  return (
    <View className="relative">
      <Image
        source={{ uri: bannerUrl }}
        style={{
          width: "100%",
          height: 200,
          borderBottomLeftRadius: 24,
          borderBottomRightRadius: 24,
        }}
        resizeMode="cover"
      />

      <TouchableOpacity
        onPress={() => router.back()}
        className="bg-white/60 rounded-full p-2 top-2 absolute left-4"
      >
        <ArrowLeft size={24} color="#3d6cb9" />
      </TouchableOpacity>

      <View className="bg-white shadow-md shadow-gray-300 rounded-xl p-2 flex-row items-center absolute -bottom-6 left-4 right-4 z-10">
        <Image
          source={{ uri: logoUrl }}
          style={{ width: 50, height: 50, borderRadius: 8, marginLeft: 10 }}
        />
        <View style={{ flex: 1, marginLeft: 10 }}>
          <Text style={{ fontSize: 16, fontWeight: "bold" }}>
            {organizationName}
          </Text>
          <Text style={{ fontSize: 12, color: "#6b7280" }}>
            {organizationType}
          </Text>
        </View>

        <TouchableOpacity
          onPress={onFollowPress}
          className="p-2 rounded-lg border-primary-brand border"
        >
          <Animated.View style={{ transform: [{ scale: scaleHeart }] }}>
            <HeartIcon
              size={22}
              color={"#3d6cb9"}
              fill={isFollow === 1 ? "#3d6cb9" : "transparent"}
            />
          </Animated.View>
        </TouchableOpacity>
      </View>
    </View>
  );
};
