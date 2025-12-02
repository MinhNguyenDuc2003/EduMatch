import apiClientService from "@/apiController/ApiClientService";
import { useRouter } from "expo-router";
import { HeartIcon, X } from "lucide-react-native";
import React, { useEffect, useState } from "react";
import {
  FlatList,
  Image,
  Modal,
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";

const Application = () => {
  const [data, setData] = useState<any[]>([]);
  const [selectedApplication, setSelectedApplication] = useState<any | null>(
    null
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await apiClientService.get(
          "/api/scholarship/applications-scholarship/my"
        );
        console.log(response);
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const renderItem = ({ item }: { item: any }) => {
    const scholarship = item.scholarshipVo;
    const application = item.applicationVo;

    return (
      <View className="bg-white rounded-2xl shadow-lg mb-4 p-4 border border-gray-300">
        <Pressable
          onPress={() =>
            router.push(`/scholarshipdetails/${scholarship.id}` as any)
          }
          className="flex-row items-center mb-3"
        >
          <Image
            source={{ uri: scholarship.providerProfileVo.logoUrl }}
            className="w-16 h-16 rounded-md mr-3"
          />
          <View className="flex-1">
            <Text className="text-lg font-semibold text-gray-800">
              {scholarship.title}
            </Text>
            <Text className="text-sm text-gray-500">
              {scholarship.university}
            </Text>
          </View>
        </Pressable>

        <View className="flex-row justify-between items-center mb-2">
          <View className="flex-row gap-3">
            <Text className="text-sm text-gray-800 font-medium bg-gray-200 p-2 rounded-2xl">
              {scholarship.fundingAmount}
            </Text>
            <Text className="text-sm text-gray-800 font-medium bg-gray-200 p-2 rounded-2xl">
              {scholarship.country}
            </Text>
          </View>
          <HeartIcon
            size={20}
            color={scholarship.isFollow ? "#22c55e" : "#ccc"}
          />
        </View>

        <Pressable
          onPress={() => {
            setSelectedApplication(application);
            setIsModalOpen(true);
          }}
          className="mt-2 bg-green-500 px-4 py-2 rounded-lg"
        >
          <Text className="text-white text-center font-semibold">
            Show Application
          </Text>
        </Pressable>
      </View>
    );
  };

  const applicationFields = [
    { label: "Full Name", key: "fullName" },
    { label: "Email", key: "email" },
    { label: "Phone", key: "phone" },
    { label: "Address", key: "address" },
    { label: "School Name", key: "schoolName" },
    { label: "Major", key: "major" },
    { label: "GPA", key: "gpa" },
    { label: "Graduation Year", key: "graduationYear" },
    { label: "Skills", key: "skills" },
    { label: "Languages", key: "languages" },
    { label: "Achievements", key: "achievements" },
    { label: "Extracurricular", key: "extracurricular" },
    { label: "Personal Statement", key: "personalStatement" },
  ];

  return (
    <View className="flex-1 bg-gray-100 p-4">
      {data.length === 0 ? (
        <Text className="text-center text-gray-500 mt-10">
          Loading scholarships...
        </Text>
      ) : (
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 16 }}
        />
      )}

      {/* Modal hiển thị applicationVo */}
      <Modal visible={isModalOpen} animationType="slide" transparent={true}>
        <View className="flex-1 bg-black/50 justify-center items-center p-4">
          <View className="bg-white w-full rounded-2xl p-6 max-h-[90%]">
            <Pressable
              onPress={() => setIsModalOpen(false)}
              className="self-end mb-4"
            >
              <X size={24} color="#333" />
            </Pressable>

            <ScrollView>
              {selectedApplication && (
                <>
                  <Text className="text-xl font-bold mb-4">
                    Application Details
                  </Text>
                  <View className="flex flex-row flex-wrap justify-between">
                    {applicationFields.map((field) => (
                      <View
                        key={field.key}
                        className="w-[48%] bg-gray-100 rounded-lg p-3 mb-3"
                      >
                        <Text className="font-semibold text-gray-700">
                          {field.label}
                        </Text>
                        <Text className="text-gray-800 mt-1">
                          {selectedApplication[field.key] ?? "-"}
                        </Text>
                      </View>
                    ))}
                  </View>
                </>
              )}
            </ScrollView>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default Application;
