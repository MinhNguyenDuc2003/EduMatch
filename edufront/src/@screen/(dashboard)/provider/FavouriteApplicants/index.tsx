'use client';

import { useGetAllFavouriteApplicantsQuery } from '@/state/apiProvider';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { FavouriteEmptyState, FavouriteListSkeleton, FavouriteApplicantsTable } from './components';
import ApplicantDetailDialog from '@/pattern/share/ApplicantDetailDialog';

export default function FavouriteApplicants() {
  const t = useTranslations('provider.favourite');
  const {
    data: favouriteApplicantsResponse,
    isLoading,
    error,
  } = useGetAllFavouriteApplicantsQuery();
  const [selectedApplicant, setSelectedApplicant] = useState<ApplicantProfile | null>(null);

  const favouriteApplicants = favouriteApplicantsResponse?.applicantProfileVo ?? [];

  if (isLoading) {
    return <FavouriteListSkeleton />;
  }

  if (error) {
    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6">{t('title')}</h1>
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">
          {t('error')}
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">{t('title')}</h1>
          <p className="text-gray-600 mt-1">
            {favouriteApplicants?.length || 0} {t('applicantsCount')}
          </p>
        </div>
      </div>

      {favouriteApplicants && favouriteApplicants.length > 0 ? (
        <FavouriteApplicantsTable
          applicants={favouriteApplicants}
          onViewDetail={setSelectedApplicant}
        />
      ) : (
        <FavouriteEmptyState />
      )}

      {/* Detail Dialog */}
      <ApplicantDetailDialog
        applicant={selectedApplicant}
        open={!!selectedApplicant}
        onClose={() => setSelectedApplicant(null)}
      />
    </div>
  );
}
