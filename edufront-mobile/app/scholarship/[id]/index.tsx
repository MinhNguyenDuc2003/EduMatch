import apiClientService from "@/apiController/ApiClientService";
import { HeartIcon } from "lucide-react-native";
import React, { useEffect, useState } from "react";
import { Text, View, Image, FlatList, Pressable } from "react-native";

const Home = () => {
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await apiClientService.post(
          "/api/scholarship/scholarships/page",
          {
            criteria: {
              country: "",
              university: "",
              studyLevel: "",
              scholarshipType: "",
            },
            sortBy: "id",
            sortDirection: "DESC",
            page: 0,
            size: 5,
          }
        );
        setData(response.data.content);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const renderItem = ({ item }: { item: any }) => {
    const startDate = new Date(item.startDate).toLocaleDateString();
    const endDate = new Date(item.endDate).toLocaleDateString();

    return (
      <View
        onTouchStart={() => alert("fff")}
        className="bg-green-50 rounded-2xl shadow-lg pt-4 pb-4 mb-4 cursor-pointer border border-green-500 border-3px"
      >
        {/* Header: Logo + Organization */}
        <View className="flex-row items-center mb-3 pl-3 pr-3">
          <Image
            source={{ uri: item.providerProfileVo.logoUrl }}
            className="w-16 h-16 rounded-sm mr-3"
          />
          <View className="flex-1">
            <Text className="text-lg font-semibold text-gray-800">
              {item.title}
            </Text>
            <Text className="text-sm text-gray-500">{item.university}</Text>
          </View>
        </View>

        {/* Details */}
        <View className="flex-row justify-between items-center pl-3 pr-3">
          
        <View className="flex-row   gap-7 items-center">
          <Text className="text-sm text-gray-800 font-medium bg-gray-200 p-2 rounded-2xl">{item.fundingAmount}</Text>
          <Text className="text-sm text-gray-800 font-medium bg-gray-200 p-2 rounded-2xl">{item.country}</Text>
          {/* <Text className="text-sm text-gray-800 font-medium bg-gray-200 p-2 rounded-2xl">{item.availableSlots}</Text> */}
        </View>
        <View className="border border-green-500 flex items-center rounded-full p-2 ">
           <HeartIcon size={16} color={"#22c55e"}/> 
        </View>
        </View>
       
      </View>
    );
  };

  return (
    <View className="flex-1 bg-gray-100 p-4 mb-36">
      {data.length === 0 ? (
        <Text className="text-center text-gray-500 mt-10">Loading scholarships...</Text>
      ) : (
        <View>
          <View className="flex-row justify-between items-center pb-5">
          <Text className="text-xl font-bold">Việc làm tốt nhấtff</Text>
          </View>
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 16 }}
          />
      </View>
      )}
    </View>
  );
};

export default Home;
