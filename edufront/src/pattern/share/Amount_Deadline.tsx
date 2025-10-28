import calendar from '@/assets/icon/calendar_828282.svg';
import money from '@/assets/icon/money.svg';
import useCurrency from '@/hooks/useCurrency';
import { Block, Card, Group, RText } from '@/lib/by/Div';
import { Button } from '@/lib/cus/button';
import { cn } from '@/lib/utils';
import { sStore } from '@/stores';
import { isBoolean } from 'lodash';
import Image from 'next/image';

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
      className={cn(
        `flex ${isRow ? 'flex' : 'flex-col gap-[10px]'} justify-between p-[10px]`,
        className
      )}
    >
      <Card className={`flex ${isRow ? 'flex-col' : 'items-center'} gap-[5px]`}>
        <Group className="flex gap-[10px]">
          <Image src={money} alt="dolars" width={20} height={20} />
          {isRow && <RText className="text-sm">Amount:</RText>}
        </Group>

        {error && <p className="text-red-500 text-sm">{error}</p>}
        {currencyd && (
          <Card className="bg-[#F9FAFB] border border-[#E5E7EB] p-3 rounded-lg">
            <RText className="text-sm font-semibold text-[#3D6CB9] mb-1">Bản dịch:</RText>
            <p className="text-sm text-[#333] leading-relaxed">{currencyd}</p>
          </Card>
        )}
        <RText className="text-sm font-bold">${amount}</RText>
      </Card>
      <Card className={`flex ${isRow ? 'flex-col' : 'items-center'} gap-[5px]`}>
        <Group className="flex gap-[10px]">
          <Image src={calendar} alt="calendar" width={20} height={20} />
          {isRow && <RText className="text-sm">Deadline:</RText>}
        </Group>
        <RText className="text-sm font-bold">{deadline}</RText>
      </Card>
    </Block>
  );
};

export default Amount_Deadline;
