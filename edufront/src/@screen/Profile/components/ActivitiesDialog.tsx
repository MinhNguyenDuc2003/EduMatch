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
import {
  FAVORITE_ACTIVITIES,
  SPORTS_PARTICIPATED,
  STUDENT_ACTIVITIES,
  ORGANIZATIONS_JOINED,
  RESEARCH_EXPERIENCE,
  CAREER_GOALS,
} from '@/@screen/Profile/constants';
import { IApplicantProfile } from '@/lib/schemas';

interface ActivitiesDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: IApplicantProfile) => void;
  onCancel: () => void;
}

const ActivitiesDialog = ({ open, onOpenChange, onSubmit, onCancel }: ActivitiesDialogProps) => {
  const isMobile = useMediaQuery('(max-width: 768px)');
  const { handleSubmit } = useFormContext<IApplicantProfile>();

  const handleFormSubmit = (data: IApplicantProfile) => {
    onSubmit(data);
    onOpenChange(false);
  };

  const handleCancel = () => {
    onCancel();
    onOpenChange(false);
  };

  const Content = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900">Interests & Activities</h3>
        <p className="text-sm text-gray-600">
          Add your interests and activities. You can input multiple items for each field.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <CustomFormField
          name="applicantProfile.favoriteActivities"
          label="Favorite Activities"
          type="multi-select"
          placeholder="e.g., Piano, Painting, Theater"
          options={FAVORITE_ACTIVITIES}
          labelClassName="w-40"
          inlineLabel
          isBorder
        />

        <CustomFormField
          name="applicantProfile.sportsParticipated"
          label="Sports Participated"
          type="multi-select"
          placeholder="e.g., Soccer, Basketball"
          options={SPORTS_PARTICIPATED}
          inlineLabel
          isBorder
        />

        <CustomFormField
          name="applicantProfile.studentActivities"
          label="Student Activities"
          type="multi-select"
          placeholder="e.g., Debate Club, Student Council"
          options={STUDENT_ACTIVITIES}
          inlineLabel
          isBorder
        />

        <CustomFormField
          name="applicantProfile.organizationsJoined"
          label="Organizations Joined"
          type="multi-select"
          placeholder="e.g., Red Cross, Coding Club"
          options={ORGANIZATIONS_JOINED}
          inlineLabel
          isBorder
        />

        <CustomFormField
          name="applicantProfile.researchExperience"
          label="Research Experience"
          type="multi-select"
          placeholder="e.g., AI Lab, Biology Research"
          options={RESEARCH_EXPERIENCE}
          inlineLabel
          isBorder
        />

        <CustomFormField
          name="applicantProfile.careerGoals"
          label="Career Goals"
          type="multi-select"
          placeholder="e.g., Software Engineer, Doctor"
          options={CAREER_GOALS}
          inlineLabel
          isBorder
        />
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
              Interests & Activities
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
            Interests & Activities
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

export default ActivitiesDialog;
