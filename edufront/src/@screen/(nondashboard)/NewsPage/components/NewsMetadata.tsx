import { Flag, Calendar } from 'lucide-react';

type NewsMetadataProps = {
  formattedDate: string;
  isTracked?: boolean;
};

export default function NewsMetadata({ formattedDate, isTracked }: NewsMetadataProps) {
  return (
    <div className="flex flex-wrap items-center gap-6">
      {/* Date */}
      <div className="flex items-center gap-2 text-gray-600">
        <Calendar className="size-5" />
        <span className="font-medium">{formattedDate}</span>
      </div>
    </div>
  );
}
