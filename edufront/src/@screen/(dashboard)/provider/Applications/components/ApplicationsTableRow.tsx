import React from 'react';
import { Eye, Check, X } from 'lucide-react';
import { Button } from '@/lib/cus/button';
import { cn } from '@/lib/utils';
import { getStatusColor, formatStatus, DisplayApplication } from '../utils/applicationUtils';

interface ApplicationsTableRowProps {
  application: DisplayApplication;
  onView?: (id: number) => void;
  onApprove?: (id: number) => void;
  onReject?: (id: number) => void;
}

const ApplicationsTableRow = React.memo(
  ({ application, onView, onApprove, onReject }: ApplicationsTableRowProps) => {
    const handleView = () => {
      onView?.(application.id);
    };

    const handleApprove = () => {
      onApprove?.(application.id);
    };

    const handleReject = () => {
      onReject?.(application.id);
    };

    return (
      <tr className="hover:bg-gray-50 transition-colors">
        <td className="px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#38a696] to-[#52c0b0] flex items-center justify-center text-white font-semibold">
              {application.studentName.charAt(0).toUpperCase()}
            </div>
            <div>
              <p className="font-medium text-gray-900">{application.studentName}</p>
              <p className="text-sm text-gray-500">{application.email}</p>
            </div>
          </div>
        </td>
        <td className="px-6 py-4">
          <p className="text-sm text-gray-900">{application.major}</p>
        </td>
        <td className="px-6 py-4">
          <p className="text-sm font-medium text-gray-900">{application.gpa}</p>
        </td>
        <td className="px-6 py-4">
          <p className="text-sm text-gray-500">{application.appliedDate}</p>
        </td>
        <td className="px-6 py-4">
          <span
            className={cn(
              'inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border',
              getStatusColor(application.status)
            )}
          >
            {formatStatus(application.status)}
          </span>
        </td>
        <td className="px-6 py-4">
          <div className="flex items-center justify-end gap-2">
            <Button
              size="sm"
              variant="ghost"
              className="h-8 w-8 p-0"
              onClick={handleView}
            >
              <Eye className="w-4 h-4" />
            </Button>
            {application.status === 'pending' && (
              <>
                <Button
                  size="sm"
                  variant="ghost"
                  className="h-8 w-8 p-0 text-green-600 hover:text-green-700 hover:bg-green-50"
                  onClick={handleApprove}
                >
                  <Check className="w-4 h-4" />
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  className="h-8 w-8 p-0 text-red-600 hover:text-red-700 hover:bg-red-50"
                  onClick={handleReject}
                >
                  <X className="w-4 h-4" />
                </Button>
              </>
            )}
          </div>
        </td>
      </tr>
    );
  }
);

ApplicationsTableRow.displayName = 'ApplicationsTableRow';

export default ApplicationsTableRow;

