'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetClose,
} from '@/pattern/cus/sheet';
import { Button } from '@/pattern/cus/button';
import { useGetApplicationsQuery, useSubmitApplicationMutation } from '@/state/apiApplicant';
import { Skeleton } from '@/pattern/cus/skeleton';
import { X } from 'lucide-react';
import { Badge } from '@/pattern/cus/badge';
import { toast } from 'sonner';

interface SubmitApplicationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  scholarshipId: number;
  scholarshipTitle?: string;
}

export default function SubmitApplicationDialog({
  open,
  onOpenChange,
  scholarshipId,
  scholarshipTitle,
}: SubmitApplicationDialogProps) {
  const router = useRouter();
  const t = useTranslations('activity.submitApplicationDialog');
  const tToast = useTranslations('toast.submitApplication');
  const [selectedApplicationId, setSelectedApplicationId] = useState<number | null>(null);
  const { data: applications, isLoading } = useGetApplicationsQuery(undefined, {
    skip: !open,
  });
  const [submitApplication, { isLoading: isSubmitting }] = useSubmitApplicationMutation();

  const selectedApplication = applications?.find((app) => app.id === selectedApplicationId);

  const handleSubmit = async () => {
    if (selectedApplicationId) {
      try {
        await submitApplication({
          applicationId: selectedApplicationId,
          scholarshipId,
          status: 'Pending',
        }).unwrap();
        toast.success(tToast('submitSuccess'));
      } catch (error) {
        toast.error(tToast('submitFailed'));
      }
      onOpenChange(false);
      setSelectedApplicationId(null);
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

  const tDetail = useTranslations('activity.applicationDetail');

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="bottom"
        className="w-full h-full p-0 sm:max-w-5xl sm:w-[90%] max-h-[95vh] overflow-hidden [&>button]:hidden rounded-t-xl sm:rounded-2xl flex flex-col !left-0 sm:!left-1/2 !-translate-x-1/2 !top-0 sm:!top-1/2 !-translate-y-0 sm:!-translate-y-1/2"
      >
        <SheetHeader className="px-4 sm:px-6 pt-4 sm:pt-6 pb-4 border-b">
          <div className="flex items-center justify-between">
            <div className="flex-1 min-w-0">
              <SheetTitle className="text-lg sm:text-xl font-bold text-gray-900">
                {t('title')}
              </SheetTitle>
              <SheetDescription className="text-sm text-gray-600 mt-1">
                {scholarshipTitle
                  ? t('descriptionWithTitle', { title: scholarshipTitle })
                  : t('description')}
              </SheetDescription>
            </div>
            <SheetClose className="rounded-full bg-white p-2 shadow-lg ring-1 ring-gray-200 transition-opacity hover:opacity-70 focus:outline-none focus:ring-2 focus:ring-offset-2 flex-shrink-0 ml-4">
              <X className="h-4 w-4 text-gray-700" />
            </SheetClose>
          </div>
        </SheetHeader>

        <div className="flex-1 overflow-hidden flex flex-col">
          {isLoading ? (
            <div className="flex-1 overflow-y-auto p-4 sm:p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-3">
                  <Skeleton className="h-10 w-full" />
                  <Skeleton className="h-12 w-full" />
                  <Skeleton className="h-12 w-full" />
                </div>
                <div className="md:col-span-2">
                  <Skeleton className="h-64 w-full" />
                </div>
              </div>
            </div>
          ) : applications && applications.length > 0 ? (
            <div className="flex-1 overflow-hidden flex flex-col md:flex-row">
              {/* Left Column - Application List */}
              <div className="w-full md:w-80 border-b md:border-b-0 md:border-r flex flex-col bg-gray-50">
                <div className="p-4 border-b">
                  <Button
                    onClick={handleCreateNew}
                    variant="custom"
                    className="w-full border-2 border-blue-600 bg-white text-blue-600 hover:border-blue-800 hover:text-blue-800 hover:bg-blue-50 transition-all duration-200 font-medium"
                    size="md"
                  >
                    {t('createNew')}
                  </Button>
                </div>
                <div className="flex-1 overflow-y-auto p-4 space-y-2">
                  {applications.map((application) => (
                    <div
                      key={application.id}
                      onClick={() => setSelectedApplicationId(application.id)}
                      className={`px-4 py-3 border rounded-lg cursor-pointer transition-all ${
                        selectedApplicationId === application.id
                          ? 'border-blue-600 bg-blue-50 shadow-sm'
                          : 'border-gray-200 hover:border-gray-300 hover:bg-white bg-white'
                      }`}
                    >
                      <p className="font-medium text-sm text-gray-900 truncate">
                        {application.applicationName || application.fullName}
                      </p>
                      {application.fullName && application.applicationName && (
                        <p className="text-xs text-gray-500 mt-1 truncate">
                          {application.fullName}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Column - Application Details */}
              <div className="flex-1 overflow-y-auto p-4 sm:p-6">
                {selectedApplication ? (
                  <div className="space-y-6 max-w-4xl">
                    {/* Personal Information */}
                    <section className="bg-white rounded-lg border border-gray-200 p-4 sm:p-6">
                      <h3 className="text-base font-bold text-gray-900 mb-4">
                        {t('personalInformation')}
                      </h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <p className="text-xs text-gray-500 mb-1">{t('fullName')}</p>
                          <p className="text-sm font-medium text-gray-900">
                            {selectedApplication.fullName}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500 mb-1">{t('gender')}</p>
                          <p className="text-sm font-medium text-gray-900">
                            {selectedApplication.gender}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500 mb-1">{t('dateOfBirth')}</p>
                          <p className="text-sm font-medium text-gray-900">
                            {selectedApplication.dateOfBirth}
                          </p>
                        </div>
                        {selectedApplication.age !== undefined &&
                          selectedApplication.age !== null && (
                            <div>
                              <p className="text-xs text-gray-500 mb-1">{tDetail('age')}</p>
                              <p className="text-sm font-medium text-gray-900">
                                {selectedApplication.age}
                              </p>
                            </div>
                          )}
                        <div>
                          <p className="text-xs text-gray-500 mb-1">{t('nationality')}</p>
                          <p className="text-sm font-medium text-gray-900">
                            {selectedApplication.nationality}
                          </p>
                        </div>
                        {selectedApplication.citizenship && (
                          <div>
                            <p className="text-xs text-gray-500 mb-1">{tDetail('citizenship')}</p>
                            <p className="text-sm font-medium text-gray-900">
                              {selectedApplication.citizenship}
                            </p>
                          </div>
                        )}
                        <div>
                          <p className="text-xs text-gray-500 mb-1">{t('email')}</p>
                          <p className="text-sm font-medium text-gray-900 break-all">
                            {selectedApplication.email}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500 mb-1">{t('phone')}</p>
                          <p className="text-sm font-medium text-gray-900">
                            {selectedApplication.phone}
                          </p>
                        </div>
                        <div className="sm:col-span-2">
                          <p className="text-xs text-gray-500 mb-1">{t('address')}</p>
                          <p className="text-sm font-medium text-gray-900">
                            {selectedApplication.address}
                          </p>
                        </div>
                      </div>
                    </section>

                    {/* Education Information */}
                    <section className="bg-white rounded-lg border border-gray-200 p-4 sm:p-6">
                      <h3 className="text-base font-bold text-gray-900 mb-4">
                        {t('educationInformation')}
                      </h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <p className="text-xs text-gray-500 mb-1">{t('educationLevel')}</p>
                          <p className="text-sm font-medium text-gray-900">
                            {selectedApplication.educationLevel}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500 mb-1">{t('gpa')}</p>
                          <p className="text-sm font-medium text-gray-900">
                            {selectedApplication.gpa !== undefined &&
                            selectedApplication.gpa !== null
                              ? selectedApplication.gpa.toFixed(2)
                              : 'N/A'}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500 mb-1">{t('schoolName')}</p>
                          <p className="text-sm font-medium text-gray-900">
                            {selectedApplication.schoolName}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500 mb-1">{t('major')}</p>
                          <p className="text-sm font-medium text-gray-900">
                            {selectedApplication.major}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500 mb-1">{t('graduationYear')}</p>
                          <p className="text-sm font-medium text-gray-900">
                            {selectedApplication.graduationYear}
                          </p>
                        </div>
                        {(selectedApplication.classRank !== undefined &&
                          selectedApplication.classRank !== null) ||
                        (selectedApplication.classSize !== undefined &&
                          selectedApplication.classSize !== null) ||
                        (selectedApplication.classRankPercentile !== undefined &&
                          selectedApplication.classRankPercentile !== null) ? (
                          <>
                            {selectedApplication.classRank !== undefined &&
                              selectedApplication.classRank !== null && (
                                <div>
                                  <p className="text-xs text-gray-500 mb-1">
                                    {tDetail('classRank')}
                                  </p>
                                  <p className="text-sm font-medium text-gray-900">
                                    {selectedApplication.classRank}
                                  </p>
                                </div>
                              )}
                            {selectedApplication.classSize !== undefined &&
                              selectedApplication.classSize !== null && (
                                <div>
                                  <p className="text-xs text-gray-500 mb-1">
                                    {tDetail('classSize')}
                                  </p>
                                  <p className="text-sm font-medium text-gray-900">
                                    {selectedApplication.classSize}
                                  </p>
                                </div>
                              )}
                            {selectedApplication.classRankPercentile !== undefined &&
                              selectedApplication.classRankPercentile !== null && (
                                <div>
                                  <p className="text-xs text-gray-500 mb-1">
                                    {tDetail('classRankPercentile')}
                                  </p>
                                  <p className="text-sm font-medium text-gray-900">
                                    {selectedApplication.classRankPercentile}%
                                  </p>
                                </div>
                              )}
                          </>
                        ) : null}
                      </div>

                      {/* Test Scores */}
                      {(selectedApplication.satScore !== undefined &&
                        selectedApplication.satScore !== null) ||
                      (selectedApplication.actScore !== undefined &&
                        selectedApplication.actScore !== null) ||
                      (selectedApplication.greScore !== undefined &&
                        selectedApplication.greScore !== null) ||
                      (selectedApplication.gmatScore !== undefined &&
                        selectedApplication.gmatScore !== null) ||
                      (selectedApplication.toeflScore !== undefined &&
                        selectedApplication.toeflScore !== null) ||
                      (selectedApplication.ieltsScore !== undefined &&
                        selectedApplication.ieltsScore !== null) ? (
                        <div className="mt-4 pt-4 border-t">
                          <h4 className="text-sm font-semibold text-gray-700 mb-3">
                            {tDetail('testScores')}
                          </h4>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {selectedApplication.satScore !== undefined &&
                              selectedApplication.satScore !== null && (
                                <div>
                                  <p className="text-xs text-gray-500 mb-1">
                                    {tDetail('satScore')}
                                  </p>
                                  <p className="text-sm font-medium text-gray-900">
                                    {selectedApplication.satScore}
                                  </p>
                                </div>
                              )}
                            {selectedApplication.actScore !== undefined &&
                              selectedApplication.actScore !== null && (
                                <div>
                                  <p className="text-xs text-gray-500 mb-1">
                                    {tDetail('actScore')}
                                  </p>
                                  <p className="text-sm font-medium text-gray-900">
                                    {selectedApplication.actScore}
                                  </p>
                                </div>
                              )}
                            {selectedApplication.greScore !== undefined &&
                              selectedApplication.greScore !== null && (
                                <div>
                                  <p className="text-xs text-gray-500 mb-1">
                                    {tDetail('greScore')}
                                  </p>
                                  <p className="text-sm font-medium text-gray-900">
                                    {selectedApplication.greScore}
                                  </p>
                                </div>
                              )}
                            {selectedApplication.gmatScore !== undefined &&
                              selectedApplication.gmatScore !== null && (
                                <div>
                                  <p className="text-xs text-gray-500 mb-1">
                                    {tDetail('gmatScore')}
                                  </p>
                                  <p className="text-sm font-medium text-gray-900">
                                    {selectedApplication.gmatScore}
                                  </p>
                                </div>
                              )}
                            {selectedApplication.toeflScore !== undefined &&
                              selectedApplication.toeflScore !== null && (
                                <div>
                                  <p className="text-xs text-gray-500 mb-1">
                                    {tDetail('toeflScore')}
                                  </p>
                                  <p className="text-sm font-medium text-gray-900">
                                    {selectedApplication.toeflScore}
                                  </p>
                                </div>
                              )}
                            {selectedApplication.ieltsScore !== undefined &&
                              selectedApplication.ieltsScore !== null && (
                                <div>
                                  <p className="text-xs text-gray-500 mb-1">
                                    {tDetail('ieltsScore')}
                                  </p>
                                  <p className="text-sm font-medium text-gray-900">
                                    {selectedApplication.ieltsScore}
                                  </p>
                                </div>
                              )}
                          </div>
                        </div>
                      ) : null}
                    </section>

                    {/* Skills & Achievements */}
                    <section className="bg-white rounded-lg border border-gray-200 p-4 sm:p-6">
                      <h3 className="text-base font-bold text-gray-900 mb-4">
                        {tDetail('skillsAchievements')}
                      </h3>
                      <div className="space-y-4">
                        {selectedApplication.skills && (
                          <div>
                            <p className="text-xs text-gray-500 mb-2">{t('skills')}</p>
                            <div className="flex flex-wrap gap-2">
                              {selectedApplication.skills.split(',').map((skill, index) => (
                                <Badge
                                  key={index}
                                  variant="outline"
                                  className="text-xs px-2 py-1 bg-gray-50 text-gray-700 border-gray-200"
                                >
                                  {skill.trim()}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        )}

                        {selectedApplication.achievements && (
                          <div>
                            <p className="text-xs text-gray-500 mb-2">{t('achievements')}</p>
                            <p className="text-sm text-gray-900 whitespace-pre-wrap">
                              {selectedApplication.achievements}
                            </p>
                          </div>
                        )}

                        {selectedApplication.extracurricular && (
                          <div>
                            <p className="text-xs text-gray-500 mb-2">{t('extracurricular')}</p>
                            <p className="text-sm text-gray-900 whitespace-pre-wrap">
                              {selectedApplication.extracurricular}
                            </p>
                          </div>
                        )}

                        {selectedApplication.languages && (
                          <div>
                            <p className="text-xs text-gray-500 mb-2">{tDetail('languages')}</p>
                            <p className="text-sm text-gray-900">{selectedApplication.languages}</p>
                          </div>
                        )}

                        {selectedApplication.careerGoal && (
                          <div>
                            <p className="text-xs text-gray-500 mb-2">{tDetail('careerGoal')}</p>
                            <p className="text-sm text-gray-900 whitespace-pre-wrap">
                              {selectedApplication.careerGoal}
                            </p>
                          </div>
                        )}

                        {selectedApplication.researchInterest && (
                          <div>
                            <p className="text-xs text-gray-500 mb-2">
                              {tDetail('researchInterest')}
                            </p>
                            <p className="text-sm text-gray-900 whitespace-pre-wrap">
                              {selectedApplication.researchInterest}
                            </p>
                          </div>
                        )}

                        {selectedApplication.academicAwards && (
                          <div>
                            <p className="text-xs text-gray-500 mb-2">
                              {tDetail('academicAwards')}
                            </p>
                            <p className="text-sm text-gray-900 whitespace-pre-wrap">
                              {selectedApplication.academicAwards}
                            </p>
                          </div>
                        )}

                        {selectedApplication.publicationCount !== undefined &&
                          selectedApplication.publicationCount !== null && (
                            <div>
                              <p className="text-xs text-gray-500 mb-2">
                                {tDetail('publicationCount')}
                              </p>
                              <p className="text-sm text-gray-900">
                                {selectedApplication.publicationCount}
                              </p>
                            </div>
                          )}

                        {selectedApplication.workExperienceYears !== undefined &&
                          selectedApplication.workExperienceYears !== null && (
                            <div>
                              <p className="text-xs text-gray-500 mb-2">
                                {tDetail('workExperienceYears')}
                              </p>
                              <p className="text-sm text-gray-900">
                                {selectedApplication.workExperienceYears} {tDetail('years')}
                              </p>
                            </div>
                          )}

                        {selectedApplication.isAthlete && (
                          <div>
                            <p className="text-xs text-gray-500 mb-2">{tDetail('isAthlete')}</p>
                            <Badge
                              variant="outline"
                              className="text-xs bg-green-50 text-green-700 border-green-200 mb-2"
                            >
                              {tDetail('yes')}
                            </Badge>
                            {selectedApplication.athleticAchievements && (
                              <div className="mt-2">
                                <p className="text-xs text-gray-500 mb-2">
                                  {tDetail('athleticAchievements')}
                                </p>
                                <p className="text-sm text-gray-900 whitespace-pre-wrap">
                                  {selectedApplication.athleticAchievements}
                                </p>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    </section>

                    {/* Motivation & Personal Statement */}
                    <section className="bg-white rounded-lg border border-gray-200 p-4 sm:p-6">
                      <h3 className="text-base font-bold text-gray-900 mb-4">
                        {t('additionalInformation')}
                      </h3>
                      <div className="space-y-4">
                        {selectedApplication.motivation && (
                          <div>
                            <p className="text-xs text-gray-500 mb-2">{t('motivation')}</p>
                            <p className="text-sm text-gray-900 whitespace-pre-wrap bg-gray-50 rounded-md p-3">
                              {selectedApplication.motivation}
                            </p>
                          </div>
                        )}
                        {selectedApplication.personalStatement && (
                          <div>
                            <p className="text-xs text-gray-500 mb-2">{t('personalStatement')}</p>
                            <p className="text-sm text-gray-900 whitespace-pre-wrap bg-gray-50 rounded-md p-3">
                              {selectedApplication.personalStatement}
                            </p>
                          </div>
                        )}
                      </div>
                    </section>

                    {/* Application Attributes */}
                    {selectedApplication.applicationAttributes &&
                      selectedApplication.applicationAttributes.length > 0 && (
                        <section className="bg-white rounded-lg border border-gray-200 p-4 sm:p-6">
                          <h3 className="text-base font-bold text-gray-900 mb-4">
                            {t('additionalAttributes')}
                          </h3>
                          <div className="space-y-3">
                            {selectedApplication.applicationAttributes.map((attr, index) => (
                              <div
                                key={index}
                                className="border border-gray-200 rounded-lg p-3 bg-gray-50"
                              >
                                <p className="text-sm font-medium text-gray-900 mb-1">{attr.key}</p>
                                <p className="text-sm text-gray-700">{attr.value}</p>
                                {attr.note && (
                                  <p className="text-xs text-gray-500 mt-2 italic">{attr.note}</p>
                                )}
                              </div>
                            ))}
                          </div>
                        </section>
                      )}
                  </div>
                ) : (
                  <div className="flex items-center justify-center h-full min-h-[400px] text-gray-500">
                    <div className="text-center">
                      <p className="text-sm">{t('selectApplicationToView')}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 flex items-center justify-center">
              <div className="text-center py-8 max-w-md">
                <p className="text-gray-600 mb-4">{t('noApplicationsYet')}</p>
                <Button
                  onClick={handleCreateNew}
                  variant="ok"
                  className="w-full sm:w-auto text-white"
                >
                  {t('createNewApplication')}
                </Button>
              </div>
            </div>
          )}
        </div>

        <SheetFooter className="px-4 sm:px-6 py-4 border-t bg-gray-50">
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
                disabled={!selectedApplicationId || isSubmitting}
              >
                {isSubmitting ? t('submitting') : t('submitApplication')}
              </Button>
            )}
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
