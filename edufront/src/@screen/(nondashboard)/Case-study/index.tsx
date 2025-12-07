'use client';

import { usePostCaseStudyMutation } from '@/state/apiScholarship';
import { DEFAULT_CASE_STUDY_FORM_VALUES } from '@/constants/DefaultValues';
import { Button } from '@/lib/cus/button';
import { CustomFormField } from '@/lib/cus/CustomFormField';
import { Form } from '@/lib/cus/form';
import { ICaseStudy, caseStudySchema } from '@/lib/schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { Image as ImageIcon, X } from 'lucide-react';
import Image from 'next/image';
import React, { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslations } from 'next-intl';
import { useRouter } from '@/i18n/navigation';
import { toast } from 'sonner';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/lib/cus/dialog';
import { CheckCircle2 } from 'lucide-react';
import { useEffect } from 'react';

export default function CaseStudy({ scholarshipId }: { scholarshipId: string }) {
  const router = useRouter();
  const t = useTranslations('caseStudy');
  const [postCaseStudy, { isLoading: isLoadingPostCaseStudy }] = usePostCaseStudyMutation();
  const [uploadedImages, setUploadedImages] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<Array<{ url: string }>>([]);
  const [showThankYouDialog, setShowThankYouDialog] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Form setup
  const methods = useForm<ICaseStudy>({
    reValidateMode: 'onSubmit',
    mode: 'onChange',
    resolver: zodResolver(caseStudySchema),
    defaultValues: {
      ...DEFAULT_CASE_STUDY_FORM_VALUES,
      scholarshipId: Number(scholarshipId),
    },
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    const newImages = [...uploadedImages, ...files];
    setUploadedImages(newImages);

    // Create previews for new images
    files.forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreviews((prev) => [...prev, { url: reader.result as string }]);
      };
      reader.readAsDataURL(file);
    });

    // Reset input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleRemoveImage = (index: number) => {
    const newFiles = uploadedImages.filter((_, i) => i !== index);
    setUploadedImages(newFiles);
    setImagePreviews(imagePreviews.filter((_, i) => i !== index));
  };

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  // Auto close dialog and redirect after 3 seconds
  useEffect(() => {
    if (showThankYouDialog) {
      const timer = setTimeout(() => {
        setShowThankYouDialog(false);
        router.push('/home');
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [showThankYouDialog, router]);

  const onSubmit = async (data: ICaseStudy) => {
    try {
      // Build content with pre-formatted questions and answers
      const contentWithQnA = `
        <h2>Initial Thoughts</h2>
        <p><strong>Question:</strong> What were your initial thoughts when you first saw this opportunity on EduMatch?</p>
        <div>${data.initialThoughts}</div>
        
        <h2>Preparation Process</h2>
        <p><strong>Question:</strong> Can you walk us through your preparation process for this scholarship application?</p>
        <div>${data.preparationProcess}</div>
        
        <h2>Challenges</h2>
        <p><strong>Question:</strong> What were the biggest challenges or obstacles you faced during the application process?</p>
        <div>${data.challenges}</div>
        
        <h2>Victory Moment</h2>
        <p><strong>Question:</strong> What was the moment you knew you wanted to share your success story with others?</p>
        <div>${data.victoryMoment}</div>
        
        <h2>Advice</h2>
        <p><strong>Question:</strong> What advice would you give to other students who are considering applying for this scholarship?</p>
        <div>${data.advice}</div>
      `;

      // Create FormData - similar to News API pattern
      const formData = new FormData();
      formData.append(
        'caseStudy',
        JSON.stringify({
          scholarshipId: data.scholarshipId,
          title: data.title,
          content: contentWithQnA,
          verified: data.verified,
        })
      );

      // Append images to FormData
      uploadedImages.forEach((image) => {
        formData.append('images', image);
      });

      // Pass FormData directly to the mutation
      await postCaseStudy(formData as any).unwrap();

      // Show success toast
      toast.success(t('submitSuccess'));

      // Show thank you dialog
      setShowThankYouDialog(true);
    } catch (error) {
      console.error(t('errorSubmitting'), error);
      // Show error toast
      toast.error(t('submitError'));
    }
  };

  return (
    <>
      {/* Thank You Dialog */}
      <Dialog open={showThankYouDialog} onOpenChange={setShowThankYouDialog}>
        <DialogContent className="sm:max-w-md" showCloseButton={false}>
          <DialogHeader className="text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
              <CheckCircle2 className="h-10 w-10 text-green-600" />
            </div>
            <DialogTitle className="text-2xl font-bold text-gray-900 !text-center">
              {t('thankYouTitle')}
            </DialogTitle>
            <DialogDescription className="text-base text-gray-600 pt-2 !text-center">
              {t('thankYouMessage')}
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>

      <div className="p-6 lg:p-8 bg-white max-w-4xl mx-auto space-y-2">
        <h1 className="text-3xl font-bold text-gray-900 text-center">{t('title')}</h1>
        <p className="text-gray-600 text-center">{t('subtitle')}</p>

        <Form {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)}>
            <div className="space-y-8">
              {/* Basic Information */}
              <div className="space-y-2">
                <h2 className="text-2xl font-semibold text-gray-900">{t('basicInformation')}</h2>

                {/* Title */}
                <CustomFormField
                  name="title"
                  label={t('caseStudyTitle')}
                  type="text"
                  placeholder={t('caseStudyTitlePlaceholder')}
                  isBorder={true}
                />
              </div>

              {/* Questions Section */}
              <div className="space-y-2">
                <h2 className="text-2xl font-semibold text-gray-900">{t('shareYourJourney')}</h2>
                <p className="text-gray-600">{t('shareYourJourneyDescription')}</p>

                {/* Initial Thoughts */}
                <CustomFormField
                  name="initialThoughts"
                  label={t('initialThoughtsQuestion')}
                  type="textarea"
                  placeholder={t('initialThoughtsPlaceholder')}
                  isBorder={true}
                />

                {/* Preparation Process */}
                <CustomFormField
                  name="preparationProcess"
                  label={t('preparationProcessQuestion')}
                  type="textarea"
                  placeholder={t('preparationProcessPlaceholder')}
                  isBorder={true}
                />

                {/* Challenges */}
                <CustomFormField
                  name="challenges"
                  label={t('challengesQuestion')}
                  type="textarea"
                  placeholder={t('challengesPlaceholder')}
                  isBorder={true}
                />

                {/* Victory Moment */}
                <CustomFormField
                  name="victoryMoment"
                  label={t('victoryMomentQuestion')}
                  type="textarea"
                  placeholder={t('victoryMomentPlaceholder')}
                  isBorder={true}
                />

                {/* Advice */}
                <CustomFormField
                  name="advice"
                  label={t('adviceQuestion')}
                  type="textarea"
                  placeholder={t('advicePlaceholder')}
                  isBorder={true}
                />
              </div>

              {/* Images Upload */}
              <div className="space-y-6">
                <h2 className="text-2xl font-semibold text-gray-900">{t('images')}</h2>
                <p className="text-sm text-gray-600">{t('imagesSubtitle')}</p>

                {/* Hidden file input */}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  multiple
                  className="hidden"
                  onChange={handleImageChange}
                />

                {/* Upload button and image grid */}
                <div className="space-y-4">
                  <Button
                    type="button"
                    onClick={handleImageClick}
                    variant="outline"
                    className="border-2 border-dashed text-gray-500 border-gray-300 hover:border-[#3D6CB9] hover:bg-[#3D6CB9]/5"
                  >
                    <ImageIcon className="w-4 h-4 mr-2" />
                    {t('addImages')}
                  </Button>

                  {/* Image previews */}
                  {imagePreviews.length > 0 && (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                      {imagePreviews.map((preview, index) => (
                        <div
                          key={index}
                          className="relative group aspect-video rounded-lg overflow-hidden border-2 border-gray-200"
                        >
                          <Image
                            src={preview.url}
                            alt={`Case study image ${index + 1}`}
                            width={100}
                            height={100}
                            unoptimized
                            className="w-full h-full object-cover"
                          />

                          <button
                            type="button"
                            onClick={() => handleRemoveImage(index)}
                            className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}

                  {imagePreviews.length === 0 && (
                    <p className="text-sm text-gray-500 italic">{t('noImages')}</p>
                  )}
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-4 flex gap-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => router.back()}
                  className="flex-1 text-gray-600 border-gray-300 hover:bg-gray-50"
                >
                  {t('cancel')}
                </Button>
                <Button
                  type="submit"
                  className="flex-1 bg-[#3D6CB9] hover:bg-[#2F5A9E] text-white py-3 text-base font-semibold"
                  disabled={isLoadingPostCaseStudy}
                >
                  {isLoadingPostCaseStudy ? t('submitting') : t('submitCaseStudy')}
                </Button>
              </div>
            </div>
          </form>
        </Form>
      </div>
    </>
  );
}
