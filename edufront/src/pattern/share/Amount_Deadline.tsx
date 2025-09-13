import calendar from '@/assets/icon/calendar.svg';
import dolars from '@/assets/icon/dolars.svg';
import { Block, Card, Group, RText } from '@/lib/by/Div';
import { cn } from '@/lib/utils';
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
  return (
    <Block
      className={cn(`flex ${isRow ? 'flex' : 'flex-col gap-[10px]'} justify-between p-[10px]`, className)}
    >
      <Card className={`flex ${isRow ? 'flex-col' : 'items-center'} gap-[5px]`}>
        <Group className="flex gap-[10px]">
          <Image src={dolars} alt="dolars" width={20} height={20} />
          {isRow && <RText className="text-sm">Amount:</RText>}
        </Group>
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
