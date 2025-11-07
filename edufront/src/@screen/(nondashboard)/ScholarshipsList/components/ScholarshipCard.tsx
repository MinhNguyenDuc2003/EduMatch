import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Flag, Calendar, DollarSign } from 'lucide-react';
import { Button } from '@/lib/cus/button';
import ScholarshipCardImages from './ScholarshipCardImages';
import { getScholarshipImages } from '@/utils/scholarshipHelpers';
import {
  useFollowProviderMutation,
  useGetFollowedProvidersQuery,
  useUnfollowProviderMutation,
} from '@/state/apiProvider';

type ScholarshipCardProps = {
  scholarship: Scholarship;
  onApply: (scholarship: Scholarship) => void;
  onToggleTracking?: (scholarshipId: number) => void;
};

export default function ScholarshipCard({
  scholarship,
  onApply,
  onToggleTracking,
}: ScholarshipCardProps) {
  const router = useRouter();
  const [isImageZoomed, setIsImageZoomed] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const images = getScholarshipImages(scholarship);

  // Get followed providers
  const { data: followedProviders } = useGetFollowedProvidersQuery();
  const [followProvider] = useFollowProviderMutation();
  const [unfollowProvider] = useUnfollowProviderMutation();

  // Check if provider is followed
  const isFollowing =
    followedProviders?.some(
      (fp: { providerId: number }) => fp.providerId === scholarship.providerId
    ) || false;

  // Handle follow/unfollow provider
  const handleFollowProvider = async () => {
    try {
      if (isFollowing) {
        // If already following, unfollow
        await unfollowProvider(scholarship.providerId).unwrap();
      } else {
        // If not following, follow
        await followProvider(scholarship.providerId).unwrap();
      }
    } catch (error) {
      console.error('Failed to toggle follow provider:', error);
    }
  };

  const handleViewProvider = (providerId: number) => {
    router.push(`/applicant/providers/${providerId}`);
  };
  const handleViewScholarship = (slug: string) => {
    router.push(`/scholarships/${slug}`);
  };

  return (
    <>
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
        {/* Organization Header */}
        <div className="p-4 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div
                className="w-10 h-10 rounded-md bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white text-sm font-bold flex-shrink-0 cursor-pointer"
                onClick={() => handleViewProvider(scholarship.providerId)}
              >
                {scholarship.university?.charAt(0) || 'O'}
              </div>
              <div>
                <h3
                  className="font-semibold text-gray-900 text-sm transition-colors cursor-pointer hover:underline"
                  onClick={() => handleViewProvider(scholarship.providerId)}
                >
                  {scholarship.university || 'Organization Name'}
                </h3>
                <button
                  onClick={handleFollowProvider}
                  className="text-xs text-blue-600 hover:text-blue-700 font-medium"
                >
                  {isFollowing ? 'Following' : 'Follow'}
                </button>
              </div>
            </div>
            <button
              onClick={() => onToggleTracking?.(scholarship.id)}
              className="p-2 rounded-full hover:bg-gray-100 transition-colors"
              aria-label={scholarship.isFollow === 1 ? 'Untrack scholarship' : 'Track scholarship'}
            >
              <Flag
                className={`w-5 h-5 transition-colors ${
                  scholarship.isFollow === 1 ? 'fill-blue-600 text-blue-600' : 'text-gray-400'
                }`}
              />
            </button>
          </div>
        </div>

        {/* Image */}
        <ScholarshipCardImages
          images={images}
          title={scholarship.title}
          onImageClick={(index) => {
            setSelectedImageIndex(index);
            setIsImageZoomed(true);
          }}
        />

        {/* Content */}
        <div className="p-5">
          {/* Title & Description - Clickable Area */}
          <div
            className="cursor-pointer group"
            onClick={() => handleViewScholarship(scholarship.slug)}
          >
            {/* Title */}
            <h2 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
              {scholarship.title}
            </h2>

            {/* Description */}
            <p className="text-gray-600 text-sm leading-relaxed mb-3 line-clamp-3">
              {scholarship.description || scholarship.shortDescription}
            </p>
          </div>

          {/* Info Tags */}
          {(scholarship.university || scholarship.scholarshipType || scholarship.studyLevel) && (
            <div className="space-y-2 mb-3 text-xs">
              {scholarship.university && (
                <div className="flex items-center gap-2">
                  <span className="text-gray-500 font-medium min-w-[80px]">University:</span>
                  <span className="text-gray-900">{scholarship.university}</span>
                </div>
              )}
              {scholarship.studyLevel && (
                <div className="flex items-center gap-2">
                  <span className="text-gray-500 font-medium min-w-[80px]">Level:</span>
                  <span className="text-gray-900">{scholarship.studyLevel}</span>
                </div>
              )}
              {scholarship.scholarshipType && (
                <div className="flex items-center gap-2">
                  <span className="text-gray-500 font-medium min-w-[80px]">Type:</span>
                  <span className="text-gray-900">{scholarship.scholarshipType}</span>
                </div>
              )}
            </div>
          )}

          {/* Footer */}
          <div className="flex justify-between items-center pt-3 border-t border-gray-100">
            {/* Date & Amount */}
            <div className="flex items-center gap-4 text-sm text-gray-600">
              {/* Date */}
              <div className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4" />
                <span className=" font-semibold text-gray-900">
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
                <DollarSign className="w-4 h-4" />
                <span className="font-semibold text-gray-900">
                  {scholarship.fundingAmount
                    ? scholarship.fundingAmount.replace(/[^0-9.,]/g, '')
                    : '$0'}
                </span>
              </div>
            </div>

            {/* Action Buttons
            <div className="flex items-center gap-2">
              <Button
                className="bg-gradient-to-r from-blue-700 to-blue-800 hover:from-blue-800 hover:to-blue-900 text-white px-4 py-1.5 rounded-lg font-semibold shadow-md hover:shadow-lg transition-all [&_.value]:text-white text-sm"
                value="Apply"
                onClick={() => onApply(scholarship)}
              />
            </div> */}
          </div>
        </div>

        {/* Full Screen Image Modal */}
        {isImageZoomed && images.length > 0 && (
          <div
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
            onClick={() => setIsImageZoomed(false)}
          >
            <div className="relative max-w-7xl max-h-full">
              <Image
                src={images[selectedImageIndex]}
                alt={`${scholarship.title} ${selectedImageIndex + 1}`}
                width={1200}
                height={800}
                className="max-w-full max-h-[90vh] object-contain"
                onClick={(e) => e.stopPropagation()}
              />
              <button
                onClick={() => setIsImageZoomed(false)}
                className="absolute top-4 right-4 w-10 h-10 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center text-white text-xl font-bold transition-colors"
              >
                ×
              </button>
              {images.length > 1 && (
                <>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedImageIndex((prev) => (prev - 1 + images.length) % images.length);
                    }}
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center text-white text-xl font-bold transition-colors"
                  >
                    ‹
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedImageIndex((prev) => (prev + 1) % images.length);
                    }}
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center text-white text-xl font-bold transition-colors"
                  >
                    ›
                  </button>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
