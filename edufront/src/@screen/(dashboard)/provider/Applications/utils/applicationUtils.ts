// Utility functions for Applications page

/**
 * Get status color classes
 */
export const getStatusColor = (status: string): string => {
  switch (status.toLowerCase()) {
    case 'successful':
      return 'bg-green-100 text-green-700 border-green-200';
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
 * Format applied date from timestamp
 */
export const formatAppliedDate = (appliedAt?: number): string => {
  if (!appliedAt) return 'N/A';
  // If appliedAt is in seconds, multiply by 1000; if in milliseconds, use as is
  const date = new Date(appliedAt > 1e12 ? appliedAt : appliedAt * 1000);
  return date.toLocaleDateString();
};

/**
 * Filter applications by search query and status
 */
export const filterApplications = (
  applications: ApplicationScholarship[],
  searchQuery: string,
  statusFilter: string
): ApplicationScholarship[] => {
  let filtered = applications;

  // Filter by search query
  if (searchQuery.trim()) {
    const query = searchQuery.toLowerCase();
    filtered = filtered.filter((app) => {
      const application = app.applicationVo;
      const studentName = application?.fullName || '';
      const email = application?.email || '';
      const major = application?.major || '';
      return (
        studentName.toLowerCase().includes(query) ||
        email.toLowerCase().includes(query) ||
        major.toLowerCase().includes(query)
      );
    });
  }

  // Filter by status
  if (statusFilter !== 'all') {
    filtered = filtered.filter((app) => app.status?.toLowerCase() === statusFilter.toLowerCase());
  }

  return filtered;
};
