import React from 'react';
import { Users } from 'lucide-react';

const ApplicationsSelectScholarship = React.memo(() => {
  return (
    <div className="flex-1 flex items-center justify-center bg-white rounded-xl border border-gray-200">
      <div className="text-center">
        <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <p className="text-gray-500 text-lg font-medium">Select a Scholarship</p>
        <p className="text-gray-400 text-sm mt-2">
          Choose a scholarship from the left to view its applications
        </p>
      </div>
    </div>
  );
});

ApplicationsSelectScholarship.displayName = 'ApplicationsSelectScholarship';

export default ApplicationsSelectScholarship;

