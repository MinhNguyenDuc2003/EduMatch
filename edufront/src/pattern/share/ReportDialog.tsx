'use client';
import { useForm } from 'react-hook-form';
import { useTranslations } from 'next-intl';
import { toast } from 'sonner';
import Image from 'next/image';
import { CustomFormField } from '@/lib/cus/CustomFormField';
import { Button } from '@/lib/cus/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/lib/cus/dialog';
import { Form } from '@/lib/cus/form';
import {
  useGetReportsQuery,
  useReportSystemMutation,
  useReportProviderMutation,
  useReportScholarshipMutation,
  useReportProfileMutation,
} from '@/state/apiApplicant';
import { Loader2, ChevronLeft } from 'lucide-react';

interface ReportDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialType: ReportType;
  id?: number;
  scholarshipData?: Scholarship;
  providerData?: ProviderProfile;
}

export default function ReportDialog({
  open,
  onOpenChange,
  initialType,
  id,
  scholarshipData,
  providerData,
}: ReportDialogProps) {
  const t = useTranslations('reportDialog');

  const { data: categories, isLoading: isLoadingCategories } = useGetReportsQuery(initialType, {
    skip: !open,
  });

  const [reportSystem] = useReportSystemMutation();
  const [reportProvider] = useReportProviderMutation();
  const [reportScholarship] = useReportScholarshipMutation();
  const [reportProfile] = useReportProfileMutation();

  const methods = useForm<FormReport>({
    defaultValues: { title: '', comment: '', categoryId: 0 },
  });

  const { handleSubmit, reset, setValue, watch } = methods;
  const selectedCategoryId = watch('categoryId');
  const selectedCategory = categories?.find((c) => c.id === selectedCategoryId);

  const onSubmit = async (data: FormReport) => {
    try {
      switch (initialType) {
        case 'SYSTEM':
          await reportSystem(data).unwrap();
          break;
        case 'PROVIDER':
          if (providerData?.id) {
            await reportProvider({ ...data, providerId: providerData.id }).unwrap();
          }
          break;
        case 'SCHOLARSHIP':
          if (scholarshipData?.id) {
            await reportScholarship({ ...data, scholarshipId: scholarshipData.id }).unwrap();
          }
          break;
        case 'PROFILE':
          if (id) {
            await reportProfile({ ...data, profileId: id }).unwrap();
          }
          break;
      }
      reset();
      onOpenChange(false);
      toast.success(t('submitSuccess'));
    } catch (error) {
      console.log('Failed to create report:', error);
    }
  };

  const handleClose = () => {
    reset();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle>{t('title')}</DialogTitle>
          <DialogDescription>{t('description')}</DialogDescription>
        </DialogHeader>

        <div className="border-b border-gray-200"></div>

        {/* Entity Info */}
        {(initialType === 'SCHOLARSHIP' && scholarshipData) ||
        (initialType === 'PROVIDER' && providerData) ? (
          <div>
            <div className="text-sm text-gray-500 mb-2">{t('reportingAbout')}</div>
            {initialType === 'SCHOLARSHIP' && scholarshipData && (
              <div className="px-4 py-3 bg-gray-100 border-b border-gray-300 hover:bg-gray-200 transition-colors cursor-default rounded-lg">
                <div className="font-semibold text-gray-900">{scholarshipData.title}</div>
                <div className="text-sm text-gray-600 mt-1">
                  {scholarshipData.providerProfileVo.organizationName}
                </div>
              </div>
            )}
            {initialType === 'PROVIDER' && providerData && (
              <div className="px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg flex items-center gap-3">
                {providerData.logoUrl && (
                  <Image
                    src={providerData.logoUrl}
                    alt={providerData.organizationName}
                    width={48}
                    height={48}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                )}
                <div className="font-semibold text-gray-900">{providerData.organizationName}</div>
              </div>
            )}
          </div>
        ) : null}

        <div className="py-2 px-1 overflow-y-auto flex-1 scrollbar-hide">
          <Form {...methods}>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 pr-1">
              {!selectedCategoryId ? (
                isLoadingCategories ? (
                  <div className="flex items-center justify-center py-8">
                    <Loader2 className="w-6 h-6 animate-spin text-blue-600" />
                  </div>
                ) : categories?.length ? (
                  <div className="space-y-2">
                    {categories.map((category) => (
                      <button
                        key={category.id}
                        type="button"
                        onClick={() => setValue('categoryId', category.id)}
                        className="w-full group text-left px-4 py-2 border border-gray-400 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors cursor-pointer"
                      >
                        <div className="font-semibold text-gray-900 group-hover:text-blue-500 transition-colors">
                          {category.name}
                        </div>
                        {category.description && (
                          <div className="text-sm text-gray-600">{category.description}</div>
                        )}
                      </button>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-500">{t('noCategories')}</div>
                )
              ) : (
                <>
                  {/* Selected Category - Clickable to go back */}
                  <div
                    onClick={() => setValue('categoryId', 0)}
                    className="mb-4 bg-gray-100 rounded-md p-3 cursor-pointer hover:bg-gray-200 transition-colors"
                  >
                    <div className="text-sm text-gray-600">{t('selectedCategory')}</div>
                    <div className="font-semibold text-gray-900">{selectedCategory?.name}</div>
                    {selectedCategory?.description && (
                      <div className="text-sm text-gray-600">{selectedCategory.description}</div>
                    )}
                  </div>

                  <CustomFormField
                    name="title"
                    label={t('titleLabel')}
                    type="text"
                    placeholder={t('titlePlaceholder')}
                    isBorder={true}
                  />
                  <CustomFormField
                    name="comment"
                    label={t('descriptionLabel')}
                    type="textarea"
                    placeholder={t('descriptionPlaceholder')}
                    isBorder={true}
                  />

                  <DialogFooter className="flex gap-2 mt-4">
                    <Button
                      type="button"
                      variant="custom"
                      onClick={() => setValue('categoryId', 0)}
                      className="flex items-center gap-1 text-[#3D6CB9] border-[#3D6CB9] border-1 rounded-md px-2 py-1 cursor-pointer"
                    >
                      {t('back')}
                    </Button>
                    <Button type="submit" variant="custom" className="bg-[#3D6CB9] text-white">
                      {t('submit')}
                    </Button>
                  </DialogFooter>
                </>
              )}
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
