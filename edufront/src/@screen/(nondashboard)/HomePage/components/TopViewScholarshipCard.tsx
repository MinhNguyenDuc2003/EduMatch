'use client';

import Image from 'next/image';
import { Building2 } from 'lucide-react';
import { getScholarshipFirstImage } from '@/utils/scholarshipHelpers';

type TopViewScholarshipCardProps = {
  scholarship: Scholarship;
  rank?: number;
  onViewDetails: () => void;
};

export default function TopViewScholarshipCard({
  scholarship,
  rank,
  onViewDetails,
}: TopViewScholarshipCardProps) {
  const imageUrl = getScholarshipFirstImage(scholarship);
  const { organizationName, logoUrl } = scholarship.providerProfileVo;

  return (
    <div
      className="group relative bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden cursor-pointer h-full flex flex-col"
      onClick={onViewDetails}
    >
      {/* Rank Badge */}
      {rank && (
        <div className="absolute top-3 left-3 z-10 w-8 h-8 rounded-full bg-[#3D6CB9] text-white flex items-center justify-center font-bold text-sm shadow-lg">
          {rank}
        </div>
      )}

      {/* Image */}
      <div className="relative w-full h-40 bg-gray-200 overflow-hidden">
        <Image
          src={
            imageUrl
              ? imageUrl
              : 'https://es5urvh1np.ufs.sh/f/DHR6tEJ9PQoz85HjSO62tcmI7ElP8Ygn01Oa3ze6iFwADrsH'
          }
          alt={scholarship.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />

        {/* Gradient overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col p-4">
        {/* Title */}
        <h3 className="text-base font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
          {scholarship.title}
        </h3>

        {/* Organization */}
        <div className="flex items-center gap-2 mb-3">
          <div className="w-6 h-6 rounded-full relative flex-shrink-0 border border-gray-200">
            <Image
              src={
                logoUrl
                  ? logoUrl
                  : 'https://es5urvh1np.ufs.sh/f/DHR6tEJ9PQoz85HjSO62tcmI7ElP8Ygn01Oa3ze6iFwADrsH'
              }
              alt={organizationName || 'Organization'}
              fill
              className="rounded-full object-contain bg-white"
            />
          </div>
          <p className="text-xs text-gray-600 line-clamp-1">{organizationName}</p>
        </div>

        {/* University */}
        {scholarship.university && (
          <div className="flex items-center gap-1.5 mb-2">
            <Building2 className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
            <p className="text-xs text-gray-600 line-clamp-1">{scholarship.university}</p>
          </div>
        )}

        {/* Funding Amount */}
        {scholarship.fundingAmount && (
          <div className="flex items-center gap-1.5 mt-auto">
            <p className="text-xs text-gray-600">Amount:</p>
            <p className="text-xs font-medium text-blue-700 line-clamp-1">
              {scholarship.fundingAmount}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
