import { DEFAULT_APPLICATION_FORM_VALUES } from '@/constants/DefaultValues';
import { COUNTRIES, GENDER_OPTIONS, MAJOR_NAMES, STUDY_LEVELS, YEARS } from '@/constants/Common';
import { Button } from '@/lib/cus/button';
import { CustomFormField } from '@/lib/cus/CustomFormField';
import { Form } from '@/lib/cus/form';
import { applicationSchema, IApplication } from '@/lib/schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { FileIcon, ImageIcon, Plus, Trash2, X } from 'lucide-react';
import React, { useEffect, useImperativeHandle, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import Image from 'next/image';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/lib/cus/dialog';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

interface ApplicationsFormProps {
  application?: Application;
  onSubmit: (data: IApplication) => void;
  onImagesChange?: (images: File[]) => void;
  onDeleteImage?: (imageId: number) => void;
  isLoading?: boolean;
}

export interface ApplicationsFormRef {
  setFormValues: (values: Partial<IApplication>) => void;
}

const ApplicationsForm = React.forwardRef<ApplicationsFormRef, ApplicationsFormProps>(
  ({ application, onSubmit, onImagesChange, onDeleteImage, isLoading }, ref) => {
    const t = useTranslations('activity.applicationForm');
    const [uploadedImages, setUploadedImages] = useState<File[]>([]);
    const [imagePreviews, setImagePreviews] = useState<Array<{ url: string; id?: number }>>([]);
    const [documentsPreviews, setDocumentsPreviews] = useState<Array<{ url: string; id?: number }>>(
      []
    );
    const imageInputRef = useRef<HTMLInputElement>(null);
    const documentInputRef = useRef<HTMLInputElement>(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [applicationName, setApplicationName] = useState('');

    const methods = useForm<IApplication>({
      reValidateMode: 'onSubmit',
      mode: 'onChange',
      resolver: zodResolver(applicationSchema),
      defaultValues: DEFAULT_APPLICATION_FORM_VALUES,
    });

    const { watch, setValue } = methods;

    // Expose form methods via ref
    useImperativeHandle(ref, () => ({
      setFormValues: (values: Partial<IApplication>) => {
        methods.reset({
          ...DEFAULT_APPLICATION_FORM_VALUES,
          ...methods.getValues(),
          ...values,
        });
      },
    }));

    useEffect(() => {
      if (application) {
        methods.reset({
          ...DEFAULT_APPLICATION_FORM_VALUES,
          ...application,
        });
        // Set application name if available
        if (application.applicationName) {
          setApplicationName(application.applicationName);
        }
      }
    }, [application, methods]);

    const handleAddPreference = () => {
      const currentPreferences = watch('applicationAttributes') || [];
      setValue('applicationAttributes', [
        ...currentPreferences,
        {
          key: '',
          value: '',
          note: '',
        },
      ]);
    };

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
          if (file.type === 'application/pdf') {
            setDocumentsPreviews((prev) => [
              ...prev,
              { url: reader.result as string, type: 'new' },
            ]);
          } else if (file.type === 'image/png') {
            setImagePreviews((prev) => [...prev, { url: reader.result as string, type: 'new' }]);
          }
        };
        reader.readAsDataURL(file);
      });

      // Reset input
      if (imageInputRef.current) {
        imageInputRef.current.value = '';
      }
      if (documentInputRef.current) {
        documentInputRef.current.value = '';
      }
    };

    const handleRemoveImage = (url: string, type: 'image' | 'document') => {
      let idToRemove = undefined;
      if (type === 'image') {
        idToRemove = imagePreviews.find((image) => image.url === url)?.id || 0;
        setImagePreviews(imagePreviews.filter((image) => image.url !== url));
      } else if (type === 'document') {
        idToRemove = documentsPreviews.find((document) => document.url === url)?.id || 0;
        setDocumentsPreviews(documentsPreviews.filter((document) => document.url !== url));
      }

      if (idToRemove) {
        onDeleteImage?.(idToRemove);
      }
    };

    const handleImageClick = () => {
      imageInputRef.current?.click();
    };

    const handleDocumentClick = () => {
      documentInputRef.current?.click();
    };

    // Load initial images from scholarship
    useEffect(() => {
      if (application?.applicationMedias && application.applicationMedias.length > 0) {
        const initialImages = application.applicationMedias
          .filter((media) => media.contentType === 'image/png')
          .map((media) => ({
            url: media.url,
            id: media.id,
          }));

        const initialDocuments = application.applicationMedias
          .filter((media) => media.contentType === 'application/pdf')
          .map((media) => ({
            url: media.url,
            id: media.id,
          }));

        setImagePreviews(initialImages);
        setDocumentsPreviews(initialDocuments);

        // Transform initial images to files and set uploaded images
      }
    }, [application]);

    const handleRemovePreference = (index: number) => {
      const currentPreferences = watch('applicationAttributes') || [];
      setValue(
        'applicationAttributes',
        currentPreferences.filter((_, i) => i !== index)
      );
    };

    // Handle form submission - open dialog
    const handleFormSubmit = (data: IApplication) => {
      setApplicationName(data.applicationName || 'Application 1');
      setIsDialogOpen(true);
    };

    // Handle complete submission
    const handleComplete = () => {
      if (!applicationName.trim()) return;

      const formData = methods.getValues();
      onSubmit({
        ...formData,
        applicationName: applicationName.trim(),
      });
      setIsDialogOpen(false);
    };

    return (
      <div className="w-full flex flex-col gap-6 max-w-4xl mx-auto shadow-2xl rounded-lg p-6">
        <div className="text-3xl font-bold text-gray-900 flex items-center justify-center ">
          {t('title')}
        </div>

        {/* Guidelines Section */}
        <div className="flex flex-col">
          <p className="text-sm text-gray-800 font-medium">{t('guidelines.title')}</p>
          <ul className="text-sm text-gray-700 list-disc">
            <li className="ml-6">{t('guidelines.accuracy')}</li>
            <li className="ml-6">{t('guidelines.documents')}</li>
            <li className="ml-6">{t('guidelines.proofread')}</li>
            <li className="ml-6">{t('guidelines.deadlines')}</li>
            <li className="ml-6">{t('guidelines.instructions')}</li>
          </ul>
        </div>

        <Form {...methods}>
          <form onSubmit={methods.handleSubmit(handleFormSubmit)}>
            <div className="space-y-8">
              {/* Personal Information */}
              <div className="space-y-6">
                <h2 className="text-lg font-semibold text-gray-900">
                  {t('sections.personalInformation')}
                </h2>

                {/* Full Name */}
                <CustomFormField
                  name="fullName"
                  label={t('fields.fullName')}
                  type="text"
                  placeholder={t('fields.fullNamePlaceholder')}
                  isBorder={true}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Gender */}
                  <CustomFormField
                    name="gender"
                    label={t('fields.gender')}
                    type="select"
                    placeholder={t('fields.genderPlaceholder')}
                    options={GENDER_OPTIONS}
                    initialValue={application?.gender}
                    isBorder={true}
                  />

                  {/* Date of Birth */}
                  <CustomFormField
                    name="dateOfBirth"
                    label={t('fields.dateOfBirth')}
                    type="date-of-birth"
                    placeholder={t('fields.dateOfBirthPlaceholder')}
                    isBorder={true}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Age */}
                  <CustomFormField
                    name="age"
                    label={t('fields.age')}
                    type="number"
                    placeholder={t('fields.agePlaceholder')}
                    isBorder={true}
                  />

                  {/* Citizenship */}
                  <CustomFormField
                    name="citizenship"
                    label={t('fields.citizenship')}
                    type="input-select"
                    placeholder={t('fields.citizenshipPlaceholder')}
                    options={COUNTRIES}
                    initialValue={application?.citizenship}
                    isBorder={true}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Email */}
                  <CustomFormField
                    name="email"
                    label={t('fields.email')}
                    type="email"
                    placeholder={t('fields.emailPlaceholder')}
                    isBorder={true}
                  />

                  {/* Phone */}
                  <CustomFormField
                    name="phone"
                    label={t('fields.phoneNumber')}
                    type="text"
                    placeholder={t('fields.phoneNumberPlaceholder')}
                    isBorder={true}
                  />
                </div>

                {/* Address */}
                <CustomFormField
                  name="address"
                  label={t('fields.address')}
                  type="text"
                  placeholder={t('fields.addressPlaceholder')}
                  isBorder={true}
                />

                {/* Nationality */}
                <CustomFormField
                  name="nationality"
                  label={t('fields.nationality')}
                  type="input-select"
                  placeholder={t('fields.nationalityPlaceholder')}
                  options={COUNTRIES}
                  initialValue={application?.nationality}
                  isBorder={true}
                />
              </div>

              {/* Educational Background */}
              <div className="space-y-6">
                <h2 className="text-lg font-semibold text-gray-900">
                  {t('sections.educationalBackground')}
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Education Level */}
                  <CustomFormField
                    name="educationLevel"
                    label={t('fields.educationLevel')}
                    type="select"
                    placeholder={t('fields.educationLevelPlaceholder')}
                    options={STUDY_LEVELS}
                    initialValue={application?.educationLevel}
                    isBorder={true}
                  />

                  {/* School Name */}
                  <CustomFormField
                    name="schoolName"
                    label={t('fields.schoolName')}
                    type="text"
                    placeholder={t('fields.schoolNamePlaceholder')}
                    isBorder={true}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Major */}
                  <CustomFormField
                    name="major"
                    type="input-select"
                    label={t('fields.major')}
                    placeholder={t('fields.majorPlaceholder')}
                    options={MAJOR_NAMES}
                    initialValue={application?.major}
                    isBorder={true}
                  />

                  {/* GPA */}
                  <CustomFormField
                    name="gpa"
                    label={t('fields.gpa')}
                    type="range"
                    placeholder={t('fields.gpaPlaceholder')}
                    isBorder={true}
                    min={0}
                    max={4}
                    step={0.1}
                  />
                </div>

                {/* Graduation Year */}
                <CustomFormField
                  name="graduationYear"
                  label={t('fields.graduationYear')}
                  type="select"
                  placeholder={t('fields.graduationYearPlaceholder')}
                  options={YEARS.map((year) => ({ value: String(year.value), label: year.label }))}
                  initialValue={application?.graduationYear}
                  isBorder={true}
                />

                {/* Class Rank & Size */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <CustomFormField
                    name="classRank"
                    label={t('fields.classRank')}
                    type="number"
                    placeholder={t('fields.classRankPlaceholder')}
                    isBorder={true}
                  />
                  <CustomFormField
                    name="classSize"
                    label={t('fields.classSize')}
                    type="number"
                    placeholder={t('fields.classSizePlaceholder')}
                    isBorder={true}
                  />
                  <CustomFormField
                    name="classRankPercentile"
                    label={t('fields.classRankPercentile')}
                    type="number"
                    placeholder={t('fields.classRankPercentilePlaceholder')}
                    isBorder={true}
                  />
                </div>

                {/* Test Scores */}
                <div className="space-y-4">
                  <h3 className="text-md font-semibold text-gray-800">
                    {t('sections.testScores')}
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <CustomFormField
                      name="satScore"
                      label={t('fields.satScore')}
                      type="number"
                      placeholder={t('fields.satScorePlaceholder')}
                      isBorder={true}
                    />
                    <CustomFormField
                      name="actScore"
                      label={t('fields.actScore')}
                      type="number"
                      placeholder={t('fields.actScorePlaceholder')}
                      isBorder={true}
                    />
                    <CustomFormField
                      name="greScore"
                      label={t('fields.greScore')}
                      type="number"
                      placeholder={t('fields.greScorePlaceholder')}
                      isBorder={true}
                    />
                    <CustomFormField
                      name="gmatScore"
                      label={t('fields.gmatScore')}
                      type="number"
                      placeholder={t('fields.gmatScorePlaceholder')}
                      isBorder={true}
                    />
                    <CustomFormField
                      name="toeflScore"
                      label={t('fields.toeflScore')}
                      type="number"
                      placeholder={t('fields.toeflScorePlaceholder')}
                      isBorder={true}
                    />
                    <CustomFormField
                      name="ieltsScore"
                      label={t('fields.ieltsScore')}
                      type="number"
                      placeholder={t('fields.ieltsScorePlaceholder')}
                      isBorder={true}
                    />
                  </div>
                </div>
              </div>

              {/* Skills & Achievements */}
              <div className="space-y-6">
                <h2 className="text-lg font-semibold text-gray-900">
                  {t('sections.skillsAchievements')}
                </h2>

                {/* Skills */}
                <CustomFormField
                  name="skills"
                  label={t('fields.skills')}
                  type="textarea"
                  placeholder={t('fields.skillsPlaceholder')}
                  isBorder={true}
                />

                {/* Achievements */}
                <CustomFormField
                  name="achievements"
                  label={t('fields.achievements')}
                  type="textarea"
                  placeholder={t('fields.achievementsPlaceholder')}
                  isBorder={true}
                />

                {/* Extracurricular Activities */}
                <CustomFormField
                  name="extracurricular"
                  label={t('fields.extracurricular')}
                  type="textarea"
                  placeholder={t('fields.extracurricularPlaceholder')}
                  isBorder={true}
                />

                {/* Languages */}
                <CustomFormField
                  name="languages"
                  label={t('fields.languages')}
                  type="textarea"
                  placeholder={t('fields.languagesPlaceholder')}
                  isBorder={true}
                />

                {/* Career Goal */}
                <CustomFormField
                  name="careerGoal"
                  label={t('fields.careerGoal')}
                  type="textarea"
                  placeholder={t('fields.careerGoalPlaceholder')}
                  isBorder={true}
                />

                {/* Research Interest */}
                <CustomFormField
                  name="researchInterest"
                  label={t('fields.researchInterest')}
                  type="textarea"
                  placeholder={t('fields.researchInterestPlaceholder')}
                  isBorder={true}
                />

                {/* Academic Awards */}
                <CustomFormField
                  name="academicAwards"
                  label={t('fields.academicAwards')}
                  type="textarea"
                  placeholder={t('fields.academicAwardsPlaceholder')}
                  isBorder={true}
                />

                {/* Publication Count */}
                <CustomFormField
                  name="publicationCount"
                  label={t('fields.publicationCount')}
                  type="number"
                  placeholder={t('fields.publicationCountPlaceholder')}
                  isBorder={true}
                />

                {/* Work Experience Years */}
                <CustomFormField
                  name="workExperienceYears"
                  label={t('fields.workExperienceYears')}
                  type="number"
                  placeholder={t('fields.workExperienceYearsPlaceholder')}
                  isBorder={true}
                />

                {/* Is Athlete */}
                <CustomFormField
                  name="isAthlete"
                  label={t('fields.isAthlete')}
                  type="switch"
                  isBorder={true}
                />

                {/* Athletic Achievements */}
                <CustomFormField
                  name="athleticAchievements"
                  label={t('fields.athleticAchievements')}
                  type="textarea"
                  placeholder={t('fields.athleticAchievementsPlaceholder')}
                  isBorder={true}
                />
              </div>

              {/* Motivation & Personal Statement */}
              <div className="space-y-6">
                <h2 className="text-lg font-semibold text-gray-900">
                  {t('sections.motivationPersonalStatement')}
                </h2>

                {/* Motivation */}
                <CustomFormField
                  name="motivation"
                  label={t('fields.motivation')}
                  type="textarea"
                  placeholder={t('fields.motivationPlaceholder')}
                  isBorder={true}
                />

                {/* Personal Statement */}
                <CustomFormField
                  name="personalStatement"
                  label={t('fields.personalStatement')}
                  type="textarea"
                  placeholder={t('fields.personalStatementPlaceholder')}
                  isBorder={true}
                />
              </div>

              {/* Images Upload */}
              <div className="space-y-6">
                <h2 className="text-2xl font-semibold text-gray-900">{t('sections.images')}</h2>
                <p className="text-sm text-gray-600">{t('images.description')}</p>

                {/* Hidden file input */}
                <input
                  ref={imageInputRef}
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
                    {t('images.addImages')}
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
                            alt={`${t('images.imageAlt')} ${index + 1}`}
                            width={100}
                            height={100}
                            unoptimized
                            className="w-full h-full object-cover"
                          />

                          <button
                            type="button"
                            onClick={() => handleRemoveImage(preview.url, 'image')}
                            className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}

                  {imagePreviews.length === 0 && (
                    <p className="text-sm text-gray-500 italic">{t('images.noImagesUploaded')}</p>
                  )}
                </div>
              </div>

              {/* Documents Upload */}
              <div className="space-y-6">
                <h2 className="text-2xl font-semibold text-gray-900">{t('documents.title')}</h2>
                <p className="text-sm text-gray-600">{t('documents.description')}</p>

                {/* Hidden file input */}
                <input
                  ref={documentInputRef}
                  type="file"
                  accept="application/pdf"
                  className="hidden"
                  onChange={handleImageChange}
                />

                <div className="space-y-4">
                  <Button
                    type="button"
                    onClick={handleDocumentClick}
                    variant="outline"
                    className="border-2 border-dashed text-gray-500 border-gray-300 hover:border-[#3D6CB9] hover:bg-[#3D6CB9]/5"
                  >
                    <FileIcon className="w-4 h-4 mr-2" />
                    {t('documents.addDocuments')}
                  </Button>
                  {/* Documents previews */}
                  {documentsPreviews.length > 0 && (
                    <div className="flex flex-col gap-2">
                      {documentsPreviews.map((preview, index) => (
                        <div
                          key={index}
                          className="flex items-center gap-2 bg-slate-200 p-2 rounded-lg w-fit"
                        >
                          <FileIcon className="w-4 h-4 mr-2" />
                          <Link
                            href={preview.url}
                            target="_blank"
                            className="text-slate-500 hover:text-blue-600 mr-2"
                          >
                            Document {index + 1}
                          </Link>
                          <Button
                            type="button"
                            onClick={() => handleRemoveImage(preview.url, 'document')}
                            className="bg-slate-500 hover:bg-red-600 text-white rounded-full p-1 "
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Application Attributes */}
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-gray-900">
                    {t('sections.additionalInformation')}
                  </h2>
                  <Button
                    type="button"
                    onClick={handleAddPreference}
                    className="bg-[#3D6CB9] hover:bg-[#2F5A9E] text-white"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    {t('additionalInfo.addAttribute')}
                  </Button>
                </div>

                <p className="text-sm text-gray-600">{t('additionalInfo.description')}</p>

                {watch('applicationAttributes')?.map((preference, index) => (
                  <div key={index} className="border-2 border-gray-200 rounded-lg p-6 space-y-4">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold text-gray-900">
                        {t('additionalInfo.attributeNumber', { number: index + 1 })}
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

                    {/* Key & Value */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <CustomFormField
                        name={`applicationAttributes.${index}.key`}
                        label={t('additionalInfo.name')}
                        type="text"
                        placeholder={t('additionalInfo.namePlaceholder')}
                        isBorder={true}
                      />

                      <CustomFormField
                        name={`applicationAttributes.${index}.value`}
                        label={t('additionalInfo.value')}
                        type="text"
                        placeholder={t('additionalInfo.valuePlaceholder')}
                        isBorder={true}
                      />
                    </div>

                    {/* Note */}
                    <CustomFormField
                      name={`applicationAttributes.${index}.note`}
                      label={t('additionalInfo.note')}
                      type="textarea"
                      placeholder={t('additionalInfo.notePlaceholder')}
                      isBorder={true}
                    />
                  </div>
                ))}

                {(!watch('applicationAttributes') ||
                  watch('applicationAttributes')?.length === 0) && (
                  <p className="text-sm text-gray-500 italic">
                    {t('additionalInfo.noAttributesAdded')}
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <div className="w-full flex gap-4">
                <Button
                  type="submit"
                  className="w-full bg-[#3D6CB9] hover:bg-[#2F5A9E] text-white py-3 text-base font-semibold"
                  disabled={isLoading}
                >
                  {isLoading ? t('buttons.submitting') : t('buttons.saveApplication')}
                </Button>
              </div>
            </div>
          </form>
        </Form>

        {/* Application Name Dialog */}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>{t('dialog.title')}</DialogTitle>
              <DialogDescription>{t('dialog.description')}</DialogDescription>
            </DialogHeader>

            <div className="py-4">
              <input
                type="text"
                value={applicationName}
                onChange={(e) => setApplicationName(e.target.value)}
                placeholder={t('dialog.applicationNamePlaceholder')}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3D6CB9]"
                autoFocus
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && applicationName.trim()) {
                    handleComplete();
                  }
                }}
              />
            </div>

            <DialogFooter>
              <Button variant="custom" color="gray" onClick={() => setIsDialogOpen(false)}>
                {t('dialog.cancel')}
              </Button>
              <Button
                onClick={handleComplete}
                disabled={!applicationName.trim() || isLoading}
                className="bg-[#3D6CB9] hover:bg-[#2F5A9E] text-white"
                value={isLoading ? t('dialog.completing') : t('dialog.complete')}
              />
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    );
  }
);

ApplicationsForm.displayName = 'ApplicationsForm';

export default ApplicationsForm;
