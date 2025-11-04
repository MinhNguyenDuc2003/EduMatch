'use client';

import { useState, useEffect, useMemo } from 'react';
import { FilterSidebar, ScholarshipCard, RightSidebar, PremiumBanner } from './components';
import { Filter } from 'lucide-react';
import SearchBar from '@/pattern/share/SearchBar';
import { mockScholarshipOpportunities } from '@/@screen/(nondashboard)/HomePage/mockData';

export type FilterState = {
  keyword: string;
  country: string;
  studyLevel: string;
  university: string;
  minGpa: number;
  maxGpa: number;
  page: number;
  size: number;
};

export default function ScholarshipsList() {
  const [activeTab, setActiveTab] = useState<'scholarships' | 'research'>('scholarships');
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

  const [scholarships, setScholarships] = useState<Scholarship[]>(mockScholarshipOpportunities);
  const [filteredScholarships, setFilteredScholarships] = useState<Scholarship[]>(
    mockScholarshipOpportunities
  );
  const [isLoading] = useState(false);

  // Filter scholarships locally (matching API request format)
  useEffect(() => {
    let filtered = [...scholarships];

    // Keyword search (matching API keyword parameter)
    if (filters.keyword) {
      filtered = filtered.filter(
        (item) =>
          item.title?.toLowerCase().includes(filters.keyword.toLowerCase()) ||
          item.shortDescription?.toLowerCase().includes(filters.keyword.toLowerCase()) ||
          item.description?.toLowerCase().includes(filters.keyword.toLowerCase())
      );
    }

    // Country filter (single value, matching API criteria.country)
    if (filters.country) {
      filtered = filtered.filter((item) => item.country === filters.country);
    }

    // Study level filter (single value, matching API criteria.studyLevel)
    if (filters.studyLevel) {
      filtered = filtered.filter((item) => item.studyLevel === filters.studyLevel);
    }

    // University filter (search mode)
    if (filters.university) {
      filtered = filtered.filter((item) =>
        item.university?.toLowerCase().includes(filters.university.toLowerCase())
      );
    }

    // GPA filter (matching API minGpa and maxGpa)
    filtered = filtered.filter(
      (item) =>
        (item.gpaRequirement || 0) >= filters.minGpa && (item.gpaRequirement || 0) <= filters.maxGpa
    );

    // Apply pagination (matching API page and size)
    const startIndex = filters.page * filters.size;
    const endIndex = startIndex + filters.size;
    const paginated = filtered.slice(startIndex, endIndex);

    setFilteredScholarships(paginated);

    // Log request params (for API integration later)
    const requestParams = {
      criteria: {
        studyLevel: filters.studyLevel || undefined,
        country: filters.country || undefined,
        university: filters.university || undefined,
      },
      page: filters.page,
      size: filters.size,
      keyword: filters.keyword || undefined,
      minGpa: filters.minGpa > 0 ? filters.minGpa : undefined,
      maxGpa: filters.maxGpa !== 4 ? filters.maxGpa : undefined,
    };

    // Remove undefined values from criteria
    Object.keys(requestParams.criteria).forEach((key) => {
      if (requestParams.criteria[key as keyof typeof requestParams.criteria] === undefined) {
        delete requestParams.criteria[key as keyof typeof requestParams.criteria];
      }
    });

    console.log('API Request Params:', requestParams);
  }, [filters, scholarships]);

  const totalElements = useMemo(() => {
    // In real API, this would come from response.totalElements
    let filtered = [...scholarships];
    if (filters.keyword) {
      filtered = filtered.filter(
        (item) =>
          item.title?.toLowerCase().includes(filters.keyword.toLowerCase()) ||
          item.shortDescription?.toLowerCase().includes(filters.keyword.toLowerCase())
      );
    }
    if (filters.country) {
      filtered = filtered.filter((item) => item.country === filters.country);
    }
    if (filters.studyLevel) {
      filtered = filtered.filter((item) => item.studyLevel === filters.studyLevel);
    }
    if (filters.university) {
      filtered = filtered.filter((item) => item.university === filters.university);
    }
    filtered = filtered.filter(
      (item) =>
        (item.gpaRequirement || 0) >= filters.minGpa && (item.gpaRequirement || 0) <= filters.maxGpa
    );
    return filtered.length;
  }, [filters, scholarships]);

  const handleApply = (scholarship: Scholarship) => {
    console.log('Apply to:', scholarship.title);
    // TODO: Implement apply logic
  };

  const handleToggleTracking = (scholarshipId: number) => {
    setScholarships((prevScholarships) =>
      prevScholarships.map((item) =>
        item.id === scholarshipId ? { ...item, isTracking: !item.isTracking } : item
      )
    );
    // TODO: Call API to update tracking state on server
  };

  const activeFiltersCount = useMemo(() => {
    let count = 0;
    if (filters.keyword) count++;
    if (filters.country) count++;
    if (filters.studyLevel) count++;
    if (filters.university) count++;
    if (filters.minGpa > 0) count++;
    if (filters.maxGpa < 4) count++;
    return count;
  }, [filters]);

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
                  <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
                    <p className="text-gray-500 text-lg">Loading scholarships...</p>
                  </div>
                ) : filteredScholarships.length === 0 ? (
                  <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
                    <p className="text-gray-500 text-lg">
                      No scholarships found matching your criteria.
                    </p>
                  </div>
                ) : (
                  <>
                    {filteredScholarships.map((scholarship) => (
                      <ScholarshipCard
                        key={scholarship.id}
                        scholarship={scholarship}
                        onApply={handleApply}
                        onToggleTracking={handleToggleTracking}
                      />
                    ))}
                    {totalElements > filteredScholarships.length && (
                      <div className="text-center pt-4">
                        <p className="text-gray-500 text-sm">
                          Showing {filteredScholarships.length} of {totalElements} scholarships
                          {filters.page > 0 && ` (Page ${filters.page + 1})`}
                        </p>
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
