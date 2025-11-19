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
  Modal,
  TextInput,
} from "react-native";

const { width, height } = Dimensions.get("window");

const ScholarshipDetail = () => {
  const [dataScholarships, setDataScholarship] = useState<any | null>(null);
  const [dataApplications, setDataApplication] = useState<any[]>([]);
  const { id } = useLocalSearchParams();
  const navigation = useNavigation();

  const scaleHeart = useRef(new Animated.Value(1)).current;
  const [isFollow, setIsFollow] = useState(false);

  // Modal states
  const [showApplicationModal, setShowApplicationModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedApplicationId, setSelectedApplicationId] = useState<
    string | null
  >(null);

  // Form state
  const [formData, setFormData] = useState<any>({
    applicationName: "",
    code: "",
    versionApplication: 1,
    fullName: "",
    gender: "",
    dateOfBirth: "",
    email: "",
    phone: "",
    address: "",
    nationality: "",
    educationLevel: "",
    schoolName: "",
    major: "",
    gpa: "",
    graduationYear: "",
    skills: "",
    languages: "",
    achievements: "",
    extracurricular: "",
    motivation: "",
    personalStatement: "",
  });

  const updateField = (key: string, value: string) => {
    setFormData({ ...formData, [key]: value });
  };

  const handleSubmitApplication = async (applicationId: string) => {
    try {
      alert("Application submitted successfully!");
    } catch (err) {
      alert("Submit failed!");
    }
  };
const handleCreateApplication = async () => {
  try {
    const body = new FormData();

    // Append JSON application
    body.append(
      "application",
      JSON.stringify({
        applicationName: formData.applicationName || "1333",
        code: formData.code || "1333",
        versionApplication: formData.versionApplication,
        fullName: formData.fullName,
        gender: formData.gender,
        dateOfBirth: formData.dateOfBirth,
        email: formData.email,
        phone: formData.phone,
        address: formData.address,
        nationality: formData.nationality,
        educationLevel: formData.educationLevel,
        schoolName: formData.schoolName,
        major: formData.major,
        gpa: Number(formData.gpa),
        graduationYear: formData.graduationYear,
        skills: formData.skills,
        languages: formData.languages,
        achievements: formData.achievements,
        extracurricular: formData.extracurricular,
        motivation: formData.motivation,
        personalStatement: formData.personalStatement,
      })
    );

    // Append mediaFiles placeholder nếu không có file
    if (!formData.mediaFiles || formData.mediaFiles.length === 0) {
      body.append("mediaFiles", "string"); // placeholder giống cURL
    } else {
      formData.mediaFiles.forEach((file: any, index: number) => {
        body.append("mediaFiles", {
          uri: file.uri,
          name: file.name || `file_${index}.jpg`,
          type: file.type || "image/jpeg",
        } as any);
      });
    }

    // Debug FormData
    for (let [key, value] of body.entries()) {
      console.log("FormData Entry:", key, value);
    }

    // Gọi API (không cần set Content-Type thủ công)
    const res = await apiClientService.post("/api/scholarship/applications", body);

    console.log("SUCCESS:", res);
    alert("Application created successfully!");
    setShowCreateModal(false);
  } catch (err: any) {
    console.log("ERROR:", err.response?.data || err);
    alert("Failed to submit application");
  }
};






  // Ẩn footer tabs
  React.useLayoutEffect(() => {
    navigation.getParent()?.setOptions({ tabBarStyle: { display: "none" } });
  }, [navigation]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await apiClientService.get(
          `/api/scholarship/scholarships/${id}`
        );
        setDataScholarship(res.data);
      } catch (error) {
        console.error("Error fetching scholarship:", error);
      }
    };

    const fetchApplications = async () => {
      try {
        const res = await apiClientService.get(
          `/api/scholarship/applications/my-application`
        );
        setDataApplication(res.data);
      } catch (error) {
        console.error("Error fetching applications:", error);
      }
    };

    fetchData();
    fetchApplications();
  }, []);

  const handleFollow = () => {
    setIsFollow(!isFollow);
    Animated.sequence([
      Animated.spring(scaleHeart, { toValue: 1.4, useNativeDriver: true }),
      Animated.spring(scaleHeart, { toValue: 1, useNativeDriver: true }),
    ]).start();
  };

  if (!dataScholarships) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text className="text-gray-400">Loading scholarship...</Text>
      </View>
    );
  }

  const provider = dataScholarships.providerProfileVo;

  const startDate = new Date(dataScholarships.startDate).toLocaleDateString();
  const endDate = new Date(dataScholarships.endDate).toLocaleDateString();

  const infoItems = [
    {
      icon: <GraduationCap size={20} color="#16a34a" />,
      label: "University",
      value: dataScholarships.university,
    },
    {
      icon: <Globe size={20} color="#16a34a" />,
      label: "Country",
      value: dataScholarships.country,
    },
    {
      icon: <DollarSign size={20} color="#16a34a" />,
      label: "Funding",
      value: dataScholarships.fundingAmount,
    },
    {
      icon: <BookOpen size={20} color="#16a34a" />,
      label: "Study Level",
      value: dataScholarships.studyLevel,
    },
    {
      icon: <GraduationCap size={20} color="#16a34a" />,
      label: "Available Slots",
      value: dataScholarships.availableSlots,
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

      {/* Back button on banner */}
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={{
          position: "absolute",
          top: 40,
          left: 20,
          zIndex: 20,
          backgroundColor: "rgba(255,255,255,0.7)",
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
          top: 160,
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

      {/* Scrollable Content */}
      <ScrollView
        contentContainerStyle={{
          paddingTop: 60,
          paddingBottom: 80,
          paddingHorizontal: 20,
        }}
      >
        <Text style={{ fontSize: 24, fontWeight: "bold", marginBottom: 4 }}>
          {dataScholarships.title}
        </Text>
        <Text style={{ color: "#4b5563", marginBottom: 12 }}>
          {dataScholarships.shortDescription}
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

        {section("Requirements", dataScholarships.requirements)}
        {section("Language Requirement", dataScholarships.languageRequirement)}
        {section("GPA Requirement", dataScholarships.gpaRequirement)}
        {section("Benefits", dataScholarships.benefits)}
        {section("Fields", dataScholarships.fields)}

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

      {/* APPLY NOW BUTTON */}
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
        onPress={() => setShowApplicationModal(true)}
      >
        <Text style={{ color: "white", fontWeight: "bold", fontSize: 16 }}>
          Apply Now
        </Text>
      </TouchableOpacity>

      {/* ======================================================= */}
      {/*     APPLICATION LIST MODAL                              */}
      {/* ======================================================= */}
      <Modal visible={showApplicationModal} animationType="slide" transparent>
        <View
          style={{
            flex: 1,
            backgroundColor: "rgba(0,0,0,0.4)",
            justifyContent: "flex-end",
          }}
        >
          <View
            style={{
              backgroundColor: "white",
              padding: 20,
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
              maxHeight: height * 0.7,
            }}
          >
            <Text
              style={{ fontSize: 20, fontWeight: "bold", marginBottom: 10 }}
            >
              My Applications
            </Text>

            <ScrollView style={{ maxHeight: height * 0.5 }}>
              {dataApplications.map((item: any) => {
                const isSelected = selectedApplicationId === item.id;

                return (
                  <TouchableOpacity
                    key={item.id}
                    onPress={() => setSelectedApplicationId(item.id)}
                    style={{
                      backgroundColor: isSelected ? "#e0f7eb" : "#f3f4f6",
                      padding: 12,
                      borderRadius: 12,
                      marginBottom: 10,
                      borderWidth: isSelected ? 2 : 0,
                      borderColor: isSelected ? "#16a34a" : "transparent",
                    }}
                  >
                    <Text
                      style={{
                        fontWeight: "bold",
                        color: isSelected ? "#065f46" : "black",
                      }}
                    >
                      {item.applicationName}
                    </Text>
                    <Text
                      style={{
                        color: isSelected ? "#059669" : "#6b7280",
                      }}
                    >
                      {item.code}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>

            {/* Buttons */}
            <View style={{ flexDirection: "row", marginTop: 15 }}>
              {/* Close */}
              <TouchableOpacity
                onPress={() => setShowApplicationModal(false)}
                style={{
                  flex: 1,
                  padding: 12,
                  backgroundColor: "#9ca3af",
                  borderRadius: 12,
                  marginRight: 10,
                  alignItems: "center",
                }}
              >
                <Text style={{ color: "white", fontWeight: "bold" }}>
                  Close
                </Text>
              </TouchableOpacity>

              {/* Submit Selected */}
              <TouchableOpacity
                disabled={!selectedApplicationId}
                onPress={() => {
                  if (!selectedApplicationId) return;
                  handleSubmitApplication(selectedApplicationId); // <-- Gọi submit
                  setShowApplicationModal(false);
                }}
                style={{
                  flex: 1,
                  padding: 12,
                  backgroundColor: selectedApplicationId
                    ? "#16a34a"
                    : "#d1d5db",
                  borderRadius: 12,
                  alignItems: "center",
                }}
              >
                <Text style={{ color: "white", fontWeight: "bold" }}>
                  Submit
                </Text>
              </TouchableOpacity>
            </View>

            {/* Create New */}
            <TouchableOpacity
              onPress={() => {
                setShowApplicationModal(false);
                setShowCreateModal(true);
              }}
              style={{
                marginTop: 12,
                padding: 12,
                backgroundColor: "#2563eb",
                borderRadius: 12,
                alignItems: "center",
              }}
            >
              <Text style={{ color: "white", fontWeight: "bold" }}>
                Create New
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* ======================================================= */}
      {/*     CREATE APPLICATION FORM MODAL                       */}
      {/* ======================================================= */}
      {/* ======================================================= */}
      {/*     CREATE APPLICATION FORM MODAL (REDESIGNED)         */}
      {/* ======================================================= */}
      <Modal visible={showCreateModal} animationType="slide">
        <ScrollView style={{ padding: 20 }}>
          <Text style={{ fontSize: 22, fontWeight: "bold", marginBottom: 20 }}>
            Create New Application
          </Text>

          {/* ========= PERSONAL INFO ========== */}
          <Text className="text-lg font-semibold mb-2">
            Personal Information
          </Text>

          <View className="flex-row gap-4">
            <View className="flex-1">
              <Text className="font-medium mb-1">Full Name</Text>
              <TextInput
                value={formData.fullName}
                onChangeText={(t) => updateField("fullName", t)}
                className="border border-gray-300 rounded-xl p-3"
              />
            </View>

            <View className="flex-1">
              <Text className="font-medium mb-1">Gender</Text>
              <TextInput
                value={formData.gender}
                onChangeText={(t) => updateField("gender", t)}
                className="border border-gray-300 rounded-xl p-3"
              />
            </View>
          </View>

          <View className="flex-row gap-4 mt-4">
            <View className="flex-1">
              <Text className="font-medium mb-1">Date of Birth</Text>
              <TextInput
                value={formData.dateOfBirth}
                onChangeText={(t) => updateField("dateOfBirth", t)}
                className="border border-gray-300 rounded-xl p-3"
              />
            </View>

            <View className="flex-1">
              <Text className="font-medium mb-1">Nationality</Text>
              <TextInput
                value={formData.nationality}
                onChangeText={(t) => updateField("nationality", t)}
                className="border border-gray-300 rounded-xl p-3"
              />
            </View>
          </View>

          {/* ========= CONTACT INFO ========== */}
          <Text className="text-lg font-semibold mt-8 mb-2">
            Contact Information
          </Text>

          <View className="flex-row gap-4">
            <View className="flex-1">
              <Text className="font-medium mb-1">Email</Text>
              <TextInput
                value={formData.email}
                onChangeText={(t) => updateField("email", t)}
                className="border border-gray-300 rounded-xl p-3"
              />
            </View>

            <View className="flex-1">
              <Text className="font-medium mb-1">Phone</Text>
              <TextInput
                value={formData.phone}
                onChangeText={(t) => updateField("phone", t)}
                className="border border-gray-300 rounded-xl p-3"
              />
            </View>
          </View>

          <View className="mt-4">
            <Text className="font-medium mb-1">Address</Text>
            <TextInput
              value={formData.address}
              onChangeText={(t) => updateField("address", t)}
              className="border border-gray-300 rounded-xl p-3"
            />
          </View>

          {/* ========= EDUCATION INFO ========== */}
          <Text className="text-lg font-semibold mt-8 mb-2">
            Education Information
          </Text>

          <View className="flex-row gap-4">
            <View className="flex-1">
              <Text className="font-medium mb-1">School Name</Text>
              <TextInput
                value={formData.schoolName}
                onChangeText={(t) => updateField("schoolName", t)}
                className="border border-gray-300 rounded-xl p-3"
              />
            </View>

            <View className="flex-1">
              <Text className="font-medium mb-1">Major</Text>
              <TextInput
                value={formData.major}
                onChangeText={(t) => updateField("major", t)}
                className="border border-gray-300 rounded-xl p-3"
              />
            </View>
          </View>

          <View className="flex-row gap-4 mt-4">
            <View className="flex-1">
              <Text className="font-medium mb-1">GPA</Text>
              <TextInput
                value={formData.gpa}
                onChangeText={(t) => updateField("gpa", t)}
                className="border border-gray-300 rounded-xl p-3"
              />
            </View>

            <View className="flex-1">
              <Text className="font-medium mb-1">Graduation Year</Text>
              <TextInput
                value={formData.graduationYear}
                onChangeText={(t) => updateField("graduationYear", t)}
                className="border border-gray-300 rounded-xl p-3"
              />
            </View>
          </View>

          {/* ========= SKILLS / LANGUAGES ========== */}
          <Text className="text-lg font-semibold mt-8 mb-2">
            Skills & Languages
          </Text>

          <View>
            <Text className="font-medium mb-1">Skills</Text>
            <TextInput
              value={formData.skills}
              onChangeText={(t) => updateField("skills", t)}
              className="border border-gray-300 rounded-xl p-3"
            />
          </View>

          <View className="mt-4">
            <Text className="font-medium mb-1">Languages</Text>
            <TextInput
              value={formData.languages}
              onChangeText={(t) => updateField("languages", t)}
              className="border border-gray-300 rounded-xl p-3"
            />
          </View>

          {/* ========= EXTRA INFO ========== */}
          <Text className="text-lg font-semibold mt-8 mb-2">Additional</Text>

          <View>
            <Text className="font-medium mb-1">Achievements</Text>
            <TextInput
              value={formData.achievements}
              onChangeText={(t) => updateField("achievements", t)}
              className="border border-gray-300 rounded-xl p-3"
              multiline
            />
          </View>

          <View className="mt-4">
            <Text className="font-medium mb-1">Extracurricular</Text>
            <TextInput
              value={formData.extracurricular}
              onChangeText={(t) => updateField("extracurricular", t)}
              className="border border-gray-300 rounded-xl p-3"
              multiline
            />
          </View>

          <View className="mt-4">
            <Text className="font-medium mb-1">Personal Statement</Text>
            <TextInput
              value={formData.personalStatement}
              onChangeText={(t) => updateField("personalStatement", t)}
              className="border border-gray-300 rounded-xl p-3"
              multiline
            />
          </View>

          {/* =========== SUBMIT BUTTONS =========== */}
          <TouchableOpacity
            onPress={() => handleCreateApplication()}
            className="bg-green-600 p-4 rounded-xl mt-8"
          >
            <Text className="text-white text-center font-bold text-lg">
              Submit
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setShowCreateModal(false)}
            className="bg-gray-400 p-4 rounded-xl mt-3"
          >
            <Text className="text-white text-center font-bold">Cancel</Text>
          </TouchableOpacity>
        </ScrollView>
      </Modal>
    </View>
  );
};

// Section component
const section = (title: string, content: string) => (
  <View style={{ marginBottom: 16 }}>
    <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 4 }}>
      {title}
    </Text>
    <Text style={{ color: "#374151", lineHeight: 22 }}>{content}</Text>
  </View>
);

export default ScholarshipDetail;
