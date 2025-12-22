import React from 'react';
import { Eye, BarChart2 } from 'lucide-react';
import { Button } from '@/pattern/cus/button';
import { cn } from '@/lib/utils';
import { getStatusColor, formatStatus, formatAppliedDate } from '../utils/applicationUtils';
import { useTranslations } from 'next-intl';
import { formatDate } from '@/utils/formatDate';

interface ApplicationsTableRowProps {
  application: ApplicationScholarship;
  onView: (applicationScholarship: ApplicationScholarship) => void;
  onViewScore?: (applicationScholarship: ApplicationScholarship) => void;
}

const ApplicationsTableRow = React.memo(
  ({ application, onView, onViewScore }: ApplicationsTableRowProps) => {
    const t = useTranslations('providerApplications');
    const handleView = () => {
      onView?.(application);
    };

    return (
      <tr className="hover:bg-gray-50 transition-colors">
        <td className="px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#38a696] to-[#52c0b0] flex items-center justify-center text-white font-semibold">
              {application.applicationVo.fullName.charAt(0).toUpperCase()}
            </div>
            <div>
              <p className="font-medium text-gray-900">{application.applicationVo.fullName}</p>
              <p className="text-sm text-gray-500">{application.applicationVo.email}</p>
            </div>
          </div>
        </td>
        <td className="px-6 py-4">
          <p className="text-sm text-gray-900">{application.applicationVo.major}</p>
        </td>
        <td className="px-6 py-4">
          <p className="text-sm font-medium text-gray-900">{application.applicationVo.gpa}</p>
        </td>
        <td className="px-6 py-4">
          <p className="text-sm font-bold text-primary-brand">
            {formatDate(application.createdDate)}
          </p>
        </td>
        <td className="px-6 py-4">
          <span
            className={cn(
              'inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border',
              getStatusColor(application.status || 'pending')
            )}
          >
            {t(formatStatus(application.status || 'pending'))}
          </span>
        </td>
        <td className="px-6 py-4">
          <div className="flex items-center justify-end gap-2">
            {onViewScore && (
              <Button
                size="sm"
                variant="ghost"
                className="h-8 w-8 p-0"
                onClick={() => onViewScore(application)}
              >
                <BarChart2 className="w-4 h-4 text-primary-brand" />
              </Button>
            )}
            <Button size="sm" variant="ghost" className="h-8 w-8 p-0" onClick={handleView}>
              <Eye className="w-4 h-4" />
            </Button>
          </div>
        </td>
      </tr>
    );
  }
);

ApplicationsTableRow.displayName = 'ApplicationsTableRow';

export default ApplicationsTableRow;
