import React from 'react';

const ApplicationsTableHeader = React.memo(() => {
  return (
    <thead className="bg-gray-50 border-b border-gray-200 sticky top-0">
      <tr>
        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
          Student
        </th>
        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
          Major
        </th>
        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
          GPA
        </th>
        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
          Applied Date
        </th>
        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
          Status
        </th>
        <th className="px-6 py-4 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">
          Actions
        </th>
      </tr>
    </thead>
  );
});

ApplicationsTableHeader.displayName = 'ApplicationsTableHeader';

export default ApplicationsTableHeader;

