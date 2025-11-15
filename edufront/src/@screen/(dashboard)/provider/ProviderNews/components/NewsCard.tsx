import { Button } from '@/lib/cus/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/lib/cus/dropdown-menu';
import { Dialog, DialogContent, DialogTitle } from '@/lib/cus/dialog';
import { Skeleton } from '@/lib/cus/skeleton';
import { cn } from '@/lib/utils';
import {
  MoreVertical,
  Edit,
  Trash2,
  FileText,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  X,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import { formatDate } from '@/@screen/(dashboard)/applicant/Profile/utils';

interface NewsCardProps {
  news: News;
  onDelete?: (id: number) => void;
  className?: string;
  variant?: 'small' | 'medium';
}

interface NewsCardSkeletonProps {
  variant?: 'small' | 'medium';
  className?: string;
}

export const NewsCardSkeleton = ({ variant = 'medium', className }: NewsCardSkeletonProps) => {
  const cardContent = () => {
    switch (variant) {
      case 'small':
        return (
          <div className="p-3">
            <Skeleton className="h-4 w-3/4 mb-2" />
            <Skeleton className="h-4 w-full mb-1" />
            <Skeleton className="h-3 w-2/3" />
          </div>
        );
      case 'medium':
      default:
        return (
          <div className="p-6">
            {/* Header with title and dropdown */}
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <Skeleton className="h-6 w-3/4 mb-2" />
                <Skeleton className="h-4 w-full mb-1" />
                <Skeleton className="h-4 w-5/6" />
              </div>
              <Skeleton className="h-8 w-8 rounded-md" />
            </div>

            {/* Image skeleton */}
            <Skeleton className="h-48 w-full rounded-lg mb-4" />

            {/* Content skeleton */}
            <Skeleton className="h-4 w-full mb-1" />
            <Skeleton className="h-4 w-4/5" />
          </div>
        );
    }
  };

  return (
    <div
      className={cn(
        'bg-[#FAFAF6] rounded-xl shadow-sm border border-gray-200 overflow-hidden',
        className
      )}
    >
      {cardContent()}
    </div>
  );
};

export const NewsCard = ({ news, onDelete, className, variant = 'medium' }: NewsCardProps) => {
  const [isImageViewerOpen, setIsImageViewerOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const images = news.newsMedias || [];
  const displayImages = images.slice(0, 4);
  const hasMoreImages = images.length > 4;

  const handleImageClick = (index: number) => {
    setSelectedImageIndex(index);
    setIsImageViewerOpen(true);
  };

  const handlePrevImage = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setSelectedImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleNextImage = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setSelectedImageIndex((prev) => (prev + 1) % images.length);
  };

  // Keyboard navigation
  useEffect(() => {
    if (!isImageViewerOpen || images.length <= 1) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        setSelectedImageIndex((prev) => (prev - 1 + images.length) % images.length);
      } else if (e.key === 'ArrowRight') {
        setSelectedImageIndex((prev) => (prev + 1) % images.length);
      } else if (e.key === 'Escape') {
        setIsImageViewerOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isImageViewerOpen, images.length]);

  const cardContent = () => {
    switch (variant) {
      case 'small':
        return (
          <div className="p-3">
            <h3 className="font-semibold text-sm mb-2 line-clamp-2 text-gray-900">{news.title}</h3>
            <div
              className="text-xs text-gray-600 mb-2 line-clamp-2 prose prose-xs max-w-none"
              dangerouslySetInnerHTML={{ __html: news.content }}
            />
            {news.scholarship && (
              <div className="text-xs text-gray-500">
                <span className="font-medium">{news.scholarship.title}</span>
              </div>
            )}
          </div>
        );
      case 'medium':
      default:
        return (
          <div className="p-6">
            {/* Header with title and dropdown */}
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <h3 className="text-xl font-bold text-gray-900 mb-1 group-hover:text-primary-brand transition-colors">
                  {news.title}
                </h3>
                <p className="text-sm text-gray-500 mb-2">
                  Published on {formatDate(news.publishedAt)}
                </p>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-8 w-8 shadow-none">
                    <MoreVertical className="w-4 h-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem asChild className="cursor-pointer">
                    <Link href={`/provider/news/${news.id}`} className="flex items-center gap-2">
                      <Edit className="w-4 h-4" />
                      <span>Edit</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="cursor-pointer text-red-600 focus:text-red-600 focus:bg-red-50"
                    onClick={() => onDelete?.(news.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                    <span>Delete</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            {/* Content */}
            <div className="mb-4">
              <div
                className={`text-sm text-gray-600 prose prose-sm max-w-none ${images.length > 0 ? 'line-clamp-3' : 'line-clamp-none'}`}
                dangerouslySetInnerHTML={{ __html: news.content }}
              />
            </div>

            {/* Images Gallery - Facebook style */}
            {images.length > 0 && (
              <div className="mb-4">
                {images.length === 1 ? (
                  <div
                    className="relative aspect-video rounded-lg overflow-hidden border border-gray-200 cursor-pointer hover:opacity-90 transition-opacity"
                    onClick={() => handleImageClick(0)}
                  >
                    <Image
                      src={images[0].url}
                      alt={news.title}
                      fill
                      className="object-cover"
                      unoptimized
                    />
                  </div>
                ) : images.length === 2 ? (
                  <div className="grid grid-cols-2 gap-2">
                    {displayImages.map((media, idx) => (
                      <div
                        key={media.id}
                        className="relative aspect-video rounded-lg overflow-hidden border border-gray-200 cursor-pointer hover:opacity-90 transition-opacity"
                        onClick={() => handleImageClick(idx)}
                      >
                        <Image
                          src={media.url}
                          alt={`${news.title} ${idx + 1}`}
                          fill
                          className="object-cover"
                          unoptimized
                        />
                      </div>
                    ))}
                  </div>
                ) : images.length === 3 ? (
                  <div className="grid grid-cols-3 gap-2">
                    {displayImages.map((media, idx) => (
                      <div
                        key={media.id}
                        className="relative aspect-video rounded-lg overflow-hidden border border-gray-200 cursor-pointer hover:opacity-90 transition-opacity"
                        onClick={() => handleImageClick(idx)}
                      >
                        <Image
                          src={media.url}
                          alt={`${news.title} ${idx + 1}`}
                          fill
                          className="object-cover"
                          unoptimized
                        />
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="grid grid-cols-2 gap-2">
                    {displayImages.map((media, idx) => (
                      <div
                        key={media.id}
                        className="relative aspect-video rounded-lg overflow-hidden border border-gray-200 cursor-pointer hover:opacity-90 transition-opacity"
                        onClick={() => handleImageClick(idx)}
                      >
                        <Image
                          src={media.url}
                          alt={`${news.title} ${idx + 1}`}
                          fill
                          className="object-cover"
                          unoptimized
                        />
                        {idx === 3 && hasMoreImages && (
                          <div className="absolute inset-0 bg-black/60 flex items-center justify-center pointer-events-none">
                            <span className="text-white text-2xl font-bold">
                              +{images.length - 4}
                            </span>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {news.scholarship && (
              <p className="text-sm border-t text-gray-500 pt-2">
                Related to: <span className="font-medium">{news.scholarship.title}</span>
              </p>
            )}
          </div>
        );
    }
  };

  return (
    <>
      <div
        className={cn(
          'bg-[#FAFAF6] rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow group',
          className
        )}
      >
        {cardContent()}
      </div>

      {/* Image Viewer Dialog - Facebook style */}
      <Dialog open={isImageViewerOpen} onOpenChange={setIsImageViewerOpen}>
        <DialogContent className="min-w-6xl w-full h-[90vh] p-0 bg-black/95 border-none">
          <DialogTitle className="sr-only">{news.title}</DialogTitle>
          <div className="relative w-full h-full flex items-center justify-center">
            {/* Close Button */}
            <button
              onClick={() => setIsImageViewerOpen(false)}
              className="absolute top-4 right-4 z-50 w-10 h-10 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Image */}
            {images.length > 0 && (
              <>
                <div className="relative w-full h-full flex items-center justify-center p-4">
                  <Image
                    src={images[selectedImageIndex].url}
                    alt={`${news.title} ${selectedImageIndex + 1}`}
                    width={1200}
                    height={800}
                    className="max-w-full max-h-full object-contain"
                    unoptimized
                  />
                </div>

                {/* Navigation Buttons */}
                {images.length > 1 && (
                  <>
                    <button
                      onClick={handlePrevImage}
                      className="absolute left-4 top-1/2 -translate-y-1/2 z-50 w-12 h-12 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center text-white transition-colors"
                    >
                      <ChevronLeft className="w-6 h-6" />
                    </button>
                    <button
                      onClick={handleNextImage}
                      className="absolute right-4 top-1/2 -translate-y-1/2 z-50 w-12 h-12 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center text-white transition-colors"
                    >
                      <ChevronRight className="w-6 h-6" />
                    </button>
                  </>
                )}

                {/* Image Indicator */}
                {images.length > 1 && (
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2">
                    {images.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setSelectedImageIndex(idx)}
                        className={cn(
                          'w-2 h-2 rounded-full transition-all',
                          idx === selectedImageIndex
                            ? 'bg-white w-8'
                            : 'bg-white/50 hover:bg-white/75'
                        )}
                        aria-label={`Go to image ${idx + 1}`}
                      />
                    ))}
                  </div>
                )}

                {/* Image Counter */}
                <div className="absolute top-4 left-4 z-50 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
                  {selectedImageIndex + 1} / {images.length}
                </div>
              </>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default NewsCard;
