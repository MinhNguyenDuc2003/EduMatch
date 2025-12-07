import { useMemo, useEffect } from 'react';

/**
 * Custom hook to filter scholarships by type
 */
export const useScholarshipFilter = (
  scholarships: Scholarship[] | undefined,
  selectedScholarshipType: string,
  selectedScholarship: Scholarship | null,
  setSelectedScholarship: (scholarship: Scholarship | null) => void
) => {
  // Filter scholarships by type
  const filteredScholarships = useMemo(() => {
    if (!scholarships) return [];
    if (selectedScholarshipType === 'all') return scholarships;
    return scholarships.filter(
      (scholarship) => scholarship.scholarshipType === selectedScholarshipType
    );
  }, [scholarships, selectedScholarshipType]);

  // Update selected scholarship if it's filtered out
  useEffect(() => {
    if (selectedScholarship && !filteredScholarships.find((s) => s.id === selectedScholarship.id)) {
      setSelectedScholarship(null);
    }
  }, [filteredScholarships, selectedScholarship, setSelectedScholarship]);

  return filteredScholarships;
};
