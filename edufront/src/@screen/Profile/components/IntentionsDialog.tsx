'use client';

import React from 'react';
import { useFormContext, useFieldArray } from 'react-hook-form';
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
import { Plus, Trash2, GraduationCap, Calendar, MapPin } from 'lucide-react';
import { DEGREE_TYPES, MAJOR_CATEGORIES } from '../constants';
import { YEARS } from '@/constants/Common';
import { IApplicantProfile } from '@/lib/schemas';

interface IntentionsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: IApplicantProfile) => void;
  onCancel: () => void;
}

const IntentionsDialog = ({ open, onOpenChange, onSubmit, onCancel }: IntentionsDialogProps) => {
  const isMobile = useMediaQuery('(max-width: 768px)');
  const { handleSubmit, control } = useFormContext<IApplicantProfile>();

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'applicantProfile.intentions',
  });

  const handleFormSubmit = (data: IApplicantProfile) => {
    onSubmit(data);
    onOpenChange(false);
  };

  const handleCancel = () => {
    onCancel();
    onOpenChange(false);
  };

  const handleAddIntention = () => {
    append({
      intendedInstitution: '',
      intendedState: '',
      intendedCountry: '',
      degreeType: '',
      intendedMajorCategory: '',
      intendedMajorName: '',
      academicClassification: '',
      expectedStartDate: '',
      expectedGraduationYear: 0,
      isTransferStudent: false,
      isReturningStudent: false,
      notes: '',
    });
  };

  const Content = () => (
    <div className="space-y-6">
      <div className="flex items-center gap-5">
        <div className="">
          <h3 className="text-lg font-semibold text-gray-900">
            Describe your educational intentions
          </h3>
          <p className="text-sm text-gray-600">Add where and what you intend to study.</p>
        </div>
        <Button
          type="button"
          variant="outline"
          onClick={handleAddIntention}
          className="flex items-center gap-2 text-primary-brand border-primary-brand hover:bg-primary-brand hover:text-white"
        >
          <Plus className="h-4 w-4" />
          Add
        </Button>
      </div>

      <div className="space-y-6">
        {fields.map((field, index) => (
          <div
            key={field.id}
            className="border border-gray-200 rounded-lg p-6 space-y-6 bg-gray-50"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b pb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary-brand/10 flex items-center justify-center">
                  <GraduationCap className="h-5 w-5 text-primary-brand" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Intention #{index + 1}</h4>
                  <p className="text-sm text-gray-600">Planned institution and program</p>
                </div>
              </div>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => remove(index)}
                className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 border-red-500"
                title="Delete intention"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>

            {/* Institution & Location */}
            <div className="space-y-4">
              <h5 className="font-medium text-gray-900 flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                Institution & Location
              </h5>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <CustomFormField
                  name={`applicantProfile.intentions.${index}.intendedInstitution`}
                  label="Intended Institution"
                  placeholder="Enter institution name"
                  inlineLabel
                  isBorder
                />

                <CustomFormField
                  name={`applicantProfile.intentions.${index}.degreeType`}
                  label="Degree Type"
                  type="select"
                  placeholder="Select degree type"
                  options={DEGREE_TYPES}
                  inlineLabel
                  isBorder
                />

                <CustomFormField
                  name={`applicantProfile.intentions.${index}.intendedState`}
                  label="State/Province"
                  placeholder="Enter state or province"
                  inlineLabel
                  isBorder
                />

                <CustomFormField
                  name={`applicantProfile.intentions.${index}.intendedCountry`}
                  label="Country"
                  placeholder="Enter country"
                  inlineLabel
                  isBorder
                />
              </div>
            </div>

            {/* Academic Details */}
            <div className="space-y-4">
              <h5 className="font-medium text-gray-900 flex items-center gap-2">
                <GraduationCap className="h-4 w-4" />
                Academic Details
              </h5>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <CustomFormField
                  name={`applicantProfile.intentions.${index}.intendedMajorCategory`}
                  label="Major Category"
                  type="select"
                  placeholder="Select major category"
                  options={MAJOR_CATEGORIES}
                  inlineLabel
                  isBorder
                />

                <CustomFormField
                  name={`applicantProfile.intentions.${index}.intendedMajorName`}
                  label="Major Name"
                  placeholder="Enter major name"
                  inlineLabel
                  isBorder
                />

                <CustomFormField
                  name={`applicantProfile.intentions.${index}.academicClassification`}
                  label="Academic Classification"
                  placeholder="e.g., Freshman, Sophomore"
                  inlineLabel
                  isBorder
                />
              </div>
            </div>

            {/* Timeline */}
            <div className="space-y-4">
              <h5 className="font-medium text-gray-900 flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                Timeline
              </h5>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <CustomFormField
                  name={`applicantProfile.intentions.${index}.expectedStartDate`}
                  label="Expected Start Date"
                  type="date"
                  inlineLabel
                  isBorder
                />

                <CustomFormField
                  name={`applicantProfile.intentions.${index}.expectedGraduationYear`}
                  label="Expected Graduation Year"
                  type="select"
                  placeholder="Select graduation year"
                  options={YEARS}
                  inlineLabel
                  isBorder
                />
              </div>
            </div>

            {/* Additional */}
            <div className="space-y-4">
              <h5 className="font-medium text-gray-900">Additional Information</h5>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <CustomFormField
                  name={`applicantProfile.intentions.${index}.isTransferStudent`}
                  label="Transfer Student"
                  type="switch"
                  inlineLabel
                  isBorder
                />

                <CustomFormField
                  name={`applicantProfile.intentions.${index}.isReturningStudent`}
                  label="Returning Student"
                  type="switch"
                  inlineLabel
                  isBorder
                />
              </div>

              <CustomFormField
                name={`applicantProfile.intentions.${index}.notes`}
                label="Notes"
                type="textarea"
                placeholder="Additional notes about this intention..."
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
            <p className="text-lg font-medium mb-2">No intentions added yet</p>
            <p className="text-sm mb-4">Click "Add" to start adding your intentions</p>
          </div>
        )}
      </div>

      <div className="border-t pt-6">
        <p className="text-sm text-gray-600 mb-4">
          By clicking 'Save', you confirm that the information provided is accurate.
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
              Educational Intentions
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
            Educational Intentions
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

export default IntentionsDialog;
