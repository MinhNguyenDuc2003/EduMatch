import { Block, Card, RText } from '@/lib/by/Div';
import { cn } from '@/lib/utils';
import { DollarSign, Calendar } from 'lucide-react';

type Amount_DeadlineProps = {
  amount: string;
  deadline: number;
  isRow?: boolean;
  className?: string;
};

// Helper function to parse funding amount to number
const parseFundingAmount = (fundingAmount: string): number => {
  if (!fundingAmount) return 0;
  return parseFloat(fundingAmount.replace(/[^0-9.]/g, '')) || 0;
};

// Helper function to format end date
const formatEndDate = (endDate: number): string => {
  if (!endDate) return '';
  return new Date(endDate).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
};

const Amount_Deadline = ({ amount, deadline, isRow, className }: Amount_DeadlineProps) => {
  const formattedDate = formatEndDate(deadline);
  const formattedAmount = parseFundingAmount(amount).toLocaleString('en-US');

  return (
    <Block
      className={cn(`flex ${isRow ? 'flex-row gap-6' : 'flex-col gap-3'} items-center`, className)}
    >
      {/* Amount */}
      <Card className="flex flex-col">
        <Block className="flex items-center gap-2">
          <DollarSign className="w-4 h-4 text-gray-600" />
          {isRow && <RText className="text-xs text-gray-500">Amount</RText>}
        </Block>
        <RText className="text-sm font-semibold text-gray-900 mt-1">{formattedAmount}</RText>
      </Card>

      {/* Deadline */}
      <Card className="flex flex-col">
        <Block className="flex items-center gap-2">
          <Calendar className="w-4 h-4 text-gray-600" />
          {isRow && <RText className="text-xs text-gray-500">Deadline</RText>}
        </Block>
        <RText className="text-sm font-semibold text-gray-900 mt-1">{formattedDate}</RText>
      </Card>
    </Block>
  );
};

export default Amount_Deadline;
