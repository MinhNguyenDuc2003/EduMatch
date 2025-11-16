'use client';

type AppliedScholarshipCardProps = {
  appliedScholarship: ApplicationScholarship;
  onViewDetails?: (appliedScholarship: ApplicationScholarship) => void;
  onViewScholarship?: (slug: string) => void;
};

const formatDate = (date?: number) => {
  if (!date) return 'N/A';
  try {
    const dateObj = new Date(date);
    return dateObj.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  } catch {
    return 'N/A';
  }
};

const getStatusColor = (status: string) => {
  if (!status) return 'bg-blue-400 text-blue-700';
  const statusLower = status.toLowerCase();
  switch (statusLower) {
    case 'approved':
      return 'bg-green-400 text-green-700';
    case 'pending':
      return 'bg-blue-400 text-blue-700';
    case 'rejected':
      return 'bg-red-400 text-red-700';
    default:
      return 'bg-blue-400 text-blue-700';
  }
};

const formatStatus = (status: string) => {
  if (!status) return 'Pending ';

  return status
    .replace(/_/g, ' ')
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
};

export default function AppliedScholarshipCard({
  appliedScholarship,
  onViewDetails,
  onViewScholarship,
}: AppliedScholarshipCardProps) {
  const { applicationVo, scholarshipVo, status, note, reviewedAt } = appliedScholarship;
  const { title, fundingAmount, providerProfileVo, slug } = scholarshipVo;
  const { applicationName } = applicationVo;
  const { organizationName } = providerProfileVo;

  return (
    <article
      className="group relative flex h-full flex-col overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm transition-all hover:shadow-md cursor-pointer"
      onClick={() => onViewDetails?.(appliedScholarship)}
    >
      {/* Header Section */}
      <div className="p-4">
        <div className="flex items-center justify-between gap-3 mb-2">
          {/* Left side: */}
          <div className="flex items-center gap-2">
            <div className={`w-3 h-3 rounded-full ${getStatusColor(status)}`}></div>
            <span className={`text-sm font-medium text-${getStatusColor(status)}`}>
              {formatStatus(status)}
            </span>
          </div>

          {/* Right side: Manage button (reviewedAt date) */}
          {reviewedAt && (
            <button className="px-3 py-1.5 rounded-md text-xs font-medium  text-gray-700 bg-zinc-100 ">
              {formatDate(reviewedAt)}
            </button>
          )}
        </div>

        {/* Large Application Name */}
        <h2 className="text-xl font-bold text-gray-900 mb-2">{applicationName}</h2>

        {/* Description text */}
        <p className="text-sm text-gray-600">
          This application is submitted to: {organizationName}
        </p>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-100"></div>

      {/*Info Section */}
      <div className="p-4 space-y-3">
        {/* Scholarship Title */}
        <div
          className="flex items-center justify-between hover:cursor-pointer "
          onClick={(e) => {
            e.stopPropagation();
            onViewScholarship?.(slug);
          }}
        >
          <span className="text-sm text-gray-600">Scholarship</span>
          <span className="text-sm font-medium text-gray-900 hover:text-blue-500">{title}</span>
        </div>

        {/* Funding Amount */}
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">Amount</span>
          <span className="text-sm font-medium text-gray-900">{fundingAmount}</span>
        </div>
      </div>
    </article>
  );
}
