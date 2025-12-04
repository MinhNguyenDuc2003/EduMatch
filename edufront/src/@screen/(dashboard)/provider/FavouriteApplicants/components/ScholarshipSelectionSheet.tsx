'use client';

import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetClose } from '@/lib/cus/sheet';
import { Button } from '@/lib/cus/button';
import { Skeleton } from '@/lib/cus/skeleton';
import { Send, Loader2, X } from 'lucide-react';
import { useTranslations } from 'next-intl';

interface ScholarshipSelectionSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  scholarships: Scholarship[] | undefined;
  isLoading: boolean;
  selectedScholarship: Scholarship | null;
  onSelectScholarship: (scholarship: Scholarship) => void;
  onSendReferral: () => void;
  isSending: boolean;
}

export default function ScholarshipSelectionSheet({
  open,
  onOpenChange,
  scholarships,
  isLoading,
  selectedScholarship,
  onSelectScholarship,
  onSendReferral,
  isSending,
}: ScholarshipSelectionSheetProps) {
  const t = useTranslations('provider.favourite');

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="right"
        className="w-full p-4 sm:max-w-2xl max-h-[95vh] overflow-y-auto [&>button]:hidden rounded-xl !right-4 !top-1/2 !-translate-y-1/2 scrollbar-hide"
      >
        <SheetHeader className="!p-0">
          <div className="flex items-center justify-between">
            <SheetTitle className="text-lg font-bold text-gray-900">
              {t('selectScholarship') || 'Select Scholarship'}
            </SheetTitle>
            <SheetClose className="rounded-full bg-white p-2 shadow-lg ring-1 ring-gray-200 transition-opacity hover:opacity-70 focus:outline-none focus:ring-2 focus:ring-offset-2 flex-shrink-0">
              <X className="h-4 w-4 text-gray-700" />
            </SheetClose>
          </div>
        </SheetHeader>

        <div className="space-y-6">
          {/* Scholarships List */}
          <section>
            <h3 className="text-base font-bold text-gray-900 mb-2">
              {t('selectScholarship') || 'Select Scholarship'}
            </h3>
            {isLoading ? (
              <div className="space-y-3">
                {Array.from({ length: 3 }).map((_, index) => (
                  <Skeleton key={index} className="h-32 w-full" />
                ))}
              </div>
            ) : scholarships && scholarships.length > 0 ? (
              <div className="space-y-3">
                {scholarships.map((scholarship) => (
                  <button
                    key={scholarship.id}
                    onClick={() => onSelectScholarship(scholarship)}
                    className="w-full text-left"
                  >
                    <div
                      className={
                        selectedScholarship?.id === scholarship.id
                          ? 'bg-white rounded-lg border-2 border-[#3D6CB9] p-3 shadow-sm'
                          : 'bg-white rounded-lg border-2 border-gray-200 p-3 hover:border-gray-300 hover:shadow-md transition-all'
                      }
                    >
                      <h3 className="font-semibold text-gray-900 mb-1">{scholarship.title}</h3>
                      {scholarship.university && (
                        <p className="text-sm text-gray-600 mb-2">{scholarship.university}</p>
                      )}
                      {scholarship.shortDescription && (
                        <p className="text-sm text-gray-500 line-clamp-2">
                          {scholarship.shortDescription}
                        </p>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500 text-sm">
                {t('noScholarships') || 'No scholarships found'}
              </div>
            )}
          </section>

          {/* Selected Scholarship and Actions */}
          {selectedScholarship && (
            <section>
              <h3 className="text-base font-bold text-gray-900 mb-2">
                {t('selectedScholarship') || 'Selected Scholarship'}
              </h3>
              <div className="bg-white rounded-lg border-2 border-gray-200 p-3 mb-4">
                <p className="font-semibold text-[#3D6CB9]">{selectedScholarship.title}</p>
                {selectedScholarship.university && (
                  <p className="text-sm text-gray-600 mt-1">{selectedScholarship.university}</p>
                )}
              </div>
              <div className="flex flex-col sm:flex-row justify-end gap-2">
                <Button
                  onClick={() => onOpenChange(false)}
                  className="w-full sm:w-auto bg-gray-200 text-gray-900 hover:bg-gray-300"
                >
                  {t('cancel') || 'Cancel'}
                </Button>
                <Button
                  onClick={onSendReferral}
                  disabled={isSending}
                  className="w-full sm:w-auto bg-[#3D6CB9] hover:bg-[#2F5A9E] text-white"
                >
                  {isSending ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      {t('sending') || 'Sending...'}
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4 mr-2" />
                      {t('sendReferral') || 'Send Referral'}
                    </>
                  )}
                </Button>
              </div>
            </section>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}

