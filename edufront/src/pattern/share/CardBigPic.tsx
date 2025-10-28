import useTranslate from '@/hooks/useTranslate';
import { Anchor, Block, Card, RText, Section } from '@/lib/by/Div';
import { Button } from '@/lib/cus/button';
import { sStore } from '@/stores';
import { isBoolean, isEqual } from 'lodash';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Amount_Deadline from './Amount_Deadline';

type props = {
  pic?: string;
  title?: string;
  description?: string;
  amount?: number;
  deadline?: string;
  titleButton?: string;
  onClick?: () => void;
  tagName?: string;
};
const CardBigPic = ({
  pic,
  title,
  description,
  amount,
  deadline,
  titleButton,
  onClick,
  tagName,
}: props) => {
  const ss = sStore();
  const router = useRouter();
  const locale = ss.Auth?.Locale;
  return (
    <Section className="flex bg-[#FAFAF6] flex-col gap-[10px] border border-solid border-[#D9D9D9] rounded-2xl">
      <Anchor className="relative z-0">
        <Block>
          {pic ? (
            <Image src={pic} alt={title ?? ''} width={400} height={400} />
          ) : (
            <Block className="bg-gray-400 w-full h-[200px]  border border-solid border-[#D9D9D9]" />
          )}
        </Block>
        <Block className="absolute top-0 left-10 p-[5px] border rounded-md bg-[#00FFF0] z-30">
          <RText className="text-[#3D6CB9] text-sm ">#{tagName}</RText>
        </Block>
      </Anchor>

      <Anchor className="p-[10px]">
        <Block>
          <RText className="font-bold p-[10px] text-[#3D6CB9]">{title}</RText>
        </Block>
        <Block className="p-[10px] text-[#4F4F4F] space-y-3">
          <p className=" text-[#4F4F4F] ">{description}</p>
        </Block>
        <Amount_Deadline
          className="pl-[10px] pt-[20px] pb-[20px] border-t border-[#C4C4C4] border-b border-solid "
          amount={amount ?? 0}
          deadline={deadline ?? ''}
          isRow={false}
        />
      </Anchor>

      <Anchor className="w-full mt-auto p-[20px]">
        <Button className="p-6 w-full " onClick={onClick}>
          {titleButton}
        </Button>
      </Anchor>
    </Section>
  );
};

export default CardBigPic;
