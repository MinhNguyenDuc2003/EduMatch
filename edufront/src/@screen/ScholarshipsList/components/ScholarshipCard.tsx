import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Bookmark, Calendar, DollarSign, Eye } from 'lucide-react';
import { Button } from '@/lib/cus/button';

type ScholarshipCardProps = {
  scholarship: Scholarship;
  onApply: (scholarship: Scholarship) => void;
};

export default function ScholarshipCard({ scholarship, onApply }: ScholarshipCardProps) {
  const router = useRouter();
  const [isSaved, setIsSaved] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);

  return (
    <div className="bg-[#FAFAF6] rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
      {/* Organization Header */}
      <div className="p-4 border-b border-gray-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-md bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white text-base font-bold flex-shrink-0">
              {scholarship.university?.charAt(0) || 'O'}
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 text-sm">
                {scholarship.university || 'Organization Name'}
              </h3>
              <button
                onClick={() => setIsFollowing(!isFollowing)}
                className="text-xs text-blue-600 hover:text-blue-700 font-medium"
              >
                {isFollowing ? 'Following' : 'Follow'}
              </button>
            </div>
          </div>
          <button
            onClick={() => setIsSaved(!isSaved)}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
          >
            <Bookmark
              className={`w-5 h-5 transition-colors ${
                isSaved ? 'fill-blue-600 text-blue-600' : 'text-gray-400'
              }`}
            />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        {/* Title */}
        <h2
          className="text-lg font-bold text-gray-900 mb-2 cursor-pointer hover:text-blue-600 transition-colors"
          onClick={() => router.push(`/scholarships/${scholarship.id}`)}
        >
          {scholarship.title}
        </h2>

        {/* Description */}
        <p className="text-gray-600 text-sm leading-relaxed mb-3 line-clamp-3">
          {scholarship.description || scholarship.shortDescription}
        </p>

        {/* Tags */}
        {(scholarship.country || scholarship.studyLevel || scholarship.fields) && (
          <div className="flex flex-wrap gap-2 mb-3">
            {scholarship.country && (
              <span className="px-2.5 py-0.5 bg-blue-50 text-blue-700 text-xs font-medium rounded-full">
                {scholarship.country}
              </span>
            )}
            {scholarship.studyLevel && (
              <span className="px-2.5 py-0.5 bg-purple-50 text-purple-700 text-xs font-medium rounded-full">
                {scholarship.studyLevel}
              </span>
            )}
            {scholarship.scholarshipType && (
              <span className="px-2.5 py-0.5 bg-green-50 text-green-700 text-xs font-medium rounded-full">
                {scholarship.scholarshipType}
              </span>
            )}
          </div>
        )}

        {/* Footer */}
        <div className="pt-3 border-t border-gray-100 space-y-3">
          {/* Date & Amount */}
          <div className="flex items-center gap-4 text-xs text-gray-600">
            {/* Date */}
            <div className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5" />
              <span className="text- font-semibold text-gray-900">
                {scholarship.endDate
                  ? new Date(scholarship.endDate).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                    })
                  : 'No deadline'}
              </span>
            </div>

            {/* Amount */}
            <div className="flex items-center gap-1.5">
              <DollarSign className="w-3.5 h-3.5" />
              <span className="font-semibold text-gray-900">
                {scholarship.fundingAmount
                  ? scholarship.fundingAmount.replace(/[^0-9.,]/g, '')
                  : '$0'}
              </span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              className="flex-1 px-4 py-1.5 rounded-lg font-semibold text-sm bg-white border-gray-300 hover:bg-gray-50 [&_.value]:text-gray-700"
              value="Details"
              iconLeft={<Eye className="w-4 h-4 text-primary" />}
              onClick={() => router.push(`/scholarships/${scholarship.id}`)}
            />
            <Button
              className="flex-1 bg-gradient-to-r from-blue-700 to-blue-800 hover:from-blue-800 hover:to-blue-900 text-white px-4 py-1.5 rounded-lg font-semibold shadow-md hover:shadow-lg transition-all [&_.value]:text-white text-sm"
              value="Apply"
              onClick={() => onApply(scholarship)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
