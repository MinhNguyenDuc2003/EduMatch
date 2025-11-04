import { Building2, Flag } from 'lucide-react';
import Amount_Deadline from './Amount_Deadline';
import { Anchor, Block, Card, RText, Section } from '@/lib/by/Div';
import Image from 'next/image';

type CardSmalPicProps = {
  picture?: string;
  title?: string;
  amount?: string;
  deadline?: number;
  description?: string;
  onViewDetails?: () => void;
  university?: string;
};

export default function CardSmalPic({
  picture,
  title,
  amount,
  deadline,
  description,
  university,
  onViewDetails,
}: CardSmalPicProps) {
  const handleBookmarkClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    // Add save functionality here
  };

  return (
    <Section className="bg-white flex flex-col rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200 hover:border-blue-300 relative">
      {/* Track Icon - Top Right */}
      <button
        className="absolute top-3 right-3 z-10 p-2 rounded-full bg-white/80 hover:bg-white shadow-sm hover:shadow-md transition-all duration-200 group"
        onClick={handleBookmarkClick}
        aria-label="Track scholarship"
      >
        <Flag className="w-5 h-5 text-gray-400 group-hover:text-blue-600 group-hover:fill-blue-600 transition-colors" />
      </button>

      <Block className="flex flex-col p-4 flex-1 space-y-3">
        {/* Header with University Logo and Title - Clickable */}
        <Anchor
          className="flex gap-3 items-center pr-9 cursor-pointer hover:opacity-80 transition-opacity"
          onClick={onViewDetails}
        >
          <Card className="flex-shrink-0 w-12 h-12 relative aspect-square">
            {picture ? (
              <Image
                src={picture}
                alt={title || 'Scholarship logo'}
                fill
                className="rounded-lg object-contain bg-white p-2"
              />
            ) : (
              <Card className="bg-gradient-to-br from-blue-500 to-purple-600 w-full h-full rounded-lg flex items-center justify-center">
                <Building2 className="w-5 h-5 text-white" />
              </Card>
            )}
          </Card>
          <Card className="flex-1 min-w-0">
            <RText className="text-base font-semibold text-gray-900 leading-tight">{title}</RText>
            <RText className="text-sm text-gray-600">{university}</RText>
          </Card>
        </Anchor>
        {/* Description */}
        {description && (
          <Block className="text-gray-600 text-sm">
            <p className="line-clamp-1">{description}</p>
          </Block>
        )}
        {/* Amount and Deadline */}
        {(amount || deadline) && (
          <Amount_Deadline amount={amount || '0'} deadline={deadline || 0} isRow={true} />
        )}
      </Block>
    </Section>
  );
}
