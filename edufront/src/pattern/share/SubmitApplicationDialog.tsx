'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/lib/cus/dialog';
import { Button } from '@/lib/cus/button';
import { useGetApplicationsQuery, useSubmitApplicationMutation } from '@/state/apiApplicant';
import { Skeleton } from '@/lib/cus/skeleton';

interface SubmitApplicationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  scholarshipId: number;
  scholarshipTitle?: string;
  onSubmit?: (applicationId: number) => void;
}

export default function SubmitApplicationDialog({
  open,
  onOpenChange,
  scholarshipId,
  scholarshipTitle,
  onSubmit,
}: SubmitApplicationDialogProps) {
  const router = useRouter();
  const t = useTranslations('activity.submitApplicationDialog');
  const [selectedApplicationId, setSelectedApplicationId] = useState<number | null>(null);
  const { data: applications, isLoading } = useGetApplicationsQuery(undefined, {
    skip: !open, // Only fetch when dialog is open
  });
  const [submitApplication, { isLoading: isSubmitting }] = useSubmitApplicationMutation();

  const selectedApplication = applications?.find((app) => app.id === selectedApplicationId);

  const handleSubmit = () => {
    if (selectedApplicationId && onSubmit) {
      onSubmit(selectedApplicationId);
      onOpenChange(false);
      setSelectedApplicationId(null);
      submitApplication({ applicationId: selectedApplicationId, scholarshipId }).unwrap();
    }
  };

  const handleCreateNew = () => {
    onOpenChange(false);
    router.push(`/applicant/applications/create`);
  };

  const handleCancel = () => {
    onOpenChange(false);
    setSelectedApplicationId(null);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{t('title')}</DialogTitle>
          <DialogDescription>
            {scholarshipTitle
              ? t('descriptionWithTitle', { title: scholarshipTitle })
              : t('description')}
          </DialogDescription>
        </DialogHeader>

        <div className="py-4">
          {isLoading ? (
            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-3">
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-12 w-full" />
                <Skeleton className="h-12 w-full" />
              </div>
              <div className="col-span-2">
                <Skeleton className="h-64 w-full" />
              </div>
            </div>
          ) : applications && applications.length > 0 ? (
            <div className="grid grid-cols-3 gap-4 min-h-[400px]">
              {/* Left Column - Application List */}
              <div className="flex flex-col gap-3 border-r pr-4">
                {/* Create New Button */}
                <Button
                  onClick={handleCreateNew}
                  variant="custom"
                  className="w-full border-2 border-blue-600 bg-white text-blue-600 hover:border-blue-800 hover:text-blue-800 transition-all duration-200 font-medium"
                  size="md"
                  value={t('createNew')}
                />

                {/* Application Names List */}
                <div className="flex-1 overflow-y-auto space-y-2">
                  {applications.map((application) => (
                    <div
                      key={application.id}
                      onClick={() => setSelectedApplicationId(application.id)}
                      className={`px-3 py-2 border rounded-lg cursor-pointer transition-all ${
                        selectedApplicationId === application.id
                          ? 'border-blue-600 bg-blue-50  '
                          : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                      }`}
                    >
                      <p className="font-medium text-sm text-gray-900 truncate">
                        {application.fullName}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Column - Application Details */}
              <div className="col-span-2 overflow-y-auto">
                {selectedApplication ? (
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">
                        {t('applicationDetails')}
                      </h3>
                    </div>

                    {/* Personal Information */}
                    <div className="space-y-3">
                      <h4 className="font-semibold text-gray-800 border-b pb-2">
                        {t('personalInformation')}
                      </h4>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-gray-500">{t('fullName')}</p>
                          <p className="text-sm font-medium text-gray-900">
                            {selectedApplication.fullName}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">{t('gender')}</p>
                          <p className="text-sm font-medium text-gray-900">
                            {selectedApplication.gender}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">{t('dateOfBirth')}</p>
                          <p className="text-sm font-medium text-gray-900">
                            {selectedApplication.dateOfBirth}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">{t('nationality')}</p>
                          <p className="text-sm font-medium text-gray-900">
                            {selectedApplication.nationality}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">{t('email')}</p>
                          <p className="text-sm font-medium text-gray-900">
                            {selectedApplication.email}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">{t('phone')}</p>
                          <p className="text-sm font-medium text-gray-900">
                            {selectedApplication.phone}
                          </p>
                        </div>
                        <div className="col-span-2">
                          <p className="text-sm text-gray-500">{t('address')}</p>
                          <p className="text-sm font-medium text-gray-900">
                            {selectedApplication.address}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Education Information */}
                    <div className="space-y-3">
                      <h4 className="font-semibold text-gray-800 border-b pb-2">
                        {t('educationInformation')}
                      </h4>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-gray-500">{t('educationLevel')}</p>
                          <p className="text-sm font-medium text-gray-900">
                            {selectedApplication.educationLevel}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">{t('gpa')}</p>
                          <p className="text-sm font-medium text-gray-900">
                            {selectedApplication.gpa}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">{t('schoolName')}</p>
                          <p className="text-sm font-medium text-gray-900">
                            {selectedApplication.schoolName}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">{t('major')}</p>
                          <p className="text-sm font-medium text-gray-900">
                            {selectedApplication.major}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">{t('graduationYear')}</p>
                          <p className="text-sm font-medium text-gray-900">
                            {selectedApplication.graduationYear}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Additional Information */}
                    <div className="space-y-3">
                      <h4 className="font-semibold text-gray-800 border-b pb-2">
                        {t('additionalInformation')}
                      </h4>
                      <div className="space-y-3">
                        <div>
                          <p className="text-sm text-gray-500">{t('skills')}</p>
                          <p className="text-sm font-medium text-gray-900">
                            {selectedApplication.skills}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">{t('achievements')}</p>
                          <p className="text-sm font-medium text-gray-900">
                            {selectedApplication.achievements}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">{t('extracurricular')}</p>
                          <p className="text-sm font-medium text-gray-900">
                            {selectedApplication.extracurricular}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">{t('motivation')}</p>
                          <p className="text-sm font-medium text-gray-900">
                            {selectedApplication.motivation}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">{t('personalStatement')}</p>
                          <p className="text-sm font-medium text-gray-900">
                            {selectedApplication.personalStatement}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Application Attributes */}
                    {selectedApplication.applicationAttributes &&
                      selectedApplication.applicationAttributes.length > 0 && (
                        <div className="space-y-3">
                          <h4 className="font-semibold text-gray-800 border-b pb-2">
                            {t('additionalAttributes')}
                          </h4>
                          <div className="space-y-2">
                            {selectedApplication.applicationAttributes.map((attr, index) => (
                              <div key={index} className="border rounded-lg p-3">
                                <p className="text-sm font-medium text-gray-900">{attr.key}</p>
                                <p className="text-sm text-gray-700">{attr.value}</p>
                                {attr.note && (
                                  <p className="text-xs text-gray-500 mt-1">{attr.note}</p>
                                )}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                  </div>
                ) : (
                  <div className="flex items-center justify-center h-full text-gray-500">
                    <p>{t('selectApplicationToView')}</p>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-600 mb-4">{t('noApplicationsYet')}</p>
              <Button
                onClick={handleCreateNew}
                variant="ok"
                className="w-full sm:w-auto text-white"
              >
                {t('createNewApplication')}
              </Button>
            </div>
          )}
        </div>

        <DialogFooter>
          <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto sm:ml-auto">
            <Button
              variant="outline"
              onClick={handleCancel}
              className="w-full sm:w-auto text-gray-700 border-gray-300 hover:bg-gray-50"
            >
              {t('cancel')}
            </Button>
            {applications && applications.length > 0 && (
              <Button
                onClick={handleSubmit}
                variant="ok"
                className="w-full sm:w-auto text-white"
                disabled={!selectedApplicationId}
              >
                {t('submitApplication')}
              </Button>
            )}
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
