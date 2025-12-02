import { STUDY_LEVELS } from "@/constants";
import React from "react";
import FilterModal from "./FilterModal";

type StudyLevelFilterModalProps = {
  visible: boolean;
  onClose: () => void;
  selectedValue: string;
  onSelect: (value: string) => void;
};

const StudyLevelFilterModal = ({
  visible,
  onClose,
  selectedValue,
  onSelect,
}: StudyLevelFilterModalProps) => {
  const options = [
    { value: "", label: "All" },
    ...STUDY_LEVELS,
  ];

  return (
    <FilterModal
      visible={visible}
      onClose={onClose}
      title="Select Study Level"
      options={options}
      selectedValue={selectedValue}
      onSelect={onSelect}
      searchable={true}
      searchPlaceholder="Search study levels..."
    />
  );
};

export default StudyLevelFilterModal;

