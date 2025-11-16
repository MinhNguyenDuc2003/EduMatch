'use client';

import Image from 'next/image';
import { getScholarshipImages } from '@/utils/scholarshipHelpers';

type ScholarshipImagesProps = {
  scholarship: Scholarship;
  title?: string;
};

export default function ScholarshipImages({ scholarship, title }: ScholarshipImagesProps) {
  const images = getScholarshipImages(scholarship);
  const displayTitle = title || scholarship.title;

  if (images.length === 0) {
    return null;
  }

  return (
    <div className="w-full bg-gray-100 rounded-lg overflow-hidden">
      {images.length === 1 ? (
        <div className="w-full relative overflow-hidden">
          <div className="w-full min-h-52 relative bg-gray-200">
            <Image src={images[0]} alt={displayTitle} fill className="object-cover" />
          </div>
        </div>
      ) : images.length === 2 ? (
        <div className="grid grid-cols-2 gap-1">
          {images.map((img, idx) => (
            <div key={idx} className="relative bg-gray-200 min-h-52">
              <Image src={img} alt={`${displayTitle} ${idx + 1}`} fill className="object-cover" />
            </div>
          ))}
        </div>
      ) : images.length >= 3 ? (
        <>
          {images.length === 3 ? (
            <div className="grid grid-cols-3 gap-1">
              {images.map((img, idx) => (
                <div key={idx} className="relative bg-gray-200 min-h-52">
                  <Image
                    src={img}
                    alt={`${displayTitle} ${idx + 1}`}
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          ) : images.length === 4 ? (
            <div className="grid grid-cols-2 gap-1">
              {images.map((img, idx) => (
                <div key={idx} className="relative bg-gray-200 min-h-52">
                  <Image
                    src={img}
                    alt={`${displayTitle} ${idx + 1}`}
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 grid-rows-2 gap-1">
              {images.slice(0, 4).map((img, idx) => (
                <div key={idx} className="relative bg-gray-200 min-h-52">
                  <Image
                    src={img}
                    alt={`${displayTitle} ${idx + 1}`}
                    fill
                    className="object-cover"
                  />
                  {idx === 3 && images.length > 4 && (
                    <div className="absolute inset-0 bg-black/60 flex items-center justify-center pointer-events-none">
                      <span className="text-white text-2xl font-bold">+{images.length - 3}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </>
      ) : null}
    </div>
  );
}
