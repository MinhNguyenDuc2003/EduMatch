import React from 'react';
import { GraduationCap, MapPin, Star, Building2, Bookmark } from 'lucide-react';
import FooterCard from './FooterCard';
import { Anchor, Block, Card, RText, Section } from '@/lib/by/Div';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import { sStore } from '@/stores';
import Amount_Deadline from './Amount_Deadline';
type CardScholarshipProps = {
  className?: string;
  picture?: string;
  title?: string;
  amount?: number;
  deadline?: string;
  description?: string;
  tagName?: string[];
  onClick?: () => void;
  onViewDetails?: () => void;
  icon?: React.ReactNode;
  titleButton?: string;
  university?: string;
  study_level?: string;
  scholarship_type?: string;
  gpa_requirement?: number;
  country?: string;
};

export default function CardSmalPic({
  className,
  picture,
  title,
  amount,
  deadline,
  description,
  tagName,
  onClick,
  onViewDetails,
  titleButton,
  icon,
  university,
  study_level,
  scholarship_type,
  gpa_requirement,
  country,
}: CardScholarshipProps) {
  const ss = sStore();

  return (
    <Section
      className={cn(
        'bg-white flex flex-col rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200 hover:border-blue-300 relative',
        className
      )}
    >
      {/* Save Icon - Top Right */}
      <button
        className="absolute top-3 right-3 z-10 p-2 rounded-full bg-white/80 hover:bg-white shadow-sm hover:shadow-md transition-all duration-200 group"
        onClick={(e) => {
          e.stopPropagation();
          // Add save functionality here
        }}
      >
        <Bookmark className="w-5 h-5 text-gray-400 group-hover:text-blue-600 group-hover:fill-blue-600 transition-colors" />
      </button>

      <Anchor className="flex flex-col p-4 flex-1 space-y-3">
        {/* Header with University Logo and Title */}
        <Block className="flex gap-3 items-start pr-8">
          <Card className="flex-shrink-0">
            {picture ? (
              <Image
                src={picture ?? '/default-avatar.png'}
                alt={title ?? ''}
                width={40}
                height={40}
                className="rounded-lg"
              />
            ) : (
              <Card className="bg-gradient-to-br from-blue-500 to-purple-600 size-10 rounded-lg flex items-center justify-center">
                <Building2 className="w-5 h-5 text-white" />
              </Card>
            )}
          </Card>
          <Card className="flex-1 min-w-0">
            <RText className="text-base font-semibold text-gray-900 leading-tight mb-1">
              {title}
            </RText>
            <RText className="text-sm text-gray-600">{university}</RText>
          </Card>
        </Block>

        {/* Description - Fixed height */}
        <Block className="text-gray-600 text-sm leading-relaxed min-h-[40px]">
          <p className="line-clamp-2">{description}</p>
        </Block>

        {/* Info Row - Fixed height */}
        <Block className="min-h-[48px]">
          <Block className="flex items-center gap-4 text-xs text-gray-600">
            {country && (
              <span className="flex items-center gap-1">
                <MapPin className="w-3 h-3" />
                {country}
              </span>
            )}
            {study_level && (
              <span className="flex items-center gap-1">
                <GraduationCap className="w-3 h-3" />
                {study_level}
              </span>
            )}
          </Block>
          {gpa_requirement && (
            <Block className="flex items-center gap-1 text-xs text-gray-600 mt-1">
              <Star className="w-3 h-3" />
              <span>GPA {gpa_requirement}+</span>
            </Block>
          )}
        </Block>

        {/* Amount and Deadline */}
        <Amount_Deadline
          amount={amount ? amount.toString() : '0'}
          deadline={deadline ? new Date(deadline).getTime() : 0}
          isRow={true}
        />
      </Anchor>

      <FooterCard
        onClick={() => onClick?.()}
        titleButton={titleButton ?? ''}
        onViewDetails={onViewDetails}
      />
    </Section>
  );
}
