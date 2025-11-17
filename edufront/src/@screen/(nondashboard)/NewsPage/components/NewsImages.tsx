'use client';

import { useState } from 'react';
import Image from 'next/image';

type NewsImagesProps = {
  news: News;
};

export default function NewsImages({ news }: NewsImagesProps) {
  const [isImageZoomed, setIsImageZoomed] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const images = news.newsMedias?.map((media) => media.url) || [];

  if (images.length === 0) {
    return null;
  }

  return (
    <>
      <div className="w-full bg-gray-100 rounded-lg overflow-hidden">
        {images.length === 1 ? (
          <div className="w-full relative overflow-hidden">
            <div
              className="w-full min-h-52 relative bg-gray-200 cursor-pointer"
              onClick={() => {
                setSelectedImageIndex(0);
                setIsImageZoomed(true);
              }}
            >
              <Image src={images[0]} alt={news.title} fill className="object-cover" />
            </div>
          </div>
        ) : images.length === 2 ? (
          <div className="grid grid-cols-2 gap-1">
            {images.map((img, idx) => (
              <div
                key={idx}
                className="relative bg-gray-200 min-h-52 cursor-pointer"
                onClick={() => {
                  setSelectedImageIndex(idx);
                  setIsImageZoomed(true);
                }}
              >
                <Image src={img} alt={`${news.title} ${idx + 1}`} fill className="object-cover" />
              </div>
            ))}
          </div>
        ) : images.length === 3 ? (
          <div className="grid grid-cols-3 gap-1">
            {images.map((img, idx) => (
              <div
                key={idx}
                className="relative bg-gray-200 min-h-52 cursor-pointer"
                onClick={() => {
                  setSelectedImageIndex(idx);
                  setIsImageZoomed(true);
                }}
              >
                <Image src={img} alt={`${news.title} ${idx + 1}`} fill className="object-cover" />
              </div>
            ))}
          </div>
        ) : images.length === 4 ? (
          <div className="grid grid-cols-2 gap-1">
            {images.map((img, idx) => (
              <div
                key={idx}
                className="relative bg-gray-200 min-h-52 cursor-pointer"
                onClick={() => {
                  setSelectedImageIndex(idx);
                  setIsImageZoomed(true);
                }}
              >
                <Image src={img} alt={`${news.title} ${idx + 1}`} fill className="object-cover" />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 grid-rows-2 gap-1">
            {images.slice(0, 4).map((img, idx) => (
              <div
                key={idx}
                className="relative bg-gray-200 min-h-52 cursor-pointer"
                onClick={() => {
                  setSelectedImageIndex(idx);
                  setIsImageZoomed(true);
                }}
              >
                <Image src={img} alt={`${news.title} ${idx + 1}`} fill className="object-cover" />
                {idx === 3 && images.length > 4 && (
                  <div className="absolute inset-0 bg-black/60 flex items-center justify-center pointer-events-none">
                    <span className="text-white text-2xl font-bold">+{images.length - 3}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Full Screen Image Modal */}
      {isImageZoomed && images.length > 0 && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={() => setIsImageZoomed(false)}
        >
          <div className="relative max-w-7xl max-h-full">
            <Image
              src={images[selectedImageIndex]}
              alt={`${news.title} ${selectedImageIndex + 1}`}
              width={1200}
              height={800}
              className="max-w-full max-h-[90vh] object-contain"
              onClick={(e) => e.stopPropagation()}
            />
            <button
              onClick={() => setIsImageZoomed(false)}
              className="absolute top-4 right-4 w-10 h-10 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center text-white text-xl font-bold transition-colors"
            >
              ×
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
                  ‹
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedImageIndex((prev) => (prev + 1) % images.length);
                  }}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center text-white text-xl font-bold transition-colors"
                >
                  ›
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}

