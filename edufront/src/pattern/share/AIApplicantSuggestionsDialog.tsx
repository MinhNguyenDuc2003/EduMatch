import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/pattern/cus/dialog';
import { useGetRecommendedApplicantsQuery } from '@/state/apiProvider';
import { Sparkles } from 'lucide-react';
import React, { useState } from 'react';
import ApplicantListSkeleton from './ApplicantListSkeleton';
import ApplicantsList from './ApplicantsList';
import ApplicantDetail from './ApplicantDetail';
import { Button } from '@/pattern/cus/button';
import { useTranslations } from 'next-intl';
import { ScholarshipPreferencesWeightDialog } from './ScholarshipPreferencesWeightDialog';
import ApplicantScoreDetailDialog from './ApplicantScoreDetailDialog';

interface AISuggestionsDialogProps {
  isOpen: boolean;
  onClose: () => void;
  scholarship: Scholarship;
}

const AIApplicantSuggestionsDialog = ({
  isOpen,
  onClose,
  scholarship,
}: AISuggestionsDialogProps) => {
  const t = useTranslations('aiApplicantSuggestions');
  const [selectedApplicant, setSelectedApplicant] = useState<ApplicantProfile | null>(null);
  const [viewScoreApplicant, setViewScoreApplicant] = useState<ApplicantProfile | null>(null);

  const {
    data: applicants,
    isLoading,
    isFetching,
    refetch,
  } = useGetRecommendedApplicantsQuery(
    {
      scholarshipId: scholarship.id!,
      topK: 10,
    },
    {
      skip: !isOpen || !scholarship,
    }
  );

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="w-[95vw] sm:w-[90vw] md:w-[85vw] lg:min-w-7xl max-h-[90vh] overflow-hidden flex flex-col">
          <DialogHeader>
            <DialogTitle className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5" style={{ color: '#3d6cb9' }} />
                {t('title')}
              </div>
              {!selectedApplicant && (
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    className="text-primary-brand hover:text-primary-brand hover:bg-primary-brand/10 border-primary-brand"
                    onClick={refetch}
                  >
                    {t('refresh')}
                  </Button>
                  <ScholarshipPreferencesWeightDialog scholarship={scholarship} refetch={refetch} />
                </div>
              )}
            </DialogTitle>
            <DialogDescription>
              {t('description', { scholarshipTitle: scholarship.title })}
            </DialogDescription>
          </DialogHeader>

          {selectedApplicant ? (
            <ApplicantDetail applicant={selectedApplicant} />
          ) : isLoading || isFetching ? (
            <ApplicantListSkeleton />
          ) : (
            <ApplicantsList
              applicants={applicants || []}
              setDetailApplicant={setSelectedApplicant}
              setViewScoreApplicant={setViewScoreApplicant}
              scholarshipId={scholarship.id}
            />
          )}

          {selectedApplicant && (
            <div className="flex justify-end">
              <Button
                onClick={() => setSelectedApplicant(null)}
                className="bg-primary-brand text-white hover:bg-primary-brand/90 mt-2 shadow-sm"
              >
                {t('back')}
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>

      <ApplicantScoreDetailDialog
        applicant={viewScoreApplicant || undefined}
        scholarship={scholarship}
        open={!!viewScoreApplicant}
        onOpenChange={(open) => !open && setViewScoreApplicant(null)}
      />
    </>
  );
};

export default AIApplicantSuggestionsDialog;
