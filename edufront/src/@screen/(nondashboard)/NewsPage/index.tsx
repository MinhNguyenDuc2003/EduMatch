'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import CardSmalPic from '@/pattern/share/CardSmalPic';
import { newsData, type NewsItem } from './mockData';
import { Calendar, ArrowRight } from 'lucide-react';

export default function NewsPage() {
  const router = useRouter();
  const [selectedNews, setSelectedNews] = useState<NewsItem>(newsData[0]);
  const leftScrollRef = useRef<HTMLDivElement>(null);
  const rightScrollRef = useRef<HTMLDivElement>(null);
  const [leftHeaderScrolled, setLeftHeaderScrolled] = useState(false);

  // Handle scroll for left side header shadow
  useEffect(() => {
    const leftScroll = leftScrollRef.current;
    if (!leftScroll) return;

    const handleScroll = () => {
      setLeftHeaderScrolled(leftScroll.scrollTop > 0);
    };

    leftScroll.addEventListener('scroll', handleScroll);
    return () => leftScroll.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/30">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
        <div className="mx-auto w-full px-40">
          <div className="max-w-4xl">
            <h1 className="text-5xl font-bold mb-4">News & Updates</h1>
            <p className="text-xl text-blue-100">
              Stay informed about the latest scholarship opportunities, application tips, and
              educational news
            </p>
          </div>
        </div>
      </section>

      {/* News Content - Split Layout */}
      <section className="py-16 min-h-[600px]">
        <div className="mx-auto w-full px-40">
          <div className="grid grid-cols-4 gap-8">
            {/* Left Side - News List (1 column) */}
            <div className="col-span-1 flex flex-col bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden max-h-[calc(100vh-20rem)]">
              {/* Sticky Header */}
              <div
                className={`sticky top-0 z-10 bg-gradient-to-b from-white via-white to-white/95 backdrop-blur-sm pb-4 pt-4 px-4 border-b border-slate-200 transition-shadow duration-300 flex-shrink-0 ${
                  leftHeaderScrolled ? 'shadow-sm' : ''
                }`}
              >
                <h2 className="text-xl font-bold text-slate-900">Latest News</h2>
                <p className="text-sm text-slate-500 mt-1">{newsData.length} articles</p>
              </div>

              {/* Scrollable List */}
              <div
                ref={leftScrollRef}
                className="flex-1 overflow-y-auto px-4 pb-4 scrollbar-thin scrollbar-thumb-slate-300 scrollbar-track-transparent hover:scrollbar-thumb-slate-400 scroll-smooth min-h-0"
                style={{
                  scrollbarWidth: 'thin',
                  scrollbarColor: 'rgb(203 213 225) transparent',
                  WebkitOverflowScrolling: 'touch',
                  overscrollBehavior: 'contain',
                }}
              >
                <div className="space-y-3 pt-2">
                  {newsData.map((news) => (
                    <NewsListItem
                      key={news.id}
                      news={news}
                      isSelected={selectedNews.id === news.id}
                      onClick={() => setSelectedNews(news)}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Right Side - News Detail (3 columns) */}
            <div className="col-span-3 overflow-y-auto min-h-[600px]">
              <div
                ref={rightScrollRef}
                className="pr-2 scrollbar-thin scrollbar-thumb-slate-300 scrollbar-track-transparent hover:scrollbar-thumb-slate-400 scroll-smooth"
                style={{
                  scrollbarWidth: 'thin',
                  scrollbarColor: 'rgb(203 213 225) transparent',
                  WebkitOverflowScrolling: 'touch',
                  overscrollBehavior: 'contain',
                }}
              >
                <NewsDetail news={selectedNews} router={router} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Custom Scrollbar Styles */}
      <style jsx global>{`
        .scrollbar-thin::-webkit-scrollbar {
          width: 6px;
        }
        .scrollbar-thin::-webkit-scrollbar-track {
          background: transparent;
          border-radius: 10px;
        }
        .scrollbar-thin::-webkit-scrollbar-thumb {
          background: rgb(203 213 225);
          border-radius: 10px;
          transition: background 0.2s ease;
        }
        .scrollbar-thin::-webkit-scrollbar-thumb:hover {
          background: rgb(148 163 184);
        }
        .scrollbar-thin::-webkit-scrollbar-thumb:active {
          background: rgb(100 116 139);
        }
      `}</style>
    </div>
  );
}

function NewsListItem({
  news,
  isSelected,
  onClick,
}: {
  news: NewsItem;
  isSelected: boolean;
  onClick: () => void;
}) {
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

function NewsDetail({ news, router }: { news: NewsItem; router: ReturnType<typeof useRouter> }) {
  return (
    <article className="bg-white rounded-2xl shadow-lg overflow-hidden border border-slate-200">
      {/* Image Section */}
      <div className="relative w-full h-96 overflow-hidden">
        <Image
          src={news.imgUrl}
          alt={news.title}
          fill
          className="object-cover"
          sizes="(max-width: 1200px) 100vw, 1200px"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-8">
          <h2 className="text-3xl font-bold text-white mb-2">{news.title}</h2>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-10">
        {/* Article Meta */}
        <div className="flex items-center gap-4 mb-6 text-sm text-slate-500">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            <span>Published recently</span>
          </div>
        </div>

        {/* Article Content */}
        <div className="prose prose-slate max-w-none mb-8">
          <p className="text-slate-700 leading-relaxed text-lg whitespace-pre-line">
            {news.content}
          </p>
        </div>

        {/* Read More Link */}
        <Link
          href={news.link}
          className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold transition-colors group"
        >
          <span>Read full article</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Link>

        {/* Scholarship Card Section */}
        {news.scholarship && (
          <div className="mt-12 pt-12 border-t border-slate-200">
            <div className="mb-6">
              <h3 className="text-2xl font-bold text-slate-900 mb-2">Related Scholarship</h3>
              <p className="text-slate-600">
                Check out this scholarship opportunity related to this article
              </p>
            </div>
            <div className="max-w-md">
              <CardSmalPic
                scholarship={news.scholarship}
                onViewDetails={() => router.push(`/scholarships/${news.scholarship!.slug}`)}
                onToggleTracking={(id) => {
                  // Handle tracking logic here
                  console.log('Toggle tracking:', id);
                }}
              />
            </div>
          </div>
        )}
      </div>
    </article>
  );
}
