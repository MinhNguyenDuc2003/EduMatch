import { Bookmark, Calendar, DollarSign } from 'lucide-react';

type ScholarshipMetadataProps = {
  formattedDate: string;
  amount: string;
  isSaved: boolean;
  onToggleSave: () => void;
};

export default function ScholarshipMetadata({
  formattedDate,
  amount,
  isSaved,
  onToggleSave,
}: ScholarshipMetadataProps) {
  return (
    <div className="flex flex-wrap items-center gap-6 mb-8">
      {/* Date */}
      <div className="flex items-center gap-2 text-gray-600">
        <Calendar className="w-5 h-5" />
        <span className="font-medium">{formattedDate}</span>
      </div>

      {/* Amount */}
      <div className="flex items-center gap-2 text-gray-600">
        <DollarSign className="w-5 h-5" />
        <span className="font-medium">${amount}</span>
      </div>

      {/* Bookmark */}
      <button
        onClick={onToggleSave}
        className="p-2 rounded-full hover:bg-gray-100 transition-colors"
        aria-label="Save scholarship"
      >
        <Bookmark
          className={`w-5 h-5 transition-colors ${
            isSaved ? 'fill-blue-600 text-blue-600' : 'text-gray-400'
          }`}
        />
      </button>
    </div>
  );
}

