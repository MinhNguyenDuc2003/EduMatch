'use client';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
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
import { useGetReportsQuery, useCreateReportMutation } from '@/state/apiApplicant';
import { CheckCircle2, Loader2, ChevronLeft } from 'lucide-react';

interface ReportDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

type ReportTypeItem = {
  type: ReportType;
  name: string;
  shortDescription: string;
};

const REPORT_TYPES: ReportTypeItem[] = [
  {
    type: 'SCHOLARSHIP',
    name: 'Scholarship',
    shortDescription: 'Report issues or concerns about a scholarship',
  },
  {
    type: 'PROVIDER',
    name: 'Provider',
    shortDescription: 'Report issues or concerns about a provider',
  },
  {
    type: 'APPLICANT',
    name: 'Applicant',
    shortDescription: 'Report issues or concerns about an applicant',
  },
  {
    type: 'SYSTEM',
    name: 'System',
    shortDescription: 'Report technical issues or system problems',
  },
  {
    type: 'PROFILE',
    name: 'Profile',
    shortDescription: 'Report issues or concerns about a profile',
  },
];

export default function ReportDialog({ open, onOpenChange }: ReportDialogProps) {
  const [step, setStep] = useState<'type' | 'category'>('type');
  const [selectedType, setSelectedType] = useState<ReportType | null>(null);

  const { data: categories, isLoading: isLoadingCategories } = useGetReportsQuery(
    (selectedType || 'SYSTEM') as ReportType,
    { skip: !selectedType }
  );

  const [createReport, { isLoading: isSubmitting }] = useCreateReportMutation();

  const methods = useForm<FormReport>({
    defaultValues: { title: '', comment: '', categoryId: 0 },
  });

  const { handleSubmit, reset, setValue, watch } = methods;
  const selectedCategoryId = watch('categoryId');

  const resetAll = () => {
    reset();
    setStep('type');
    setSelectedType(null);
  };

  const handleTypeSelect = (type: ReportType) => {
    setSelectedType(type);
    setStep('category');
  };

  const handleCategorySelect = (categoryId: number) => {
    setValue('categoryId', categoryId);
  };

  const onSubmit = async (data: FormReport) => {
    try {
      await createReport(data).unwrap();
      resetAll();
      onOpenChange(false);
    } catch (error) {
      console.error('Failed to create report:', error);
    }
  };

  const handleClose = () => {
    resetAll();
    onOpenChange(false);
  };

  const handleBack = () => {
    if (selectedCategoryId) {
      setValue('categoryId', 0);
    } else {
      setStep('type');
      setSelectedType(null);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle>Give us your feedback</DialogTitle>
          <DialogDescription>
            We value your feedback and would like to hear from you. Please fill out the form below
            to give us your feedback.
          </DialogDescription>
        </DialogHeader>

        <div className="border-b border-gray-200"></div>

        <div className="py-2 px-1 overflow-y-auto flex-1 scrollbar-hide">
          {step === 'type' ? (
            <div className="space-y-3">
              <h3 className="text-lg font-semibold mb-2">Select Report Type</h3>
              <div className="space-y-2">
                {REPORT_TYPES.map((reportType) => (
                  <button
                    key={reportType.type}
                    onClick={() => handleTypeSelect(reportType.type)}
                    className="w-full text-left px-4 py-2 border border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors cursor-pointer"
                  >
                    <div className="font-semibold text-gray-900">{reportType.name}</div>
                    <div className="text-sm text-gray-600">{reportType.shortDescription}</div>
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <Form {...methods}>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 pr-1">
                {/* Selected Type - Clickable to go back */}
                <div
                  onClick={() => {
                    setStep('type');
                    setSelectedType(null);
                  }}
                  className="mb-4 bg-gray-100 rounded-md p-3 cursor-pointer hover:bg-gray-200 transition-colors"
                >
                  <div className="text-sm text-gray-600">Selected Type:</div>
                  <div className="font-semibold text-gray-900">
                    {REPORT_TYPES.find((t) => t.type === selectedType)?.name}
                  </div>
                </div>

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
                          onClick={() => handleCategorySelect(category.id)}
                          className="w-full text-left px-4 py-2 border border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors cursor-pointer"
                        >
                          <div className="font-semibold text-gray-900">{category.name}</div>
                          {category.description && (
                            <div className="text-sm text-gray-600">{category.description}</div>
                          )}
                        </button>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8 text-gray-500">
                      No categories available for this report type.
                    </div>
                  )
                ) : (
                  <>
                    {/* Selected Category - Clickable to go back */}
                    <div
                      onClick={() => setValue('categoryId', 0)}
                      className="mb-4 bg-gray-100 rounded-md p-3 cursor-pointer hover:bg-gray-200 transition-colors"
                    >
                      <div className="text-sm text-gray-600">Selected Category:</div>
                      <div className="font-semibold text-gray-900">
                        {categories?.find((c) => c.id === selectedCategoryId)?.name}
                      </div>
                    </div>

                    <CustomFormField
                      name="title"
                      label="Title"
                      type="text"
                      placeholder="Enter a title for your report"
                      isBorder={true}
                    />
                    <CustomFormField
                      name="comment"
                      label="Description"
                      type="textarea"
                      placeholder="Please provide details about your feedback"
                      isBorder={true}
                    />

                    <DialogFooter className="flex gap-2 mt-4">
                      <Button
                        type="button"
                        variant="custom"
                        onClick={handleBack}
                        disabled={isSubmitting}
                        className="flex items-center gap-1 text-[#3D6CB9] border-[#3D6CB9] border-1 rounded-md px-2 py-1 cursor-pointer"
                      >
                        <ChevronLeft className="w-4 h-4" />
                        Back
                      </Button>
                      <Button
                        type="submit"
                        disabled={isSubmitting}
                        variant="custom"
                        className="bg-[#3D6CB9] text-white"
                      >
                        Submit
                      </Button>
                    </DialogFooter>
                  </>
                )}
              </form>
            </Form>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
