import { Anchor } from '@/lib/by/Div';
import React from 'react';
import { Button } from '@/lib/cus/button';
import { Eye } from 'lucide-react';

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
          className="flex-1 px-4 py-1.5 rounded-lg font-semibold text-sm bg-white border-gray-300 hover:bg-gray-50 [&_.value]:text-gray-700"
          value="Details"
          iconLeft={<Eye className="w-4 h-4 text-primary" />}
          onClick={onViewDetails}
        />
      )}
      <Button
        className="flex-1 bg-gradient-to-r from-blue-700 to-blue-800 hover:from-blue-800 hover:to-blue-900 text-white px-4 py-1.5 rounded-lg font-semibold shadow-md hover:shadow-lg transition-all [&_.value]:text-white text-sm"
        value={titleButton}
        onClick={onClick}
      />
    </Anchor>
  );
};

export default FooterCard;
