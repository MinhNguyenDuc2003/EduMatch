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
import { IProfileForm } from '@/lib/schemas';
import { Country, StateOrProvince, District } from '@/@screen/Profile/types';
import religions from '@/constants/religions.json';
import ethnicities from '@/constants/ethnicities.json';
import races from '@/constants/races.json';
import citizenshipStatus from '@/constants/citizenshipStatus.json';

interface StudentInformationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: IProfileForm) => void;
  onCancel: () => void;
  countries?: Country[];
  statesOrProvinces?: StateOrProvince[];
  districts?: District[];
}

const StudentInformationDialog: React.FC<StudentInformationDialogProps> = ({
  open,
  onOpenChange,
  onSubmit,
  onCancel,
  countries,
  statesOrProvinces,
  districts,
}) => {
  const isMobile = useMediaQuery('(max-width: 768px)');
  const { handleSubmit, watch } = useFormContext<IProfileForm>();

  const handleFormSubmit = (data: IProfileForm) => {
    onSubmit(data);
    onOpenChange(false);
  };

  const handleCancel = () => {
    onCancel();
    onOpenChange(false);
  };

  const Content = () => (
    <div className="space-y-6">
      {/* I. Personal Section */}
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">I. Personal</h3>
          <p className="text-sm text-gray-600 mb-4">
            Provide your personal details and academic background to help us understand your
            qualifications.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Full Name */}
          <CustomFormField
            name="Fields.applicantProfile.firstName"
            label="First Name"
            placeholder="First Name"
            inlineLabel
            isBorder
          />

          <CustomFormField
            name="Fields.applicantProfile.lastName"
            label="Last Name"
            placeholder="Last Name"
            inlineLabel
            isBorder
          />

          <CustomFormField
            name="Fields.applicantProfile.contactName"
            label="Contact Name"
            placeholder="Add Info"
            inlineLabel
            isBorder
          />

          <CustomFormField
            name="Fields.applicantProfile.religion"
            label="Religion"
            type="select"
            placeholder="Select Religion"
            options={religions}
            inlineLabel
            isBorder
          />

          <CustomFormField
            name="Fields.applicantProfile.overallGpa"
            label="Overall GPA"
            type="number"
            placeholder="3.8"
            inlineLabel
            isBorder
          />

          <CustomFormField
            name="Fields.applicantProfile.ethnicity"
            label="Ethnicity"
            type="select"
            placeholder="Select Ethnicity"
            options={ethnicities}
            inlineLabel
            isBorder
          />

          <CustomFormField
            name="Fields.applicantProfile.race"
            label="Race"
            type="select"
            placeholder="Select Race"
            options={races}
            inlineLabel
            isBorder
          />

          <CustomFormField
            name="Fields.applicantProfile.hometown"
            label="Hometown"
            placeholder="Add Info"
            inlineLabel
            isBorder
          />

          <CustomFormField
            name="Fields.applicantProfile.citizenshipStatus"
            label="Citizenship Status"
            type="select"
            placeholder="Select Citizenship Status"
            options={citizenshipStatus}
            inlineLabel
            isBorder
          />

          <CustomFormField
            name="Fields.applicantProfile.disabilities"
            label="Disabilities"
            placeholder="Add Info"
            inlineLabel
            isBorder
          />

          <CustomFormField
            name="Fields.applicantProfile.medicalConditions"
            label="Medical Conditions"
            placeholder="Add Info"
            inlineLabel
            isBorder
          />
          <CustomFormField
            name="Fields.applicantProfile.militaryFamilyHistory"
            label="Military Family History"
            type="switch"
            className="mb-4 "
            inlineLabel
            isBorder
          />
        </div>
      </div>

      {/* II. Address Section */}
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">II. Address</h3>
          <p className="text-sm text-gray-600 mb-4">
            Provide your address information for contact and correspondence purposes.
          </p>
        </div>

        {/* Address Information */}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <CustomFormField
            name="Fields.addressPostVm.contactName"
            label="Contact Name"
            placeholder="Contact Name"
            labelClassName="w-32 flex-shrink-0"
            inlineLabel
            isBorder
          />

          <CustomFormField
            name="Fields.addressPostVm.phone"
            label="Phone"
            placeholder="Phone Number"
            labelClassName="w-32 flex-shrink-0"
            inlineLabel
            isBorder
          />

          <CustomFormField
            name="Fields.addressPostVm.addressLine1"
            label="Address Line 1"
            placeholder="Street Address"
            labelClassName="w-32 flex-shrink-0"
            inlineLabel
            isBorder
          />

          <CustomFormField
            name="Fields.addressPostVm.addressLine2"
            label="Address Line 2"
            placeholder="Apartment, Suite, etc. (Optional)"
            labelClassName="w-32 flex-shrink-0"
            inlineLabel
            isBorder
          />

          <CustomFormField
            name="Fields.addressPostVm.city"
            label="City"
            placeholder="City"
            labelClassName="w-32 flex-shrink-0"
            inlineLabel
            isBorder
          />

          <CustomFormField
            name="Fields.addressPostVm.zipCode"
            label="Zip Code"
            placeholder="Zip Code"
            labelClassName="w-32 flex-shrink-0"
            inlineLabel
            isBorder
          />

          <CustomFormField
            name="Fields.addressPostVm.countryId"
            label="Country"
            type="select"
            placeholder="Select Country"
            options={
              countries?.map((country) => ({
                value: country.id,
                label: country.name,
              })) || []
            }
            labelClassName="w-32 flex-shrink-0"
            inlineLabel
            isBorder
          />

          {watch('Fields.addressPostVm.countryId') > 0 && (
            <CustomFormField
              name="Fields.addressPostVm.stateOrProvinceId"
              label="State/Province"
              placeholder="Select State/Province"
              type="select"
              labelClassName="w-32 flex-shrink-0"
              options={
                statesOrProvinces?.map((state) => ({
                  value: state.id,
                  label: state.name,
                })) || []
              }
              inlineLabel
              isBorder
            />
          )}
          {watch('Fields.addressPostVm.stateOrProvinceId') > 0 && (
            <CustomFormField
              name="Fields.addressPostVm.districtId"
              label="District"
              type="select"
              placeholder="Select District"
              labelClassName="w-32 flex-shrink-0"
              options={
                districts?.map((district) => ({
                  value: district.id,
                  label: district.name,
                })) || []
              }
              inlineLabel
              isBorder
            />
          )}
        </div>
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
              Student Information
            </DrawerTitle>
            <DrawerDescription className="sr-only" />
          </DrawerHeader>
          <div className="flex-1 overflow-y-auto p-6">
            <Content />
            <Footer />
          </div>
          {/* <DrawerFooter className="border-t"></DrawerFooter> */}
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <Dialog open={open} onOpenChange={handleCancel}>
      <DialogContent className="lg:min-w-6xl md:min-w-4xl min-w-2xl max-h-[90vh] flex flex-col gap-2.5 overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-primary-brand">
            Student Information
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

export default StudentInformationDialog;
