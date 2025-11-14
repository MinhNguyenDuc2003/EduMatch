import { useMemo } from 'react';
import { filterApplications } from '../utils/applicationUtils';

/**
 * Custom hook to transform and filter applications data
 */
export const useApplicationsData = (
  applicationsScholarships: ApplicationScholarship[] | undefined,
  searchQuery: string,
  statusFilter: string
) => {
  // Use applications directly from API
  const applications: ApplicationScholarship[] = useMemo(() => {
    if (!applicationsScholarships) return [];
    return applicationsScholarships;
  }, [applicationsScholarships]);

  // Filter applications by search query and status
  const filteredApplications = useMemo(() => {
    return filterApplications(applications, searchQuery, statusFilter);
  }, [applications, searchQuery, statusFilter]);

  return {
    applications,
    filteredApplications,
  };
};
