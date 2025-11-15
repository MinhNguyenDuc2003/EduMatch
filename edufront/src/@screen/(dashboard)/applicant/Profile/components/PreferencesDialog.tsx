'use client';

import React from 'react';
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
import { Plus, Trash2 } from 'lucide-react';
import { useFieldArray } from 'react-hook-form';
import { IApplicantProfile } from '@/lib/schemas';

interface PreferencesDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: IApplicantProfile) => void;
  onCancel: () => void;
}

const PREFERENCE_TYPES = [
  { value: 'Location', label: 'Location' },
  { value: 'Institution Size', label: 'Institution Size' },
  { value: 'Major Focus', label: 'Major Focus' },
  { value: 'Campus Culture', label: 'Campus Culture' },
  { value: 'Career Services', label: 'Career Services' },
  { value: 'Research Opportunities', label: 'Research Opportunities' },
  { value: 'Cost', label: 'Cost' },
  { value: 'Financial Aid', label: 'Financial Aid' },
  { value: 'Diversity', label: 'Diversity' },
  { value: 'Athletics', label: 'Athletics' },
  { value: 'Other', label: 'Other' },
];

const PreferencesDialog = ({ open, onOpenChange, onSubmit, onCancel }: PreferencesDialogProps) => {
  const isMobile = useMediaQuery('(max-width: 768px)');
  const { handleSubmit, control, watch } = useFormContext<IApplicantProfile>();

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'applicantProfile.applicantPreferences',
  });

  const handleFormSubmit = (data: IApplicantProfile) => {
    onSubmit(data);
    onOpenChange(false);
  };

  const handleCancel = () => {
    onCancel();
    onOpenChange(false);
  };

  const handleAddPreference = () => {
    append({
      type: '',
      value: '',
      weight: 0,
      note: '',
    });
  };

  const Content = () => (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-5">
        <div className="">
          <h3 className="text-lg font-semibold text-gray-900">Your Preferences</h3>
          <p className="text-sm text-gray-600 ">
            Define what's important to you in your education journey (add multiple preferences)
          </p>
        </div>
        <Button
          type="button"
          variant="outline"
          onClick={handleAddPreference}
          className="flex items-center gap-2 text-primary-brand border-primary-brand hover:bg-primary-brand hover:text-white"
        >
          <Plus className="h-4 w-4" />
          Add
        </Button>
      </div>

      {/* Preferences List */}
      <div className="space-y-4">
        {fields.map((field, index) => {
          const weight = watch(`applicantProfile.applicantPreferences.${index}.weight`) || 5;
          const weightPercentage = (weight / 10) * 100;

          return (
            <div
              key={field.id}
              className="flex justify-center items-center border border-gray-200 rounded-lg p-4 space-y-4 gap-5"
            >
              <div className="flex items-center justify-center">
                <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center text-sm font-medium text-gray-600 border border-gray-700">
                  {index + 1}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-10 gap-4 flex-1">
                <CustomFormField
                  name={`applicantProfile.applicantPreferences.${index}.type`}
                  label="Preference Type"
                  type="select"
                  placeholder="Select type"
                  options={PREFERENCE_TYPES}
                  inlineLabel
                  isBorder
                  className="md:col-span-5"
                />

                <CustomFormField
                  name={`applicantProfile.applicantPreferences.${index}.value`}
                  label="Preference Value"
                  placeholder="e.g., Urban, Medium, Computer Science"
                  inlineLabel
                  isBorder
                  className="md:col-span-4"
                />

                <div className="flex items-center gap-2 md:col-span-1">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => remove(index)}
                    className="p-2 h-full w-full text-red-500 hover:text-red-700 hover:bg-red-50 md:col-span-1 border-red-500"
                    title="Delete preference"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>

                {/* Weight Slider */}
                <div className="md:col-span-10 space-y-2">
                  <CustomFormField
                    name={`applicantProfile.applicantPreferences.${index}.weight`}
                    label="Weight"
                    type="range"
                    placeholder="Enter weight (0-1)"
                    min={0}
                    max={1}
                    step={0.1}
                    className="w-full"
                  />
                </div>

                {/* Note */}
                <CustomFormField
                  name={`applicantProfile.applicantPreferences.${index}.note`}
                  label="Note (Optional)"
                  type="textarea"
                  placeholder="Add additional details about this preference"
                  inlineLabel
                  isBorder
                  className="md:col-span-10"
                />
              </div>
            </div>
          );
        })}

        {fields.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            <p>No preferences added yet. Click "Add" to get started.</p>
          </div>
        )}
      </div>

      {/* Footer */}
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
              Applicant Preferences
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
            Applicant Preferences
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

export default PreferencesDialog;
