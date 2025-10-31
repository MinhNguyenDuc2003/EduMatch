'use client';

import React, { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from '@/lib/cus/dialog';
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
} from '@/lib/cus/drawer';
import { Button } from '@/lib/cus/button';
import { CustomFormField } from '@/lib/cus/CustomFormField';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { Plus, Trash2, Calendar, GraduationCap } from 'lucide-react';
import { useFieldArray } from 'react-hook-form';
import { DEGREE_TYPES, INSTITUTION_TYPES, MAJOR_CATEGORIES, GRADUATION_YEARS } from '../constants';
import { IApplicantProfile } from '@/lib/schemas';

interface EducationHistoryDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: IApplicantProfile) => void;
  onCancel: () => void;
}

const EducationHistoryDialog = ({
  open,
  onOpenChange,
  onSubmit,
  onCancel,
}: EducationHistoryDialogProps) => {
  const isMobile = useMediaQuery('(max-width: 768px)');
  const { handleSubmit, control, watch } = useFormContext<IApplicantProfile>();

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'applicantProfile.educationHistories',
  });

  const handleFormSubmit = (data: IApplicantProfile) => {
    onSubmit(data);
    onOpenChange(false);
  };

  const handleCancel = () => {
    onCancel();
    onOpenChange(false);
  };

  const handleAddEducation = () => {
    append({
      institutionName: '',
      institutionType: '',
      state: '',
      country: '',
      degreeType: '',
      majorCategory: '',
      majorName: '',
      gpa: 0,
      classRank: '',
      classSize: 0,
      enrollmentStartDate: '',
      enrollmentEndDate: '',
      graduationYear: 0,
      isDualEnrolled: false,
      isTransfer: false,
      isReturningStudent: false,
      notes: '',
    });
  };

  const Content = () => (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-5">
        <div className="">
          <h3 className="text-lg font-semibold text-gray-900">
            Description of your educational background
          </h3>
          <p className="text-sm text-gray-600">
            Describe your educational background (you can add more educational background if you
            want)
          </p>
        </div>
        <Button
          type="button"
          variant="outline"
          onClick={handleAddEducation}
          className="flex items-center gap-2 text-primary-brand border-primary-brand hover:bg-primary-brand hover:text-white"
        >
          <Plus className="h-4 w-4" />
          Add Education
        </Button>
      </div>

      {/* Education History List */}
      <div className="space-y-6">
        {fields.map((field, index) => (
          <div
            key={field.id}
            className="border border-gray-200 rounded-lg p-6 space-y-6 bg-gray-50"
          >
            {/* Education Header */}
            <div className="flex items-center justify-between border-b pb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary-brand/10 flex items-center justify-center">
                  <GraduationCap className="h-5 w-5 text-primary-brand" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Education #{index + 1}</h4>
                  <p className="text-sm text-gray-600">Academic Institution</p>
                </div>
              </div>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => remove(index)}
                className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 border-red-500"
                title="Delete education"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>

            {/* Institution Information */}
            <div className="space-y-4">
              <h5 className="font-medium text-gray-900 flex items-center gap-2">
                <GraduationCap className="h-4 w-4" />
                Institution Information
              </h5>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <CustomFormField
                  name={`applicantProfile.educationHistories.${index}.institutionName`}
                  label="Institution Name"
                  placeholder="Enter institution name"
                  inlineLabel
                  isBorder
                />

                <CustomFormField
                  name={`applicantProfile.educationHistories.${index}.institutionType`}
                  label="Institution Type"
                  type="select"
                  placeholder="Select institution type"
                  options={INSTITUTION_TYPES}
                  inlineLabel
                  isBorder
                />

                <CustomFormField
                  name={`applicantProfile.educationHistories.${index}.state`}
                  label="State/Province"
                  placeholder="Enter state or province"
                  inlineLabel
                  isBorder
                />

                <CustomFormField
                  name={`applicantProfile.educationHistories.${index}.country`}
                  label="Country"
                  placeholder="Enter country"
                  inlineLabel
                  isBorder
                />
              </div>
            </div>

            {/* Academic Information */}
            <div className="space-y-4">
              <h5 className="font-medium text-gray-900 flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                Academic Information
              </h5>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <CustomFormField
                  name={`applicantProfile.educationHistories.${index}.degreeType`}
                  label="Degree Type"
                  type="select"
                  placeholder="Select degree type"
                  options={DEGREE_TYPES}
                  inlineLabel
                  isBorder
                />

                <CustomFormField
                  name={`applicantProfile.educationHistories.${index}.majorCategory`}
                  label="Major Category"
                  type="select"
                  placeholder="Select major category"
                  options={MAJOR_CATEGORIES}
                  inlineLabel
                  isBorder
                />

                <CustomFormField
                  name={`applicantProfile.educationHistories.${index}.majorName`}
                  label="Major Name"
                  placeholder="Enter major name"
                  inlineLabel
                  isBorder
                />

                <CustomFormField
                  name={`applicantProfile.educationHistories.${index}.gpa`}
                  label="GPA"
                  type="number"
                  placeholder="3.8"
                  inlineLabel
                  isBorder
                />

                <CustomFormField
                  name={`applicantProfile.educationHistories.${index}.classRank`}
                  label="Class Rank"
                  placeholder="e.g., 1st, 2nd, Top 10%"
                  inlineLabel
                  isBorder
                />

                <CustomFormField
                  name={`applicantProfile.educationHistories.${index}.classSize`}
                  label="Class Size"
                  type="number"
                  placeholder="200"
                  inlineLabel
                  isBorder
                />
              </div>
            </div>

            {/* Dates */}
            <div className="space-y-4">
              <h5 className="font-medium text-gray-900 flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                Enrollment Dates
              </h5>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <CustomFormField
                  name={`applicantProfile.educationHistories.${index}.enrollmentStartDate`}
                  label="Start Date"
                  type="date"
                  inlineLabel
                  isBorder
                />

                <CustomFormField
                  name={`applicantProfile.educationHistories.${index}.enrollmentEndDate`}
                  label="End Date"
                  type="date"
                  inlineLabel
                  isBorder
                />

                <CustomFormField
                  name={`applicantProfile.educationHistories.${index}.graduationYear`}
                  label="Graduation Year"
                  type="select"
                  placeholder="Select graduation year"
                  options={GRADUATION_YEARS}
                  inlineLabel
                  isBorder
                />
              </div>
            </div>

            {/* Additional Information */}
            <div className="space-y-4">
              <h5 className="font-medium text-gray-900">Additional Information</h5>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <CustomFormField
                  name={`applicantProfile.educationHistories.${index}.isDualEnrolled`}
                  label="Dual Enrolled"
                  type="switch"
                  inlineLabel
                  isBorder
                />

                <CustomFormField
                  name={`applicantProfile.educationHistories.${index}.isTransfer`}
                  label="Transfer Student"
                  type="switch"
                  inlineLabel
                  isBorder
                />

                <CustomFormField
                  name={`applicantProfile.educationHistories.${index}.isReturningStudent`}
                  label="Returning Student"
                  type="switch"
                  inlineLabel
                  isBorder
                />
              </div>

              <CustomFormField
                name={`applicantProfile.educationHistories.${index}.notes`}
                label="Notes"
                type="textarea"
                placeholder="Additional notes about this education..."
                inlineLabel
                isBorder
                className="md:col-span-2"
              />
            </div>
          </div>
        ))}

        {length === 0 && (
          <div className="text-center py-12 text-gray-500 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
            <GraduationCap className="h-12 w-12 mx-auto mb-4 text-gray-400" />
            <p className="text-lg font-medium mb-2">No education history added yet</p>
            <p className="text-sm mb-4">
              Click "Add Education" to get started with your academic background
            </p>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="border-t pt-6">
        <p className="text-sm text-gray-600 mb-4">
          By clicking 'Save', you confirm that the education information provided is accurate.
        </p>
      </div>
    </div>
  );

  const Footer = () => (
    <div className="flex flex-col sm:flex-row gap-2 sm:justify-end">
      <Button
        variant="outline"
        onClick={handleCancel}
        className="w-full sm:w-auto text-primary-brand px-10 py-2.5"
      >
        Cancel
      </Button>
      <Button
        type="submit"
        className="w-full sm:w-auto px-10 py-2.5"
        onClick={handleSubmit(handleFormSubmit)}
      >
        Save
      </Button>
    </div>
  );

  if (isMobile) {
    return (
      <Drawer open={open} onOpenChange={handleCancel}>
        <DrawerContent className="min-h-[95vh]">
          <DrawerHeader className="border-b">
            <DrawerTitle className="text-xl font-semibold text-primary-brand">
              Education History
            </DrawerTitle>
            <DrawerDescription className="sr-only" />
          </DrawerHeader>
          <div className="flex-1 overflow-y-auto p-6">
            <Content />
            <Footer />
          </div>
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <Dialog open={open} onOpenChange={handleCancel}>
      <DialogContent className="lg:min-w-6xl md:min-w-4xl min-w-2xl max-h-[90vh] flex flex-col gap-2.5 overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-primary-brand">
            Education History
          </DialogTitle>
          <DialogDescription className="sr-only" />
        </DialogHeader>
        <div className="flex-1 overflow-y-auto border-t p-2.5 border-[#828282]">
          <Content />
        </div>
        <DialogFooter>
          <Footer />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EducationHistoryDialog;
