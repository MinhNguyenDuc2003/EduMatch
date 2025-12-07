import { router } from "expo-router";
import {
  Calendar,
  ExternalLink,
  FileText,
  GraduationCap,
  MapPin,
  TrendingUp,
  User,
} from "lucide-react-native";
import React, { useState } from "react";
import { Image, Pressable, ScrollView, Text, View } from "react-native";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";

const AppliedApplication = ({ item }: { item: ApplicationScholarship }) => {
  const [showModal, setShowModal] = useState(false);

  // Format the applied date
  const formatDate = (timestamp?: number) => {
    if (!timestamp) return "N/A";
    const date = new Date(timestamp);
    return date.toLocaleDateString("vi-VN", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
  };

  // Get status color and label
  const getStatusInfo = (status: string) => {
    switch (status.toLowerCase()) {
      case "pending":
        return {
          color: "bg-yellow-100",
          textColor: "text-yellow-800",
          label: "Pending",
        };
      case "approved":
        return {
          color: "bg-green-100",
          textColor: "text-green-800",
          label: "Approved",
        };
      case "rejected":
        return {
          color: "bg-red-100",
          textColor: "text-red-800",
          label: "Rejected",
        };
      case "under_review":
        return {
          color: "bg-blue-100",
          textColor: "text-blue-800",
          label: "Under Review",
        };
      default:
        return {
          color: "bg-gray-100",
          textColor: "text-gray-800",
          label: status,
        };
    }
  };

  const statusInfo = getStatusInfo(item.status);

  return (
    <>
      <Pressable
        onPress={() => setShowModal(true)}
        className="bg-blue-50 rounded-2xl p-4 border border-primary-brand"
      >
        {/* Header: Scholarship Info */}
        <View className="flex-row items-start mb-3">
          <Image
            source={{ uri: item.scholarshipVo.providerProfileVo.logoUrl }}
            className="w-14 h-14 rounded-lg mr-3"
          />
          <View className="flex-1">
            <Text className="text-base font-bold text-gray-900 line-clamp-2">
              {item.scholarshipVo.title}
            </Text>
            <Text className="text-sm text-gray-600 mt-1">
              {item.scholarshipVo.university}
            </Text>
          </View>
          {/* Status Badge */}
          <View className={`${statusInfo.color} px-3 py-1 rounded-full`}>
            <Text className={`text-xs font-semibold ${statusInfo.textColor}`}>
              {statusInfo.label}
            </Text>
          </View>
        </View>

        {/* Application Details */}
        <View className="border-t border-gray-100 pt-3 gap-2">
          {/* Application Name */}
          <View className="flex-row items-center gap-2">
            <FileText size={16} color="#6B7280" />
            <Text className="text-sm text-gray-700 flex-1" numberOfLines={1}>
              {item.applicationVo.applicationName}
            </Text>
          </View>

          {/* Applied Date */}
          <View className="flex-row items-center gap-2">
            <Calendar size={16} color="#6B7280" />
            <Text className="text-sm text-gray-600">
              Applied: {formatDate(item.createdDate)}
            </Text>
          </View>

          {/* Score (if available) */}
          {item.score !== undefined && item.score !== null && (
            <View className="flex-row items-center gap-2">
              <TrendingUp size={16} color="#6B7280" />
              <Text className="text-sm text-gray-600">
                Match Score: {item.score}%
              </Text>
            </View>
          )}

          {/* Note (if available) */}
          {item.note && (
            <View className="bg-gray-50 p-2 rounded-lg mt-1">
              <Text className="text-xs text-gray-600 italic">
                Note: {item.note}
              </Text>
            </View>
          )}
        </View>

        {/* Footer: Funding & Country */}
        <View className="flex-row gap-2 mt-3 border-t border-gray-100">
          <View className="bg-blue-50 px-3 py-1 rounded-full">
            <Text className="text-xs font-medium text-blue-700">
              {item.scholarshipVo.fundingAmount}
            </Text>
          </View>
          <View className="bg-purple-50 px-3 py-1 rounded-full">
            <Text className="text-xs font-medium text-purple-700">
              {item.scholarshipVo.country}
            </Text>
          </View>
        </View>
      </Pressable>

      {/* Detail Modal */}
      <Dialog open={showModal} onOpenChange={setShowModal}>
        <DialogContent className="max-w-[95%]">
          <DialogHeader>
            <DialogTitle>Application Details</DialogTitle>
            <DialogDescription>
              View your application and scholarship information
            </DialogDescription>
          </DialogHeader>

          <ScrollView
            className="max-h-[400px]"
            showsVerticalScrollIndicator={false}
          >
            <View className="flex flex-col gap-4">
              {/* Status Section */}
              <View className="flex-row items-center justify-between">
                <Text className="text-sm font-semibold text-gray-700">
                  Status
                </Text>
                <View className={`${statusInfo.color} px-3 py-1 rounded-full`}>
                  <Text
                    className={`text-xs font-semibold ${statusInfo.textColor}`}
                  >
                    {statusInfo.label}
                  </Text>
                </View>
              </View>

              {/* Scholarship Information */}
              <View className="border-t border-gray-200 pt-3">
                <Text className="text-base font-bold text-gray-900 mb-3">
                  Scholarship Information
                </Text>

                <View className="flex-row items-start gap-3 mb-3">
                  <Image
                    source={{
                      uri: item.scholarshipVo.providerProfileVo.logoUrl,
                    }}
                    className="w-16 h-16 rounded-lg"
                  />
                  <View className="flex-1">
                    <Text className="text-sm font-semibold text-gray-900">
                      {item.scholarshipVo.title}
                    </Text>
                    <View className="flex-row items-center gap-1 mt-1">
                      <GraduationCap size={14} color="#6B7280" />
                      <Text className="text-xs text-gray-600">
                        {item.scholarshipVo.university}
                      </Text>
                    </View>
                    <View className="flex-row items-center gap-1 mt-1">
                      <MapPin size={14} color="#6B7280" />
                      <Text className="text-xs text-gray-600">
                        {item.scholarshipVo.country}
                      </Text>
                    </View>
                  </View>
                </View>

                <View className="flex-row gap-2">
                  <View className="bg-blue-50 px-3 py-2 rounded-lg flex-1">
                    <Text className="text-xs text-gray-600">Funding</Text>
                    <Text className="text-sm font-semibold text-blue-700">
                      {item.scholarshipVo.fundingAmount}
                    </Text>
                  </View>
                  <View className="bg-purple-50 px-3 py-2 rounded-lg flex-1">
                    <Text className="text-xs text-gray-600">Level</Text>
                    <Text className="text-sm font-semibold text-purple-700">
                      {item.scholarshipVo.studyLevel}
                    </Text>
                  </View>
                </View>
              </View>

              {/* Application Information */}
              <View className="border-t border-gray-200 pt-3">
                <Text className="text-base font-bold text-gray-900 mb-3">
                  Your Application
                </Text>

                <View className="flex flex-col gap-2">
                  <View className="flex-row items-center gap-2">
                    <User size={16} color="#6B7280" />
                    <Text className="text-sm text-gray-700">
                      {item.applicationVo.fullName}
                    </Text>
                  </View>

                  <View className="flex-row items-center gap-2">
                    <FileText size={16} color="#6B7280" />
                    <Text className="text-sm text-gray-700">
                      {item.applicationVo.applicationName}
                    </Text>
                  </View>

                  <View className="flex-row items-center gap-2">
                    <Calendar size={16} color="#6B7280" />
                    <Text className="text-sm text-gray-600">
                      Applied: {formatDate(item.createdDate)}
                    </Text>
                  </View>

                  {item.reviewedAt && (
                    <View className="flex-row items-center gap-2">
                      <Calendar size={16} color="#6B7280" />
                      <Text className="text-sm text-gray-600">
                        Reviewed: {formatDate(item.reviewedAt)}
                      </Text>
                    </View>
                  )}

                  {item.score !== undefined && item.score !== null && (
                    <View className="bg-green-50 p-3 rounded-lg mt-2">
                      <View className="flex-row items-center justify-between">
                        <Text className="text-sm font-semibold text-gray-700">
                          Match Score
                        </Text>
                        <Text className="text-2xl font-bold text-green-700">
                          {item.score}%
                        </Text>
                      </View>
                    </View>
                  )}

                  {item.note && (
                    <View className="bg-yellow-50 p-3 rounded-lg mt-2 border border-yellow-200">
                      <Text className="text-xs font-semibold text-yellow-800 mb-1">
                        Reviewer Note
                      </Text>
                      <Text className="text-sm text-gray-700">{item.note}</Text>
                    </View>
                  )}
                </View>
              </View>
            </View>
          </ScrollView>

          <DialogFooter className="flex-row gap-2">
            <Button
              className="flex-1 bg-blue-600 items-center justify-center"
              onPress={() => {
                setShowModal(false);
                router.push({
                  pathname: "/(routes)/scholarshipdetails/[slug]",
                  params: {
                    slug: item.scholarshipVo.slug,
                  },
                });
              }}
            >
              <ExternalLink size={16} color="white" />
              <Text className="text-white ml-1">View Scholarship</Text>
            </Button>
            <Button
              className="flex-1 bg-primary-brand items-center justify-center"
              onPress={() => {
                setShowModal(false);
                router.push({
                  pathname: "/(routes)/application/[id]",
                  params: {
                    id: item.applicationId,
                  },
                });
              }}
            >
              <FileText size={16} color="white" />
              <Text className="text-white ml-1">View Application</Text>
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AppliedApplication;
