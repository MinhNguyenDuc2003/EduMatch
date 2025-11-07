import { Award, Plus } from 'lucide-react';

export const EmptyState = () => {
  return (
    <div className="bg-white rounded-xl p-12 text-center shadow-sm border border-gray-200">
      <Award className="w-16 h-16 mx-auto text-gray-400 mb-4" />
      <h3 className="text-xl font-semibold text-gray-900 mb-2">No scholarships found</h3>
      <p className="text-gray-600 mb-6">Get started by creating your first scholarship program</p>
    </div>
  );
};
