import { Certificate } from "@/types/profile";
import { Pencil } from "lucide-react-native";
import React from "react";
import { View } from "react-native";
import { Button } from "../ui/button";
import { Text } from "../ui/text";
import CertificateCard from "./CertificateCard";

interface CertificatesProps {
  certificates: Certificate[];
  onEdit?: () => void;
}

const Certificates = ({ certificates, onEdit }: CertificatesProps) => {
  return (
    <View className="space-y-4">
      <View className="flex flex-row items-center justify-between mb-4">
        <Text className="text-xl font-semibold " style={{ color: "#3D6CB9" }}>
          Certificates
        </Text>
        {onEdit && (
          <Button
            // variant="custom"
            className="bg-[#00B8D9] text-white px-3 py-2 rounded-md flex items-center gap-1 h-fit"
            onPress={onEdit}
          >
            <Pencil size={12} color="white" />
            <Text className="font-medium text-xs">Edit</Text>
          </Button>
        )}
      </View>

      {certificates.length > 0 ? (
        <View className="flex flex-col gap-4">
          {certificates.map((certificate, index) => (
            <CertificateCard key={index} certificate={certificate} />
          ))}
        </View>
      ) : (
        <View className="flex items-center justify-center">
          <Text className="text-gray-600">
            No certificates added yet. Click the Add button to get started.
          </Text>
        </View>
      )}
    </View>
  );
};

export default Certificates;
