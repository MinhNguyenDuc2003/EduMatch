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
}: CardScholarshipProps) {
  const ss = sStore();
  const router = useRouter();
  const { translate, translated, loading, error } = useTranslate();
  const locale = ss.Auth?.Locale;

  return (
    <Section
      className={cn(
        'bg-[#FAFAF6] flex flex-col rounded-2xl border border-solid border-[#D9D9D9]',
        className
      )}
    >
      <Anchor className="flex flex-col gap-[10px] p-[10px] flex-1">
        <Block className="flex gap-[10px] justify-start items-center">
          <Card className="p-[10px]">
            {picture ? (
              <Image
                src={picture ?? '/default-avatar.png'}
                alt={title ?? ''}
                width={64}
                height={64}
                className="rounded-full"
              />
            ) : (
              <Card className="bg-gray-600 border border-gray-200 w-[64px] h-[64px] rounded-full" />
            )}
          </Card>
          <Card className=" ">
            <RText className="text-sm font-medium">{title}</RText>
          </Card>
        </Block>

        <Amount_Deadline amount={amount ?? 0} deadline={deadline ?? ''} isRow={true} />

        <Block className="p-[10px] text-[#4F4F4F] space-y-3">
          <p className=" text-[#4F4F4F] ">{description}</p>
          {isEqual(locale, 'vi') && (
            <Button
              onClick={() => translate(description ?? '', locale ?? 'vi')}
              disabled={!isBoolean(translated || loading)}
              className="px-4 py-2 bg-[#3D6CB9] text-white rounded-lg text-sm hover:bg-[#2c4e8a] disabled:opacity-50"
            >
              {loading ? 'Đang dịch...' : 'Dịch sang Tiếng Việt'}
            </Button>
          )}

          {error && <p className="text-red-500 text-sm">{error}</p>}
          {translated && (
            <Card className="bg-[#F9FAFB] border border-[#E5E7EB] p-3 rounded-lg">
              <RText className="text-sm font-semibold text-[#3D6CB9] mb-1">Bản dịch:</RText>
              <p className="text-sm text-[#333] leading-relaxed">{translated}</p>
            </Card>
          )}
        </Block>

        <Block className="p-[10px] flex gap-[10px] flex-wrap">
          {map(tagName, (tag) => (
            <Card key={tag}>
              <RText className="text-sm font-medium bg-white">#{tag}</RText>
            </Card>
          ))}
        </Block>
      </Anchor>

      <FooterCard onClick={() => onClick?.()} titleButton={titleButton ?? ''} />
    </Section>
  );
}
