'use client';

import { IApplication } from '@/lib/schemas';
import ApplicationsForm from '@/pattern/share/ApplicationsForm';
import Loading from '@/pattern/share/Loading';
import {
  useDeleteImagesMutation,
  useGetApplicationByIdQuery,
  useUpdateApplicationMutation,
  useUploadImagesMutation,
  useCreateApplicationMutation,
  useGetApplicationByCodeQuery,
} from '@/state/apiApplicant';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { Button } from '@/pattern/cus/button';
import { Copy, ExternalLink, ChevronDown, FileText } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/pattern/cus/dropdown-menu';
import { toast } from 'sonner';
import { useTranslations } from 'next-intl';

const ApplicationUpdate = ({ applicationId }: { applicationId: string }) => {
  const t = useTranslations('activity.applicationForm.toast');
  const router = useRouter();
  const { data: application, isLoading: isLoadingApplication } =
    useGetApplicationByIdQuery(applicationId);
  const [updateApplication, { isLoading: isLoadingUpdateApplication }] =
    useUpdateApplicationMutation();
  const [uploadImages] = useUploadImagesMutation();
  const [deleteImage] = useDeleteImagesMutation();
  const [createApplication, { isLoading: isLoadingCopy }] = useCreateApplicationMutation();
  const [isCopying, setIsCopying] = useState(false);

  // Get applications with the same code
  const { data: applicationsByCode, isLoading: isLoadingApplicationsByCode } =
    useGetApplicationByCodeQuery(application?.code || '', {
      skip: !application?.code,
    });

  // Filter out the current application from the list
  const relatedApplications = applicationsByCode?.filter((app) => app.id !== application?.id) || [];

  const onSubmit = async (data: IApplication) => {
    try {
      await updateApplication(data).unwrap();

      router.push('/applicant/activity?tab=application');
      toast.success(t('applicationUpdated'));
    } catch (error) {
      console.log('Error updating application:', error);
    }
  };

  const handleImagesChange = async (images: File[]) => {
    const formData = new FormData();
    images.forEach((image) => {
      formData.append('mediaFiles', image);
    });
    await uploadImages({ applicationId, formData }).unwrap();
  };

  const handleDeleteImage = async (imageId: number) => {
    await deleteImage({ applicationId, imagesId: [imageId] }).unwrap();
  };

  const handleCopyApplication = async () => {
    if (!application) return;

    try {
      setIsCopying(true);

      // Create new application data with new code
      const newApplicationData: IApplication = {
        ...application,
        id: undefined,
        applicationName: `${application.applicationName} (Copy)`,
        // Map applicationAttributes without id field
        applicationAttributes:
          application.applicationAttributes?.map((attr) => ({
            key: attr.key,
            value: attr.value,
            note: attr.note || '',
          })) || [],
        versionApplication: application.versionApplication + 1,
      };

      // Create FormData
      const formData = new FormData();
      formData.append('application', JSON.stringify(newApplicationData));

      // Create the new application
      const newApplication = await createApplication(formData).unwrap();

      router.push(`/applicant/applications/${newApplication.id}`);
    } catch (error) {
      console.error('Error copying application:', error);
    }
  };

  if (isLoadingApplication)
    return (
      <div className="flex justify-center items-center h-screen">
        <Loading />
      </div>
    );
  return (
    <div className="p-6 lg:p-8 space-y-6 bg-white">
      <div className="flex justify-end gap-2 mb-4">
        {/* Related Applications Dropdown */}
        {relatedApplications.length > 0 && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                type="button"
                variant="outline"
                className="border-[#3D6CB9] text-[#3D6CB9] hover:bg-[#3D6CB9]/10"
              >
                <FileText className="w-4 h-4 mr-2" />
                Các version khác ({relatedApplications.length})
                <ChevronDown className="w-4 h-4 ml-2" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80">
              <div className="max-h-96 overflow-y-auto">
                {relatedApplications.map((relatedApp) => (
                  <DropdownMenuItem
                    key={relatedApp.id}
                    className="flex flex-col items-start p-3 cursor-pointer"
                    onClick={() => router.push(`/applicant/applications/${relatedApp.id}`)}
                  >
                    <div className="flex items-center justify-between w-full mb-1">
                      <span className="font-semibold text-sm text-slate-900 truncate flex-1">
                        {relatedApp.applicationName}
                      </span>
                      <ExternalLink className="w-3 h-3 text-slate-400 ml-2 flex-shrink-0" />
                    </div>
                    <div className="space-y-0.5 text-xs text-slate-600 w-full">
                      <div>
                        <span className="font-medium">Version:</span>{' '}
                        {relatedApp.versionApplication}
                      </div>
                      <div>
                        <span className="font-medium">Full Name:</span> {relatedApp.fullName}
                      </div>
                      {relatedApp.gpa !== undefined && relatedApp.gpa !== null && (
                        <div>
                          <span className="font-medium">GPA:</span> {relatedApp.gpa.toFixed(2)}
                        </div>
                      )}
                    </div>
                  </DropdownMenuItem>
                ))}
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
        )}

        {/* Copy Button */}
        <Button
          type="button"
          onClick={handleCopyApplication}
          variant="outline"
          className="border-[#3D6CB9] text-[#3D6CB9] hover:bg-[#3D6CB9]/10"
          disabled={isCopying || isLoadingCopy || !application}
        >
          <Copy className="w-4 h-4 mr-2" />
          {isCopying || isLoadingCopy ? 'Đang tạo bản copy...' : 'Tạo bản copy'}
        </Button>
      </div>

      <ApplicationsForm
        application={application}
        onSubmit={onSubmit}
        onImagesChange={handleImagesChange}
        onDeleteImage={handleDeleteImage}
        isLoading={isLoadingUpdateApplication}
      />
    </div>
  );
};

export default ApplicationUpdate;
