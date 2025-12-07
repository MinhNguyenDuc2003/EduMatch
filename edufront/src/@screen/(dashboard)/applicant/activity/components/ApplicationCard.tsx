'use client';

import { Button } from '@/lib/cus/button';
import { useTranslations } from 'next-intl';

type ApplicationCardProps = {
  application: Application;
  onEdit?: (application: Application) => void;
  onDelete?: (applicationId: number) => void;
  onViewDetails?: (application: Application) => void;
};

export default function ApplicationCard({
  application,
  onEdit,
  onDelete,
  onViewDetails,
}: ApplicationCardProps) {
  const t = useTranslations('activity.applicationCard');

  return (
    <article
      className="group relative flex h-full flex-col overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm transition-all hover:shadow-md cursor-pointer"
      onClick={() => onViewDetails?.(application)}
    >
      {/* Header Section */}
      <div className="p-4">
        <div className="flex items-center justify-between gap-3 mb-1">
          {/* Left side: Empty for now, can add status badge if needed */}
          <div className="flex flex-col">
            {/* Large Application Name */}
            <h3 className="text-base font-bold text-gray-900 mb-1">
              {application.applicationName || t('applicationName')}
            </h3>

            {/* Description text */}
            <p className="text-sm text-gray-600">{application.fullName || t('fullName')}</p>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-100"></div>

      {/* Info Section */}
      <div className="p-4 space-y-2">
        {/* GPA */}
        <div className="flex items-center gap-8 justify-between">
          <span className="text-sm text-gray-600">{t('gpa')}</span>
          <span className="text-sm font-medium text-gray-900">
            {application.gpa !== undefined && application.gpa !== null
              ? application.gpa.toFixed(2)
              : 'N/A'}
          </span>
        </div>

        {/* Major */}
        <div className="flex items-center gap-8 justify-between">
          <span className="text-sm text-gray-600">{t('major')}</span>
          <span className="text-sm font-medium text-gray-900">{application.major || 'N/A'}</span>
        </div>

        {/* Skills */}
        <div className="flex items-center gap-8 justify-between">
          <span className="text-sm text-gray-600">{t('skills')}</span>
          <span className="text-sm font-medium text-gray-900 line-clamp-1">
            {application.skills || 'N/A'}
          </span>
        </div>
      </div>

      {/* Action Buttons Section */}
      {(onEdit || onDelete) && (
        <>
          <div className="border-t border-gray-100"></div>
          <div className="p-4 flex gap-2">
            {onEdit && (
              <Button
                variant="outline"
                size="sm"
                className="flex-1 text-gray-700 border-gray-300 hover:bg-gray-100 hover:border-gray-400"
                onClick={(e) => {
                  e.stopPropagation();
                  onEdit(application);
                }}
              >
                {t('edit')}
              </Button>
            )}
            {onDelete && (
              <Button
                variant="outline"
                size="sm"
                className="flex-1 text-red-600 border-red-300 hover:bg-red-50 hover:border-red-400"
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete(application.id);
                }}
              >
                {t('delete')}
              </Button>
            )}
          </div>
        </>
      )}
    </article>
  );
}
