'use client';

import { useTranslations } from 'next-intl';

type AppliedScholarshipCardProps = {
  appliedScholarship: ApplicationScholarship;
  onViewDetails?: (appliedScholarship: ApplicationScholarship) => void;
  onViewScholarship?: (slug: string) => void;
};

const formatDate = (date?: number | string) => {
  if (!date) return 'N/A';
  try {
    const dateObj = new Date(typeof date === 'string' ? date : date > 1e12 ? date : date * 1000);
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
  if (statusLower === 'approved') return 'bg-green-400 text-green-700';
  if (statusLower === 'rejected') return 'bg-red-400 text-red-700';
  return 'bg-blue-400 text-blue-700'; // pending (default)
};

const formatStatus = (status: string, t: (key: string) => string) => {
  if (!status) return t('status.pending');
  const statusLower = status.toLowerCase();
  if (statusLower === 'approved') return t('status.approved');
  if (statusLower === 'rejected') return t('status.rejected');
  return t('status.pending');
};

export default function AppliedScholarshipCard({
  appliedScholarship,
  onViewDetails,
  onViewScholarship,
}: AppliedScholarshipCardProps) {
  const t = useTranslations('activity.appliedScholarshipCard');
  const { applicationVo, scholarshipVo, status, note, reviewedAt, createdDate } =
    appliedScholarship;
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
        <div className="flex items-center justify-between gap-3 mb-1">
          {/* Left side: */}
          <div className="flex items-center gap-2">
            <div className={`w-3 h-3 rounded-full ${getStatusColor(status)}`}></div>
            <span className={`text-sm font-medium text-${getStatusColor(status)}`}>
              {formatStatus(status, t)}
            </span>
          </div>

          {/* Right side: Manage button (reviewedAt date) */}
          {reviewedAt ? (
            <div className="px-3 py-1.5 rounded-sm text-sm font-medium  text-gray-700 bg-zinc-100 ">
              {formatDate(reviewedAt)}
            </div>
          ) : (
            <div className="px-3 py-1.5 rounded-sm text-sm font-medium  text-gray-700 bg-zinc-100 ">
              {formatDate(createdDate)}
            </div>
          )}
        </div>

        {/* Large Application Name */}
        <h3 className="text-base font-bold text-gray-900 mb-1">{applicationName}</h3>

        {/* Description text */}
        <p className="text-sm text-gray-600">
          {t('submittedTo')} {organizationName}
        </p>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-100"></div>

      {/*Info Section */}
      <div className="p-4 space-y-2">
        {/* Scholarship Title */}
        <div
          className="flex justify-between gap-8 hover:cursor-pointer text-right"
          onClick={(e) => {
            e.stopPropagation();
            onViewScholarship?.(slug);
          }}
        >
          <span className="text-sm text-gray-600">{t('scholarship')}</span>
          <span className="text-sm font-medium text-gray-900 hover:text-blue-500">{title}</span>
        </div>

        {/* Funding Amount */}
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">{t('amount')}</span>
          <span className="text-sm font-medium text-gray-900">{fundingAmount}</span>
        </div>
      </div>
    </article>
  );
}
