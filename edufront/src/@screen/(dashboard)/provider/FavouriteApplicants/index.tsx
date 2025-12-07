'use client';

import {
  useGetAllFavouriteApplicantsQuery,
  useRemoveFavouriteApplicantMutation,
  useGetScholarshipsQuery,
  useReferApplicantsMutation,
} from '@/state/apiProvider';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import {
  FavouriteEmptyState,
  FavouriteListSkeleton,
  FavouriteApplicantsTable,
  ScholarshipSelectionSheet,
} from './components';
import ApplicantDetailDialog from './components/ApplicantDetailDialog';
import { toast } from 'sonner';
import { Button } from '@/lib/cus/button';
import { Send } from 'lucide-react';

export default function FavouriteApplicants() {
  const t = useTranslations('provider.favourite');
  const { data: favouriteApplicants, isLoading, error } = useGetAllFavouriteApplicantsQuery();
  const [removeFavouriteApplicant, { isLoading: isRemovingFavouriteApplicant }] =
    useRemoveFavouriteApplicantMutation();
  const { data: scholarships, isLoading: isLoadingScholarships } = useGetScholarshipsQuery();
  const [referApplicants, { isLoading: isReferringApplicants }] = useReferApplicantsMutation();

  const [selectedApplicant, setSelectedApplicant] = useState<ApplicantProfile | null>(null);
  const [selectedUserIds, setSelectedUserIds] = useState<string[]>([]);
  const [isScholarshipSheetOpen, setIsScholarshipSheetOpen] = useState(false);
  const [selectedScholarship, setSelectedScholarship] = useState<Scholarship | null>(null);

  const handleRemoveFavouriteApplicant = async (favouriteApplicantId: number) => {
    try {
      await removeFavouriteApplicant(favouriteApplicantId)
        .unwrap()
        .then(() => {
          toast.success('Favourite applicant removed successfully');
        });
    } catch (error) {
      console.log('Failed to remove favourite applicant:', error);
    }
  };

  const handleSelectedApplicantsChange = (userIds: string[]) => {
    setSelectedUserIds(userIds);
  };

  const handleOpenScholarshipSheet = () => {
    setIsScholarshipSheetOpen(true);
    setSelectedScholarship(null);
  };

  const handleSendReferral = async () => {
    if (!selectedScholarship) {
      return;
    }

    try {
      await referApplicants({
        scholarshipId: selectedScholarship.id,
        userIds: selectedUserIds,
      })
        .unwrap()
        .then((response) => {
          if (response) {
            toast.success(t('referralSentSuccess') || 'Applicants referred successfully');
            setSelectedUserIds([]);
            setIsScholarshipSheetOpen(false);
            setSelectedScholarship(null);
          }
        });
    } catch (error) {
      console.log('Failed to refer applicants:', error);
    }
  };

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
        <>
          <FavouriteApplicantsTable
            applicants={favouriteApplicants || []}
            onViewDetail={setSelectedApplicant}
            onRemoveFavourite={handleRemoveFavouriteApplicant}
            onSelectedApplicantsChange={handleSelectedApplicantsChange}
          />

          {/* Action button when applicants are selected */}
          {selectedUserIds.length > 0 && (
            <div className="mt-4 flex justify-end">
              <Button
                onClick={handleOpenScholarshipSheet}
                className="bg-[#3D6CB9] hover:bg-[#2F5A9E] text-white shadow-sm"
              >
                <Send className="w-4 h-4 mr-2" />
                {t('sendReferral') || `Send Referral (${selectedUserIds.length})`}
              </Button>
            </div>
          )}
        </>
      ) : (
        <FavouriteEmptyState />
      )}

      {/* Scholarship Selection Sheet */}
      <ScholarshipSelectionSheet
        open={isScholarshipSheetOpen}
        onOpenChange={setIsScholarshipSheetOpen}
        scholarships={scholarships}
        isLoading={isLoadingScholarships}
        selectedScholarship={selectedScholarship}
        onSelectScholarship={setSelectedScholarship}
        onSendReferral={handleSendReferral}
        isSending={isReferringApplicants}
      />

      {/* Detail Dialog */}
      <ApplicantDetailDialog
        applicant={selectedApplicant}
        open={!!selectedApplicant}
        onClose={() => setSelectedApplicant(null)}
      />
    </div>
  );
}
