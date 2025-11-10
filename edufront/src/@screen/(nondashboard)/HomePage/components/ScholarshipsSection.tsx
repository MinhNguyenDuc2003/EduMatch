'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Button } from '@/lib/cus/button';
import CardSmalPic from '@/pattern/share/CardSmalPic';
import CardSmalPicSkeleton from './CardSmalPicSkeleton';
import { ArrowRight } from 'lucide-react';
import { map } from 'lodash';
import Pagination from './Pagination';
import {
  useFollowScholarshipMutation,
  useUnfollowScholarshipMutation,
} from '@/state/apiScholarship';

type ScholarshipsSectionProps = {
  scholarships: Scholarship[];
  isLoading?: boolean;
  isError?: boolean;
  onViewDetails: (item: Scholarship) => void;
};

const ITEMS_PER_PAGE = 9;

export default function ScholarshipsSection({
  scholarships,
  isLoading = false,
  isError = false,
  onViewDetails,
}: ScholarshipsSectionProps) {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(0);

  const [followScholarship] = useFollowScholarshipMutation();
  const [unfollowScholarship] = useUnfollowScholarshipMutation();

  const totalItems = scholarships?.length || 0;
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);
  const startIndex = currentPage * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentScholarships = scholarships?.slice(startIndex, endIndex) || [];

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const handleToggleTracking = async (scholarshipId: number) => {
    const scholarship = currentScholarships.find((s) => s.id === scholarshipId);
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

  return (
    <section className="py-12 bg-gradient-to-b from-slate-50 to-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between mb-12">
          <div>
            <h2 className="text-4xl font-bold text-slate-900 mb-3">Featured Scholarships</h2>
            <p className="text-xl text-slate-600">
              Explore our latest and most popular opportunities
            </p>
          </div>
          <Button
            variant="outline"
            className="px-6 py-3 rounded-xl border-2 border-slate-300 text-primary hover:border-[#3D6CB9] hover:text-[#3D6CB9] transition-all"
            value="View All"
            iconRight={<ArrowRight className="w-4 h-4" />}
            onClick={() => router.push('/scholarships')}
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 items-stretch">
          {isLoading ? (
            Array.from({ length: 9 }).map((_, index) => <CardSmalPicSkeleton key={index} />)
          ) : isError ? (
            <div className="col-span-full flex items-center justify-center py-20">
              <p className="text-lg text-red-600">
                Failed to load scholarships. Please try again later.
              </p>
            </div>
          ) : currentScholarships.length > 0 ? (
            map(currentScholarships, (item) => (
              <CardSmalPic
                key={item.id}
                scholarship={item}
                onViewDetails={() => onViewDetails(item)}
                onToggleTracking={handleToggleTracking}
              />
            ))
          ) : (
            <div className="col-span-full flex items-center justify-center py-20">
              <p className="text-lg text-slate-600">No scholarships found.</p>
            </div>
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-12">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </div>
        )}
      </div>
    </section>
  );
}
