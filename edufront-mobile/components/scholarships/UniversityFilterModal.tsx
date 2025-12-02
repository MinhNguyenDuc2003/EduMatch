import { University } from "@/constants/Universities";
import React from "react";
import FilterModal from "./FilterModal";

type UniversityFilterModalProps = {
  visible: boolean;
  onClose: () => void;
  selectedValue: string;
  onSelect: (value: string) => void;
};

const UniversityFilterModal = ({
  visible,
  onClose,
  selectedValue,
  onSelect,
}: UniversityFilterModalProps) => {
  const options = [
    { value: "", label: "All" },
    ...University,
  ];

  return (
    <FilterModal
      visible={visible}
      onClose={onClose}
      title="Select University"
      options={options}
      selectedValue={selectedValue}
      onSelect={onSelect}
      searchable={true}
      searchPlaceholder="Search universities..."
    />
  );
};

export default UniversityFilterModal;

