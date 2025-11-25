'use client';

import { useState, useEffect } from 'react';
import { FilterSidebar, ScholarshipCard, RightSidebar, PremiumBanner } from './components';
import ScholarshipCardSkeleton from './components/ScholarshipCardSkeleton';
import { Filter } from 'lucide-react';
import SearchBar from '@/pattern/share/SearchBar';
import {
  useFollowScholarshipMutation,
  useSearchScholarshipsQuery,
  useUnfollowScholarshipMutation,
} from '@/state/apiScholarship';
import { useFollowProviderMutation, useUnfollowProviderMutation } from '@/state/apiProvider';
import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useDebounce } from '@/utils/useDebounce';

export default function ScholarshipsList() {
  const { isAuthenticated } = useAuth();
  const router = useRouter();
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const t = useTranslations('scholarshipsList');

  const [keywordInput, setKeywordInput] = useState('');
  const debouncedKeyword = useDebounce(keywordInput, 500);

  const [filters, setFilters] = useState<FilterState>({
    keyword: '',
    country: '',
    studyLevel: '',
    scholarshipType: '',
    university: '',
    minGpa: 0,
    maxGpa: 4,
    page: 0,
    size: 100,
  });

  useEffect(() => {
    setFilters((prev) => ({ ...prev, keyword: debouncedKeyword || '', page: 0 }));
  }, [debouncedKeyword]);

  // Prepare API request body
  const requestBody: ScholarshipSearchRequest = {
    criteria: {
      studyLevel: filters.studyLevel || '',
      country: filters.country || '',
      scholarshipType: filters.scholarshipType || '',
      university: filters.university || '',
    },
    page: filters.page,
    size: filters.size,
    keyword: filters.keyword || '',
    minGpa: filters.minGpa,
    maxGpa: filters.maxGpa,
  };

  // Call API
  const { data: response, isLoading, isError, refetch } = useSearchScholarshipsQuery(requestBody);
  const [followScholarship] = useFollowScholarshipMutation();
  const [unfollowScholarship] = useUnfollowScholarshipMutation();
  const [followProvider] = useFollowProviderMutation();
  const [unfollowProvider] = useUnfollowProviderMutation();

  const scholarships = response?.scholarship || [];
  const aggregations = response?.aggregations;

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
      } else {
        await followScholarship({
          scholarshipId,
        }).unwrap();
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
      } else {
        await followProvider(scholarship.providerProfileVo?.id).unwrap();
      }
    } catch (error) {
      console.log('Failed to toggle follow provider:', error);
    }
    refetch();
  };

  const handleViewScholarship = (slug: string) => {
    if (!isAuthenticated) {
      router.push('http://159.89.200.244/oauth2/authorization/keycloak');
    } else {
      router.push(`/scholarships/${slug}`);
    }
  };

  const handleViewProvider = (providerId: number) => {
    router.push(`/applicant/providers/${providerId}`);
  };

  const activeFiltersCount = (() => {
    let count = 0;
    if (filters.keyword) count++;
    if (filters.country) count++;
    if (filters.studyLevel) count++;
    if (filters.scholarshipType) count++;
    if (filters.minGpa > 0) count++;
    if (filters.maxGpa < 4) count++;
    return count;
  })();

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

      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-blue-50/30 pt-20 pb-4 px-4 md:py-8 md:px-10 lg:px-40 lg:pt-8">
        {/* Main Content - Desktop & Mobile */}
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-9 gap-6">
            {/* Left Sidebar - Filters (Desktop only, 3 columns) */}
            <div className="hidden lg:block lg:col-span-3">
              <FilterSidebar
                filters={filters}
                setFilters={setFilters}
                aggregations={aggregations}
                isMobile={false}
              />
            </div>

            {/* Middle Content - Scholarship Cards (6 columns desktop, full width mobile) */}
            <div className="lg:col-span-6 lg:col-start-4">
              {/* Premium Upgrade Banner */}
              {isAuthenticated && <PremiumBanner />}

              {/* Search Bar - Desktop only */}
              <div className="mb-4">
                <SearchBar
                  placeholder={t('searchPlaceholder')}
                  value={keywordInput}
                  onChange={setKeywordInput}
                />
              </div>

              <div className="space-y-4">
                {isLoading ? (
                  <>
                    {Array.from({ length: 5 }).map((_, index) => (
                      <ScholarshipCardSkeleton key={index} />
                    ))}
                  </>
                ) : isError ? (
                  <div className="bg-white rounded-xl shadow-sm border border-red-200 p-12 text-center">
                    <p className="text-red-600 text-lg">{t('failedToLoad')}</p>
                  </div>
                ) : scholarships?.length === 0 ? (
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
                        isAuthenticated={isAuthenticated}
                      />
                    ))}
                  </>
                )}
              </div>
            </div>

            {/* Right Sidebar - Tabs & Stats (3 columns) */}
            {/* <div className="lg:col-span-3">
              <RightSidebar
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                scholarshipsCount={filteredScholarships.length}
                researchCount={0}
              />
            </div> */}
          </div>
        </div>
      </div>
    </>
  );
}
