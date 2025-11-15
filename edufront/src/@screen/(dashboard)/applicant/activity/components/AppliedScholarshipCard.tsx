'use client';

import { Calendar, FileText, User, Building2, BookOpen } from 'lucide-react';

type AppliedScholarshipCardProps = {
  appliedScholarship: ApplicationScholarship;
  onViewDetails?: (slug: string) => void;
};

/**
 * Format ISO date string to readable format
 */
const formatDate = (dateString?: string | number): string => {
  if (!dateString) return 'N/A';

  try {
    // Handle ISO string or timestamp
    const date =
      typeof dateString === 'string'
        ? new Date(dateString)
        : new Date(dateString > 1e12 ? dateString : dateString * 1000);

    if (isNaN(date.getTime())) return 'N/A';

    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  } catch {
    return 'N/A';
  }
};

/**
 * Get status color classes
 */
const getStatusColor = (status: string): string => {
  const statusLower = status.toLowerCase();
  switch (statusLower) {
    case 'approved':
    case 'accept':
      return 'bg-green-50 text-green-700 border-green-200';
    case 'pending':
    case 'reviewing':
      return 'bg-yellow-50 text-yellow-700 border-yellow-200';
    case 'rejected':
    case 'reject':
      return 'bg-red-50 text-red-700 border-red-200';
    default:
      return 'bg-gray-50 text-gray-700 border-gray-200';
  }
};

/**
 * Format status text
 */
const formatStatus = (status: string): string => {
  return status
    .replace(/_/g, ' ')
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
};

export default function AppliedScholarshipCard({
  appliedScholarship,
  onViewDetails,
}: AppliedScholarshipCardProps) {
  const { applicationVo, scholarshipVo, status, note } = appliedScholarship;

  // Extract data with fallbacks
  const applicationName = applicationVo?.applicationName || 'N/A';
  const fullName = applicationVo?.fullName || 'N/A';
  const major = applicationVo?.major || 'N/A';
  const title = scholarshipVo?.title || 'N/A';
  const organizationName = scholarshipVo?.providerProfileVo?.organizationName || 'N/A';

  // Get reviewedAt from the object (it might be in different formats from BE)
  const reviewedAt = appliedScholarship.reviewedAt || appliedScholarship.appliedAt;

  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm transition-all hover:shadow-md">
      {/* Header Section with Status Badge */}
      <div className="border-b border-gray-100 bg-white p-4">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <h3
              className="text-base font-bold text-gray-900 truncate mb-2 cursor-pointer hover:text-blue-600 transition-colors"
              onClick={() => onViewDetails?.(scholarshipVo?.slug || '')}
              title={title}
            >
              {title}
            </h3>
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <Building2 className="w-3.5 h-3.5 flex-shrink-0" />
              <span className="truncate">{organizationName}</span>
            </div>
          </div>
          <div
            className={`px-3 py-1 rounded-full text-xs font-semibold border flex-shrink-0 whitespace-nowrap ${getStatusColor(status)}`}
          >
            {formatStatus(status)}
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="flex flex-1 flex-col p-4 space-y-4">
        {/* Application Information */}
        <div className="space-y-3">
          {/* Application Name */}
          <div className="flex items-start gap-3">
            <FileText className="w-4 h-4 text-gray-400 flex-shrink-0 mt-0.5" />
            <div className="flex-1 min-w-0">
              <span className="text-xs font-medium text-gray-500 block mb-1">Application Name</span>
              <span className="text-sm font-semibold text-gray-900 truncate">
                {applicationName}
              </span>
            </div>
          </div>

          {/* Full Name */}
          <div className="flex items-start gap-3">
            <User className="w-4 h-4 text-gray-400 flex-shrink-0 mt-0.5" />
            <div className="flex-1 min-w-0">
              <span className="text-xs font-medium text-gray-500 block mb-1">Full Name</span>
              <span className="text-sm text-gray-900 truncate">{fullName}</span>
            </div>
          </div>

          {/* Major */}
          <div className="flex items-start gap-3">
            <BookOpen className="w-4 h-4 text-gray-400 flex-shrink-0 mt-0.5" />
            <div className="flex-1 min-w-0">
              <span className="text-xs font-medium text-gray-500 block mb-1">Major</span>
              <span className="text-sm text-gray-900 truncate">{major}</span>
            </div>
          </div>

          {/* Reviewed At */}
          <div className="flex items-start gap-3">
            <Calendar className="w-4 h-4 text-gray-400 flex-shrink-0 mt-0.5" />
            <div className="flex-1 min-w-0">
              <span className="text-xs font-medium text-gray-500 block mb-1">Reviewed At</span>
              <span className="text-sm text-gray-900">{formatDate(reviewedAt)}</span>
            </div>
          </div>
        </div>

        {/* Note Section */}
        {note && note.trim() !== '' && (
          <div className="pt-3 border-t border-gray-100">
            <div className="bg-gray-50 rounded-md p-3">
              <span className="text-xs font-medium text-gray-500 block mb-2">Note</span>
              <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-wrap break-words">
                {note}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Footer - Optional Action */}
      {onViewDetails && (
        <div className="border-t border-gray-100 bg-gray-50 px-4 py-3">
          <button
            onClick={() => onViewDetails(scholarshipVo?.slug || '')}
            className="text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors"
          >
            View Scholarship Details →
          </button>
        </div>
      )}
    </article>
  );
}
