import Image from 'next/image';
import { NewsItem } from '../mockData';

type NewsListItemProps = {
  news: NewsItem;
  isSelected: boolean;
  onClick: () => void;
};

export default function NewsListItem({
  news,
  isSelected,
  onClick,
}: NewsListItemProps) {
  // Show more content - truncate to 300 characters for longer preview
  const truncatedContent =
    news.content.length > 300 ? `${news.content.substring(0, 300)}...` : news.content;

  return (
    <button
      onClick={onClick}
      className={`w-full text-left bg-white rounded-xl border-2 overflow-hidden transition-all duration-300 hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] ${
        isSelected
          ? 'border-blue-600 shadow-lg ring-2 ring-blue-100'
          : 'border-slate-200 hover:border-slate-300'
      }`}
    >
      {/* Image */}
      {news.imgUrl && (
        <div className="relative w-full h-40 overflow-hidden">
          <Image
            src={news.imgUrl}
            alt={news.title}
            fill
            className="object-cover"
            sizes="(max-width: 400px) 100vw, 400px"
          />
        </div>
      )}

      {/* Content */}
      <div className="p-4">
        <h3
          className={`font-semibold mb-2 line-clamp-2 ${
            isSelected ? 'text-blue-600' : 'text-slate-900'
          }`}
        >
          {news.title}
        </h3>
        <p className="text-sm text-slate-600 line-clamp-4 leading-relaxed">{truncatedContent}</p>
      </div>
    </button>
  );
}

