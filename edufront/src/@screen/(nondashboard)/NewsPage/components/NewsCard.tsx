'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Calendar, Link2, X, ChevronLeft, ChevronRight } from 'lucide-react';
import ScholarshipCardImages from '@/pattern/share/ScholarshipCardImages';

type NewsCardProps = {
  news: News;
  onViewNews?: (newsId: number) => void;
  onViewProvider?: (providerId: number) => void;
  onFollowProvider?: (providerId: number) => void;
  onViewScholarship?: (slug?: string) => void;
  isAuthenticated?: boolean;
};

const formatDate = (timestamp?: number) => {
  if (!timestamp) return 'N/A';
  try {
    const date = new Date(timestamp > 1e12 ? timestamp : timestamp * 1000);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  } catch {
    return 'N/A';
  }
};

export default function NewsCard({
  news,
  onViewNews,
  onViewProvider,
  onFollowProvider,
  onViewScholarship,
  isAuthenticated,
}: NewsCardProps) {
  const router = useRouter();
  const [isImageZoomed, setIsImageZoomed] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const images =
    news.newsMedias && news.newsMedias.length > 0 ? news.newsMedias.map((media) => media.url) : [];

  const providerProfileVo = news.providerProfileVo || news.scholarship?.providerProfileVo;
  const { logoUrl, organizationName, isFollow, id: providerId } = providerProfileVo || {};

  // Truncate to 80 characters
  const truncatedContent =
    news.content.length > 100 ? `${news.content.substring(0, 100)}...` : news.content;

  const handleViewNews = () => {
    if (onViewNews) {
      onViewNews(news.id);
    } else {
      router.push(`/news/${news.id}`);
    }
  };

  return (
    <>
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
        {/* Organization Header */}
        {providerProfileVo && (
          <div className="p-4 border-b border-gray-100">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-md flex items-center justify-center text-white text-sm font-bold flex-shrink-0 cursor-pointer relative"
                  onClick={() => onViewProvider?.(providerId!)}
                >
                  {logoUrl ? (
                    <Image
                      src={logoUrl}
                      alt={organizationName || 'Organization logo'}
                      fill
                      className="rounded-md object-cover bg-white"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-md bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white text-sm font-bold flex-shrink-0 cursor-pointer">
                      {organizationName?.charAt(0) || 'O'}
                    </div>
                  )}
                </div>
                <div>
                  <h3
                    className="font-semibold text-gray-900 text-sm transition-colors cursor-pointer hover:underline"
                    onClick={() => onViewProvider?.(providerId!)}
                  >
                    {organizationName || 'Organization Name'}
                  </h3>
                  {isAuthenticated && (
                    <button
                      onClick={() => onFollowProvider?.(providerId!)}
                      className={`text-xs font-medium hover:cursor-pointer px-2 py-1 rounded transition-colors ${
                        isFollow === 1
                          ? 'text-blue-700 bg-blue-50 hover:bg-blue-100'
                          : 'text-gray-600 bg-gray-50 hover:bg-blue-50 hover:text-blue-700'
                      }`}
                    >
                      {isFollow === 1 ? 'Following' : 'Follow'}
                    </button>
                  )}
                </div>
              </div>
              {/* Published Date */}
              <div className="flex items-center gap-2 text-gray-600 text-sm">
                <Calendar className="w-4 h-4" />
                <span className="font-medium">{formatDate(news.publishedAt)}</span>
              </div>
            </div>
          </div>
        )}

        {/* Content */}
        <div className="p-4">
          {/* Title & Description - Clickable Area */}
          <div className="cursor-pointer group" onClick={handleViewNews}>
            {/* Title */}
            <h2 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors prose">
              {news.title}
            </h2>

            {/* Description */}
            <p
              className="text-gray-600 text-sm leading-relaxed mb-3 line-clamp-3 prose prose-sm max-w-none"
              dangerouslySetInnerHTML={{ __html: truncatedContent }}
            />
          </div>
          {news.scholarship && (
            <div
              className="flex items-center w-fit gap-2 px-2 py-1 bg-blue-100 hover:bg-blue-200 hover:text-blue-700 transition-colors cursor-pointer rounded-lg"
              onClick={() => onViewScholarship?.(news.scholarship?.slug)}
            >
              <Link2 className="w-4 h-4" />
              <span className="text-sm">{news.scholarship?.title}</span>
            </div>
          )}
        </div>
        {/* Image */}
        {images.length > 0 && (
          <ScholarshipCardImages
            images={images}
            title={news.title}
            onImageClick={(index) => {
              setSelectedImageIndex(index);
              setIsImageZoomed(true);
            }}
          />
        )}
      </div>

      {/* Full Screen Image Modal */}
      {isImageZoomed && images.length > 0 && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={() => setIsImageZoomed(false)}
        >
          <div className="relative max-w-7xl max-h-full w-full h-full">
            <Image
              src={images[selectedImageIndex]}
              alt={`${news.title} ${selectedImageIndex + 1}`}
              fill
              className="max-w-full max-h-[90vh] object-contain"
              onClick={(e) => e.stopPropagation()}
            />
            <button
              onClick={() => setIsImageZoomed(false)}
              className="absolute top-4 right-4 w-10 h-10 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center text-white text-xl font-bold transition-colors"
            >
              <X className="size-4" />
            </button>
            {images.length > 1 && (
              <>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedImageIndex((prev) => (prev - 1 + images.length) % images.length);
                  }}
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center text-white text-xl font-bold transition-colors"
                >
                  <ChevronLeft className="size-4" />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedImageIndex((prev) => (prev + 1) % images.length);
                  }}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center text-white text-xl font-bold transition-colors"
                >
                  <ChevronRight className="size-4" />
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
