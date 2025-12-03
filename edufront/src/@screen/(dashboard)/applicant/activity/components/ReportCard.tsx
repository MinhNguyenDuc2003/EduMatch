'use client';

import { useTranslations } from 'next-intl';

type ReportCardProps = {
  report: MyReport;
  onViewDetails?: (report: MyReport) => void;
};

const getTypeColor = (type?: ReportType) => {
  switch (type) {
    case 'SCHOLARSHIP':
      return 'bg-blue-100 text-blue-700';
    case 'PROVIDER':
      return 'bg-purple-100 text-purple-700';
    case 'PROFILE':
      return 'bg-pink-100 text-pink-700';
    case 'SYSTEM':
      return 'bg-orange-100 text-orange-700';
    default:
      return 'bg-gray-100 text-gray-700';
  }
};

export default function ReportCard({ report, onViewDetails }: ReportCardProps) {
  const t = useTranslations('activity.reportCard');

  return (
    <article
      className="group relative flex gap-2 h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all hover:shadow-lg cursor-pointer"
      onClick={() => onViewDetails?.(report)}
    >
      {/* Header Section */}
      <div className="px-4 pt-4">
        <div className="flex flex-col justify-between gap-1">
          {/* Title */}
          <h3 className="text-base font-bold text-slate-900 line-clamp-2">
            {report.title || t('noTitle')}
          </h3>
          {/* Comment */}
          {report.comment && (
            <div className="flex flex-col">
              <p className="text-sm text-slate-700 line-clamp-3">{report.comment}</p>
            </div>
          )}
        </div>
      </div>

      {/* Content Section */}
      <div className="flex flex-1 flex-col px-4 pb-4 space-y-2">
        {/* Category Type */}
        {report.category && (
          <div className="flex items-center justify-between gap-2 text-sm">
            <span className="font-medium text-slate-500">{t('category')}</span>
            <span
              className={`px-2.5 py-1 rounded-md font-normal ${getTypeColor(report.category.type)}`}
            >
              {report.category.name || report.category.type}
            </span>
          </div>
        )}
        {/* Category Description */}
        {report.category?.description && (
          <div className="flex items-start justify-between gap-2 text-sm">
            <span className="font-medium text-slate-500">{t('description')}</span>
            <p className="text-slate-600 line-clamp-2 text-right">{report.category.description}</p>
          </div>
        )}
      </div>
    </article>
  );
}
