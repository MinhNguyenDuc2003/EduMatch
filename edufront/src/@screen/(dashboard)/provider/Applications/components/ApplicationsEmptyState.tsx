import React from 'react';

interface ApplicationsEmptyStateProps {
  hasApplications: boolean;
}

const ApplicationsEmptyState = React.memo(({ hasApplications }: ApplicationsEmptyStateProps) => {
  return (
    <div className="flex-1 flex items-center justify-center bg-white rounded-xl border border-gray-200">
      <div className="text-center">
        <p className="text-gray-500 text-lg">No applications found</p>
        <p className="text-gray-400 text-sm mt-2">
          {hasApplications
            ? 'Try adjusting your search or filter criteria'
            : 'No applications for this scholarship yet'}
        </p>
      </div>
    </div>
  );
});

ApplicationsEmptyState.displayName = 'ApplicationsEmptyState';

export default ApplicationsEmptyState;

