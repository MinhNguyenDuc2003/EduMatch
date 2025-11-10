// Utility functions for Applications page

export type DisplayApplication = {
  id: number;
  studentName: string;
  email: string;
  appliedDate: string;
  status: string;
  gpa: number;
  major: string;
};

/**
 * Convert ApplicationScholarship to DisplayApplication format
 */
export const mapApplicationScholarshipToDisplay = (
  appScholarship: ApplicationScholarship
): DisplayApplication => {
  const application = appScholarship.applicationVo;
  const status = appScholarship.status || 'pending';

  // Format applied date - appliedAt is a timestamp (number)
  // If appliedAt is in seconds, multiply by 1000; if in milliseconds, use as is
  const appliedDate = appScholarship.appliedAt
    ? new Date(
        appScholarship.appliedAt > 1e12 ? appScholarship.appliedAt : appScholarship.appliedAt * 1000
      ).toLocaleDateString()
    : 'N/A';

  return {
    id: appScholarship.id || application?.id || 0,
    studentName: application?.fullName || 'Unknown',
    email: application?.email || '',
    appliedDate,
    status: status.toLowerCase(),
    gpa: application?.gpa || 0,
    major: application?.major || 'N/A',
  };
};

/**
 * Get status color classes
 */
export const getStatusColor = (status: string): string => {
  switch (status.toLowerCase()) {
    case 'approved':
      return 'bg-green-100 text-green-700 border-green-200';
    case 'pending':
      return 'bg-yellow-100 text-yellow-700 border-yellow-200';
    case 'rejected':
      return 'bg-red-100 text-red-700 border-red-200';
    default:
      return 'bg-gray-100 text-gray-700 border-gray-200';
  }
};

/**
 * Format status text
 */
export const formatStatus = (status: string): string => {
  return status.replace(/_/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase());
};

/**
 * Filter applications by search query and status
 */
export const filterApplications = (
  applications: DisplayApplication[],
  searchQuery: string,
  statusFilter: string
): DisplayApplication[] => {
  let filtered = applications;

  // Filter by search query
  if (searchQuery.trim()) {
    const query = searchQuery.toLowerCase();
    filtered = filtered.filter(
      (app) =>
        app.studentName.toLowerCase().includes(query) ||
        app.email.toLowerCase().includes(query) ||
        app.major.toLowerCase().includes(query)
    );
  }

  // Filter by status
  if (statusFilter !== 'all') {
    filtered = filtered.filter((app) => app.status === statusFilter);
  }

  return filtered;
};
