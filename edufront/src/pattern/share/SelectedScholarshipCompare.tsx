'use client';

import { useState } from 'react';
import { useScholarshipCompareStore } from '@/store/scholarshipCompareStore';
import {
  X,
  ChevronUp,
  ChevronDown,
  ArrowRightLeft,
  Calendar,
  DollarSign,
  MapPin,
  GraduationCap,
} from 'lucide-react';
import { Button } from '@/lib/cus/button';
import { usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetClose } from '@/lib/cus/sheet';
import { useAuth } from '@/hooks/useAuth';

export default function SelectedScholarshipCompare() {
  const pathname = usePathname();
  const { isAuthenticated } = useAuth();
  const { scholarships, removeScholarship, clearAll } = useScholarshipCompareStore();
  const [isExpanded, setIsExpanded] = useState(false);
  const [isCompareSheetOpen, setIsCompareSheetOpen] = useState(false);
  const t = useTranslations('selectedScholarshipCompare');
  const tCompare = useTranslations('scholarshipCompare');

  if (pathname?.includes('/provider') || !isAuthenticated) {
    return null;
  }

  if (scholarships.length === 0) {
    return null;
  }

  return (
    <div className="fixed bottom-[-1px] left-4 z-50 w-80">
      <div className="bg-white rounded-t-lg shadow-lg border border-gray-200 overflow-hidden">
        <div
          className="flex items-center justify-between gap-4 px-4 py-2 bg-[#3D6CB9] border-gray-200 cursor-pointer"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <div className="flex items-center gap-2">
            <span className="font-semibold text-white text-sm">
              {t('title', { number: scholarships.length })}
            </span>
          </div>
          <div className="flex items-center gap-2">
            {scholarships.length > 0 && (
              <Button
                variant="custom"
                className="text-xs text-gray-900 hover:text-gray-200 !px-2 !py-1 !h-auto whitespace-nowrap"
                onClick={(e) => {
                  e.stopPropagation();
                  clearAll();
                }}
              >
                {t('clearAll')}
              </Button>
            )}
            <div className={isExpanded ? 'rotate-180' : ''}>
              <ChevronUp className="w-4 h-4 text-white transition-transform" />
            </div>
          </div>
        </div>

        {isExpanded && (
          <div className="max-h-64 overflow-y-auto">
            {scholarships.map((scholarship) => (
              <div
                key={scholarship.id}
                className="flex items-center justify-between p-3 border-b border-gray-100 hover:bg-gray-50 transition-colors"
              >
                <div className="flex-1 min-w-0 pr-2">
                  <p className="text-sm font-medium text-gray-900 truncate">{scholarship.title}</p>
                  {scholarship.university && (
                    <p className="text-xs text-gray-500 truncate mt-0.5">
                      {scholarship.university}
                    </p>
                  )}
                </div>
                <Button
                  variant="custom"
                  className="text-gray-400 hover:text-red-600 !p-1 !h-auto flex-shrink-0"
                  onClick={(e) => {
                    e.stopPropagation();
                    removeScholarship(scholarship.id);
                  }}
                  aria-label={t('remove')}
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            ))}
            {scholarships.length >= 2 && (
              <div className="p-3 border-t border-gray-200 bg-gray-50">
                <Button
                  variant="custom"
                  className="w-full bg-[#3D6CB9] hover:bg-[#2F5A9E] text-white !py-2 !h-auto text-sm font-semibold"
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsCompareSheetOpen(true);
                  }}
                >
                  {t('compareButton')}
                </Button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Compare Sheet */}
      <Sheet open={isCompareSheetOpen} onOpenChange={setIsCompareSheetOpen}>
        <SheetContent
          side="right"
          className="w-full sm:max-w-4xl lg:max-w-6xl max-h-[100vh] overflow-y-auto [&>button]:hidden"
        >
          <SheetHeader className="!p-0 mb-4">
            <div className="flex items-center justify-between">
              <SheetTitle>{tCompare('title')}</SheetTitle>
              <SheetClose className="rounded-full bg-white p-2 shadow-lg ring-1 ring-gray-200 transition-opacity hover:opacity-70 focus:outline-none focus:ring-2 focus:ring-offset-2">
                <X className="h-4 w-4 text-gray-700" />
              </SheetClose>
            </div>
          </SheetHeader>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b-2 border-gray-200">
                  <th className="text-left p-3 font-semibold text-gray-700 min-w-[200px]">
                    {tCompare('scholarship')}
                  </th>
                  {scholarships.map((scholarship) => (
                    <th
                      key={scholarship.id}
                      className="text-left p-3 font-semibold text-gray-700 min-w-[250px] border-l border-gray-200"
                    >
                      <div>
                        <p className="font-semibold text-gray-900">{scholarship.title}</p>
                        {scholarship.university && (
                          <p className="text-xs text-gray-500 mt-1">{scholarship.university}</p>
                        )}
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {/* Provider/Organization */}
                <tr className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="p-3 font-medium text-gray-700">
                    <div className="flex items-center gap-2">
                      <GraduationCap className="w-4 h-4 text-gray-500" />
                      {tCompare('provider')}
                    </div>
                  </td>
                  {scholarships.map((scholarship) => (
                    <td key={scholarship.id} className="p-3 text-gray-900 border-l border-gray-100">
                      {scholarship.providerProfileVo?.organizationName || '-'}
                    </td>
                  ))}
                </tr>

                {/* Country */}
                <tr className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="p-3 font-medium text-gray-700">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-gray-500" />
                      {tCompare('country')}
                    </div>
                  </td>
                  {scholarships.map((scholarship) => (
                    <td key={scholarship.id} className="p-3 text-gray-900 border-l border-gray-100">
                      {scholarship.country || '-'}
                    </td>
                  ))}
                </tr>

                {/* University */}
                <tr className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="p-3 font-medium text-gray-700">
                    <div className="flex items-center gap-2">
                      <GraduationCap className="w-4 h-4 text-gray-500" />
                      {tCompare('university')}
                    </div>
                  </td>
                  {scholarships.map((scholarship) => (
                    <td key={scholarship.id} className="p-3 text-gray-900 border-l border-gray-100">
                      {scholarship.university || '-'}
                    </td>
                  ))}
                </tr>

                {/* Study Level */}
                <tr className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="p-3 font-medium text-gray-700">{tCompare('studyLevel')}</td>
                  {scholarships.map((scholarship) => (
                    <td key={scholarship.id} className="p-3 text-gray-900 border-l border-gray-100">
                      {scholarship.studyLevel || '-'}
                    </td>
                  ))}
                </tr>

                {/* Scholarship Type */}
                <tr className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="p-3 font-medium text-gray-700">{tCompare('scholarshipType')}</td>
                  {scholarships.map((scholarship) => (
                    <td key={scholarship.id} className="p-3 text-gray-900 border-l border-gray-100">
                      {scholarship.scholarshipType || '-'}
                    </td>
                  ))}
                </tr>

                {/* Funding Amount */}
                <tr className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="p-3 font-medium text-gray-700">
                    <div className="flex items-center gap-2">
                      <DollarSign className="w-4 h-4 text-gray-500" />
                      {tCompare('fundingAmount')}
                    </div>
                  </td>
                  {scholarships.map((scholarship) => (
                    <td key={scholarship.id} className="p-3 text-gray-900 border-l border-gray-100">
                      {scholarship.fundingAmount || '-'}
                    </td>
                  ))}
                </tr>

                {/* End Date */}
                <tr className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="p-3 font-medium text-gray-700">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-gray-500" />
                      {tCompare('deadline')}
                    </div>
                  </td>
                  {scholarships.map((scholarship) => (
                    <td key={scholarship.id} className="p-3 text-gray-900 border-l border-gray-100">
                      {scholarship.endDate
                        ? new Date(scholarship.endDate).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric',
                          })
                        : '-'}
                    </td>
                  ))}
                </tr>

                {/* GPA Requirement */}
                <tr className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="p-3 font-medium text-gray-700">{tCompare('gpaRequirement')}</td>
                  {scholarships.map((scholarship) => (
                    <td key={scholarship.id} className="p-3 text-gray-900 border-l border-gray-100">
                      {scholarship.gpaRequirement ? `${scholarship.gpaRequirement}/4.0` : '-'}
                    </td>
                  ))}
                </tr>

                {/* Language Requirement */}
                <tr className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="p-3 font-medium text-gray-700">
                    {tCompare('languageRequirement')}
                  </td>
                  {scholarships.map((scholarship) => (
                    <td key={scholarship.id} className="p-3 text-gray-900 border-l border-gray-100">
                      {scholarship.languageRequirement || '-'}
                    </td>
                  ))}
                </tr>

                {/* Available Slots */}
                <tr className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="p-3 font-medium text-gray-700">{tCompare('availableSlots')}</td>
                  {scholarships.map((scholarship) => (
                    <td key={scholarship.id} className="p-3 text-gray-900 border-l border-gray-100">
                      {scholarship.availableSlots || '-'}
                    </td>
                  ))}
                </tr>

                {/* Description */}
                <tr className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="p-3 font-medium text-gray-700">{tCompare('description')}</td>
                  {scholarships.map((scholarship) => (
                    <td key={scholarship.id} className="p-3 text-gray-900 border-l border-gray-100">
                      <p className="text-sm line-clamp-3">
                        {scholarship.shortDescription || scholarship.description || '-'}
                      </p>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
