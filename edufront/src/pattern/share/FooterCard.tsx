import { Anchor } from '@/lib/by/Div';
import React from 'react';
import { Button } from '@/lib/cus/button';
import { Eye, Send } from 'lucide-react';

const FooterCard = ({
  onClick,
  titleButton,
  onViewDetails,
}: {
  onClick: () => void;
  titleButton: string;
  onViewDetails?: () => void;
}) => {
  return (
    <Anchor className="p-3 w-full mt-auto border-t border-gray-200 flex gap-2">
      {onViewDetails && (
        <Button
          variant="outline"
          className="py-2 flex-1 gap-2 text-sm text-primary"
          onClick={onViewDetails}
        >
          <Eye className="w-4 h-4" />
          View Details
        </Button>
      )}
      <Button className="py-2 flex-1 gap-2 text-sm" onClick={onClick}>
        <Send className="w-4 h-4" />
        {titleButton}
      </Button>
    </Anchor>
  );
};

export default FooterCard;
