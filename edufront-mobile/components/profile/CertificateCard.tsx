import { formatDate } from "@/lib/utils";
import { Certificate } from "@/types/profile";
import React from "react";
import { Image, View } from "react-native";
import { Badge } from "../ui/badge";
import { Text } from "../ui/text";

interface CertificateCardProps {
  certificate: Certificate;
}

const CertificateCard = ({ certificate }: { certificate: Certificate }) => {
  return (
    <View
      className="relative border border-[#828282] bg-[#FAFAF6]"
      style={{ borderRadius: 10 }}
    >
      {/* Blue gradient header with score */}
      <View className="h-10 relative">
        <Image
          source={{
            uri: "https://es5urvh1np.ufs.sh/f/DHR6tEJ9PQozNMvBTv3dbqnOiC9glzYQkty01LT7J5ecsEuv",
          }}
          alt="certificate"
          className="w-full h-full object-cover"
          style={{ borderTopLeftRadius: 10, borderTopRightRadius: 10 }}
        />
      </View>

      {/* Score badge */}
      <Badge
        className="absolute bg-white rounded-lg px-2 py-1 border"
        style={{ top: 20, right: 20, borderColor: "#22d3ee" }}
      >
        <Text className="text-md font-bold " style={{ color: "#06b6d4" }}>
          {certificate.score}
        </Text>
      </Badge>

      {/* Certificate details */}
      <View className="p-4 space-y-3" style={{ padding: 16 }}>
        <Text className="text-md font-semibold text-gray-900">
          {certificate.certificateName}
        </Text>

        <View className="space-y-2 text-sm">
          <View className="flex flex-row items-center justify-between">
            <Text className="text-gray-600 font-bold text-xs">Issued By</Text>
            <Text className="text-gray-900 text-xs">
              {certificate.issuedBy}
            </Text>
          </View>

          <View className="flex flex-row items-center justify-between">
            <Text className="text-gray-600 font-bold text-xs">Issue Date</Text>
            <Text className="text-gray-900 text-xs">
              {formatDate(certificate.issueDate)}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default CertificateCard;
