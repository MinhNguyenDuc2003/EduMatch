import React from 'react';
import ApplicationsTableHeader from './ApplicationsTableHeader';
import ApplicationsTableRow from './ApplicationsTableRow';

interface ApplicationsTableProps {
  applications: ApplicationScholarship[];
  onView: (applicationScholarship: ApplicationScholarship) => void;
  onViewScore?: (applicationScholarship: ApplicationScholarship) => void;
}

const ApplicationsTable = React.memo(
  ({ applications, onView, onViewScore }: ApplicationsTableProps) => {
    return (
      <div className="flex-1 overflow-hidden flex flex-col">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden flex-1 flex flex-col">
          <div className="overflow-y-auto flex-1">
            <table className="w-full">
              <ApplicationsTableHeader />
              <tbody className="divide-y divide-gray-200">
                {applications.map((app) => (
                  <ApplicationsTableRow
                    key={app.id}
                    application={app}
                    onView={onView}
                    onViewScore={onViewScore}
                  />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
);

ApplicationsTable.displayName = 'ApplicationsTable';

export default ApplicationsTable;
