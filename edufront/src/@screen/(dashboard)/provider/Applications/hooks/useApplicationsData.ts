import { useMemo } from 'react';
import {
  mapApplicationScholarshipToDisplay,
  filterApplications,
  DisplayApplication,
} from '../utils/applicationUtils';

/**
 * Custom hook to transform and filter applications data
 */
export const useApplicationsData = (
  applicationsScholarships: ApplicationScholarship[] | undefined,
  searchQuery: string,
  statusFilter: string
) => {
  // Map API response to display format
  const applications: DisplayApplication[] = useMemo(() => {
    if (!applicationsScholarships) return [];
    return applicationsScholarships.map(mapApplicationScholarshipToDisplay);
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
