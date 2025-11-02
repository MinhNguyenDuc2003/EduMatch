import useCurrency from '@/hooks/useCurrency';
import { Block, Card, Group, RText } from '@/lib/by/Div';
import { cn } from '@/lib/utils';
import { sStore } from '@/stores';
import { DollarSign, Calendar } from 'lucide-react';

const Amount_Deadline = ({
  amount,
  deadline,
  isRow,
  className,
}: {
  amount: number;
  deadline: string;
  isRow?: boolean;
  className?: string;
}) => {
  const ss = sStore();
  const locale = ss.Auth?.Locale;
  const { Currency, currencyd, loading, error } = useCurrency();

  return (
    <Block
      className={cn(`flex ${isRow ? 'flex-row gap-6' : 'flex-col gap-3'} items-start`, className)}
    >
      {/* Amount */}
      <Card className="flex items-center gap-2">
        <DollarSign className="w-4 h-4 text-gray-600" />
        <Block>
          {isRow && <RText className="text-xs text-gray-500">Amount</RText>}
          <RText className="text-sm font-semibold text-gray-900">${amount.toLocaleString()}</RText>
        </Block>
      </Card>

      {/* Deadline */}
      <Card className="flex items-center gap-2">
        <Calendar className="w-4 h-4 text-gray-600" />
        <Block>
          {isRow && <RText className="text-xs text-gray-500">Deadline</RText>}
          <RText className="text-sm font-semibold text-gray-900">{deadline}</RText>
        </Block>
      </Card>

      {/* Currency Translation (if available) */}
      {error && <p className="text-red-500 text-xs">{error}</p>}
      {currencyd && (
        <Card className="bg-[#F9FAFB] border border-[#E5E7EB] p-2 rounded-lg mt-2 w-full">
          <RText className="text-xs font-semibold text-[#3D6CB9] mb-1">Bản dịch:</RText>
          <p className="text-xs text-[#333] leading-relaxed">{currencyd}</p>
        </Card>
      )}
    </Block>
  );
};

export default Amount_Deadline;
