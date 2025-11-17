import apiClientService from "@/apiController/ApiClientService";
import { useLocalSearchParams, useNavigation } from "expo-router";
import {
  HeartIcon,
  Calendar,
  GraduationCap,
  Globe,
  DollarSign,
  BookOpen,
  ArrowLeft,
} from "lucide-react-native";
import React, { useEffect, useRef, useState } from "react";
import {
  Image,
  Text,
  View,
  ScrollView,
  Animated,
  TouchableOpacity,
  Dimensions,
} from "react-native";

const { width, height } = Dimensions.get("window");

const ScholarshipDetail = () => {
  const [data, setData] = useState<any | null>(null);
  const { id } = useLocalSearchParams();
  const navigation = useNavigation();
  const scaleHeart = useRef(new Animated.Value(1)).current;
  const [isFollow, setIsFollow] = useState(false);

  // Ẩn footer tabs
  React.useLayoutEffect(() => {
    navigation.getParent()?.setOptions({ tabBarStyle: { display: "none" } });
  }, [navigation]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await apiClientService.get(
          `/api/scholarship/scholarships/${id}`
        );
        setData(response.data);
      } catch (error) {
        console.error("Error fetching scholarship:", error);
      }
    };
    fetchData();
  }, []);

  const handleFollow = () => {
    setIsFollow(!isFollow);
    Animated.sequence([
      Animated.spring(scaleHeart, { toValue: 1.4, useNativeDriver: true }),
      Animated.spring(scaleHeart, { toValue: 1, useNativeDriver: true }),
    ]).start();
  };

  if (!data) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text className="text-gray-400">Loading scholarship...</Text>
      </View>
    );
  }

  const provider = data.providerProfileVo;

  const startDate = new Date(data.startDate).toLocaleDateString();
  const endDate = new Date(data.endDate).toLocaleDateString();

  const infoItems = [
    {
      icon: <GraduationCap size={20} color="#16a34a" />,
      label: "University",
      value: data.university,
    },
    {
      icon: <Globe size={20} color="#16a34a" />,
      label: "Country",
      value: data.country,
    },
    {
      icon: <DollarSign size={20} color="#16a34a" />,
      label: "Funding",
      value: data.fundingAmount,
    },
    {
      icon: <BookOpen size={20} color="#16a34a" />,
      label: "Study Level",
      value: data.studyLevel,
    },
    {
      icon: <GraduationCap size={20} color="#16a34a" />,
      label: "Available Slots",
      value: data.availableSlots,
    },
    {
      icon: <Calendar size={20} color="#16a34a" />,
      label: "Timeline",
      value: `${startDate} → ${endDate}`,
    },
  ];

  return (
    <View className="flex-1 bg-white">
      {/* Banner */}
      <Image
        source={{ uri: provider.bannerUrl }}
        style={{
          width: width,
          height: 200,
          borderBottomLeftRadius: 24,
          borderBottomRightRadius: 24,
        }}
        resizeMode="cover"
      />
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={{
          position: "absolute",
          top: 40, // cách đỉnh màn hình, có thể điều chỉnh theo status bar
          left: 20,
          zIndex: 20, // luôn hiển thị trên banner
          backgroundColor: "rgba(255,255,255,0.7)", // optional: nền mờ để nhìn rõ
          borderRadius: 20,
          padding: 6,
        }}
      >
        <ArrowLeft size={24} color="#16a34a" />
      </TouchableOpacity>
      {/* Provider Sticky Info */}
      <View
        style={{
          position: "absolute",
          top: 160, // trên banner
          left: 20,
          right: 20,
          zIndex: 10,
          flexDirection: "row",
          alignItems: "center",
          backgroundColor: "white",
          padding: 10,
          borderRadius: 16,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.25,
          shadowRadius: 4,
          elevation: 5,
        }}
      >
        <Image
          source={{ uri: provider.logoUrl }}
          style={{ width: 50, height: 50, borderRadius: 8, marginLeft: 10 }}
        />
        <View style={{ flex: 1, marginLeft: 10 }}>
          <Text style={{ fontSize: 16, fontWeight: "bold" }}>
            {provider.organizationName}
          </Text>
          <Text style={{ fontSize: 12, color: "#6b7280" }}>
            {provider.organizationType}
          </Text>
        </View>
        <TouchableOpacity onPress={handleFollow}>
          <Animated.View style={{ transform: [{ scale: scaleHeart }] }}>
            <HeartIcon
              size={22}
              color={isFollow ? "#ef4444" : "#16a34a"}
              fill={isFollow ? "#ef4444" : "transparent"}
            />
          </Animated.View>
        </TouchableOpacity>
      </View>

      {/* Scrollable content */}
      <ScrollView
        contentContainerStyle={{
          paddingTop: 60, // tránh che sticky provider
          paddingBottom: 80, // tránh che nút apply
          paddingHorizontal: 20,
        }}
      >
        <Text style={{ fontSize: 24, fontWeight: "bold", marginBottom: 4 }}>
          {data.title}
        </Text>
        <Text style={{ color: "#4b5563", marginBottom: 12 }}>
          {data.shortDescription}
        </Text>

        {/* INFO CARDS */}
        <View
          style={{
            backgroundColor: "#dcfce7",
            borderRadius: 16,
            padding: 16,
            marginBottom: 16,
          }}
        >
          {infoItems.map((item, idx) => (
            <View
              key={idx}
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginBottom: 10,
              }}
            >
              <View style={{ width: 24 }}>{item.icon}</View>
              <View style={{ marginLeft: 10, flex: 1 }}>
                <Text style={{ fontWeight: "600", color: "#166534" }}>
                  {item.label}
                </Text>
                <Text style={{ color: "#065f46" }}>{item.value}</Text>
              </View>
            </View>
          ))}
        </View>

        {/* Sections */}
        {section("Requirements", data.requirements)}
        {section("Language Requirement", data.languageRequirement)}
        {section("GPA Requirement", data.gpaRequirement)}
        {section("Benefits", data.benefits)}
        {section("Fields", data.fields)}

        {/* Provider Contacts */}
        <View
          style={{
            backgroundColor: "#f9fafb",
            padding: 16,
            borderRadius: 16,
            marginBottom: 16,
          }}
        >
          <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 8 }}>
            Provider Contact
          </Text>
          {provider.providerContactDtos.map((c: any) => (
            <View key={c.id} style={{ marginBottom: 8 }}>
              <Text style={{ fontWeight: "600" }}>{c.contactName}</Text>
              <Text style={{ color: "#374151" }}>{c.roleTitle}</Text>
              <Text style={{ color: "#6b7280" }}>{c.email}</Text>
              <Text style={{ color: "#6b7280" }}>{c.phone}</Text>
            </View>
          ))}
        </View>
      </ScrollView>

      {/* APPLY NOW STICKY BUTTON */}
      <TouchableOpacity
        style={{
          position: "absolute",
          bottom: 20,
          left: 20,
          right: 20,
          backgroundColor: "#16a34a",
          borderRadius: 16,
          paddingVertical: 16,
          alignItems: "center",
          zIndex: 10,
        }}
        onPress={() => alert("Apply Now clicked!")}
      >
        <Text style={{ color: "white", fontWeight: "bold", fontSize: 16 }}>
          Apply Now
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const section = (title: string, content: string) => (
  <View style={{ marginBottom: 16 }}>
    <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 4 }}>
      {title}
    </Text>
    <Text style={{ color: "#374151", lineHeight: 22 }}>{content}</Text>
  </View>
);

export default ScholarshipDetail;
