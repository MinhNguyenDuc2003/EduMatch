'use client';

import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useGetRecommendedScholarshipsQuery } from '@/state/apiScholarship';
import { useAuth } from '@/hooks/useAuth';
import { Sparkles, ArrowRight } from 'lucide-react';
import { Button } from '@/pattern/cus/button';
import TopViewScholarshipCard from './TopViewScholarshipCard';
import TopViewCardSkeleton from './TopViewCardSkeleton';

export default function RecommendedScholarshipsSection() {
  const router = useRouter();
  const t = useTranslations('homepage.recommendedScholarships');
  const { isAuthenticated, subscriptions, isApplicant } = useAuth();

  const hasApplicantSubscription = subscriptions.some(
    (subscription) => subscription.userType === 'APPLICANT'
  );

  const {
    data: scholarships,
    isLoading,
    isError,
  } = useGetRecommendedScholarshipsQuery(
    { topK: 5 },
    { skip: !hasApplicantSubscription || !isApplicant }
  );

  const top5Scholarships = scholarships?.slice(0, 5) || [];

  const handleViewDetails = (slug: string) => {
    router.push(`/scholarships/${slug}`);
  };

  const handleViewAll = () => {
    router.push('/recommended-scholarships');
  };

  if (!hasApplicantSubscription || !isApplicant) {
    return null; // Don't show anything if no subscription
  }

  if (isError) {
    return null; // Hide section on error
  }

  if (!isLoading && (!top5Scholarships || top5Scholarships.length === 0)) {
    return null;
  }

  return (
    <section className="py-12 bg-gradient-to-br from-slate-50 to-blue-50/30">
      <div className=" mx-auto px-6 lg:px-40">
        {/* Header */}
        <div className="flex items-center justify-between mb-10">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <h2 className="text-3xl font-bold text-slate-900">{t('title')}</h2>
            </div>
            <p className="text-lg text-slate-600 max-w-2xl">{t('subtitle')}</p>
          </div>
          <Button
            variant="outline"
            onClick={handleViewAll}
            className="px-6 py-3 rounded-xl border-2 border-slate-300 text-primary hover:border-[#3D6CB9] hover:text-[#3D6CB9] transition-all"
          >
            <span>{t('viewAll')}</span>
            <ArrowRight className="w-4 h-4" />
          </Button>
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
            top5Scholarships.map((scholarship) => (
              <TopViewScholarshipCard
                key={scholarship.id}
                scholarship={scholarship}
                onViewDetails={() => handleViewDetails(scholarship.slug)}
              />
            ))
          )}
        </div>

        {/* View All Button (Mobile) */}
        {!isLoading && top5Scholarships.length > 0 && (
          <div className="mt-8 text-center md:hidden">
            <Button variant="outline" onClick={handleViewAll} className="items-center gap-2">
              <span>{t('viewAll')}</span>
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}
