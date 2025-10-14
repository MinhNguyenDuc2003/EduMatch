import React, { useState } from 'react';
import { formatDate } from '../utils';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/lib/cus/tooltip';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from '@/lib/cus/dialog';
import { Drawer, DrawerContent, DrawerTitle, DrawerTrigger } from '@/lib/cus/drawer';

interface HistoryCardProps {
  edu: {
    [key: string]: any;
  };
}

const HistoryDetail = ({ edu }: HistoryCardProps) => {
  return (
    <div className="space-y-2">
      <div className="font-semibold text-sm text-gray-900">{edu.institutionName}</div>
      <div className="text-xs text-gray-600 space-y-1">
        <div className="grid grid-cols-2 gap-2">
          <div>
            <span className="font-medium">Type:</span> {edu.institutionType}
          </div>
          <div>
            <span className="font-medium">Degree:</span> {edu.degreeType}
          </div>
          <div>
            <span className="font-medium">Major:</span> {edu.majorName}
          </div>
          <div>
            <span className="font-medium">Category:</span> {edu.majorCategory || 'N/A'}
          </div>
          <div>
            <span className="font-medium">GPA:</span> {edu.gpa}
          </div>
          <div>
            <span className="font-medium">Class Rank:</span> {edu.classRank || 'N/A'}
          </div>
          <div>
            <span className="font-medium">Class Size:</span> {edu.classSize || 'N/A'}
          </div>
          <div>
            <span className="font-medium">Graduation:</span> {edu.graduationYear}
          </div>
        </div>
        <div>
          <span className="font-medium">Location:</span> {edu.state}, {edu.country}
        </div>
        <div>
          <span className="font-medium">Enrollment:</span> {formatDate(edu.enrollmentStartDate)} -{' '}
          {formatDate(edu.enrollmentEndDate)}
        </div>
        <div className="flex gap-2 flex-wrap mt-2">
          {edu.isDualEnrolled && (
            <span className="inline-block px-2 py-0.5 bg-purple-100 text-purple-700 text-xs rounded">
              Dual Enrolled
            </span>
          )}
          {edu.isTransfer && (
            <span className="inline-block px-2 py-0.5 bg-blue-100 text-blue-700 text-xs rounded">
              Transfer
            </span>
          )}
          {edu.isReturningStudent && (
            <span className="inline-block px-2 py-0.5 bg-orange-100 text-orange-700 text-xs rounded">
              Returning
            </span>
          )}
        </div>
        {edu.notes && (
          <div className="mt-2 pt-2 border-t border-gray-200">
            <span className="font-medium">Notes:</span> {edu.notes}
          </div>
        )}
      </div>
    </div>
  );
};

const HistoryCard = ({ edu }: HistoryCardProps) => {
  const [open, setOpen] = useState(false);
  const isDesktop = useMediaQuery('(min-width: 768px)');

  const cardContent = (
    <div className="space-y-2 cursor-pointer">
      <div className="font-semibold text-sm text-gray-900">{edu.institutionName}</div>
      <div className="text-xs text-gray-600 space-y-1">
        <div className="flex items-center justify-between">
          <div>
            <span className="font-medium">Major:</span> {edu.majorName}
          </div>
          <div>
            <span className="font-medium">GPA:</span> {edu.gpa}
          </div>
        </div>
      </div>
    </div>
  );

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>{cardContent}</DialogTrigger>
        <DialogContent className="sm:max-w-[500px] bg-[#FAFAF6]">
          <DialogTitle>History Details</DialogTitle>
          <HistoryDetail edu={edu} />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>{cardContent}</DrawerTrigger>
      <DrawerContent className="bg-[#FAFAF6]">
        <DrawerTitle>History Details</DrawerTitle>
        <HistoryDetail edu={edu} />
      </DrawerContent>
    </Drawer>
  );
};

export default HistoryCard;
