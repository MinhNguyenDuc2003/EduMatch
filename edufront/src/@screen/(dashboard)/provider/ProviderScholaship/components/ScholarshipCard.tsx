import { Button } from '@/pattern/cus/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/pattern/cus/dropdown-menu';
import { Skeleton } from '@/pattern/cus/skeleton';
import { Badge } from '@/pattern/cus/badge';
import { cn } from '@/lib/utils';
import { formatDate } from '@/utils/formatDate';
import {
  MoreVertical,
  Edit,
  Trash2,
  Calendar,
  MapPin,
  GraduationCap,
  DollarSign,
  Users,
  Eye,
  Sparkles,
} from 'lucide-react';
import { useTranslations } from 'next-intl';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface ScholarshipCardProps {
  scholarship: Scholarship;
  onDelete?: (id: number) => void;
  className?: string;
  variant?: 'small' | 'medium';
  setSelectedScholarshipId?: (id: number) => void;
  setShowAISuggestions?: (show: boolean) => void;
}

interface ScholarshipCardSkeletonProps {
  variant?: 'small' | 'medium';
  className?: string;
}

export const ScholarshipCardSkeleton = ({
  variant = 'medium',
  className,
}: ScholarshipCardSkeletonProps) => {
  const cardContent = () => {
    switch (variant) {
      case 'small':
        return (
          <div className="p-3">
            <Skeleton className="h-4 w-3/4 mb-2" />
            <Skeleton className="h-4 w-full mb-1" />
            <Skeleton className="h-3 w-2/3 mb-3" />
            <div className="flex flex-wrap gap-2">
              <Skeleton className="h-3 w-20" />
              <Skeleton className="h-3 w-24" />
            </div>
          </div>
        );
      case 'medium':
      default:
        return (
          <div className="p-6">
            {/* Header with title, description, and dropdown */}
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <Skeleton className="h-6 w-3/4 mb-2" />
                <Skeleton className="h-4 w-full mb-1" />
                <Skeleton className="h-4 w-5/6" />
              </div>
              <Skeleton className="h-8 w-8 rounded-md" />
            </div>

            {/* Info Grid */}
            <div className="grid grid-cols-2 gap-3 mb-4">
              <div className="flex items-center gap-2">
                <Skeleton className="h-4 w-4" />
                <Skeleton className="h-4 w-20" />
              </div>
              <div className="flex items-center gap-2">
                <Skeleton className="h-4 w-4" />
                <Skeleton className="h-4 w-24" />
              </div>
              <div className="flex items-center gap-2">
                <Skeleton className="h-4 w-4" />
                <Skeleton className="h-4 w-28" />
              </div>
              <div className="flex items-center gap-2">
                <Skeleton className="h-4 w-4" />
                <Skeleton className="h-4 w-16" />
              </div>
            </div>

            {/* University */}
            <div className="mb-4">
              <Skeleton className="h-4 w-40 mb-2" />
              <Skeleton className="h-3 w-32" />
            </div>

            {/* Deadline */}
            <div className="flex items-center gap-2">
              <Skeleton className="h-4 w-4" />
              <Skeleton className="h-4 w-36" />
            </div>
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

export const ScholarshipCard = ({
  scholarship,
  onDelete,
  className,
  variant = 'medium',
}: ScholarshipCardProps) => {
  const t = useTranslations('action');
  const router = useRouter();

  const isExpired = scholarship.endDate < new Date().getTime();

  const cardContent = () => {
    switch (variant) {
      case 'small':
        return (
          <div className="p-3">
            <div className="mb-2">
              <Badge
                variant={isExpired ? 'destructive' : 'secondary'}
                className={
                  isExpired ? '' : 'bg-green-100 text-green-700 hover:bg-green-200 border-green-200'
                }
              >
                {isExpired ? 'Expired' : 'Active'}
              </Badge>
              <Badge
                variant={scholarship.status === 'Banned' ? 'destructive' : 'outline'}
                className={cn(
                  'ml-2',
                  scholarship.status === 'Public'
                    ? 'bg-blue-100 text-blue-700 border-blue-200'
                    : scholarship.status === 'Private'
                      ? 'bg-gray-100 text-gray-700 border-gray-200'
                      : ''
                )}
              >
                {scholarship.status}
              </Badge>
            </div>
            <h3 className="font-semibold text-sm mb-2 line-clamp-2 text-gray-900">
              {scholarship.title}
            </h3>
            <p className="text-xs text-gray-600 mb-3 line-clamp-2">
              {scholarship.shortDescription}
            </p>
            <div className="flex flex-wrap gap-2 text-xs text-gray-500">
              <div className="flex items-center gap-1">
                <DollarSign className="w-3 h-3" />
                <span>{scholarship.fundingAmount}</span>
              </div>
              <div className="flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                <span>{formatDate(scholarship.endDate)}</span>
              </div>
              <div className="flex items-center gap-1">
                <Eye className="w-3 h-3" />
                <span>{scholarship.views}</span>
              </div>
            </div>
          </div>
        );
      case 'medium':
        return (
          <div className="p-6">
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <div className="mb-2">
                  <Badge
                    variant={isExpired ? 'destructive' : 'secondary'}
                    className={
                      isExpired
                        ? ''
                        : 'bg-green-100 text-green-700 hover:bg-green-200 border-green-200'
                    }
                  >
                    {isExpired ? 'Expired' : 'Active'}
                  </Badge>
                  <Badge
                    variant={scholarship.status === 'Banned' ? 'destructive' : 'outline'}
                    className={cn(
                      'ml-2',
                      scholarship.status === 'Public'
                        ? 'bg-blue-100 text-blue-700 border-blue-200'
                        : scholarship.status === 'Private'
                          ? 'bg-gray-100 text-gray-700 border-gray-200'
                          : ''
                    )}
                  >
                    {scholarship.status}
                  </Badge>
                </div>
                <h3
                  className="text-xl line-clamp-1 font-bold text-gray-900 mb-1 group-hover:text-primary-brand transition-colors cursor-pointer"
                  onClick={() => router.push(`/provider/scholarships/${scholarship.slug}`)}
                >
                  {scholarship.title}
                </h3>
                <p className="text-sm text-gray-600 line-clamp-2">{scholarship.shortDescription}</p>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-8 w-8 shadow-none">
                    <MoreVertical className="w-4 h-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem
                    asChild
                    className={cn(
                      'cursor-pointer',
                      scholarship.status === 'Banned' && 'opacity-50 pointer-events-none'
                    )}
                  >
                    <Link
                      href={
                        scholarship.status === 'Banned'
                          ? '#'
                          : `/provider/scholarships/update/${scholarship.id}`
                      }
                      className="flex items-center gap-2"
                      aria-disabled={scholarship.status === 'Banned'}
                    >
                      <Edit className="w-4 h-4" />
                      <span>{t('edit')}</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="cursor-pointer text-red-600 focus:text-red-600 focus:bg-red-50"
                    onClick={() => onDelete?.(scholarship.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                    <span>{t('delete')}</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            {/* Info Grid */}
            <div className="grid grid-cols-2 gap-3 mb-4">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <MapPin className="w-4 h-4 text-gray-400" />
                <span className="truncate">{scholarship.country}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <GraduationCap className="w-4 h-4 text-gray-400" />
                <span className="truncate">{scholarship.studyLevel}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <DollarSign className="w-4 h-4 text-gray-400" />
                <span className="truncate font-medium">{scholarship.fundingAmount}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Users className="w-4 h-4 text-gray-400" />
                <span className="truncate">{scholarship.availableSlots} slots</span>
              </div>
            </div>

            {/* University */}
            <div className="mb-4">
              <p className="text-sm font-semibold text-gray-900">{scholarship.university}</p>
              <p className="text-xs text-gray-500">{scholarship.fields}</p>
            </div>

            {/* Deadline */}
            <div className="flex items-center justify-between text-sm text-gray-600 ">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-gray-400" />
                <span>
                  Deadline:{' '}
                  <span className="font-medium text-gray-900">
                    {formatDate(scholarship.endDate)}
                  </span>
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Eye className="w-4 h-4 text-gray-400" />
                <span>
                  Reached: <span className="font-medium text-gray-900">{scholarship.views}</span>
                </span>
              </div>
            </div>
          </div>
        );
      default:
        return (
          <div className="p-6">
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <div className="mb-2">
                  <Badge
                    variant={isExpired ? 'destructive' : 'secondary'}
                    className={
                      isExpired
                        ? ''
                        : 'bg-green-100 text-green-700 hover:bg-green-200 border-green-200'
                    }
                  >
                    {isExpired ? 'Expired' : 'Active'}
                  </Badge>
                  <Badge
                    variant={scholarship.status === 'Banned' ? 'destructive' : 'outline'}
                    className={cn(
                      'ml-2',
                      scholarship.status === 'Public'
                        ? 'bg-blue-100 text-blue-700 border-blue-200'
                        : scholarship.status === 'Private'
                          ? 'bg-gray-100 text-gray-700 border-gray-200'
                          : ''
                    )}
                  >
                    {scholarship.status}
                  </Badge>
                </div>
                <h3 className="text-xl line-clamp-1 font-bold text-gray-900 mb-1 group-hover:text-primary-brand transition-colors">
                  {scholarship.title}
                </h3>
                <p className="text-sm text-gray-600 line-clamp-2">{scholarship.shortDescription}</p>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-8 w-8 shadow-none">
                    <MoreVertical className="w-4 h-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem
                    asChild
                    className={cn(
                      'cursor-pointer',
                      scholarship.status === 'Banned' && 'opacity-50 pointer-events-none'
                    )}
                  >
                    <Link
                      href={
                        scholarship.status === 'Banned'
                          ? '#'
                          : `/provider/scholarships/update/${scholarship.id}`
                      }
                      className="flex items-center gap-2"
                      aria-disabled={scholarship.status === 'Banned'}
                    >
                      <Edit className="w-4 h-4" />
                      <span>{t('edit')}</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="cursor-pointer text-red-600 focus:text-red-600 focus:bg-red-50"
                    onClick={() => onDelete?.(scholarship.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                    <span>{t('delete')}</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            {/* Info Grid */}
            <div className="grid grid-cols-2 gap-3 mb-4">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <MapPin className="w-4 h-4 text-gray-400" />
                <span className="truncate">{scholarship.country}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <GraduationCap className="w-4 h-4 text-gray-400" />
                <span className="truncate">{scholarship.studyLevel}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <DollarSign className="w-4 h-4 text-gray-400" />
                <span className="truncate font-medium">{scholarship.fundingAmount}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Users className="w-4 h-4 text-gray-400" />
                <span className="truncate">{scholarship.availableSlots} slots</span>
              </div>
            </div>

            {/* University */}
            <div className="mb-4">
              <p className="text-sm font-semibold text-gray-900">{scholarship.university}</p>
              <p className="text-xs text-gray-500">{scholarship.fields}</p>
            </div>

            {/* Deadline */}
            <div className="flex items-center justify-between text-sm text-gray-600 ">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-gray-400" />
                <span>
                  Deadline:{' '}
                  <span className="font-medium text-gray-900">
                    {formatDate(scholarship.endDate)}
                  </span>
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Eye className="w-4 h-4 text-gray-400" />
                <span>
                  Reached: <span className="font-medium text-gray-900">{scholarship.views}</span>
                </span>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div
      className={cn(
        'bg-[#FAFAF6] rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow group',
        className
      )}
    >
      {cardContent()}
    </div>
  );
};
