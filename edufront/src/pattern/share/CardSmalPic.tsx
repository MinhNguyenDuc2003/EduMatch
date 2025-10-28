import useTranslate from '@/hooks/useTranslate';
import { Anchor, Block, Card, RText, Section } from '@/lib/by/Div';
import { Button } from '@/lib/cus/button';
import { cn } from '@/lib/utils';
import { sStore } from '@/stores';
import { isBoolean, isEqual, map } from 'lodash';
import { StaticImport } from 'next/dist/shared/lib/get-img-props';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React from 'react';
import {
  GraduationCap,
  MapPin,
  Award,
  Star,
  Calendar,
  DollarSign,
  Building2,
  BookOpen,
} from 'lucide-react';
import Amount_Deadline from './Amount_Deadline';
import FooterCard from './FooterCard';
type CardScholarshipProps = {
  className?: string;
  picture?: string | StaticImport;
  title?: string;
  amount?: number;
  deadline?: string;
  description?: string;
  tagName?: string[];
  onClick?: () => void;
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
  titleButton,
  icon,
  university,
  study_level,
  scholarship_type,
  gpa_requirement,
  country,
}: CardScholarshipProps) {
  const ss = sStore();

  const getScholarshipTypeColor = (type?: string) => {
    switch (type?.toLowerCase()) {
      case 'full':
        return 'bg-green-50 text-green-700 border-green-200';
      case 'partial':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'merit':
        return 'bg-purple-50 text-purple-700 border-purple-200';
      default:
        return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  const getStudyLevelIcon = (level?: string) => {
    switch (level?.toLowerCase()) {
      case 'bachelor':
        return <GraduationCap className="w-3 h-3" />;
      case 'master':
        return <BookOpen className="w-3 h-3" />;
      case 'phd':
        return <Award className="w-3 h-3" />;
      default:
        return <GraduationCap className="w-3 h-3" />;
    }
  };

  return (
    <Section
      className={cn(
        'bg-white flex flex-col rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200 hover:border-blue-300',
        className
      )}
    >
      <Anchor className="flex flex-col p-4 flex-1 space-y-3">
        {/* Header with University Logo and Title */}
        <Block className="flex gap-3 items-start">
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

        {/* Description */}
        <Block className="text-gray-600 text-sm leading-relaxed">
          <p className="line-clamp-2">{description}</p>
        </Block>

        {/* Info Row */}
        <Block className="space-y-2">
          {/* Location and Study Level */}
          <Block className="flex items-center gap-4 text-xs text-gray-600">
            {country && (
              <span className="flex items-center gap-1">
                <MapPin className="w-3 h-3" />
                {country}
              </span>
            )}
            {study_level && (
              <span className="flex items-center gap-1">
                {getStudyLevelIcon(study_level)}
                {study_level}
              </span>
            )}
          </Block>

          {/* GPA Requirement */}
          {gpa_requirement && (
            <Block className="flex items-center gap-1 text-xs text-gray-600">
              <Star className="w-3 h-3" />
              <span>GPA {gpa_requirement}+</span>
            </Block>
          )}
        </Block>

        {/* Tags */}
        <Block className="flex flex-wrap gap-1">
          {scholarship_type && (
            <span
              className={cn(
                'inline-flex items-center px-2 py-1 rounded-md text-xs font-medium border',
                getScholarshipTypeColor(scholarship_type)
              )}
            >
              {scholarship_type}
            </span>
          )}
        </Block>

        {/* Amount and Deadline */}
        <Amount_Deadline amount={amount ?? 0} deadline={deadline ?? ''} isRow={true} />
      </Anchor>

      <FooterCard onClick={() => onClick?.()} titleButton={titleButton ?? ''} />
    </Section>
  );
}
