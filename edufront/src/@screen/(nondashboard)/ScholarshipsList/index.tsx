'use client';

import { useState, useMemo } from 'react';
import { FilterSidebar, ScholarshipCard, RightSidebar, PremiumBanner } from './components';
import ScholarshipCardSkeleton from './components/ScholarshipCardSkeleton';
import { Filter } from 'lucide-react';
import SearchBar from '@/pattern/share/SearchBar';
import {
  useFollowScholarshipMutation,
  useSearchScholarshipsAdvancedQuery,
  useUnfollowScholarshipMutation,
} from '@/state/apiScholarship';

export default function ScholarshipsList() {
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  const [filters, setFilters] = useState<FilterState>({
    keyword: '',
    country: '',
    studyLevel: '',
    university: '',
    minGpa: 0,
    maxGpa: 4,
    page: 0,
    size: 100,
  });

  // Prepare API request body
  const requestBody = useMemo(() => {
    const body: ScholarshipAdvancedSearchRequest = {
      criteria: {
        studyLevel: filters.studyLevel || '',
        country: filters.country || '',
        university: filters.university || '',
      },
      page: filters.page,
      size: filters.size,
      keyword: filters.keyword || '',
      minGpa: filters.minGpa,
      maxGpa: filters.maxGpa,
    };

    return body;
  }, [filters]);

  // Call API
  const { data: response, isLoading, isError } = useSearchScholarshipsAdvancedQuery(requestBody);

  const [followScholarship] = useFollowScholarshipMutation();
  const [unfollowScholarship] = useUnfollowScholarshipMutation();

  const scholarships = response?.scholarship || [];
  const totalElements = response?.totalElements || 0;
  const totalPages = response?.totalPages || 0;

  const handleApply = (scholarship: Scholarship) => {
    console.log('Apply to:', scholarship.title);
    // TODO: Implement apply logic
  };

  const handleToggleTracking = async (scholarshipId: number) => {
    const scholarship = scholarships.find((s) => s.id === scholarshipId);
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

  const activeFiltersCount = useMemo(() => {
    let count = 0;
    if (filters.keyword) count++;
    if (filters.country) count++;
    if (filters.studyLevel) count++;
    if (filters.university) count++;
    if (filters.minGpa > 0) count++;
    if (filters.maxGpa < 10) count++;
    return count;
  }, [filters]);

  // Extract aggregations from response for filter options
  const aggregations = response?.aggregations;

  return (
    <>
      {/* Mobile Search Bar & Filter Button - Sticky */}
      <div className="lg:hidden fixed top-[60px] left-0 right-0 z-50 bg-white shadow-md border-b border-gray-200 px-4 py-3">
        <div className="flex flex-row items-center gap-3">
          {/* Search Bar - Always visible */}
          <div className="flex-1">
            <SearchBar
              placeholder="Search scholarships..."
              value={filters.keyword}
              onChange={(value) => setFilters({ ...filters, keyword: value, page: 0 })}
              inputClassName="h-11 rounded-full bg-gray-50"
            />
          </div>

          {/* Filter Button */}
          <button
            onClick={() => {
              setIsMobileFilterOpen(!isMobileFilterOpen);
            }}
            className="w-11 h-11 flex-shrink-0 rounded-full bg-gray-100 border border-gray-200 flex items-center justify-center hover:bg-gray-200 transition-all active:scale-95 relative"
            aria-label="Filter"
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
                scholarships={scholarships}
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
                scholarships={scholarships}
                aggregations={aggregations}
                isMobile={false}
              />
            </div>

            {/* Middle Content - Scholarship Cards (6 columns desktop, full width mobile) */}
            <div className="lg:col-span-6 lg:col-start-4">
              {/* Premium Upgrade Banner */}
              <PremiumBanner />

              {/* Search Bar - Desktop only */}
              <div className="mb-4">
                <SearchBar
                  placeholder="Search scholarships..."
                  value={filters.keyword}
                  onChange={(value) => setFilters({ ...filters, keyword: value, page: 0 })}
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
                    <p className="text-red-600 text-lg">
                      Failed to load scholarships. Please try again later.
                    </p>
                  </div>
                ) : scholarships.length === 0 ? (
                  <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
                    <p className="text-gray-500 text-lg">
                      No scholarships found matching your criteria.
                    </p>
                  </div>
                ) : (
                  <>
                    {scholarships.map((scholarship) => (
                      <ScholarshipCard
                        key={scholarship.id}
                        scholarship={scholarship}
                        onApply={handleApply}
                        onToggleTracking={handleToggleTracking}
                      />
                    ))}
                    {totalPages > 1 && (
                      <div className="text-center pt-4">
                        <p className="text-gray-500 text-sm">
                          Showing {scholarships.length} of {totalElements} scholarships
                          {filters.page > 0 && ` (Page ${filters.page + 1} of ${totalPages})`}
                        </p>
                        <div className="flex justify-center gap-2 mt-4">
                          <button
                            onClick={() =>
                              setFilters({ ...filters, page: Math.max(0, filters.page - 1) })
                            }
                            disabled={filters.page === 0}
                            className="px-4 py-2 rounded-lg border border-gray-300 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            Previous
                          </button>
                          <button
                            onClick={() =>
                              setFilters({
                                ...filters,
                                page: Math.min(totalPages - 1, filters.page + 1),
                              })
                            }
                            disabled={filters.page >= totalPages - 1}
                            className="px-4 py-2 rounded-lg border border-gray-300 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            Next
                          </button>
                        </div>
                      </div>
                    )}
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
