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
  // Using a generic translation key or specific one if available.
  // Assuming 'providerApplications' works for broader context or likely need to add keys.
  // For now, I'll hardcode or use generic keys if specific ones aren't obvious,
  // but "Recommended Applications" title is needed.

  const [open, setOpen] = useState(false);
  const { data: recommendedApplications, isLoading } =
    useGetRecommendedApplicationsByScholarshipIdQuery(
      { scholarshipId: scholarship.id },
      { skip: !open || !scholarship.id }
    );

  return (
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
      <DialogContent className="max-h-[90vh] w-full min-w-6xl max-w-6xl flex flex-col">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-primary-brand" />
            Recommended Applications
          </DialogTitle>
          <DialogDescription>AI-recommended applications for {scholarship.title}</DialogDescription>
        </DialogHeader>

        <div className="flex-1 overflow-hidden flex flex-col min-h-[300px]">
          {isLoading ? (
            <div className="flex-1 flex items-center justify-center">
              <Loader2 className="w-8 h-8 animate-spin text-primary-brand" />
            </div>
          ) : recommendedApplications && recommendedApplications.length > 0 ? (
            <div className="flex-1 overflow-auto">
              <ApplicationsTable
                applications={recommendedApplications}
                onView={(app) => {
                  onView(app);
                  // Optionally close dialog, but maybe better to keep open or depends on UX.
                  // Usually viewing detail opens another dialog, so stacking dialogs might be an issue
                  // if not handled correctly. However, the requirement is just to show them.
                  // If ApplicationsTable `onView` opens a side drawer or another dialog,
                  // we need to make sure styling works.
                }}
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
  );
}
