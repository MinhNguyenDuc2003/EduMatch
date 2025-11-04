'use client';

import { useState, useMemo, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import { mockScholarshipOpportunities } from '@/@screen/(nondashboard)/HomePage/mockData';
import { HeroSection, TabSwitcher, TrackedScholarshipCard, EmptyState } from './components';
import { type ShortlistTab, TAB_CONFIGS } from './types';

export default function Shortlist() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [activeTab, setActiveTab] = useState<ShortlistTab>('tracking');

  // Read tab from URL query params on mount and when params change
  useEffect(() => {
    const tabParam = searchParams.get('tab') as ShortlistTab | null;
    if (tabParam && ['tracking', 'applied', 'following'].includes(tabParam)) {
      setActiveTab(tabParam);
    }
  }, [searchParams]);

  // Handle tab change and update URL
  const handleTabChange = (tab: ShortlistTab) => {
    setActiveTab(tab);
    router.push(`/applicant/shortlist?tab=${tab}`, { scroll: false });
  };

  // Mock data - In production, these would come from API/state management
  const [trackedScholarships, setTrackedScholarships] = useState<Scholarship[]>(() =>
    mockScholarshipOpportunities.filter((item) => item.isTracking)
  );
  const [appliedScholarships, setAppliedScholarships] = useState<Scholarship[]>([]);
  const [followingProviders, setFollowingProviders] = useState<Scholarship[]>(
    mockScholarshipOpportunities.slice(0, 6)
  );

  // Get active tab config
  const activeTabConfig = TAB_CONFIGS.find((tab) => tab.key === activeTab) || TAB_CONFIGS[0];

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
      {/* Hero Section with Tab-based Content */}
      <HeroSection activeTab={activeTabConfig} count={counts[activeTab]} />

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
              <AnimatePresence mode="wait">
                {displayedItems.length === 0 ? (
                  <EmptyState key={`empty-${activeTab}`} tab={activeTab} />
                ) : (
                  <motion.div
                    key={`content-${activeTab}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
                  >
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
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
