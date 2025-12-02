import { SCHOLARSHIP_TYPES } from "@/constants";
import React from "react";
import FilterModal from "./FilterModal";

type ScholarshipTypeFilterModalProps = {
  visible: boolean;
  onClose: () => void;
  selectedValue: string;
  onSelect: (value: string) => void;
};

const ScholarshipTypeFilterModal = ({
  visible,
  onClose,
  selectedValue,
  onSelect,
}: ScholarshipTypeFilterModalProps) => {
  const options = [
    { value: "", label: "All" },
    ...SCHOLARSHIP_TYPES,
  ];

  return (
    <FilterModal
      visible={visible}
      onClose={onClose}
      title="Select Scholarship Type"
      options={options}
      selectedValue={selectedValue}
      onSelect={onSelect}
      searchable={true}
      searchPlaceholder="Search scholarship types..."
    />
  );
};

export default ScholarshipTypeFilterModal;

