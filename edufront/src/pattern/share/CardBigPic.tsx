import useTranslate from '@/hooks/useTranslate';
import { Anchor, Block, Card, RText, Section } from '@/lib/by/Div';
import { Button } from '@/lib/cus/button';
import { sStore } from '@/stores';
import { isBoolean, isEqual } from 'lodash';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Amount_Deadline from './Amount_Deadline';
import { Bookmark, Eye, Send } from 'lucide-react';

type props = {
  pic?: string;
  title?: string;
  description?: string;
  amount?: number;
  deadline?: string;
  titleButton?: string;
  onClick?: () => void;
  onViewDetails?: () => void;
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
  onViewDetails,
  tagName,
}: props) => {
  const ss = sStore();
  const router = useRouter();
  const locale = ss.Auth?.Locale;
  return (
    <Section className="flex bg-[#FAFAF6] flex-col gap-[10px] border border-solid border-[#D9D9D9] rounded-2xl relative">
      {/* Save Icon - Top Right */}
      <button 
        className="absolute top-3 right-3 z-40 p-2 rounded-full bg-white/90 hover:bg-white shadow-md hover:shadow-lg transition-all duration-200 group"
        onClick={(e) => {
          e.stopPropagation();
          // Add save functionality here
        }}
      >
        <Bookmark className="w-5 h-5 text-gray-400 group-hover:text-blue-600 group-hover:fill-blue-600 transition-colors" />
      </button>

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

      <Anchor className="p-3 w-full mt-auto border-t border-gray-200 flex gap-2">
        {onViewDetails && (
          <Button 
            variant="outline" 
            className='py-2 flex-1 gap-2 text-sm' 
            onClick={onViewDetails}
          >
            <Eye className="w-4 h-4" />
            View Details
          </Button>
        )}
        <Button 
          className='py-2 flex-1 gap-2 text-sm' 
          onClick={onClick}
        >
          <Send className="w-4 h-4" />
          {titleButton}
        </Button>
      </Anchor>
    </Section>
  );
};

export default CardBigPic;
