'use client';

import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/lib/cus/carousel';
import { cn } from '@/lib/utils';
import React, { useEffect, useState } from 'react';
import {
  ScholarshipCard,
  ScholarshipCardSkeleton,
} from '../../ProviderScholaship/components/ScholarshipCard';

interface ScholarshipCarouselProps {
  value?: number | null;
  isLoading?: boolean;
  onSelectAction: (scholarship: Scholarship | null) => void;
  scholarships: Scholarship[];
  ItemClassName?: string;
}

const ScholarshipCarousel = ({
  value,
  isLoading,
  onSelectAction,
  scholarships,
  ItemClassName,
}: ScholarshipCarouselProps) => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!api) return;

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on('select', () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  return (
    <div className="relative w-full">
      <div
        className={cn(
          'absolute left-0 top-0 bottom-0 w-12 z-10 bg-gradient-to-r from-white to-transparent pointer-events-none',
          current === 1 && 'hidden'
        )}
      />

      <Carousel setApi={setApi} opts={{ align: 'start', dragFree: true }} className="w-full">
        <CarouselContent>
          {isLoading &&
            Array.from({ length: 10 }).map((_, index) => (
              <CarouselItem key={index}>
                <ScholarshipCardSkeleton variant="small" className="bg-white" />
              </CarouselItem>
            ))}
          {!isLoading &&
            scholarships.map((scholarship) => (
              <CarouselItem
                key={scholarship.id}
                className={cn('basis-auto', ItemClassName)}
                onClick={() => onSelectAction(value === scholarship.id ? null : scholarship)} // Selected again will remove the selection
              >
                <ScholarshipCard
                  scholarship={scholarship}
                  variant="small"
                  className={cn(
                    'w-full text-left border-2 transition-all hover:shadow-md',
                    value === scholarship.id
                      ? 'border-primary-brand bg-primary-light shadow-sm'
                      : 'border-gray-200 hover:border-gray-300 bg-white'
                  )}
                />
              </CarouselItem>
            ))}
        </CarouselContent>
        {/* <CarouselPrevious className="right-0 z-20" />
        <CarouselNext className="left-0 z-20" /> */}
      </Carousel>

      {/* Right fade  */}
      <div
        className={cn(
          'absolute right-0 top-0 bottom-0 w-12 z-10 bg-gradient-to-l from-white to-transparent pointer-events-none',
          current === count && 'hidden'
        )}
      />
    </div>
  );
};

export default ScholarshipCarousel;
