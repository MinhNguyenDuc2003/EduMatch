import { Button } from '@/lib/cus/button';
import { Badge } from '@/lib/cus/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/lib/cus/dropdown-menu';
import {
  MoreVertical,
  Edit,
  Trash2,
  Eye,
  Calendar,
  MapPin,
  GraduationCap,
  DollarSign,
  Users,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';
import { Scholarship } from '../types';

interface ScholarshipCardProps {
  scholarship: Scholarship;
  onDelete?: (id: number) => void;
}

const formatDate = (timestamp: number) => {
  return new Date(timestamp).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

export const ScholarshipCard = ({ scholarship, onDelete }: ScholarshipCardProps) => {
  return (
    <div className="bg-[#FAFAF6] rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow group">
      {/* Content */}
      <div className="p-6">
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <h3 className="text-xl font-bold text-gray-900 mb-1 group-hover:text-primary-brand transition-colors">
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
              <DropdownMenuItem asChild className="cursor-pointer">
                <Link
                  href={`/provider/scholarships/${scholarship.id}`}
                  className="flex items-center gap-2"
                >
                  <Eye className="w-4 h-4" />
                  <span>View Details</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild className="cursor-pointer">
                <Link
                  href={`/provider/scholarships/${scholarship.id}/edit`}
                  className="flex items-center gap-2"
                >
                  <Edit className="w-4 h-4" />
                  <span>Edit</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem
                className="cursor-pointer text-red-600 focus:text-red-600 focus:bg-red-50"
                onClick={() => onDelete?.(scholarship.id)}
              >
                <Trash2 className="w-4 h-4" />
                <span>Delete</span>
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
        <div className="flex items-center gap-2 text-sm text-gray-600 ">
          <Calendar className="w-4 h-4 text-gray-400" />
          <span>
            Deadline:{' '}
            <span className="font-medium text-gray-900">{formatDate(scholarship.endDate)}</span>
          </span>
        </div>
      </div>
    </div>
  );
};
