import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/lib/cus/select';
import { SCHOLARSHIP_TYPES } from '@/constants/Common';

interface ScholarshipTypeFilterProps {
  value: string;
  onChange: (value: string) => void;
}

const ScholarshipTypeFilter = React.memo(({ value, onChange }: ScholarshipTypeFilterProps) => {
  return (
    <div className="mb-4">
      <label className="text-sm font-medium text-gray-700 mb-2 block">Filter by Type</label>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="All Types" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Types</SelectItem>
          {SCHOLARSHIP_TYPES.map((type) => (
            <SelectItem key={type.value} value={type.value}>
              {type.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
});

ScholarshipTypeFilter.displayName = 'ScholarshipTypeFilter';

export default ScholarshipTypeFilter;

