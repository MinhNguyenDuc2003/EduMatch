import ArrayInfoCard from "@/components/profile/ArrayInfoCard";
import Certificates from "@/components/profile/Certificates";
import EditFormDialog from "@/components/profile/EditFormDialog";
import HistoryCard from "@/components/profile/HistoryCard";
import InfoCard from "@/components/profile/InfoCard";
import Intentions from "@/components/profile/Intentions";
import ProfileHeader from "@/components/profile/ProfileHeader";
import ProfileStrength from "@/components/profile/ProfileStrength";
import SkillCard from "@/components/profile/SkillCard";
import { Text } from "@/components/ui/text";
import { mockProfileData } from "@/constants/mockData";
import { transformProfileData } from "@/lib/utils";
import { ProfileData } from "@/types/profile";
import { useRouter } from "expo-router"; // dùng để chuyển trang
import React, { useEffect, useState } from "react";
import { ScrollView, TouchableOpacity, View } from "react-native";

const Profile = () => {
  const router = useRouter(); // hook để điều hướng
  const [uiData, setUiData] = useState<ProfileData>({
    name: "",
    role: "",
    avatarUrl: undefined,
    stats: {
      matchedScholarships: 0,
      matchedResearchOpportunities: 0,
      scholarshipAmount: "$0",
    },
    profileStrength: 0,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [value, setValue] = useState("personal");

  const { applicantProfile, addresses, customer } = mockProfileData;

  useEffect(() => {
    // Simulate async data loading
    const loadProfileData = async () => {
      try {
        // Transform data in useEffect to avoid render-time side effects
        const transformedData = transformProfileData(mockProfileData);
        setUiData(transformedData);
      } catch (error) {
        console.error("Error loading profile data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadProfileData();
  }, []);

  const [activeTab, setActiveTab] = useState("information");

  const handleEdit = (section: string) => {
    setDialogOpen(true);
    setValue(section);
  };

  if (isLoading) {
    return (
      <ScrollView className="bg-gray-50 py-8 px-4 flex-1">
        <View className="max-w-7xl mx-auto space-y-6">
          <View className="bg-[#FAFAF6] rounded-[0.25rem] border border-[#828282] p-6 h-full">
            <View className="flex flex-col lg:gap-4 items-center justify-center">
              <View className="w-48 h-24 bg-gray-300 rounded-md flex items-center justify-center flex-shrink-0 animate-pulse"></View>
              <View className="flex flex-col items-center justify-center">
                <View className="h-6 w-32 bg-gray-300 rounded animate-pulse mb-2"></View>
                <View className="h-4 w-24 bg-gray-300 rounded animate-pulse"></View>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    );
  }

  // danh sách tab
  const tabs = [
    { id: "information", label: "Information" },
    { id: "application", label: "Application" },
    { id: "favourites", label: "Favourites" },
  ];

  return (
    <ScrollView className="bg-gray-50 py-8 px-4 flex-1 flex flex-col ">
      <View className="max-w-7xl mx-auto flex flex-col gap-6">
        {/* Tab Bar */}
        <View className="flex-row justify-around bg-white py-2 border-b border-gray-300">
          {tabs.map((tab) => (
            <TouchableOpacity
              key={tab.id}
              onPress={() => {
                setActiveTab(tab.id);
                if (tab.id === "information") {
                  // Already on profile page, no navigation needed
                } else if (tab.id === "application") {
                  router.push("/ApplicationScreen" as any);
                } else if (tab.id === "favourites") {
                  router.push("/FavouritesScreen" as any);
                }
              }}
            >
              <Text
                className={`text-lg font-bold ${
                  activeTab === tab.id ? "text-blue-600" : "text-gray-500"
                }`}
              >
                {tab.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <View className="flex flex-col gap-6">
          <ProfileHeader
            name={uiData.name}
            role={uiData.role}
            avatarUrl={uiData.avatarUrl}
            stats={uiData.stats}
          />
          <ProfileStrength percentage={uiData.profileStrength} />
        </View>

        <View className="flex flex-col gap-6">
          <InfoCard
            title="Student Information"
            fields={[
              {
                label: "Contact Name",
                value: applicantProfile?.contactName,
              },
              {
                label: "First Name",
                value: applicantProfile?.firstName,
              },
              {
                label: "Last Name",
                value: applicantProfile?.lastName,
              },
              {
                label: "Address",
                value:
                  addresses && addresses.length > 0
                    ? `${addresses[0].addressLine1 || ""}, ${addresses[0].districtName || ""}, ${addresses[0].city || ""}, ${addresses[0].countryName || ""}`
                        .replace(/,\s*,/g, ",")
                        .replace(/^,\s*|,\s*$/g, "")
                    : undefined,
              },
              {
                label: "Overall GPA",
                value: applicantProfile?.overallGpa
                  ? applicantProfile.overallGpa.toFixed(2)
                  : undefined,
              },
              {
                label: "Hometown",
                value: applicantProfile?.hometown,
              },
              {
                label: "Citizenship Status",
                value: applicantProfile?.citizenshipStatus,
              },
              {
                label: "Race",
                value: applicantProfile?.race,
              },
              {
                label: "Ethnicity",
                value: applicantProfile?.ethnicity,
              },
              {
                label: "Religion",
                value: applicantProfile?.religion,
              },
              {
                label: "Military Family History",
                value:
                  applicantProfile?.militaryFamilyHistory !== undefined
                    ? applicantProfile.militaryFamilyHistory
                      ? "Yes"
                      : "No"
                    : undefined,
              },
              {
                label: "Disabilities",
                value: applicantProfile?.disabilities,
              },
              {
                label: "Medical Conditions",
                value: applicantProfile?.medicalConditions,
              },
            ]}
            onEdit={() => {
              handleEdit("personal");
            }}
          />

          <InfoCard
            title="Interests & Activities"
            fields={[
              {
                label: "Art/Music/Theater",
                value: applicantProfile?.favoriteActivities,
              },
              {
                label: "Sports Participated",
                value: applicantProfile?.sportsParticipated,
              },
              {
                label: "Student Activities",
                value: applicantProfile?.studentActivities,
              },
              {
                label: "Organizations Joined",
                value: applicantProfile?.organizationsJoined,
              },
              {
                label: "Career Goals",
                value: applicantProfile?.careerGoals,
              },
              {
                label: "Research Experience",
                value: applicantProfile?.researchExperience,
              },
            ]}
            onEdit={() => {
              handleEdit("activities");
            }}
          />

          <ArrayInfoCard
            title="Phone Numbers"
            items={applicantProfile?.phoneNumbers}
            onEdit={() => {
              handleEdit("phone");
            }}
            renderItem={(phone) => (
              <View className="space-y-1 flex flex-row items-center justify-between">
                <View className="flex flex-row items-center  text-gray-600 font-bold">
                  <Text className="text-xs font-bold">{phone.phoneType} </Text>
                  {phone.isInternational && (
                    <View className="px-2 py-0.5 bg-blue-100 rounded-full">
                      <Text className="text-xs text-blue-700 bg-blue-100">
                        International
                      </Text>
                    </View>
                  )}
                </View>
                <Text className="text-xs text-gray-600">
                  {phone.countryCode} {phone.phoneNumber}
                </Text>
              </View>
            )}
            emptyMessage="No phone numbers added"
          />

          <InfoCard
            title="Account Settings"
            fields={[
              {
                label: "Email Address",
                value: customer?.email,
              },
              {
                label: "Password",
                value: "•••••••••",
              },
            ]}
            onEdit={() => {}}
          />

          <ArrayInfoCard
            title="Education History"
            items={applicantProfile?.educationHistories}
            onEdit={() => {
              handleEdit("education");
            }}
            renderItem={(edu) => <HistoryCard edu={edu} />}
            emptyMessage="No education history added"
          />

          <ArrayInfoCard
            title="Skills"
            items={applicantProfile?.skills}
            onEdit={() => {
              handleEdit("skills");
            }}
            renderItem={(skill) => <SkillCard skill={skill} />}
            emptyMessage="No skills added"
          />
        </View>

        <Certificates
          certificates={applicantProfile?.certificates || []}
          onEdit={() => {
            handleEdit("certificates");
          }}
        />

        <Intentions
          intentions={applicantProfile?.intentions || []}
          onEdit={() => {
            handleEdit("intentions");
          }}
        />

        <EditFormDialog
          profile={mockProfileData}
          open={isDialogOpen}
          onOpenChange={setDialogOpen}
          onSubmit={() => {}}
          onCancel={() => {}}
          value={value}
          setValue={setValue}
        />
      </View>
    </ScrollView>
  );
};

export default Profile;
