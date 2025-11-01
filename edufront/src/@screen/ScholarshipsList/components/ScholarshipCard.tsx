import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
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
  const [isImageZoomed, setIsImageZoomed] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  // Get images array
  const images =
    scholarship.imageUrls && scholarship.imageUrls.length > 0
      ? scholarship.imageUrls
      : scholarship.imageUrl
        ? [scholarship.imageUrl]
        : [];

  return (
    <>
      {/* Full Screen Image Modal */}
      {isImageZoomed && images.length > 0 && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={() => setIsImageZoomed(false)}
        >
          <div className="relative max-w-7xl max-h-full">
            <Image
              src={images[selectedImageIndex]}
              alt={scholarship.title}
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

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
        {/* Organization Header */}
        <div className="p-4 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
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

        {/* Image */}
        {images.length > 0 ? (
          <div className="w-full bg-gray-100 px-1 pt-1">
            {images.length === 1 ? (
              <div
                className="w-full relative overflow-hidden cursor-pointer"
                onClick={() => {
                  setIsImageZoomed(true);
                  setSelectedImageIndex(0);
                }}
              >
                <div className="w-full h-48 relative bg-gray-200">
                  <Image
                    src={images[0]}
                    alt={scholarship.title}
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
              </div>
            ) : images.length === 2 ? (
              <div
                className="w-full relative overflow-hidden cursor-pointer"
                onClick={() => {
                  setIsImageZoomed(true);
                  setSelectedImageIndex(0);
                }}
              >
                <div className="grid grid-cols-2 gap-0.5 h-48">
                  {images.map((img, idx) => (
                    <div key={idx} className="relative bg-gray-200">
                      <Image
                        src={img}
                        alt={`${scholarship.title} ${idx + 1}`}
                        fill
                        className="object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  ))}
                </div>
              </div>
            ) : images.length >= 3 ? (
              <div
                className="w-full relative overflow-hidden cursor-pointer"
                onClick={() => {
                  setIsImageZoomed(true);
                  setSelectedImageIndex(0);
                }}
              >
                <div className="grid grid-cols-2 grid-rows-2 gap-0.5 h-48">
                  {images.slice(0, 3).map((img, idx) => (
                    <div
                      key={idx}
                      className={`relative bg-gray-200 ${idx === 2 ? 'col-span-1' : 'col-span-1'}`}
                    >
                      <Image
                        src={img}
                        alt={`${scholarship.title} ${idx + 1}`}
                        fill
                        className="object-cover hover:scale-105 transition-transform duration-300"
                      />
                      {idx === 2 && images.length > 3 && (
                        <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                          <span className="text-white text-2xl font-bold">
                            +{images.length - 3}
                          </span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ) : null}
          </div>
        ) : (
          <div className="w-full h-32 bg-gray-200"></div>
        )}

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
    </>
  );
}
