'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import {
  Flag,
  Calendar,
  DollarSign,
  X,
  ChevronLeft,
  ChevronRight,
  Eye,
  EllipsisVertical,
  OctagonAlert,
  ArrowRightLeft,
  Info,
} from 'lucide-react';
import { Button } from '@/pattern/cus/button';
import ScholarshipCardImages from './ScholarshipCardImages';
import { getScholarshipImages } from '@/utils/scholarshipHelpers';
import { useAuth } from '@/hooks/useAuth';
import { useTranslations } from 'next-intl';
import { useScholarshipCompareStore } from '@/hooks/useScholarshipCompare';
import { toast } from 'sonner';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/pattern/cus/dropdown-menu';
import ReportDialog from '@/pattern/share/ReportDialog';
import RecommendedScholarshipDetail from '@/pattern/share/RecommendedScholarshipDetail';

type ScholarshipCardProps = {
  applicantProfile?: ApplicantProfile;
  scholarship: Scholarship;
  onApply: (scholarship: Scholarship) => void;
  onToggleTracking?: (scholarshipId: number) => void;
  onFollowProvider?: (providerId: number) => void;
  onViewScholarship?: (slug: string) => void;
  onViewProvider?: (providerId: number) => void;
  score?: number;
};

export default function ScholarshipCard({
  applicantProfile,
  scholarship,
  onApply,
  onFollowProvider,
  onToggleTracking,
  onViewScholarship,
  onViewProvider,
  score,
}: ScholarshipCardProps) {
  const { isAuthenticated, subscriptions } = useAuth();
  const [isImageZoomed, setIsImageZoomed] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isReportDialogOpen, setIsReportDialogOpen] = useState(false);
  const [isDetailSheetOpen, setIsDetailSheetOpen] = useState(false);
  const t = useTranslations('scholarshipsList.scholarshipCard');
  const tToast = useTranslations('toast');
  const { addScholarship, isScholarshipSelected, scholarships } = useScholarshipCompareStore();

  const images = getScholarshipImages(scholarship);
  const { logoUrl, organizationName, isFollow, id } = scholarship.providerProfileVo;
  const isSelected = isScholarshipSelected(scholarship.id);
  const isUpgraded = subscriptions.some((subscription) => subscription.userType === 'APPLICANT');

  const handleCompareClick = () => {
    if (isSelected) {
      toast.info(tToast('scholarshipAlreadySelected'));
      return;
    }
    if (scholarships.length >= 3) {
      toast.warning(tToast('scholarshipMaxSelected'));
      return;
    }
    addScholarship(scholarship);
    toast.success(tToast('scholarshipAdded'));
  };

  return (
    <>
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
        {/* Organization Header */}
        <div className="p-4 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div
                className="w-10 h-10 rounded-md flex items-center justify-center text-white text-sm font-bold flex-shrink-0 cursor-pointer relative"
                onClick={() => onViewProvider?.(id)}
              >
                {logoUrl ? (
                  <Image
                    src={logoUrl}
                    alt={organizationName || t('organizationLogo')}
                    fill
                    className="rounded-md object-cover bg-white"
                  />
                ) : (
                  <div className="w-10 h-10 rounded-md bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white text-sm font-bold flex-shrink-0 cursor-pointer">
                    {organizationName.charAt(0) || 'O'}
                  </div>
                )}
              </div>
              <div>
                <h3
                  className="font-semibold text-gray-900 text-sm transition-colors cursor-pointer hover:underline"
                  onClick={() => onViewProvider?.(id)}
                >
                  {organizationName || t('organizationName')}
                </h3>
                {isAuthenticated && (
                  <button
                    onClick={() => onFollowProvider?.(id)}
                    className={`text-xs font-medium hover:cursor-pointer px-2 py-1 rounded transition-colors ${
                      isFollow === 1
                        ? 'text-blue-700 bg-blue-50 hover:bg-blue-100'
                        : 'text-gray-600 bg-gray-50 hover:bg-blue-50 hover:text-blue-700'
                    }`}
                  >
                    {isFollow === 1 ? t('following') : t('follow')}
                  </button>
                )}
              </div>
            </div>
            {isAuthenticated && (
              <div className="flex items-center gap-2">
                {isUpgraded && (
                  <>
                    {scholarship.llmScore && scholarship.cosineScore && (
                      <Button
                        variant="custom"
                        className="text-[#3D6CB9] !border-none !shadow-none !p-0 hover:translate-none"
                        onClick={() => setIsDetailSheetOpen(true)}
                      >
                        <Info className="w-5 h-5" />
                      </Button>
                    )}
                    <Button
                      variant="custom"
                      className="text-[#3D6CB9] !border-none !shadow-none !p-0 hover:translate-none"
                      onClick={handleCompareClick}
                    >
                      <ArrowRightLeft className="w-5 h-5" />
                    </Button>
                  </>
                )}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="custom"
                      className="text-[#3D6CB9] !border-none !shadow-none !p-0 hover:translate-none"
                    >
                      <EllipsisVertical className="w-5 h-5" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    {onToggleTracking && (
                      <DropdownMenuItem
                        onClick={() => onToggleTracking?.(scholarship.id)}
                        className="cursor-pointer"
                      >
                        <Flag
                          className={`w-4 h-4 mr-2 transition-colors ${
                            scholarship.isFollow === 1
                              ? 'fill-blue-600 text-blue-600'
                              : 'text-gray-400'
                          }`}
                        />
                        <span>
                          {scholarship.isFollow === 1 ? 'Untrack Scholarship' : 'Track Scholarship'}
                        </span>
                      </DropdownMenuItem>
                    )}

                    <DropdownMenuItem
                      onClick={() => setIsReportDialogOpen(true)}
                      className="cursor-pointer"
                    >
                      <OctagonAlert className="w-4 h-4 mr-2" />
                      <span>{t('report')}</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              // <button
              //   onClick={() => onToggleTracking?.(scholarship.id)}
              //   className="p-2 rounded-full hover:bg-gray-100 transition-colors"
              //   aria-label={
              //     scholarship.isFollow === 1 ? t('untrackScholarship') : t('trackScholarship')
              //   }
              // >
              //   <Flag
              //     className={`w-5 h-5 transition-colors ${
              //       scholarship.isFollow === 1 ? 'fill-blue-600 text-blue-600' : 'text-gray-400'
              //     }`}
              //   />
              // </button>
            )}
          </div>
        </div>

        {/* Image */}
        <ScholarshipCardImages
          images={images}
          title={scholarship.title}
          onImageClick={(index) => {
            setSelectedImageIndex(index);
            setIsImageZoomed(true);
          }}
        />

        {/* Content */}
        <div className="p-5">
          {/* Title & Description - Clickable Area */}
          <div
            className="cursor-pointer group"
            onClick={() => onViewScholarship?.(scholarship.slug)}
          >
            {/* Title */}
            <h2 className="text-base font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
              {scholarship.title}
            </h2>

            {/* Score Bar - Only show if score exists and user is upgraded */}
            {score !== undefined && score !== null && isUpgraded && (
              <div className="mb-3">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs font-medium text-gray-600">{t('matchScore')}</span>
                  <span className="text-xs font-bold text-gray-900">
                    {(((score * 100) / 380) * 100).toFixed(1)}%
                  </span>
                </div>
                <div className="w-full h-2.5 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{
                      width: `${(((score * 100) / 380) * 100).toFixed(1)}%`,
                      background: `linear-gradient(to right, 
                        rgb(29, 78, 216) 0%, 
                        rgb(37, 99, 235) 33%, 
                        rgb(59, 130, 246) 66%, 
                        rgb(96, 165, 250) 100%`,
                    }}
                  />
                </div>
              </div>
            )}

            {/* Description */}
            <p className="text-gray-900 text-sm leading-relaxed mb-3 line-clamp-3">
              {scholarship.description || scholarship.shortDescription}
            </p>
          </div>

          {/* Info Tags */}
          {(scholarship.university || scholarship.scholarshipType || scholarship.studyLevel) && (
            <div className="space-y-2 mb-3 text-xs">
              {scholarship.university && (
                <div className="flex items-center gap-2">
                  <span className="text-gray-500 font-medium min-w-[80px]">{t('university')}:</span>
                  <span className="text-gray-900">{scholarship.university}</span>
                </div>
              )}
              {scholarship.studyLevel && (
                <div className="flex items-center gap-2">
                  <span className="text-gray-500 font-medium min-w-[80px]">{t('level')}:</span>
                  <span className="text-gray-900">{scholarship.studyLevel}</span>
                </div>
              )}
              {scholarship.scholarshipType && (
                <div className="flex items-center gap-2">
                  <span className="text-gray-500 font-medium min-w-[80px]">{t('type')}:</span>
                  <span className="text-gray-900">{scholarship.scholarshipType}</span>
                </div>
              )}
            </div>
          )}

          {/* Footer */}
          <div className="flex justify-between items-center pt-3 border-t border-gray-100">
            {/* Date & Amount */}
            <div className="flex items-center gap-4 text-sm text-gray-600">
              {/* Date */}
              <div className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4" />
                <span className=" font-semibold text-gray-900">
                  {scholarship.endDate
                    ? new Date(scholarship.endDate).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                      })
                    : t('noDeadline')}
                </span>
              </div>

              {/* Amount */}
              <div className="flex items-center gap-1.5">
                <DollarSign className="w-4 h-4" />
                <span className="font-semibold text-gray-900">{scholarship.fundingAmount}</span>
              </div>
            </div>

            {/* View */}
            {scholarship.views > 0 && (
              <div className="flex items-center gap-1.5 text-gray-600">
                <Eye className="w-4 h-4" />
                <span className="font-semibold">{scholarship.views || 0}</span>
              </div>
            )}

            {/* Action Buttons
            <div className="flex items-center gap-2">
              <Button
                className="bg-gradient-to-r from-blue-700 to-blue-800 hover:from-blue-800 hover:to-blue-900 text-white px-4 py-1.5 rounded-lg font-semibold shadow-md hover:shadow-lg transition-all [&_.value]:text-white text-sm"
                value="Apply"
                onClick={() => onApply(scholarship)}
              />
            </div> */}
          </div>
        </div>

        {/* Full Screen Image Modal */}
        {isImageZoomed && images.length > 0 && (
          <div
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
            onClick={() => setIsImageZoomed(false)}
          >
            <div className="relative max-w-7xl max-h-full w-full h-full flex items-center justify-center">
              <Image
                src={images[selectedImageIndex]}
                alt={`${scholarship.title} ${selectedImageIndex + 1}`}
                width={1200}
                height={800}
                className="max-w-full max-h-[90vh] object-contain"
                onClick={(e) => e.stopPropagation()}
              />
              <button
                className="absolute top-4 right-4 p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors"
                onClick={() => setIsImageZoomed(false)}
              >
                <X className="h-6 w-6 text-white" />
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
                    <ChevronLeft className="h-6 w-6 text-white" />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedImageIndex((prev) => (prev + 1) % images.length);
                    }}
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center text-white text-xl font-bold transition-colors"
                  >
                    <ChevronRight className="h-6 w-6 text-white" />
                  </button>
                </>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Report Dialog */}
      <ReportDialog
        open={isReportDialogOpen}
        onOpenChange={setIsReportDialogOpen}
        initialType="SCHOLARSHIP"
        id={scholarship.id}
        scholarshipData={scholarship}
      />

      {/* Detail Sheet */}
      <RecommendedScholarshipDetail
        scholarship={scholarship}
        applicantProfile={applicantProfile}
        open={isDetailSheetOpen}
        onOpenChange={setIsDetailSheetOpen}
      />
    </>
  );
}
