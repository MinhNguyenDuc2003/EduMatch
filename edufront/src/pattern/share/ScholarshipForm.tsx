import { SCHOLARSHIP_TYPES, STUDY_LEVELS, GENDER_OPTIONS, MAJOR_NAMES } from '@/constants/Common';
import { COUNTRIES } from '@/constants/Common';
import { DEFAULT_SCHOLARSHIP_FORM_VALUES } from '@/constants/DefaultValues';
import { University } from '@/constants/University';
import { Button } from '@/pattern/cus/button';
import { CustomFormField } from '@/pattern/cus/CustomFormField';
import { Form } from '@/pattern/cus/form';
import { IScholarship, scholarshipSchema } from '@/lib/schemas';
import { generateSlug } from '@/utils/generateSlug';
import { zodResolver } from '@hookform/resolvers/zod';
import { Image as ImageIcon, X } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/pattern/cus/dialog';
import { Textarea } from '@/pattern/cus/textarea';
import { toast } from 'sonner';

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
  const universityOptions = University.map((university) => ({
    value: university.value,
    label: university.label,
  }));
  const [isImportOpen, setIsImportOpen] = useState(false);
  const [jsonInput, setJsonInput] = useState('');
  const [importError, setImportError] = useState<string | null>(null);

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
    Array<{ url: string; id?: number; isNew?: boolean }>
  >([]);
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
        setImagePreviews((prev) => [...prev, { url: reader.result as string, isNew: true }]);
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

    // If it's an existing image (has id), call onDeleteImage
    if (imageToRemove.id) {
      onDeleteImage?.(imageToRemove.id);
    } else if (imageToRemove.isNew) {
      // If it's a new image, find and remove the corresponding file from uploadedImages
      // Count how many new images appear before this index
      const newImagesBeforeIndex = imagePreviews
        .slice(0, index)
        .filter((img) => img.isNew && !img.id).length;

      // Remove the corresponding file from uploadedImages
      const newUploadedImages = uploadedImages.filter((_, i) => i !== newImagesBeforeIndex);
      setUploadedImages(newUploadedImages);
      onImagesChange?.(newUploadedImages);
    }

    // Remove from previews
    setImagePreviews(imagePreviews.filter((_, i) => i !== index));
  };

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleImport = () => {
    try {
      if (!jsonInput.trim()) {
        setImportError('Please enter valid JSON');
        return;
      }

      const parsedData = JSON.parse(jsonInput);

      // Basic validation and wrapping logic
      // If the JSON is directly the scholarship object
      if (parsedData.scholarship) {
        methods.reset({
          ...DEFAULT_SCHOLARSHIP_FORM_VALUES,
          ...parsedData.scholarship,
        });
      } else {
        // If user pasted the raw object, use it directly as it matches IScholarship structure
        // deeper validation will happen via schema on submit
        methods.reset({
          ...DEFAULT_SCHOLARSHIP_FORM_VALUES,
          ...parsedData,
        });
      }

      setImportError(null);
      setIsImportOpen(false);
      setJsonInput('');
      toast('Scholarship data imported successfully', {
        description: 'Review the form fields before saving.',
      });
    } catch (e) {
      console.error('Invalid JSON', e);
      setImportError('Invalid JSON syntax: ' + (e as Error).message);
    }
  };

  return (
    <Form {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <div className="space-y-8">
          {/* Basic Information */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-semibold text-gray-900">{t('basicInformation')}</h2>

              <Dialog open={isImportOpen} onOpenChange={setIsImportOpen}>
                <DialogTrigger asChild>
                  <Button variant="outline" className="text-primary-brand py-2.5">
                    Import JSON
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[600px] max-h-[60vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>Import Scholarship Data</DialogTitle>
                    <DialogDescription>
                      Paste your scholarship data JSON here to quickly populate the form.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <Textarea
                      placeholder="Paste JSON here..."
                      className="min-h-[300px] font-mono text-xs"
                      value={jsonInput}
                      onChange={(e) => setJsonInput(e.target.value)}
                    />
                    {importError && <p className="text-sm text-red-500">{importError}</p>}
                  </div>
                  <DialogFooter>
                    <Button
                      variant="outline"
                      onClick={() => setIsImportOpen(false)}
                      className="w-full sm:w-auto text-primary-brand py-2.5"
                    >
                      Cancel
                    </Button>
                    <Button onClick={handleImport}>Import</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>

              <CustomFormField
                name="status"
                label={t('status')}
                type="select"
                placeholder="Enter scholarship status"
                isBorder={true}
                inlineLabel
                initialValue={scholarship?.status || 'Public'}
                options={[
                  { value: 'Public', label: 'Public' },
                  { value: 'Private', label: 'Private' },
                ]}
              />
            </div>

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
                type="input-select"
                placeholder="Select university"
                options={universityOptions}
                initialValue={scholarship?.university}
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

              {/* Required Major */}
              <CustomFormField
                name="requiredMajor"
                label={t('requiredMajor')}
                type="multi-select"
                placeholder="Select required major"
                options={MAJOR_NAMES}
                initialValue={scholarship?.requiredMajor}
                isBorder={true}
              />

              {/* Gender Requirement */}
              <CustomFormField
                name="genderRequirement"
                label={t('genderRequirement')}
                type="select"
                placeholder="Select gender requirement"
                options={GENDER_OPTIONS}
                initialValue={scholarship?.genderRequirement}
                isBorder={true}
              />
            </div>
          </div>

          {/* Demographic Requirements */}
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-gray-900">{t('demographicRequirements')}</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Min Age */}
              <CustomFormField
                name="minAge"
                label={t('minAge')}
                type="number"
                placeholder="Enter minimum age (16-100)"
                isBorder={true}
              />

              {/* Max Age */}
              <CustomFormField
                name="maxAge"
                label={t('maxAge')}
                type="number"
                placeholder="Enter maximum age (16-100)"
                isBorder={true}
              />

              {/* Restricted Nationalities */}
              <CustomFormField
                name="restrictedNationalities"
                label={t('restrictedNationalities')}
                type="multi-select"
                options={COUNTRIES}
                placeholder="Select restricted nationalities"
                isBorder={true}
              />
            </div>
          </div>

          {/* Test Score Requirements */}
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-gray-900">{t('testScoreRequirements')}</h2>
            <p className="text-sm text-gray-600">{t('subtitleTestScores')}</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* SAT Score */}
              <CustomFormField
                name="requiredSatScore"
                label={t('requiredSatScore')}
                type="number"
                placeholder="Enter minimum SAT score (100-1600)"
                isBorder={true}
              />

              {/* ACT Score */}
              <CustomFormField
                name="requiredActScore"
                label={t('requiredActScore')}
                type="number"
                placeholder="Enter minimum ACT score (1-36)"
                isBorder={true}
              />

              {/* GRE Score */}
              <CustomFormField
                name="requiredGreScore"
                label={t('requiredGreScore')}
                type="number"
                placeholder="Enter minimum GRE score (100-340)"
                isBorder={true}
              />

              {/* GMAT Score */}
              <CustomFormField
                name="requiredGmatScore"
                label={t('requiredGmatScore')}
                type="number"
                placeholder="Enter minimum GMAT score (200-800)"
                isBorder={true}
              />

              {/* TOEFL Score */}
              <CustomFormField
                name="requiredToeflScore"
                label={t('requiredToeflScore')}
                type="number"
                placeholder="Enter minimum TOEFL score (0-120)"
                isBorder={true}
              />

              {/* IELTS Score */}
              <CustomFormField
                name="requiredIeltsScore"
                label={t('requiredIeltsScore')}
                type="range"
                placeholder="Enter minimum IELTS score (0-9)"
                isBorder={true}
                min={0}
                max={9}
                step={0.5}
              />
            </div>
          </div>

          {/* Experience & Achievement Requirements */}
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-gray-900">{t('experienceRequirements')}</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Work Experience Years */}
              <CustomFormField
                name="requiredWorkExperienceYears"
                label={t('requiredWorkExperienceYears')}
                type="number"
                placeholder="Enter required work experience years (0-10)"
                isBorder={true}
              />

              {/* Publication Count */}
              <CustomFormField
                name="requiredPublicationCount"
                label={t('requiredPublicationCount')}
                type="number"
                placeholder="Enter required publication count (0-10)"
                isBorder={true}
              />

              {/* Academic Awards */}
              <CustomFormField
                name="requiredAcademicAwards"
                label={t('requiredAcademicAwards')}
                type="text"
                placeholder="e.g., Dean's List, Honor Roll, Academic Excellence Award"
                isBorder={true}
              />

              {/* Class Rank Percentile */}
              <CustomFormField
                name="requiredClassRankPercentile"
                label={t('requiredClassRankPercentile')}
                type="range"
                placeholder="Enter required class rank percentile (0-100)"
                isBorder={true}
                min={0}
                max={100}
                step={1}
              />
            </div>
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
