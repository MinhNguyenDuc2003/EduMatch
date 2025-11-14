import { NewsItem } from '../mockData';
import NewsListItem from './NewsListItem';

type NewsListProps = {
  newsData: NewsItem[];
  selectedNewsId: number;
  onNewsSelect: (news: NewsItem) => void;
};

export default function NewsList({
  newsData,
  selectedNewsId,
  onNewsSelect,
}: NewsListProps) {
  return (
    <div className="col-span-1 flex flex-col bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
      {/* Header */}
      <div className="px-4 pt-4 pb-3">
        <h2 className="text-xl font-bold text-slate-900">Latest News</h2>
        <p className="text-sm text-slate-500 mt-1">{newsData.length} articles</p>
      </div>

      {/* News List */}
      <div className="px-4 pb-4">
        <div className="space-y-3">
          {newsData.map((news) => (
            <NewsListItem
              key={news.id}
              news={news}
              isSelected={selectedNewsId === news.id}
              onClick={() => onNewsSelect(news)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

