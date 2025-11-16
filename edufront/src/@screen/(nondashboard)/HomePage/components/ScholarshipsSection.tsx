'use client';
import { useRouter } from 'next/navigation';
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
import { useAuth } from '@/hooks/useAuth';

type ScholarshipsSectionProps = {
  scholarships: Scholarship[];
  isLoading?: boolean;
  isError?: boolean;
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

export default function ScholarshipsSection({
  scholarships,
  isLoading = false,
  isError = false,
  currentPage,
  totalPages,
  onPageChange,
}: ScholarshipsSectionProps) {
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  const [followScholarship] = useFollowScholarshipMutation();
  const [unfollowScholarship] = useUnfollowScholarshipMutation();

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
      console.log('Failed to toggle tracking:', error);
    }
  };

  const handleViewDetails = (slug: string) => {
    if (!isAuthenticated) {
      router.push('http://159.89.200.244/oauth2/authorization/keycloak');
    } else {
      router.push(`/scholarships/${slug}`);
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
          ) : scholarships.length > 0 ? (
            map(scholarships, (item) => (
              <CardSmalPic
                key={item.id}
                scholarship={item}
                onViewDetails={() => handleViewDetails(item.slug)}
                onToggleTracking={() => handleToggleTracking(item.id)}
                isAuthenticated={isAuthenticated}
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
              onPageChange={onPageChange}
            />
          </div>
        )}
      </div>
    </section>
  );
}
