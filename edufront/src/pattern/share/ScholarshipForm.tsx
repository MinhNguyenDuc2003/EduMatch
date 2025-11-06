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
import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';

const ScholarshipForm = ({
  scholarship,
  onSubmit,
  onImagesChange,
  isLoading = false,
}: {
  scholarship?: Scholarship;
  onSubmit: (data: IScholarship) => void;
  onImagesChange?: (images: File[]) => void;
  isLoading?: boolean;
}) => {
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
  const [imagePreviews, setImagePreviews] = useState<
    Array<{ url: string; type: 'existing' | 'new'; id?: number }>
  >([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Load initial images from scholarship
  useEffect(() => {
    if (scholarship?.scholarshipMedias && scholarship.scholarshipMedias.length > 0) {
      const initialImages = scholarship.scholarshipMedias.map((media) => ({
        url: media.url,
        type: 'existing' as const,
        id: media.id,
      }));
      setImagePreviews(initialImages);

      // Transform initial images to files and set uploaded images
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
    if (imageToRemove.type === 'new') {
      const newImageIndex = imagePreviews
        .slice(0, index)
        .filter((img) => img.type === 'new').length;
      const newImages = uploadedImages.filter((_, i) => i !== newImageIndex);
      setUploadedImages(newImages);
      onImagesChange?.(newImages);
    }

    // Remove from previews
    const newPreviews = imagePreviews.filter((_, i) => i !== index);
    setImagePreviews(newPreviews);
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
            <h2 className="text-2xl font-semibold text-gray-900">Basic Information</h2>

            {/* Title */}
            <CustomFormField
              name="title"
              label="Scholarship Title *"
              type="text"
              placeholder="Enter scholarship title"
              isBorder={true}
            />

            {/* Slug (auto-generated, read-only) */}
            <CustomFormField
              name="slug"
              label="Slug *"
              type="text"
              placeholder="Auto-generated from title"
              isBorder={true}
              disabled={true}
            />

            {/* Short Description */}
            <CustomFormField
              name="shortDescription"
              label="Short Description *"
              type="textarea"
              placeholder="Enter a brief description (2-3 sentences)"
              isBorder={true}
            />

            {/* Full Description */}
            <CustomFormField
              name="description"
              label="Description *"
              type="textarea"
              placeholder="Enter detailed description of the scholarship"
              isBorder={true}
            />

            {/* Requirements */}
            <CustomFormField
              name="requirements"
              label="Requirements *"
              type="textarea"
              placeholder="Enter eligibility requirements and criteria"
              isBorder={true}
            />

            {/* Benefits */}
            <CustomFormField
              name="benefits"
              label="Benefits *"
              type="textarea"
              placeholder="Enter benefits offered by this scholarship"
              isBorder={true}
            />

            {/* Fields */}
            <CustomFormField
              name="fields"
              label="Fields of Study *"
              type="text"
              placeholder="e.g., Computer Science, Engineering, Business"
              isBorder={true}
            />
          </div>

          {/* Images Upload */}
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-gray-900">Images</h2>
            <p className="text-sm text-gray-600">
              Upload images related to this scholarship (e.g., university photos, event photos)
            </p>

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
                Add Images
              </Button>

              {/* Image previews */}
              {imagePreviews.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {imagePreviews.map((preview, index) => (
                    <div
                      key={preview.type === 'existing' ? preview.id : index}
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
                      {preview.type === 'existing' && (
                        <span className="absolute top-2 left-2 bg-blue-500 text-white text-xs px-2 py-1 rounded">
                          Existing
                        </span>
                      )}
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
                <p className="text-sm text-gray-500 italic">No images uploaded yet.</p>
              )}
            </div>
          </div>

          {/* Location & Institution */}
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-gray-900">Location & Institution</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Country */}
              <CustomFormField
                name="country"
                label="Country *"
                type="select"
                placeholder="Select country"
                options={COUNTRIES}
                initialValue={scholarship?.country}
                isBorder={true}
              />

              {/* University */}
              <CustomFormField
                name="university"
                label="University *"
                type="text"
                placeholder="Enter university name"
                isBorder={true}
              />
            </div>
          </div>

          {/* Scholarship Details */}
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-gray-900">Scholarship Details</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Study Level */}
              <CustomFormField
                name="studyLevel"
                label="Study Level *"
                type="select"
                placeholder="Select study level"
                options={STUDY_LEVELS}
                initialValue={scholarship?.studyLevel}
                isBorder={true}
              />

              {/* Scholarship Type */}
              <CustomFormField
                name="scholarshipType"
                label="Scholarship Type *"
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
              label="Funding Amount *"
              type="text"
              placeholder="e.g., 100000 USD, Full tuition coverage"
              isBorder={true}
            />

            {/* Available Slots */}
            <CustomFormField
              name="availableSlots"
              label="Available Slots"
              type="number"
              placeholder="Enter number of available slots"
              isBorder={true}
            />
          </div>

          {/* Dates */}
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-gray-900">Application Period</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Start Date */}
              <CustomFormField
                name="startDate"
                label="Start Date *"
                type="date"
                placeholder="Select start date"
                isBorder={true}
              />

              {/* End Date */}
              <CustomFormField
                name="endDate"
                label="End Date *"
                type="date"
                placeholder="Select end date"
                isBorder={true}
              />
            </div>
          </div>

          {/* Requirements */}
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-gray-900">Academic Requirements</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Language Requirement */}
              <CustomFormField
                name="languageRequirement"
                label="Language Requirement *"
                type="text"
                placeholder="e.g., IELTS 7.0, TOEFL 95, English proficiency certificate"
                isBorder={true}
              />

              {/* GPA Requirement */}

              <CustomFormField
                name="gpaRequirement"
                label="GPA Requirement"
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
              <h2 className="text-2xl font-semibold text-gray-900">Preferences</h2>
              <Button
                type="button"
                onClick={handleAddPreference}
                className="bg-[#3D6CB9] hover:bg-[#2F5A9E] text-white"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Preference
              </Button>
            </div>

            <p className="text-sm text-gray-600">
              Add preferences that applicants should match (e.g., ethnicity, region, field of study)
            </p>

            {watch('scholarshipPreferences')?.map((preference, index) => (
              <div key={index} className="border-2 border-gray-200 rounded-lg p-6 space-y-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Preference {index + 1}</h3>

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
                    label="Type *"
                    type="text"
                    placeholder="e.g., Ethnicity, Region, Field"
                    isBorder={true}
                  />

                  <CustomFormField
                    name={`scholarshipPreferences.${index}.value`}
                    label="Value *"
                    type="text"
                    placeholder="e.g., Asian, Southeast Asia, Computer Science"
                    isBorder={true}
                  />
                </div>

                {/* Weight & Note */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <CustomFormField
                    name={`scholarshipPreferences.${index}.weight`}
                    label="Weight *"
                    type="range"
                    placeholder="Enter weight (0-1)"
                    isBorder={true}
                    min={0}
                    max={1}
                    step={0.1}
                  />

                  <CustomFormField
                    name={`scholarshipPreferences.${index}.note`}
                    label="Note"
                    type="text"
                    placeholder="Additional notes (optional)"
                    isBorder={true}
                  />
                </div>
              </div>
            ))}

            {(!watch('scholarshipPreferences') ||
              watch('scholarshipPreferences')?.length === 0) && (
              <p className="text-sm text-gray-500 italic">
                No preferences added yet. Click "Add Preference" to add one.
              </p>
            )}
          </div>

          {/* Submit Button */}
          <div className="pt-4 flex gap-4">
            <Button
              type="submit"
              className="flex-1 bg-[#3D6CB9] hover:bg-[#2F5A9E] text-white py-3 text-base font-semibold"
              disabled={isLoading}
            >
              {isLoading ? 'Submitting...' : 'Submit'}
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
};

export default ScholarshipForm;
