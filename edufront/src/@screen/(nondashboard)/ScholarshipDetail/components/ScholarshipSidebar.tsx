import { MapPin } from 'lucide-react';
import { Button } from '@/lib/cus/button';

type ScholarshipSidebarProps = {
  scholarship: Scholarship;
  isFollowing: boolean;
  onToggleFollow: () => void;
};

export default function ScholarshipSidebar({
  scholarship,
  isFollowing,
  onToggleFollow,
}: ScholarshipSidebarProps) {
  return (
    <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
      {/* University Header */}
      {scholarship.university && (
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-4">
            {/* University Icon */}
            <div className="w-12 h-12 rounded-md bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white text-lg font-bold flex-shrink-0">
              {scholarship.university.charAt(0).toUpperCase()}
            </div>
            {/* University Name */}
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900">{scholarship.university}</h3>
            </div>
            {/* Follow Button */}
            <Button
              value={isFollowing ? 'Following' : 'Follow'}
              variant="outline_active"
              size="sm"
              onClick={onToggleFollow}
              className="[&_.value]:text-sm"
            />
          </div>
        </div>
      )}

      {scholarship.country && (
        <div className="flex items-start gap-3">
          <MapPin className="w-4 h-4 text-gray-500 mt-0.5 flex-shrink-0" />
          <span className="text-gray-700 text-sm">{scholarship.country}</span>
        </div>
      )}
    </div>
  );
}
