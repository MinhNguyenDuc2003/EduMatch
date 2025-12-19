'use client';
import { useRouter } from 'next/navigation';
import { Button } from '@/pattern/cus/button';
import CardSmalPic from '@/pattern/share/CardSmalPic';
import CardSmalPicSkeleton from './CardSmalPicSkeleton';
import { ArrowRight, AlertCircle } from 'lucide-react';
import { map } from 'lodash';
import Pagination from './Pagination';
import {
  useFollowScholarshipMutation,
  useUnfollowScholarshipMutation,
} from '@/state/apiScholarship';
import { useTranslations } from 'next-intl';
import { toast } from 'sonner';

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
  const router = useRouter();
  const t = useTranslations('homepage.scholarships');
  const tToast = useTranslations('toast');

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
        toast.success(tToast('trackScholarship.untrack'));
      } else {
        await followScholarship({
          scholarshipId,
        }).unwrap();
        toast.success(tToast('trackScholarship.track'));
      }
    } catch (error) {
      console.log('Failed to toggle tracking:', error);
    }
  };

  const handleViewDetails = (slug: string) => {
    router.push(`/scholarships/${slug}`);
  };

  return (
    <section className="py-12 bg-gradient-to-b from-slate-50 to-white">
      <div className=" mx-auto px-6 lg:px-40">
        <div className="flex items-center justify-between mb-12">
          <div>
            <h2 className="text-4xl font-bold text-slate-900 mb-3">{t('title')}</h2>
            <p className="text-xl text-slate-600">{t('subtitle')}</p>
          </div>
          <Button
            variant="outline"
            className="px-6 py-3 rounded-xl border-2 border-slate-300 text-primary hover:border-[#3D6CB9] hover:text-[#3D6CB9] transition-all"
            value={t('viewAll')}
            iconRight={<ArrowRight className="w-4 h-4" />}
            onClick={() => router.push('/scholarships')}
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 items-stretch">
          {isLoading ? (
            Array.from({ length: 9 }).map((_, index) => <CardSmalPicSkeleton key={index} />)
          ) : isError ? (
            <div className="col-span-full">
              <div className="flex flex-col items-center justify-center rounded-3xl border-2 border-dashed border-slate-200 bg-slate-50/50 px-8 py-20 text-center">
                <div className="mb-6 rounded-full bg-white p-6 shadow-sm">
                  <AlertCircle className="h-12 w-12 text-slate-400" />
                </div>
                <h2 className="mb-3 text-xl font-bold text-slate-800">{t('failedToLoad')}</h2>
                <p className="max-w-md text-sm leading-relaxed text-slate-600">
                  {t('failedToLoadDescription')}
                </p>
              </div>
            </div>
          ) : scholarships.length > 0 ? (
            map(scholarships, (item) => (
              <CardSmalPic
                key={item.id}
                scholarship={item}
                onViewDetails={() => handleViewDetails(item.slug)}
                onToggleTracking={() => handleToggleTracking(item.id)}
              />
            ))
          ) : (
            <div className="col-span-full flex items-center justify-center py-20">
              <p className="text-lg text-slate-600">{t('noScholarships')}</p>
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
