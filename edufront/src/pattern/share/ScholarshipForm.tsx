import { SCHOLARSHIP_TYPES, STUDY_LEVELS } from '@/constants/Common';
import { COUNTRIES } from '@/constants/Common';
import { DEFAULT_SCHOLARSHIP_FORM_VALUES } from '@/constants/DefaultValues';
import { Button } from '@/lib/cus/button';
import { CustomFormField } from '@/lib/cus/CustomFormField';
import { Form } from '@/lib/cus/form';
import { IScholarship, scholarshipSchema } from '@/lib/schemas';
import { generateSlug } from '@/utils/generateSlug';
import { zodResolver } from '@hookform/resolvers/zod';
import { Plus, Trash2, Image as ImageIcon, X } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';

const ScholarshipForm = ({
  scholarship,
  onSubmit,
  onImagesChange,
  onDeleteImage,
  isLoading = false,
}: {
  scholarship?: Scholarship;
  onSubmit: (data: IScholarship) => void;
  onImagesChange?: (images: File[]) => void;
  onDeleteImage?: (imageId: number) => void;
  isLoading?: boolean;
}) => {
  const t = useTranslations('scholarshipForm');
  // Form setup
  const methods = useForm<IScholarship>({
    reValidateMode: 'onSubmit',
    mode: 'onChange',
    resolver: zodResolver(scholarshipSchema),
    defaultValues: DEFAULT_SCHOLARSHIP_FORM_VALUES,
  });

  useEffect(() => {
    if (scholarship) {
      methods.reset({
        ...DEFAULT_SCHOLARSHIP_FORM_VALUES,
        ...scholarship,
      });
    }
  }, [scholarship, methods]);

  const { watch, setValue } = methods;
  const titleValue = watch('title');
  const [uploadedImages, setUploadedImages] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<Array<{ url: string; id?: number }>>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Load initial images from scholarship
  useEffect(() => {
    if (scholarship?.scholarshipMedias && scholarship.scholarshipMedias.length > 0) {
      const initialImages = scholarship.scholarshipMedias.map((media) => ({
        url: media.url,
        id: media.id,
      }));
      setImagePreviews(initialImages);
    }
  }, [scholarship]);

  // Auto-generate slug from title
  useEffect(() => {
    if (titleValue) {
      const slug = generateSlug(titleValue);
      setValue('slug', slug);
    }
  }, [titleValue, setValue]);

  // Handle image uploads
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    const newImages = [...uploadedImages, ...files];
    setUploadedImages(newImages);
    onImagesChange?.(newImages);

    // Create previews for new images
    files.forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreviews((prev) => [...prev, { url: reader.result as string, type: 'new' }]);
      };
      reader.readAsDataURL(file);
    });

    // Reset input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleRemoveImage = (index: number) => {
    const imageToRemove = imagePreviews[index];

    // If it's a new image, remove from uploadedImages
    if (imageToRemove.id) {
      onDeleteImage?.(imageToRemove.id);
    }

    setImagePreviews(imagePreviews.filter((_, i) => i !== index));
  };

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleAddPreference = () => {
    const currentPreferences = watch('scholarshipPreferences') || [];
    setValue('scholarshipPreferences', [
      ...currentPreferences,
      {
        type: '',
        value: '',
        weight: 0,
        note: '',
      },
    ]);
  };

  const handleRemovePreference = (index: number) => {
    const currentPreferences = watch('scholarshipPreferences') || [];
    setValue(
      'scholarshipPreferences',
      currentPreferences.filter((_, i) => i !== index)
    );
  };

  return (
    <Form {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <div className="space-y-8">
          {/* Basic Information */}
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-gray-900">{t('basicInformation')}</h2>

            {/* Title */}
            <CustomFormField
              name="title"
              label={t('title')}
              type="text"
              placeholder="Enter scholarship title"
              isBorder={true}
            />

            {/* Slug (auto-generated, read-only) */}
            <CustomFormField
              name="slug"
              label={t('slug')}
              type="text"
              placeholder="Auto-generated from title"
              isBorder={true}
              disabled={true}
            />

            {/* Short Description */}
            <CustomFormField
              name="shortDescription"
              label={t('shortDescription')}
              type="textarea"
              placeholder="Enter a brief description (2-3 sentences)"
              isBorder={true}
            />

            {/* Full Description */}
            <CustomFormField
              name="description"
              label={t('description')}
              type="textarea"
              placeholder="Enter detailed description of the scholarship"
              isBorder={true}
            />

            {/* Requirements */}
            <CustomFormField
              name="requirements"
              label={t('requirements')}
              type="textarea"
              placeholder="Enter eligibility requirements and criteria"
              isBorder={true}
            />

            {/* Benefits */}
            <CustomFormField
              name="benefits"
              label={t('benefits')}
              type="textarea"
              placeholder="Enter benefits offered by this scholarship"
              isBorder={true}
            />

            {/* Fields */}
            <CustomFormField
              name="fields"
              label={t('fields')}
              type="text"
              placeholder="e.g., Computer Science, Engineering, Business"
              isBorder={true}
            />
          </div>

          {/* Images Upload */}
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-gray-900">{t('images')}</h2>
            <p className="text-sm text-gray-600">{t('subtitleImages')}</p>

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
                        alt={`Scholarship image ${index + 1}`}
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

          {/* Location & Institution */}
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-gray-900">{t('locationInstitution')}</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Country */}
              <CustomFormField
                name="country"
                label={t('country')}
                type="select"
                placeholder="Select country"
                options={COUNTRIES}
                initialValue={scholarship?.country}
                isBorder={true}
              />

              {/* University */}
              <CustomFormField
                name="university"
                label={t('university')}
                type="text"
                placeholder="Enter university name"
                isBorder={true}
              />
            </div>
          </div>

          {/* Scholarship Details */}
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-gray-900">{t('scholarshipDetails')}</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Study Level */}
              <CustomFormField
                name="studyLevel"
                label={t('studyLevel')}
                type="select"
                placeholder="Select study level"
                options={STUDY_LEVELS}
                initialValue={scholarship?.studyLevel}
                isBorder={true}
              />

              {/* Scholarship Type */}
              <CustomFormField
                name="scholarshipType"
                label={t('scholarshipType')}
                type="select"
                placeholder="Select scholarship type"
                options={SCHOLARSHIP_TYPES}
                initialValue={scholarship?.scholarshipType}
                isBorder={true}
              />
            </div>

            {/* Funding Amount */}
            <CustomFormField
              name="fundingAmount"
              label={t('fundingAmount')}
              type="text"
              placeholder="e.g., 100000 USD, Full tuition coverage"
              isBorder={true}
            />

            {/* Available Slots */}
            <CustomFormField
              name="availableSlots"
              label={t('availableSlots')}
              type="number"
              placeholder="Enter number of available slots"
              isBorder={true}
            />
          </div>

          {/* Dates */}
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-gray-900">{t('applicationPeriod')}</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Start Date */}
              <CustomFormField
                name="startDate"
                label={t('startDate')}
                type="date"
                placeholder="Select start date"
                isBorder={true}
              />

              {/* End Date */}
              <CustomFormField
                name="endDate"
                label={t('endDate')}
                type="date"
                placeholder="Select end date"
                isBorder={true}
              />
            </div>
          </div>

          {/* Requirements */}
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-gray-900">{t('academicRequirements')}</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Language Requirement */}
              <CustomFormField
                name="languageRequirement"
                label={t('languageRequirement')}
                type="text"
                placeholder="e.g., IELTS 7.0, TOEFL 95, English proficiency certificate"
                isBorder={true}
              />

              {/* GPA Requirement */}

              <CustomFormField
                name="gpaRequirement"
                label={t('gpaRequirement')}
                type="range"
                placeholder="Enter minimum GPA (0-4 scale)"
                isBorder={true}
                min={0}
                max={4}
                step={0.1}
              />
            </div>
          </div>

          {/* Scholarship Preferences */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-semibold text-gray-900">{t('preferences')}</h2>
              <Button
                type="button"
                onClick={handleAddPreference}
                className="bg-[#3D6CB9] hover:bg-[#2F5A9E] text-white"
              >
                <Plus className="w-4 h-4 mr-2" />
                {t('addPreference')}
              </Button>
            </div>

            <p className="text-sm text-gray-600">{t('subtitlePreferences')}</p>

            {watch('scholarshipPreferences')?.map((preference, index) => (
              <div key={index} className="border-2 border-gray-200 rounded-lg p-6 space-y-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {t('preferences')} {index + 1}
                  </h3>

                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => handleRemovePreference(index)}
                    className="p-2 h-full w-fit text-red-500 hover:text-red-700 hover:bg-red-50 border-red-500"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>

                {/* Type & Value */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <CustomFormField
                    name={`scholarshipPreferences.${index}.type`}
                    label={t('type')}
                    type="text"
                    placeholder="e.g., Ethnicity, Region, Field"
                    isBorder={true}
                  />

                  <CustomFormField
                    name={`scholarshipPreferences.${index}.value`}
                    label={t('value')}
                    type="text"
                    placeholder="e.g., Asian, Southeast Asia, Computer Science"
                    isBorder={true}
                  />
                </div>

                {/* Weight & Note */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <CustomFormField
                    name={`scholarshipPreferences.${index}.weight`}
                    label={t('weight')}
                    type="range"
                    placeholder="Enter weight (0-1)"
                    isBorder={true}
                    min={0}
                    max={1}
                    step={0.1}
                  />

                  <CustomFormField
                    name={`scholarshipPreferences.${index}.note`}
                    label={t('note')}
                    type="text"
                    placeholder="Additional notes (optional)"
                    isBorder={true}
                  />
                </div>
              </div>
            ))}

            {(!watch('scholarshipPreferences') ||
              watch('scholarshipPreferences')?.length === 0) && (
              <p className="text-sm text-gray-500 italic">{t('noPreferences')}</p>
            )}
          </div>

          {/* Submit Button */}
          <div className="pt-4 flex gap-4">
            <Button
              type="submit"
              className="flex-1 bg-[#3D6CB9] hover:bg-[#2F5A9E] text-white py-3 text-base font-semibold"
              disabled={isLoading}
            >
              {isLoading ? t('submitting') : t('submit')}
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
};

export default ScholarshipForm;
