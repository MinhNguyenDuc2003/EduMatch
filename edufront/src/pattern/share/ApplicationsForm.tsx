import { DEFAULT_APPLICATION_FORM_VALUES } from '@/constants/DefaultValues';
import { COUNTRIES, GENDER_OPTIONS, MAJOR_NAMES, STUDY_LEVELS, YEARS } from '@/constants/Common';
import { Button } from '@/lib/cus/button';
import { CustomFormField } from '@/lib/cus/CustomFormField';
import { Form } from '@/lib/cus/form';
import { applicationSchema, IApplication } from '@/lib/schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { ImageIcon, Plus, Trash2, X } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';
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

interface ApplicationsFormProps {
  application?: Application;
  onSubmit: (data: IApplication) => void;
  onImagesChange?: (images: File[]) => void;
  onDeleteImage?: (imageId: number) => void;
  isLoading?: boolean;
}

const ApplicationsForm = ({
  application,
  onSubmit,
  onImagesChange,
  onDeleteImage,
  isLoading,
}: ApplicationsFormProps) => {
  const [uploadedImages, setUploadedImages] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<Array<{ url: string; id?: number }>>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [applicationName, setApplicationName] = useState('');

  const methods = useForm<IApplication>({
    reValidateMode: 'onSubmit',
    mode: 'onChange',
    resolver: zodResolver(applicationSchema),
    defaultValues: DEFAULT_APPLICATION_FORM_VALUES,
  });

  const { watch, setValue } = methods;

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

  // Load initial images from scholarship
  useEffect(() => {
    if (application?.applicationMedias && application.applicationMedias.length > 0) {
      const initialImages = application.applicationMedias.map((media) => ({
        url: media.url,
        id: media.id,
      }));
      setImagePreviews(initialImages);

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
        Application Form
      </div>

      {/* Guidelines Section */}
      <div className="flex flex-col">
        <p className="text-sm text-gray-800 font-medium">
          To ensure your scholarship application is as strong as possible, please keep these
          important points in mind before you finalize and submit:
        </p>
        <ul className="text-sm text-gray-700 list-disc">
          <li className="ml-6">
            Accuracy and Completeness: Double-check that all the information you've provided is
            accurate and complete. Incomplete or inaccurate details can lead to delays or
            disqualification.
          </li>
          <li className="ml-6">
            Required Documents: Make sure you have gathered and uploaded all necessary supporting
            documents as specified. Ensure they are in the correct format and clearly legible.
          </li>
          <li className="ml-6">
            Proofread Thoroughly: Before hitting submit, proofread your entire application for any
            spelling or grammatical errors. A polished application demonstrates attention to detail.
          </li>
          <li className="ml-6">
            Adhere to Deadlines: Be mindful of the submission deadline. Late applications are
            typically not considered.
          </li>
          <li className="ml-6">
            Follow Instructions Precisely: Carefully review and follow all instructions provided for
            the application form and any accompanying materials.
          </li>
        </ul>
      </div>

      <Form {...methods}>
        <form onSubmit={methods.handleSubmit(handleFormSubmit)}>
          <div className="space-y-8">
            {/* Personal Information */}
            <div className="space-y-6">
              <h2 className="text-lg font-semibold text-gray-900">Personal Information</h2>

              {/* Full Name */}
              <CustomFormField
                name="fullName"
                label="Full Name *"
                type="text"
                placeholder="Enter your full name"
                isBorder={true}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Gender */}
                <CustomFormField
                  name="gender"
                  label="Gender *"
                  type="select"
                  placeholder="Select gender"
                  options={GENDER_OPTIONS}
                  initialValue={application?.gender}
                  isBorder={true}
                />

                {/* Date of Birth */}
                <CustomFormField
                  name="dateOfBirth"
                  label="Date of Birth *"
                  type="date-of-birth"
                  placeholder="Select date of birth"
                  isBorder={true}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Email */}
                <CustomFormField
                  name="email"
                  label="Email *"
                  type="email"
                  placeholder="Enter your email address"
                  isBorder={true}
                />

                {/* Phone */}
                <CustomFormField
                  name="phone"
                  label="Phone Number *"
                  type="text"
                  placeholder="Enter your phone number"
                  isBorder={true}
                />
              </div>

              {/* Address */}
              <CustomFormField
                name="address"
                label="Address *"
                type="text"
                placeholder="Enter your address"
                isBorder={true}
              />

              {/* Nationality */}
              <CustomFormField
                name="nationality"
                label="Nationality *"
                type="input-select"
                placeholder="Select nationality"
                options={COUNTRIES}
                initialValue={application?.nationality}
                isBorder={true}
              />
            </div>

            {/* Educational Background */}
            <div className="space-y-6">
              <h2 className="text-lg font-semibold text-gray-900">Educational Background</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Education Level */}
                <CustomFormField
                  name="educationLevel"
                  label="Education Level *"
                  type="select"
                  placeholder="Select education level"
                  options={STUDY_LEVELS}
                  initialValue={application?.educationLevel}
                  isBorder={true}
                />

                {/* School Name */}
                <CustomFormField
                  name="schoolName"
                  label="School Name *"
                  type="text"
                  placeholder="Enter your school name"
                  isBorder={true}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Major */}
                <CustomFormField
                  name="major"
                  type="input-select"
                  label="Major *"
                  placeholder="Select your major"
                  options={MAJOR_NAMES}
                  initialValue={application?.major}
                  isBorder={true}
                />

                {/* GPA */}
                <CustomFormField
                  name="gpa"
                  label="GPA *"
                  type="range"
                  placeholder="Enter your GPA (0-4 scale)"
                  isBorder={true}
                  min={0}
                  max={4}
                  step={0.1}
                />
              </div>

              {/* Graduation Year */}
              <CustomFormField
                name="graduationYear"
                label="Graduation Year *"
                type="select"
                placeholder="Select graduation year"
                options={YEARS.map((year) => ({ value: String(year.value), label: year.label }))}
                initialValue={application?.graduationYear}
                isBorder={true}
              />
            </div>

            {/* Skills & Achievements */}
            <div className="space-y-6">
              <h2 className="text-lg font-semibold text-gray-900">Skills & Achievements</h2>

              {/* Skills */}
              <CustomFormField
                name="skills"
                label="Skills *"
                type="textarea"
                placeholder="List your skills (e.g., Programming, Leadership, Communication)"
                isBorder={true}
              />

              {/* Achievements */}
              <CustomFormField
                name="achievements"
                label="Achievements *"
                type="textarea"
                placeholder="Describe your achievements, awards, and recognitions"
                isBorder={true}
              />

              {/* Extracurricular Activities */}
              <CustomFormField
                name="extracurricular"
                label="Extracurricular Activities *"
                type="textarea"
                placeholder="Describe your extracurricular activities, clubs, sports, volunteer work, etc."
                isBorder={true}
              />
            </div>

            {/* Motivation & Personal Statement */}
            <div className="space-y-6">
              <h2 className="text-lg font-semibold text-gray-900">
                Motivation & Personal Statement
              </h2>

              {/* Motivation */}
              <CustomFormField
                name="motivation"
                label="Motivation *"
                type="textarea"
                placeholder="Explain why you are applying for this scholarship and what motivates you"
                isBorder={true}
              />

              {/* Personal Statement */}
              <CustomFormField
                name="personalStatement"
                label="Personal Statement *"
                type="textarea"
                placeholder="Write a personal statement about yourself, your goals, and how this scholarship will help you achieve them"
                isBorder={true}
              />
            </div>

            {/* Images Upload */}
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold text-gray-900">Images</h2>
              <p className="text-sm text-gray-600">
                Upload images related to this application (e.g., university photos, event photos)
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
                        key={index}
                        className="relative group aspect-video rounded-lg overflow-hidden border-2 border-gray-200"
                      >
                        <Image
                          src={preview.url}
                          alt={`Application image ${index + 1}`}
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
                  <p className="text-sm text-gray-500 italic">No images uploaded yet.</p>
                )}
              </div>
            </div>

            {/* Application Attributes */}
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-900">Additional Information</h2>
                <Button
                  type="button"
                  onClick={handleAddPreference}
                  className="bg-[#3D6CB9] hover:bg-[#2F5A9E] text-white"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Attribute
                </Button>
              </div>

              <p className="text-sm text-gray-600">
                Add any additional information or attributes relevant to your application
              </p>

              {watch('applicationAttributes')?.map((preference, index) => (
                <div key={index} className="border-2 border-gray-200 rounded-lg p-6 space-y-4">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">Attribute {index + 1}</h3>

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
                      label="Name *"
                      type="text"
                      placeholder="e.g., Language Proficiency, Certification"
                      isBorder={true}
                    />

                    <CustomFormField
                      name={`applicationAttributes.${index}.value`}
                      label="Value *"
                      type="text"
                      placeholder="e.g., IELTS 7.5, AWS Certified"
                      isBorder={true}
                    />
                  </div>

                  {/* Note */}
                  <CustomFormField
                    name={`applicationAttributes.${index}.note`}
                    label="Note"
                    type="textarea"
                    placeholder="Additional notes (optional)"
                    isBorder={true}
                  />
                </div>
              ))}

              {(!watch('applicationAttributes') ||
                watch('applicationAttributes')?.length === 0) && (
                <p className="text-sm text-gray-500 italic">
                  No attributes added yet. Click "Add Attribute" to add one.
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
                {isLoading ? 'Submitting...' : 'Save Application'}
              </Button>
            </div>
          </div>
        </form>
      </Form>

      {/* Application Name Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Complete Application</DialogTitle>
            <DialogDescription>Please enter a name to complete the application.</DialogDescription>
          </DialogHeader>

          <div className="py-4">
            <input
              type="text"
              value={applicationName}
              onChange={(e) => setApplicationName(e.target.value)}
              placeholder="Application Name"
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
              Cancel
            </Button>
            <Button
              onClick={handleComplete}
              disabled={!applicationName.trim() || isLoading}
              className="bg-[#3D6CB9] hover:bg-[#2F5A9E] text-white"
              value={isLoading ? 'Completing...' : 'Complete'}
            />
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ApplicationsForm;
