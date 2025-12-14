import {
  BookOpen,
  Calendar,
  DollarSign,
  Globe,
  GraduationCap,
} from "lucide-react-native";
import React from "react";
import { Image, ScrollView, Text, View } from "react-native";

interface ScholarshipInfoTabProps {
  scholarship: any;
}

const section = (title: string, content: string) => (
  <View style={{ marginBottom: 16 }}>
    <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 4 }}>
      {title}
    </Text>
    <Text style={{ color: "#374151", lineHeight: 22 }}>{content}</Text>
  </View>
);

export const ScholarshipInfoTab: React.FC<ScholarshipInfoTabProps> = ({
  scholarship,
}) => {
  const startDate = new Date(scholarship.startDate).toLocaleDateString();
  const endDate = new Date(scholarship.endDate).toLocaleDateString();

  const infoItems = [
    {
      icon: <GraduationCap size={20} color="#3d6cb9" />,
      label: "University",
      value: scholarship.university,
    },
    {
      icon: <Globe size={20} color="#3d6cb9" />,
      label: "Country",
      value: scholarship.country,
    },
    {
      icon: <DollarSign size={20} color="#3d6cb9" />,
      label: "Funding",
      value: scholarship.fundingAmount,
    },
    {
      icon: <BookOpen size={20} color="#3d6cb9" />,
      label: "Study Level",
      value: scholarship.studyLevel,
    },
    {
      icon: <GraduationCap size={20} color="#3d6cb9" />,
      label: "Available Slots",
      value: scholarship.availableSlots?.toString(),
    },
    {
      icon: <Calendar size={20} color="#3d6cb9" />,
      label: "Timeline",
      value: `${startDate} → ${endDate}`,
    },
    ...(scholarship.scholarshipType
      ? [
          {
            icon: <BookOpen size={20} color="#3d6cb9" />,
            label: "Scholarship Type",
            value: scholarship.scholarshipType,
          },
        ]
      : []),
    ...(scholarship.requiredMajor
      ? [
          {
            icon: <GraduationCap size={20} color="#3d6cb9" />,
            label: "Required Major",
            value: scholarship.requiredMajor,
          },
        ]
      : []),
    ...(scholarship.minAge && scholarship.maxAge
      ? [
          {
            icon: <Calendar size={20} color="#3d6cb9" />,
            label: "Age Range",
            value: `${scholarship.minAge} - ${scholarship.maxAge} years`,
          },
        ]
      : []),
    ...(scholarship.genderRequirement
      ? [
          {
            icon: <GraduationCap size={20} color="#3d6cb9" />,
            label: "Gender Requirement",
            value: scholarship.genderRequirement,
          },
        ]
      : []),
  ];

  const englishScores = [
    { label: "TOEFL", value: scholarship.requiredToeflScore },
    { label: "IELTS", value: scholarship.requiredIeltsScore },
  ].filter((s) => s.value);

  const standardizedScores = [
    { label: "SAT", value: scholarship.requiredSatScore },
    { label: "ACT", value: scholarship.requiredActScore },
    { label: "GRE", value: scholarship.requiredGreScore },
    { label: "GMAT", value: scholarship.requiredGmatScore },
  ].filter((s) => s.value);

  return (
    <ScrollView className="px-4">
      <Text style={{ fontSize: 24, fontWeight: "bold", marginBottom: 4 }}>
        {scholarship.title}
      </Text>
      <Text style={{ color: "#4b5563", marginBottom: 12 }}>
        {scholarship.shortDescription}
      </Text>

      <View className="bg-[#e5ecf9] p-4 rounded-lg flex flex-col gap-2 mb-4">
        {infoItems.map((item, idx) => (
          <View key={idx} className="flex-row items-center gap-2">
            <View style={{ width: 24 }}>{item.icon}</View>
            <View style={{ marginLeft: 10, flex: 1 }}>
              <Text style={{ fontWeight: "600", color: "#3d6cb9" }}>
                {item.label}
              </Text>
              <Text style={{ color: "#3d6cb9" }}>{item.value}</Text>
            </View>
          </View>
        ))}
      </View>

      {scholarship.description &&
        section("Description", scholarship.description)}

      {section("Requirements", scholarship.requirements || "N/A")}

      {scholarship.languageRequirement &&
        section("Language Requirement", scholarship.languageRequirement)}

      {scholarship.gpaRequirement &&
        section("GPA Requirement", scholarship.gpaRequirement.toString())}

      {section("Benefits", scholarship.benefits || "N/A")}

      {scholarship.fields && section("Fields", scholarship.fields)}

      {/* Test Score Requirements */}
      {(englishScores.length > 0 || standardizedScores.length > 0) && (
        <View
          style={{
            backgroundColor: "#f9fafb",
            padding: 16,
            borderRadius: 16,
            marginBottom: 16,
          }}
        >
          <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 12 }}>
            Test Score Requirements
          </Text>

          {englishScores.length > 0 && (
            <View
              style={{ marginBottom: standardizedScores.length > 0 ? 12 : 0 }}
            >
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: "600",
                  color: "#374151",
                  marginBottom: 8,
                }}
              >
                English Proficiency
              </Text>
              {englishScores.map((score, index) => (
                <View key={score.label}>
                  <Text
                    style={{ color: "#374151", marginBottom: 6, marginLeft: 8 }}
                  >
                    • {score.label}: {score.value}
                  </Text>
                  {index < englishScores.length - 1 && (
                    <Text
                      style={{
                        color: "#6b7280",
                        fontSize: 12,
                        fontWeight: "bold",
                        marginLeft: 24,
                        marginBottom: 6,
                      }}
                    >
                      OR
                    </Text>
                  )}
                </View>
              ))}
            </View>
          )}

          {standardizedScores.length > 0 && (
            <View>
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: "600",
                  color: "#374151",
                  marginBottom: 8,
                }}
              >
                Standardized Tests
              </Text>
              {standardizedScores.map((score, index) => (
                <View key={score.label}>
                  <Text
                    style={{ color: "#374151", marginBottom: 6, marginLeft: 8 }}
                  >
                    • {score.label}: {score.value}
                  </Text>
                  {index < standardizedScores.length - 1 && (
                    <Text
                      style={{
                        color: "#6b7280",
                        fontSize: 12,
                        fontWeight: "bold",
                        marginLeft: 24,
                        marginBottom: 6,
                      }}
                    >
                      OR
                    </Text>
                  )}
                </View>
              ))}
            </View>
          )}
        </View>
      )}

      {/* Additional Requirements */}
      {(scholarship.requiredWorkExperienceYears ||
        scholarship.requiredPublicationCount ||
        scholarship.requiredAcademicAwards ||
        scholarship.requiredClassRankPercentile) && (
        <View
          style={{
            backgroundColor: "#f9fafb",
            padding: 16,
            borderRadius: 16,
            marginBottom: 16,
          }}
        >
          <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 12 }}>
            Additional Requirements
          </Text>
          {scholarship.requiredWorkExperienceYears && (
            <Text style={{ color: "#374151", marginBottom: 6 }}>
              Work Experience: {scholarship.requiredWorkExperienceYears} years
            </Text>
          )}
          {scholarship.requiredPublicationCount && (
            <Text style={{ color: "#374151", marginBottom: 6 }}>
              Publications: {scholarship.requiredPublicationCount}
            </Text>
          )}
          {scholarship.requiredAcademicAwards && (
            <Text style={{ color: "#374151", marginBottom: 6 }}>
              Academic Awards: {scholarship.requiredAcademicAwards}
            </Text>
          )}
          {scholarship.requiredClassRankPercentile && (
            <Text style={{ color: "#374151", marginBottom: 6 }}>
              Class Rank Percentile: {scholarship.requiredClassRankPercentile}%
            </Text>
          )}
        </View>
      )}

      {/* Scholarship Media */}
      {scholarship.scholarshipMedias &&
        scholarship.scholarshipMedias.length > 0 && (
          <View style={{ marginBottom: 16 }}>
            <Text
              style={{ fontSize: 18, fontWeight: "bold", marginBottom: 12 }}
            >
              Media Gallery
            </Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {scholarship.scholarshipMedias.map((media: any) => (
                <Image
                  key={media.id}
                  source={{ uri: media.url }}
                  style={{
                    width: 200,
                    height: 150,
                    borderRadius: 12,
                    marginRight: 12,
                  }}
                  resizeMode="cover"
                />
              ))}
            </ScrollView>
          </View>
        )}

      {/* Scholarship Preferences */}
      {scholarship.scholarshipPreferences &&
        scholarship.scholarshipPreferences.length > 0 && (
          <View
            style={{
              backgroundColor: "#f9fafb",
              padding: 16,
              borderRadius: 16,
              marginBottom: 16,
            }}
          >
            <Text
              style={{ fontSize: 18, fontWeight: "bold", marginBottom: 12 }}
            >
              Preferences
            </Text>
            {scholarship.scholarshipPreferences.map((pref: any) => (
              <View key={pref.id} style={{ marginBottom: 8 }}>
                <Text style={{ fontWeight: "600", color: "#166534" }}>
                  {pref.type}: {pref.value}
                </Text>
                {pref.note && (
                  <Text style={{ color: "#6b7280", fontSize: 12 }}>
                    {pref.note}
                  </Text>
                )}
              </View>
            ))}
          </View>
        )}
    </ScrollView>
  );
};
