import React from 'react';
import { Eye } from 'lucide-react';
import { Button } from '@/lib/cus/button';
import { cn } from '@/lib/utils';
import { getStatusColor, formatStatus, formatAppliedDate } from '../utils/applicationUtils';
import { useTranslations } from 'next-intl';

interface ApplicationsTableRowProps {
  application: ApplicationScholarship;
  onView: (applicationScholarship: ApplicationScholarship) => void;
}

const ApplicationsTableRow = React.memo(({ application, onView }: ApplicationsTableRowProps) => {
  const t = useTranslations('providerApplications');
  const handleView = () => {
    onView?.(application);
  };

  const status = application.status || 'pending';
  const appliedDate = formatAppliedDate(application.appliedAt);

  const { fullName, email, major, gpa } = application.applicationVo;

  return (
    <tr className="hover:bg-gray-50 transition-colors">
      <td className="px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#38a696] to-[#52c0b0] flex items-center justify-center text-white font-semibold">
            {fullName.charAt(0).toUpperCase()}
          </div>
          <div>
            <p className="font-medium text-gray-900">{fullName}</p>
            <p className="text-sm text-gray-500">{email}</p>
          </div>
        </div>
      </td>
      <td className="px-6 py-4">
        <p className="text-sm text-gray-900">{major}</p>
      </td>
      <td className="px-6 py-4">
        <p className="text-sm font-medium text-gray-900">{gpa}</p>
      </td>
      <td className="px-6 py-4">
        <p className="text-sm text-gray-500">{appliedDate}</p>
      </td>
      <td className="px-6 py-4">
        <span
          className={cn(
            'inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border',
            getStatusColor(status)
          )}
        >
          {t(formatStatus(status))}
        </span>
      </td>
      <td className="px-6 py-4">
        <div className="flex items-center justify-end gap-2">
          <Button size="sm" variant="ghost" className="h-8 w-8 p-0" onClick={handleView}>
            <Eye className="w-4 h-4" />
          </Button>
        </div>
      </td>
    </tr>
  );
});

ApplicationsTableRow.displayName = 'ApplicationsTableRow';

export default ApplicationsTableRow;
