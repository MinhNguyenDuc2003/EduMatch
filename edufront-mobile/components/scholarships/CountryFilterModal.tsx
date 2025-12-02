import { COUNTRIES } from "@/constants";
import React from "react";
import FilterModal from "./FilterModal";

type CountryFilterModalProps = {
  visible: boolean;
  onClose: () => void;
  selectedValue: string;
  onSelect: (value: string) => void;
};

const CountryFilterModal = ({
  visible,
  onClose,
  selectedValue,
  onSelect,
}: CountryFilterModalProps) => {
  const options = [
    { value: "", label: "All" },
    ...COUNTRIES,
  ];

  return (
    <FilterModal
      visible={visible}
      onClose={onClose}
      title="Select Country"
      options={options}
      selectedValue={selectedValue}
      onSelect={onSelect}
      searchable={true}
      searchPlaceholder="Search countries..."
    />
  );
};

export default CountryFilterModal;

