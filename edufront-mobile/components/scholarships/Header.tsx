import {
  COUNTRIES,
  MAJOR_NAMES,
  SCHOLARSHIP_TYPES,
  STUDY_LEVELS,
} from "@/constants";
import { University } from "@/constants/Universities";
import { router, useLocalSearchParams } from "expo-router";
import { ArrowLeft, ChevronDown, XIcon } from "lucide-react-native";
import React, { useState } from "react";
import { Pressable, ScrollView, TextInput, View } from "react-native";
import { useDebouncedCallback } from "use-debounce";
import { Text } from "../ui/text";
import CountryFilterModal from "./CountryFilterModal";
import FieldsFilterModal from "./FieldsFilterModal";
import ScholarshipTypeFilterModal from "./ScholarshipTypeFilterModal";
import StudyLevelFilterModal from "./StudyLevelFilterModal";
import UniversityFilterModal from "./UniversityFilterModal";

const Header = () => {
  const params = useLocalSearchParams<{
    keyword?: string;
    country?: string;
    studyLevel?: string;
    scholarshipType?: string;
    university?: string;
    fields?: string;
  }>();
  const [keyword, setKeyword] = useState(params.keyword || "");
  const [showCountryModal, setShowCountryModal] = useState(false);
  const [showStudyLevelModal, setShowStudyLevelModal] = useState(false);
  const [showScholarshipTypeModal, setShowScholarshipTypeModal] =
    useState(false);
  const [showUniversityModal, setShowUniversityModal] = useState(false);
  const [showFieldsModal, setShowFieldsModal] = useState(false);

  const [selectedCountry, setSelectedCountry] = useState<string>(
    params.country || ""
  );
  const [selectedStudyLevel, setSelectedStudyLevel] = useState<string>(
    params.studyLevel || ""
  );
  const [selectedScholarshipType, setSelectedScholarshipType] =
    useState<string>(params.scholarshipType || "");
  const [selectedUniversity, setSelectedUniversity] = useState<string>(
    params.university || ""
  );
  const [selectedFields, setSelectedFields] = useState<string>(
    params.fields || ""
  );

  const debouncedSearch = useDebouncedCallback((text: string) => {
    router.setParams({ keyword: text });
  }, 500);

  const handleSearch = (text: string) => {
    setKeyword(text);
    debouncedSearch(text);
  };

  const clearSearch = () => {
    setKeyword("");
    debouncedSearch("");
  };

  const handleSelectCountry = (value: string) => {
    setSelectedCountry(value);
    router.setParams({ country: value });
  };

  const handleSelectStudyLevel = (value: string) => {
    setSelectedStudyLevel(value);
    router.setParams({ studyLevel: value });
  };

  const handleSelectScholarshipType = (value: string) => {
    setSelectedScholarshipType(value);
    router.setParams({ scholarshipType: value });
  };

  const handleSelectUniversity = (value: string) => {
    setSelectedUniversity(value);
    router.setParams({ university: value });
  };

  const handleSelectFields = (value: string) => {
    setSelectedFields(value);
    router.setParams({ fields: value });
  };

  const getDisplayLabel = (
    value: string,
    defaultLabel: string,
    options?: { value: string; label: string }[]
  ) => {
    if (!value) return defaultLabel;
    if (options) {
      const option = options.find((opt) => opt.value === value);
      if (option) {
        return option.label.length > 15
          ? `${option.label.substring(0, 15)}...`
          : option.label;
      }
    }
    return value.length > 15 ? `${value.substring(0, 15)}...` : value;
  };

  return (
    <View className="flex gap-2 p-4 bg-white">
      <View className="flex-row gap-4 ">
        <Pressable
          onPress={() => router.back()}
          className="flex items-center justify-center"
        >
          <ArrowLeft size={24} color="#3d6cb9" />
        </Pressable>
        <Text className="text-lg font-medium">Scholarships</Text>
      </View>
      <View className="relative">
        <TextInput
          placeholder="Search for scholarships"
          placeholderTextColor="#9ca3af"
          className="rounded-lg p-2 border "
          value={keyword}
          onChangeText={handleSearch}
        />
        {keyword && (
          <Pressable
            onPress={clearSearch}
            className="absolute right-2 top-1/2 -translate-y-1/2"
          >
            <XIcon size={20} color={"#3d6cb9"} />
          </Pressable>
        )}
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View className="flex-row gap-2">
          <Pressable
            onPress={() => setShowCountryModal(true)}
            className="flex flex-row items-center justify-center gap-2 border rounded-lg px-3 py-2"
          >
            <Text className="text-sm">
              {getDisplayLabel(selectedCountry, "Country", COUNTRIES)}
            </Text>
            <ChevronDown size={16} />
          </Pressable>
          <Pressable
            onPress={() => setShowStudyLevelModal(true)}
            className="flex flex-row items-center justify-center gap-2 border rounded-lg px-3 py-2"
          >
            <Text className="text-sm">
              {getDisplayLabel(selectedStudyLevel, "Study Level", STUDY_LEVELS)}
            </Text>
            <ChevronDown size={16} />
          </Pressable>
          <Pressable
            onPress={() => setShowScholarshipTypeModal(true)}
            className="flex flex-row items-center justify-center gap-2 border rounded-lg px-3 py-2"
          >
            <Text className="text-sm">
              {getDisplayLabel(
                selectedScholarshipType,
                "Scholarship Type",
                SCHOLARSHIP_TYPES
              )}
            </Text>
            <ChevronDown size={16} />
          </Pressable>
          <Pressable
            onPress={() => setShowUniversityModal(true)}
            className="flex flex-row items-center justify-center gap-2 border rounded-lg px-3 py-2"
          >
            <Text className="text-sm">
              {getDisplayLabel(selectedUniversity, "University", University)}
            </Text>
            <ChevronDown size={16} />
          </Pressable>
          <Pressable
            onPress={() => setShowFieldsModal(true)}
            className="flex flex-row items-center justify-center gap-2 border rounded-lg px-3 py-2"
          >
            <Text className="text-sm">
              {getDisplayLabel(selectedFields, "Fields", MAJOR_NAMES)}
            </Text>
            <ChevronDown size={16} />
          </Pressable>
        </View>
      </ScrollView>

      <CountryFilterModal
        visible={showCountryModal}
        onClose={() => setShowCountryModal(false)}
        selectedValue={selectedCountry}
        onSelect={handleSelectCountry}
      />
      <StudyLevelFilterModal
        visible={showStudyLevelModal}
        onClose={() => setShowStudyLevelModal(false)}
        selectedValue={selectedStudyLevel}
        onSelect={handleSelectStudyLevel}
      />
      <ScholarshipTypeFilterModal
        visible={showScholarshipTypeModal}
        onClose={() => setShowScholarshipTypeModal(false)}
        selectedValue={selectedScholarshipType}
        onSelect={handleSelectScholarshipType}
      />
      <UniversityFilterModal
        visible={showUniversityModal}
        onClose={() => setShowUniversityModal(false)}
        selectedValue={selectedUniversity}
        onSelect={handleSelectUniversity}
      />
      <FieldsFilterModal
        visible={showFieldsModal}
        onClose={() => setShowFieldsModal(false)}
        selectedValue={selectedFields}
        onSelect={handleSelectFields}
      />
    </View>
  );
};

export default Header;
