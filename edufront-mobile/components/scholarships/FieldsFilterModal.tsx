import { MAJOR_NAMES } from "@/constants";
import React from "react";
import FilterModal from "./FilterModal";

type FieldsFilterModalProps = {
  visible: boolean;
  onClose: () => void;
  selectedValue: string;
  onSelect: (value: string) => void;
};

const FieldsFilterModal = ({
  visible,
  onClose,
  selectedValue,
  onSelect,
}: FieldsFilterModalProps) => {
  const options = [
    { value: "", label: "All" },
    ...MAJOR_NAMES,
  ];

  return (
    <FilterModal
      visible={visible}
      onClose={onClose}
      title="Select Field"
      options={options}
      selectedValue={selectedValue}
      onSelect={onSelect}
      searchable={true}
      searchPlaceholder="Search fields..."
    />
  );
};

export default FieldsFilterModal;

