'use client';

import { Button } from '@/lib/cus/button';

type ApplicationCardProps = {
  application: Application;
  onEdit?: (application: Application) => void;
  onDelete?: (applicationId: number) => void;
};

export default function ApplicationCard({ application, onEdit, onDelete }: ApplicationCardProps) {
  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all hover:shadow-lg">
      {/* Header Section */}
      <div className="border-b border-slate-200 bg-gradient-to-r from-slate-50 to-white p-5">
        <h3 className="text-lg font-bold text-slate-900 truncate">
          {application.fullName || 'Application'}
        </h3>
      </div>

      {/* Content Section - Phân rõ các nguồn thông tin */}
      <div className="flex flex-1 flex-col p-5 space-y-4">
        {/* Application Information Section */}
        <div className="space-y-3">
          <h4 className="text-xs font-semibold uppercase tracking-wide text-slate-500 mb-3">
            Application Information
          </h4>

          {/* Application Name */}
          <div className="flex flex-col">
            <span className="text-xs font-medium text-slate-500 mb-1">Application Name</span>
            <span className="text-sm font-semibold text-slate-900">
              {application.fullName || 'N/A'}
            </span>
          </div>

          {/* Major */}
          <div className="flex flex-col">
            <span className="text-xs font-medium text-slate-500 mb-1">Major</span>
            <span className="text-sm text-slate-700">{application.major || 'N/A'}</span>
          </div>

          {/* GPA */}
          <div className="flex flex-col">
            <span className="text-xs font-medium text-slate-500 mb-1">GPA</span>
            <span className="text-sm text-slate-700">
              {application.gpa !== undefined && application.gpa !== null
                ? application.gpa.toFixed(2)
                : 'N/A'}
            </span>
          </div>

          {/* Skills */}
          <div className="flex flex-col">
            <span className="text-xs font-medium text-slate-500 mb-1">Skills</span>
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
            value="Edit"
            onClick={() => onEdit(application)}
          />
        )}
        {onDelete && (
          <Button
            variant="outline"
            size="sm"
            className="flex-1 text-red-600 border-red-300 hover:bg-red-50 hover:border-red-400"
            value="Delete"
            onClick={() => onDelete(application.id)}
          />
        )}
      </div>
    </article>
  );
}
