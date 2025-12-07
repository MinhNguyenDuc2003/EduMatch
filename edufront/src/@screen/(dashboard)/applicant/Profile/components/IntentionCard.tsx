'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from '@/pattern/cus/dialog';
import { Drawer, DrawerContent, DrawerTitle, DrawerTrigger } from '@/pattern/cus/drawer';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import IntentionDetail from './IntentionDetail';

interface IntentionCardProps {
  intention: Intention;
}

const IntentionCard = ({ intention }: IntentionCardProps) => {
  const [open, setOpen] = useState(false);
  const isDesktop = useMediaQuery('(min-width: 768px)');

  const cardContent = (
    <div className="relative rounded-lg border border-[#828282] overflow-hidden bg-[#FAFAF6] shadow-sm hover:shadow-md transition-shadow cursor-pointer">
      {/* Blue gradient header */}
      <div className="h-10 relative">
        <Image
          src={'https://es5urvh1np.ufs.sh/f/DHR6tEJ9PQozNMvBTv3dbqnOiC9glzYQkty01LT7J5ecsEuv'}
          alt={'intention'}
          fill={true}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Intention details */}
      <div className="p-4 space-y-3">
        <h3 className="text-lg font-semibold text-gray-900">{intention.intendedInstitution}</h3>

        <div className="space-y-2 text-sm">
          <div className="flex">
            <span className="text-gray-500 font-medium w-32">Degree Type</span>
            <span className="text-gray-900">{intention.degreeType}</span>
          </div>

          <div className="flex">
            <span className="text-gray-500 font-medium w-32">Intended Major Category</span>
            <span className="text-gray-900">{intention.intendedMajorCategory}</span>
          </div>

          <div className="flex">
            <span className="text-gray-500 font-medium w-32">Intended Major Name</span>
            <span className="text-gray-900">{intention.intendedMajorName}</span>
          </div>
        </div>
      </div>
    </div>
  );

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>{cardContent}</DialogTrigger>
        <DialogContent className="sm:max-w-[550px] bg-[#FAFAF6]">
          <DialogTitle>Intention Details</DialogTitle>
          <div className="max-h-[70vh] overflow-y-auto">
            <IntentionDetail intention={intention} />
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>{cardContent}</DrawerTrigger>
      <DrawerContent className="bg-[#FAFAF6]">
        <DrawerTitle className="px-5">Intention Details</DrawerTitle>
        <div className="p-4 overflow-y-auto max-h-[80vh]">
          <IntentionDetail intention={intention} />
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default IntentionCard;
