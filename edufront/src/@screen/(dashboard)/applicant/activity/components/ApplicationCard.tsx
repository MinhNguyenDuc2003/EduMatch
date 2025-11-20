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
      className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all hover:shadow-lg cursor-pointer"
      onClick={() => onViewDetails?.(application)}
    >
      {/* Header Section */}
      <div className=" border-slate-200 bg-gradient-to-r from-primary-light to-white p-3">
        <h3 className="text-base font-bold text-slate-900 truncate">
          {application.applicationName || t('applicationName')}
        </h3>
      </div>

      <div className="flex flex-1 flex-col p-5 space-y-4">
        {/* Application Information Section */}
        <div className="space-y-3">
          <div className="flex items-center justify-between gap-2">
            {/* Application Name */}
            <div className="flex flex-col">
              <span className="text-xs font-medium text-slate-500">{t('fullName')}</span>
              <span className="text-sm font-semibold text-slate-900">
                {application.fullName || 'N/A'}
              </span>
            </div>

            {/* GPA */}
            <div className="flex flex-col">
              <span className="text-xs font-medium text-slate-500">{t('gpa')}</span>
              <span className="text-sm text-slate-700">
                {application.gpa !== undefined && application.gpa !== null
                  ? application.gpa.toFixed(2)
                  : 'N/A'}
              </span>
            </div>
          </div>

          {/* Major */}
          <div className="flex flex-col">
            <span className="text-xs font-medium text-slate-500">{t('major')}</span>
            <span className="text-sm text-slate-700">{application.major || 'N/A'}</span>
          </div>

          {/* Skills */}
          <div className="flex flex-col">
            <span className="text-xs font-medium text-slate-500">{t('skills')}</span>
            <span className="text-sm text-slate-700">{application.skills || 'N/A'}</span>
          </div>
        </div>
      </div>

      {/* Action Buttons Section */}
      <div className="border-t border-slate-200 bg-slate-50 p-4 flex gap-2">
        {onEdit && (
          <Button
            variant="outline"
            size="sm"
            className="flex-1 text-slate-700 border-slate-300 hover:bg-slate-100 hover:border-slate-400"
            value={t('edit')}
            onClick={(e) => {
              e.stopPropagation();
              onEdit(application);
            }}
          />
        )}
        {onDelete && (
          <Button
            variant="outline"
            size="sm"
            className="flex-1 text-red-600 border-red-300 hover:bg-red-50 hover:border-red-400"
            value={t('delete')}
            onClick={(e) => {
              e.stopPropagation();
              onDelete(application.id);
            }}
          />
        )}
      </div>
    </article>
  );
}
