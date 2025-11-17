'use client';
import { Block, Card, RText } from '@/lib/by/Div';
import { cn } from '@/lib/utils';
import { DollarSign, Calendar } from 'lucide-react';
import { useTranslations } from 'next-intl';

type Amount_DeadlineProps = {
  amount: string;
  deadline: number; // Timestamp (number)
  isRow?: boolean;
  className?: string;
};

// Helper function to parse funding amount to number
const parseFundingAmount = (fundingAmount: string): number => {
  if (!fundingAmount) return 0;
  return parseFloat(fundingAmount.replace(/[^0-9.]/g, '')) || 0;
};

// Helper function to format end date from timestamp
const formatEndDate = (endDate: number): string => {
  if (!endDate) return '';
  try {
    const date = new Date(endDate);
    if (isNaN(date.getTime())) return '';
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  } catch {
    return '';
  }
};

const Amount_Deadline = ({ amount, deadline, isRow, className }: Amount_DeadlineProps) => {
  const t = useTranslations('homepage.amountDeadline');
  const formattedDate = formatEndDate(deadline);

  return (
    <Block
      className={cn(`flex ${isRow ? 'flex-row gap-6' : 'flex-col gap-3'} items-center`, className)}
    >
      {/* Amount */}
      <Card className="flex flex-col">
        <Block className="flex items-center gap-2">
          <DollarSign className="w-4 h-4 text-gray-600" />
          {isRow && <RText className="text-xs text-gray-500">{t('amount')}</RText>}
        </Block>
        <RText className="text-sm font-semibold text-gray-900 mt-1">{amount}</RText>
      </Card>

      {/* Deadline */}
      <Card className="flex flex-col">
        <Block className="flex items-center gap-2">
          <Calendar className="w-4 h-4 text-gray-600" />
          {isRow && <RText className="text-xs text-gray-500">{t('deadline')}</RText>}
        </Block>
        <RText className="text-sm font-semibold text-gray-900 mt-1">{formattedDate}</RText>
      </Card>
    </Block>
  );
};

export default Amount_Deadline;
