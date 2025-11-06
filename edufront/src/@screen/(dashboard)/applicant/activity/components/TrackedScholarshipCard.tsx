'use client';

import Image from 'next/image';
import { Calendar, DollarSign, MapPin, GraduationCap, Flag, X } from 'lucide-react';
import { Button } from '@/lib/cus/button';
import { getScholarshipImages, getScholarshipFirstImage } from '@/utils/scholarshipHelpers';

type TrackedScholarshipCardProps = {
  scholarship: Scholarship;
  onViewDetails: () => void;
  onApply?: () => void;
  onUntrack?: () => void;
  showActions?: boolean;
  index: number;
};

const fallbackImage = '/static/images/default-fallback-image.png';

const formatDeadline = (endDate?: number) => {
  if (!endDate) return 'No deadline';

  try {
    const date = new Date(endDate);
    if (isNaN(date.getTime())) return 'No deadline';
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  } catch {
    return 'No deadline';
  }
};

export default function TrackedScholarshipCard({
  scholarship,
  onViewDetails,
  onApply,
  onUntrack,
  showActions = true,
  index,
}: TrackedScholarshipCardProps) {
  const imageSrc = getScholarshipFirstImage(scholarship) || fallbackImage;
  const deadlineLabel = formatDeadline(scholarship.endDate);
  const fundingLabel = scholarship.fundingAmount || '—';

  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl">
      {/* Untrack Button */}
      {onUntrack && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onUntrack();
          }}
          className="absolute right-3 top-3 z-20 rounded-full bg-white/90 p-2 shadow-md transition-all hover:bg-red-50 hover:shadow-lg"
          aria-label="Untrack scholarship"
        >
          <X className="h-4 w-4 text-slate-400 transition-colors group-hover:text-red-500" />
        </button>
      )}

      {/* Image Section */}
      <div className="relative h-48 w-full cursor-pointer overflow-hidden" onClick={onViewDetails}>
        <Image
          src={imageSrc}
          alt={scholarship.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/40 to-transparent" />

        {/* Tags on Image */}
        <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between">
          <div className="flex flex-wrap gap-2">
            {scholarship.scholarshipType && (
              <span className="rounded-full bg-white/20 px-3 py-1 text-xs font-semibold text-white backdrop-blur-sm">
                {scholarship.scholarshipType}
              </span>
            )}
            {scholarship.studyLevel && (
              <span className="rounded-full bg-blue-500/80 px-3 py-1 text-xs font-semibold text-white backdrop-blur-sm">
                {scholarship.studyLevel}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="flex flex-1 flex-col p-5">
        {/* Title & University */}
        <div className="mb-4 cursor-pointer" onClick={onViewDetails}>
          <h3 className="mb-1 text-lg font-bold leading-tight text-slate-900 transition-colors line-clamp-2 group-hover:text-blue-600">
            {scholarship.title}
          </h3>
          <p className="text-sm font-medium text-slate-600">{scholarship.university}</p>
        </div>

        {/* Description */}
        <p className="mb-4 text-sm leading-relaxed text-slate-600 line-clamp-2">
          {scholarship.shortDescription || scholarship.description}
        </p>

        {/* Info Grid */}
        <div className="mb-4 grid grid-cols-2 gap-3">
          <div className="flex items-start gap-2 rounded-lg bg-slate-50 p-3">
            <Calendar className="mt-0.5 h-4 w-4 flex-shrink-0 text-slate-500" />
            <div className="min-w-0">
              <p className="text-xs font-semibold text-slate-700">Deadline</p>
              <p className="truncate text-xs text-slate-600">{deadlineLabel}</p>
            </div>
          </div>

          <div className="flex items-start gap-2 rounded-lg bg-slate-50 p-3">
            <DollarSign className="mt-0.5 h-4 w-4 flex-shrink-0 text-slate-500" />
            <div className="min-w-0">
              <p className="text-xs font-semibold text-slate-700">Funding</p>
              <p className="truncate text-xs text-slate-600">{fundingLabel}</p>
            </div>
          </div>

          {scholarship.country && (
            <div className="col-span-2 flex items-start gap-2 rounded-lg bg-slate-50 p-3">
              <MapPin className="mt-0.5 h-4 w-4 flex-shrink-0 text-slate-500" />
              <div className="min-w-0">
                <p className="text-xs font-semibold text-slate-700">Country</p>
                <p className="truncate text-xs text-slate-600">{scholarship.country}</p>
              </div>
            </div>
          )}

          {scholarship.fields && (
            <div className="col-span-2 flex items-start gap-2 rounded-lg bg-slate-50 p-3">
              <GraduationCap className="mt-0.5 h-4 w-4 flex-shrink-0 text-slate-500" />
              <div className="min-w-0">
                <p className="text-xs font-semibold text-slate-700">Fields</p>
                <p className="text-xs text-slate-600 line-clamp-1">{scholarship.fields}</p>
              </div>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        {showActions && (onApply || onUntrack) && (
          <div className="mt-auto flex items-center gap-2 border-t border-slate-100 pt-4">
            {onUntrack && (
              <Button
                variant="outline_back"
                size="sm"
                shadown={false}
                hover={false}
                className="flex-1 text-slate-600"
                value="Remove"
                onClick={(e) => {
                  e.stopPropagation();
                  onUntrack();
                }}
              />
            )}
            {onApply && (
              <Button
                variant="outline_active_gradient"
                size="sm"
                shadown={false}
                className="flex-1 text-white"
                value="Apply Now"
                onClick={(e) => {
                  e.stopPropagation();
                  onApply();
                }}
              />
            )}
          </div>
        )}
      </div>
    </article>
  );
}
