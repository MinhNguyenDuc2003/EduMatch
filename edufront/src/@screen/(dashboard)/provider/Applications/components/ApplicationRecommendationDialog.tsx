import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/pattern/cus/dialog';
import { Button } from '@/pattern/cus/button';
import { useGetRecommendedApplicationsByScholarshipIdQuery } from '@/state/apiProvider';
import { Loader2, Sparkles } from 'lucide-react';
import React, { useState } from 'react';
import { useTranslations } from 'next-intl';
import ApplicationsTable from './ApplicationsTable';
import ApplicationScoreDetailDialog from '@/pattern/share/ApplicationScoreDetailDialog';
import { ScholarshipPreferencesWeightDialog } from '@/pattern/share/ScholarshipPreferencesWeightDialog';

interface ApplicationRecommendationDialogProps {
  scholarship: Scholarship;
  trigger?: React.ReactNode;
  onView: (applicationScholarship: ApplicationScholarship) => void;
}

export function ApplicationRecommendationDialog({
  scholarship,
  trigger,
  onView,
}: ApplicationRecommendationDialogProps) {
  const t = useTranslations('providerApplications');

  const [open, setOpen] = useState(false);
  const [viewScoreApplication, setViewScoreApplication] = useState<ApplicationScholarship | null>(
    null
  );
  const {
    data: recommendedApplications,
    isLoading,
    isFetching,
    refetch,
  } = useGetRecommendedApplicationsByScholarshipIdQuery(
    { scholarshipId: scholarship.id },
    { skip: !open || !scholarship.id }
  );

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          {trigger || (
            <Button
              variant="outline"
              className="text-primary-brand hover:text-primary-brand hover:bg-primary-brand/10 border-primary-brand"
            >
              <Sparkles className="w-4 h-4 mr-2" />
              Recommended
            </Button>
          )}
        </DialogTrigger>
        <DialogContent className="max-h-[90vh] min-h-fit w-full min-w-6xl max-w-6xl flex flex-col">
          <DialogHeader>
            <DialogTitle className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-primary-brand" />
                Recommended Applications
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  className="text-primary-brand hover:text-primary-brand hover:bg-primary-brand/10 border-primary-brand"
                  onClick={() => refetch()}
                >
                  Refresh
                </Button>
                <ScholarshipPreferencesWeightDialog scholarship={scholarship} />
              </div>
            </DialogTitle>
            <DialogDescription>
              AI-recommended applications for {scholarship.title}
            </DialogDescription>
          </DialogHeader>

          <div className="flex-1 overflow-hidden flex flex-col min-h-[300px]">
            {isLoading || isFetching ? (
              <div className="flex-1 flex items-center justify-center">
                <Loader2 className="w-8 h-8 animate-spin text-primary-brand" />
              </div>
            ) : recommendedApplications && recommendedApplications.length > 0 ? (
              <div className="flex-1 overflow-auto">
                <ApplicationsTable
                  applications={recommendedApplications}
                  onView={(app) => {
                    onView(app);
                  }}
                  onViewScore={setViewScoreApplication}
                />
              </div>
            ) : (
              <div className="flex-1 flex items-center justify-center text-gray-500">
                No recommendations found.
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
      <ApplicationScoreDetailDialog
        applicationScholarship={viewScoreApplication || undefined}
        open={!!viewScoreApplication}
        onOpenChange={(open) => !open && setViewScoreApplication(null)}
      />
    </>
  );
}
