import { Intention } from "@/types/profile";
import React, { useState } from "react";
import { Image, View } from "react-native";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Text } from "../ui/text";
import IntentionDetail from "./IntentionDetail";

interface IntentionCardProps {
  intention: Intention;
}

const IntentionCard = ({ intention }: IntentionCardProps) => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
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

          {/* Certificate details */}
          <View className="p-4 space-y-3" style={{ padding: 16 }}>
            <Text className="text-md font-semibold text-gray-900">
              {intention.intendedInstitution}
            </Text>

            <View className="space-y-2 text-sm">
              <View className="flex flex-row items-center justify-between">
                <Text className="text-gray-600 font-bold text-xs">
                  Degree Type
                </Text>
                <Text className="text-gray-900 text-xs">
                  {intention.degreeType}
                </Text>
              </View>

              <View className="flex flex-row items-center justify-between">
                <Text className="text-gray-600 font-bold text-xs">
                  Intended Major Category
                </Text>
                <Text className="text-gray-900 text-xs">
                  {intention.intendedMajorCategory}
                </Text>
              </View>

              <View className="flex flex-row items-center justify-between">
                <Text className="text-gray-600 font-bold text-xs">
                  Intended Major Name
                </Text>
                <Text className="text-gray-900 text-xs">
                  {intention.intendedMajorName}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </DialogTrigger>
      <DialogContent className="min-w-[400px] bg-[#FAFAF6] ">
        <DialogTitle>Intention Details</DialogTitle>
        <IntentionDetail intention={intention} />
      </DialogContent>
    </Dialog>
  );
};

export default IntentionCard;
