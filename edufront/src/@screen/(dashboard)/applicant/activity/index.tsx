'use client';

import { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { mockScholarshipOpportunities } from '@/@screen/(nondashboard)/HomePage/mockData';
import { HeroSection, TabSwitcher, TrackedScholarshipCard, EmptyState } from './components';
import { type ShortlistTab, TAB_CONFIGS } from './types';

export default function ActivityManagement() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<ShortlistTab>('tracking');

  // Handle tab change
  const handleTabChange = (tab: ShortlistTab) => {
    setActiveTab(tab);
  };

  // Mock data - In production, these would come from API/state management
  const [trackedScholarships, setTrackedScholarships] = useState<Scholarship[]>(() =>
    mockScholarshipOpportunities.filter((item) => item.isTracking)
  );
  const [appliedScholarships, setAppliedScholarships] = useState<Scholarship[]>([]);
  const [followingProviders, setFollowingProviders] = useState<Scholarship[]>(
    mockScholarshipOpportunities.slice(0, 6)
  );

  // Get displayed items based on active tab
  const displayedItems = useMemo(() => {
    switch (activeTab) {
      case 'tracking':
        return trackedScholarships;
      case 'applied':
        return appliedScholarships;
      case 'following':
        return followingProviders;
      default:
        return [];
    }
  }, [activeTab, trackedScholarships, appliedScholarships, followingProviders]);

  // Count for each tab
  const counts = useMemo(
    () => ({
      tracking: trackedScholarships.length,
      applied: appliedScholarships.length,
      following: followingProviders.length,
    }),
    [trackedScholarships, appliedScholarships, followingProviders]
  );

  // Handlers
  const handleViewDetails = (scholarshipId: number) => {
    router.push(`/scholarships/${scholarshipId}`);
  };

  const handleApply = (scholarship: Scholarship) => {
    console.log('Apply to:', scholarship.title);

    // Move from tracking to applied
    if (activeTab === 'tracking') {
      setAppliedScholarships((prev) => {
        if (prev.some((item) => item.id === scholarship.id)) return prev;
        return [...prev, scholarship];
      });
      setTrackedScholarships((prev) => prev.filter((item) => item.id !== scholarship.id));
    }
    // TODO: Implement apply API call
  };

  const handleUntrack = (scholarshipId: number) => {
    switch (activeTab) {
      case 'tracking':
        setTrackedScholarships((prev) => prev.filter((item) => item.id !== scholarshipId));
        break;
      case 'applied':
        setAppliedScholarships((prev) => prev.filter((item) => item.id !== scholarshipId));
        break;
      case 'following':
        setFollowingProviders((prev) => prev.filter((item) => item.id !== scholarshipId));
        break;
    }
    // TODO: Implement untrack API call
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/30">
      {/* Hero Section */}
      <HeroSection />

      {/* Main Content */}
      <section className="relative z-10 -mt-16 pb-20">
        <div className="mx-auto w-full px-6 sm:px-10 lg:px-40">
          {/* Container with glass effect */}
          <div className="overflow-hidden rounded-3xl border border-white/60 bg-white/80 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.2)] backdrop-blur-sm">
            {/* Tab Switcher */}
            <div className="border-b border-slate-100 bg-white/50 p-6">
              <TabSwitcher
                tabs={TAB_CONFIGS}
                activeTab={activeTab}
                onTabChange={handleTabChange}
                counts={counts}
              />
            </div>

            {/* Content Area */}
            <div className="p-6">
              {displayedItems.length === 0 ? (
                <EmptyState tab={activeTab} />
              ) : (
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {displayedItems.map((scholarship, index) => (
                    <TrackedScholarshipCard
                      key={scholarship.id}
                      scholarship={scholarship}
                      onViewDetails={() => handleViewDetails(scholarship.id)}
                      onApply={
                        activeTab === 'tracking' || activeTab === 'following'
                          ? () => handleApply(scholarship)
                          : undefined
                      }
                      onUntrack={() => handleUntrack(scholarship.id)}
                      showActions={activeTab !== 'applied'}
                      index={index}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
