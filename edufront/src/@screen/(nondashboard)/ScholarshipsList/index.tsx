'use client';

import { useState, useEffect, useCallback } from 'react';
import {
  FilterSidebar,
  RightSidebar,
  PremiumBanner,
  ScholarshipsListSkeleton,
  ScholarshipCardSkeleton,
} from './components';
import { Filter } from 'lucide-react';
import SearchBar from '@/pattern/share/SearchBar';
import {
  useFollowScholarshipMutation,
  useGetScholarshipTopViewByMonthQuery,
  useSearchScholarshipsQuery,
  useUnfollowScholarshipMutation,
} from '@/state/apiScholarship';
import { useFollowProviderMutation, useUnfollowProviderMutation } from '@/state/apiProvider';
import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useDebounce } from '@/utils/useDebounce';
import { toast } from 'sonner';
import { useIntersectionObserver } from '@/hooks/use-intersection-observer';
import ScholarshipCard from '@/pattern/share/ScholarshipCard';
import { TopViewedScholarships } from '../NewsPage/components';

export default function ScholarshipsList() {
  const router = useRouter();
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const t = useTranslations('scholarshipsList');
  const tToast = useTranslations('toast');

  const [keywordInput, setKeywordInput] = useState('');
  const debouncedKeyword = useDebounce(keywordInput, 500);

  const [filters, setFilters] = useState<FilterState>({
    keyword: '',
    country: '',
    studyLevel: '',
    scholarshipType: '',
    university: '',
    fields: '',
    minGpa: 0,
    maxGpa: 4,
    page: 0,
    size: 10,
  });

  // Accumulated scholarships for infinite scroll
  const [allScholarships, setAllScholarships] = useState<Scholarship[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    setFilters((prev) => ({ ...prev, keyword: debouncedKeyword || '', page: 0 }));
    setCurrentPage(0);
    setAllScholarships([]);
    setHasMore(true);
  }, [debouncedKeyword]);

  // Reset when filters change (except page and keyword which is handled separately)
  useEffect(() => {
    // Reset infinite scroll state when filters change
    setCurrentPage(0);
    setAllScholarships([]);
    setHasMore(true);
  }, [
    filters.country,
    filters.studyLevel,
    filters.scholarshipType,
    filters.university,
    filters.fields,
    filters.minGpa,
    filters.maxGpa,
  ]);

  // Prepare API request body
  const requestBody: ScholarshipSearchRequest = {
    criteria: {
      studyLevel: filters.studyLevel || '',
      country: filters.country || '',
      scholarshipType: filters.scholarshipType || '',
      university: filters.university || '',
      fields: filters.fields || '',
    },
    page: currentPage,
    size: filters.size,
    keyword: filters.keyword || '',
    minGpa: filters.minGpa,
    maxGpa: filters.maxGpa,
  };

  // Call API
  const { data: response, isLoading, isError, refetch } = useSearchScholarshipsQuery(requestBody);
  const { data: scholarshipTopView, isLoading: isLoadingScholarshipTopView } =
    useGetScholarshipTopViewByMonthQuery();
  const [followScholarship] = useFollowScholarshipMutation();
  const [unfollowScholarship] = useUnfollowScholarshipMutation();
  const [followProvider] = useFollowProviderMutation();
  const [unfollowProvider] = useUnfollowProviderMutation();

  const aggregations = response?.aggregations;

  // Update accumulated scholarships when new data arrives
  useEffect(() => {
    const newScholarships = response?.scholarship || [];

    if (newScholarships.length > 0) {
      // Deduplicate new scholarships first (in case API returns duplicates)
      const seenIds = new Set<number>();
      const deduplicatedNewScholarships = newScholarships.filter((s) => {
        if (seenIds.has(s.id)) {
          return false;
        }
        seenIds.add(s.id);
        return true;
      });

      if (currentPage === 0) {
        // First page - replace all
        setAllScholarships(deduplicatedNewScholarships);
      } else {
        // Subsequent pages - append, but filter out duplicates
        setAllScholarships((prev) => {
          const existingIds = new Set(prev.map((s) => s.id));
          const uniqueNewScholarships = deduplicatedNewScholarships.filter(
            (s) => !existingIds.has(s.id)
          );
          return [...prev, ...uniqueNewScholarships];
        });
      }
      // Check if there's more data
      setHasMore(deduplicatedNewScholarships.length === filters.size);
    } else if (currentPage > 0) {
      // No more data
      setHasMore(false);
    }
  }, [response, currentPage, filters.size]);

  const scholarships = allScholarships;

  const handleApply = (scholarship: Scholarship) => {
    console.log('Apply to:', scholarship.title);
    // TODO: Implement apply logic
  };

  const handleToggleTracking = async (scholarshipId: number) => {
    const scholarship = scholarships?.find((s) => s.id === scholarshipId);
    const isTracked = scholarship?.isFollow === 1;

    try {
      if (isTracked) {
        await unfollowScholarship({
          scholarshipId,
        }).unwrap();
        toast.success(tToast('trackScholarship.untrack'));
      } else {
        await followScholarship({
          scholarshipId,
        }).unwrap();
        toast.success(tToast('trackScholarship.track'));
      }
    } catch (error) {
      console.error('Failed to toggle tracking:', error);
    }
  };

  // Handle follow/unfollow provider
  const handleFollowProvider = async (providerId: number) => {
    const scholarship = scholarships?.find((s) => s.providerProfileVo?.id === providerId);
    if (!scholarship) {
      return;
    }
    const isFollowing = scholarship.providerProfileVo?.isFollow === 1;
    try {
      if (isFollowing) {
        await unfollowProvider(scholarship.providerProfileVo?.id).unwrap();
        toast.success(tToast('followProvider.unfollow'));
      } else {
        await followProvider(scholarship.providerProfileVo?.id).unwrap();
        toast.success(tToast('followProvider.follow'));
      }
    } catch (error) {
      console.log('Failed to toggle follow provider:', error);
      toast.error(tToast('followProvider.followFailed'));
    }
    refetch();
  };

  const handleViewScholarship = (slug: string) => {
    router.push(`/scholarships/${slug}`);
  };

  const handleViewProvider = (providerId: number) => {
    router.push(`/providers/${providerId}`);
  };

  // Load more function for infinite scroll
  const loadMore = useCallback(() => {
    if (!isLoading && hasMore) {
      setCurrentPage((prev) => prev + 1);
    }
  }, [isLoading, hasMore]);

  // Intersection observer for infinite scroll
  const { targetRef, isIntersecting } = useIntersectionObserver({
    threshold: 0.1,
    rootMargin: '200px',
  });

  // Trigger load more when intersection observer detects bottom
  useEffect(() => {
    if (isIntersecting && hasMore && !isLoading) {
      loadMore();
    }
  }, [isIntersecting, hasMore, isLoading, loadMore]);

  const activeFiltersCount = (() => {
    let count = 0;
    if (filters.keyword) count++;
    if (filters.country) count++;
    if (filters.studyLevel) count++;
    if (filters.scholarshipType) count++;
    if (filters.minGpa > 0) count++;
    if (filters.maxGpa < 4) count++;
    if (filters.fields) count++;
    return count;
  })();

  // Show full page skeleton on initial load
  if (isLoading && currentPage === 0 && allScholarships.length === 0) {
    return <ScholarshipsListSkeleton />;
  }

  return (
    <>
      {/* Mobile Search Bar & Filter Button - Sticky */}
      <div className="lg:hidden fixed top-[60px] left-0 right-0 z-50 bg-white shadow-md border-b border-gray-200 px-4 py-3">
        <div className="flex flex-row items-center gap-3">
          {/* Search Bar - Always visible */}
          <div className="flex-1">
            <SearchBar
              placeholder={t('searchPlaceholder')}
              value={keywordInput}
              onChange={setKeywordInput}
              inputClassName="h-11 rounded-full bg-gray-50"
            />
          </div>

          {/* Filter Button */}
          <button
            onClick={() => {
              setIsMobileFilterOpen(!isMobileFilterOpen);
            }}
            className="w-11 h-11 flex-shrink-0 rounded-full bg-gray-100 border border-gray-200 flex items-center justify-center hover:bg-gray-200 transition-all active:scale-95 relative"
            aria-label={t('filter')}
          >
            <Filter className="w-5 h-5 text-gray-700" />
            {activeFiltersCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs font-semibold w-5 h-5 rounded-full flex items-center justify-center">
                {activeFiltersCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Filter Panel */}
      {isMobileFilterOpen && (
        <div
          className="lg:hidden fixed inset-0 z-40 bg-black/50"
          onClick={() => setIsMobileFilterOpen(false)}
        >
          <div
            className="bg-white rounded-t-2xl absolute bottom-0 left-0 right-0 max-h-[80vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-4">
              <FilterSidebar
                filters={filters}
                setFilters={setFilters}
                aggregations={aggregations}
                onClose={() => setIsMobileFilterOpen(false)}
                isMobile={true}
              />
            </div>
          </div>
        </div>
      )}

      <div className="min-h-screen bg-gradient-to-br  from-slate-50 via-gray-50 to-blue-50/30 pt-20 pb-4 px-4 md:py-8 md:px-10 lg:px-40 lg:pt-8">
        {/* Main Content - Desktop & Mobile */}
        <div className="">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Left Sidebar - Filters (Desktop only, 3 columns) */}
            <div className="hidden lg:block lg:col-span-1">
              <FilterSidebar
                filters={filters}
                setFilters={setFilters}
                aggregations={aggregations}
                isMobile={false}
              />
            </div>

            {/* Middle Content - Scholarship Cards (6 columns desktop, full width mobile) */}
            <div className="lg:col-span-2">
              {/* Premium Upgrade Banner */}
              <PremiumBanner />

              {/* Search Bar - Desktop only */}
              <div className="mb-4 md:block hidden">
                <SearchBar
                  placeholder={t('searchPlaceholder')}
                  value={keywordInput}
                  onChange={setKeywordInput}
                />
              </div>

              <div className="space-y-4">
                {isError && allScholarships.length === 0 ? (
                  <div className="bg-white rounded-xl shadow-sm border border-red-200 p-12 text-center">
                    <p className="text-red-600 text-lg">{t('failedToLoad')}</p>
                  </div>
                ) : scholarships?.length === 0 && !isLoading ? (
                  <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
                    <p className="text-gray-500 text-lg">{t('noScholarshipsFound')}</p>
                  </div>
                ) : (
                  <>
                    {scholarships?.map((scholarship) => (
                      <ScholarshipCard
                        key={scholarship.id}
                        scholarship={scholarship}
                        onApply={handleApply}
                        onToggleTracking={handleToggleTracking}
                        onFollowProvider={handleFollowProvider}
                        onViewScholarship={handleViewScholarship}
                        onViewProvider={handleViewProvider}
                      />
                    ))}

                    {/* Infinite scroll trigger */}
                    {hasMore && (
                      <div ref={targetRef} className="h-10 flex items-center justify-center">
                        {isLoading && (
                          <>
                            {Array.from({ length: 3 }).map((_, index) => (
                              <ScholarshipCardSkeleton key={`loading-${index}`} />
                            ))}
                          </>
                        )}
                      </div>
                    )}

                    {/* End of list message */}
                    {!hasMore && scholarships.length > 0 && (
                      <div className="text-center py-8 text-gray-500 text-sm">
                        {t('endOfList') || 'You have reached the end of the list'}
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>

            {/* Right Sidebar */}
            <div className="lg:col-span-1">
              <TopViewedScholarships
                scholarships={scholarshipTopView || []}
                isLoading={isLoadingScholarshipTopView}
                onViewScholarship={handleViewScholarship}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
