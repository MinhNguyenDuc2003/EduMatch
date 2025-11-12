import { Building2, Flag } from 'lucide-react';
import Amount_Deadline from './Amount_Deadline';
import { Anchor, Block, Card, RText, Section } from '@/lib/by/Div';
import Image from 'next/image';

type CardSmalPicProps = {
  scholarship: Scholarship;
  onViewDetails?: () => void;
  onToggleTracking?: (scholarshipId: number) => void;
};

export default function CardSmalPic({
  onViewDetails,
  onToggleTracking,
  scholarship,
}: CardSmalPicProps) {
  const handleBookmarkClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    if (scholarship?.id && onToggleTracking) {
      onToggleTracking(scholarship.id);
    }
  };

  const { title, shortDescription, university, isFollow } = scholarship;
  const { logoUrl, organizationName } = scholarship.providerProfileVo;
  const deadline = scholarship?.endDate || 0;
  const amount = scholarship?.fundingAmount
    ? scholarship.fundingAmount.replace(/[^0-9.,]/g, '')
    : '0';

  return (
    <Section className="group bg-white flex flex-col rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200 hover:border-[#3D6CB9] relative h-full">
      {/* Track Icon - Top Right */}
      <button
        className="absolute top-3 right-3 z-10 p-2 rounded-full bg-white/80 hover:bg-white shadow-sm hover:shadow-md transition-all duration-200 "
        onClick={handleBookmarkClick}
        aria-label="Track scholarship"
      >
        <Flag
          className={`w-5 h-5 transition-colors ${
            isFollow === 1
              ? 'fill-[#3D6CB9] text-[#3D6CB9]'
              : 'text-gray-400 hover:text-[#3D6CB9] hover:fill-[#3D6CB9]'
          }`}
        />
      </button>

      <Block className="flex flex-col p-4 flex-1 h-full">
        {/* Header with University Logo and Title - Clickable */}
        <Anchor
          className="flex gap-3 items-start pr-9 cursor-pointer hover:opacity-80 transition-opacity flex-shrink-0 mb-3"
          onClick={onViewDetails}
        >
          <Card className="flex-shrink-0 w-16 h-16 relative aspect-square">
            {logoUrl ? (
              <Image
                src={logoUrl}
                alt={organizationName || 'Organization logo'}
                fill
                className="rounded-lg object-cover bg-white p-2"
              />
            ) : (
              <Card className="border border-gray-200 w-full h-full rounded-lg flex items-center justify-center relative">
                <Image
                  src={
                    'https://es5urvh1np.ufs.sh/f/DHR6tEJ9PQoz85HjSO62tcmI7ElP8Ygn01Oa3ze6iFwADrsH'
                  }
                  alt={'logo'}
                  fill
                  className="rounded-lg object-contain bg-white p-2"
                />
              </Card>
            )}
          </Card>
          <Card className="flex-1 min-w-0 flex flex-col">
            <RText className="text-base font-semibold text-gray-900 leading-tight line-clamp-2 group-hover:text-[#3D6CB9] transition-colors">
              {title || ''}
            </RText>
            <RText className="text-sm text-gray-600 mt-1 line-clamp-1">{university || ''}</RText>
          </Card>
        </Anchor>

        {/* Description - Fixed height */}
        <Block className="text-gray-600 text-sm flex-shrink-0 min-h-[1.25rem] mb-3">
          {shortDescription ? (
            <p className="line-clamp-1">{shortDescription}</p>
          ) : (
            <p className="invisible line-clamp-1">Placeholder</p>
          )}
        </Block>

        {/* Spacer - takes remaining space to push Amount_Deadline to bottom */}
        <div className="flex-1"></div>

        {/* Amount and Deadline - Always at bottom */}
        <Block className="flex-shrink-0">
          {amount || deadline ? (
            <Amount_Deadline amount={amount || '0'} deadline={deadline || 0} isRow={true} />
          ) : (
            <div className="h-[3rem] flex items-center">
              <div className="invisible">
                <Amount_Deadline amount="0" deadline={0} isRow={true} />
              </div>
            </div>
          )}
        </Block>
      </Block>
    </Section>
  );
}
