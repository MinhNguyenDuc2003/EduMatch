'use client';

import { useState } from 'react';
import { newsData, type NewsItem } from './mockData';
import { NewsHeader, NewsList, NewsDetail } from './components';

export default function NewsPage() {
  const [selectedNews, setSelectedNews] = useState<NewsItem>(newsData[0]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/30">
      {/* Hero Section */}
      <NewsHeader />

      {/* News Content - Split Layout */}
      <section className="py-16 min-h-[600px]">
        <div className="mx-auto w-full px-40">
          <div className="grid grid-cols-4 gap-8">
            {/* Left Side - News List (1 column) */}
            <NewsList
              newsData={newsData}
              selectedNewsId={selectedNews.id}
              onNewsSelect={setSelectedNews}
            />

            {/* Right Side - News Detail (3 columns) */}
            <div className="col-span-3">
              <NewsDetail news={selectedNews} />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
