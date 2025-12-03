'use client';

import { useGetScholarshipTopViewByMonthQuery } from '@/state/apiScholarship';
import { Eye } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import TopViewScholarshipCard from './TopViewScholarshipCard';
import TopViewCardSkeleton from './TopViewCardSkeleton';

export default function TopViewScholarshipSection() {
  const { data: scholarships, isLoading, isError } = useGetScholarshipTopViewByMonthQuery();
  const router = useRouter();
  const t = useTranslations('homepage.topViewScholarships');

  // Get top 5 scholarships
  const top5Scholarships = scholarships?.slice(0, 5) || [];

  const handleViewDetails = (slug: string) => {
    router.push(`/scholarships/${slug}`);
  };

  if (isError) {
    return null; // Hide section on error
  }

  if (!isLoading && (!top5Scholarships || top5Scholarships.length === 0)) {
    return null; // Hide section if no data
  }

  return (
    <section className="py-12 bg-gradient-to-br from-slate-50 to-blue-50/30">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-slate-900 mb-2">{t('title')}</h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">{t('description')}</p>
        </div>

        {/* Scholarships Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {isLoading ? (
            <>
              {Array.from({ length: 5 }).map((_, index) => (
                <TopViewCardSkeleton key={`skeleton-${index}`} />
              ))}
            </>
          ) : (
            top5Scholarships.map((scholarship, index) => (
              <TopViewScholarshipCard
                key={scholarship.id}
                scholarship={scholarship}
                rank={index + 1}
                onViewDetails={() => handleViewDetails(scholarship.slug)}
              />
            ))
          )}
        </div>

        {/* View Count Description */}
        {!isLoading && top5Scholarships.length > 0 && (
          <div className="mt-8 text-center">
            <p className="text-sm text-gray-500 flex items-center justify-center gap-2">
              <Eye className="w-4 h-4" />
              <span>{t('viewCountDescription')}</span>
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
