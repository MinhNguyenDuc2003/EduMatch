'use client';
import { Button } from '@/lib/cus/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  if (totalPages <= 1) return null;

  // Calculate which page numbers to show
  const getVisiblePages = () => {
    const pages: (number | 'ellipsis')[] = [];
    const showPage = (index: number) => {
      return index === 0 || index === totalPages - 1 || Math.abs(index - currentPage) <= 1;
    };

    for (let i = 0; i < totalPages; i++) {
      if (showPage(i)) {
        pages.push(i);
      } else if (i === currentPage - 2 || i === currentPage + 2) {
        pages.push('ellipsis');
      }
    }

    // Remove duplicate ellipsis
    const cleaned: (number | 'ellipsis')[] = [];
    for (let i = 0; i < pages.length; i++) {
      if (pages[i] === 'ellipsis' && pages[i - 1] === 'ellipsis') {
        continue;
      }
      cleaned.push(pages[i]);
    }

    return cleaned;
  };

  const visiblePages = getVisiblePages();

  return (
    <div className="flex items-center justify-center gap-2">
      {/* Previous Button */}
      <Button
        variant="outline"
        size="sm"
        disabled={currentPage === 0}
        onClick={() => onPageChange(currentPage - 1)}
        className={cn(
          'px-4 py-2 min-h-[40px]',
          'border-slate-300 text-slate-700 bg-white',
          'hover:border-blue-500 hover:text-blue-600 hover:bg-blue-50',
          'transition-all duration-200',
          'disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:border-slate-300 disabled:hover:text-slate-700 disabled:hover:bg-white'
        )}
      >
        <ChevronLeft className="w-4 h-4 mr-1.5" />
        <span className="font-medium">Previous</span>
      </Button>

      {/* Page Numbers */}
      <div className="flex items-center gap-1.5">
        {visiblePages.map((page, idx) => {
          if (page === 'ellipsis') {
            return (
              <span key={`ellipsis-${idx}`} className="px-2 text-slate-400 font-medium select-none">
                ...
              </span>
            );
          }

          const isActive = page === currentPage;

          return (
            <Button
              key={page}
              variant="outline"
              size="sm"
              onClick={() => onPageChange(page)}
              className={cn(
                'min-w-[40px] min-h-[40px] px-3',
                'font-semibold transition-all duration-200',
                isActive
                  ? 'bg-gradient-to-br from-blue-600 to-blue-700 text-white border-blue-600 shadow-md shadow-blue-500/30 hover:from-blue-700 hover:to-blue-800 hover:shadow-lg hover:shadow-blue-500/40'
                  : 'border-slate-300 text-slate-700 bg-white hover:border-blue-500 hover:text-blue-600 hover:bg-blue-50 hover:shadow-sm'
              )}
            >
              {page + 1}
            </Button>
          );
        })}
      </div>

      {/* Next Button */}
      <Button
        variant="outline"
        size="sm"
        disabled={currentPage === totalPages - 1}
        onClick={() => onPageChange(currentPage + 1)}
        className={cn(
          'px-4 py-2 min-h-[40px]',
          'border-slate-300 text-slate-700 bg-white',
          'hover:border-blue-500 hover:text-blue-600 hover:bg-blue-50',
          'transition-all duration-200',
          'disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:border-slate-300 disabled:hover:text-slate-700 disabled:hover:bg-white'
        )}
      >
        <span className="font-medium">Next</span>
        <ChevronRight className="w-4 h-4 ml-1.5" />
      </Button>
    </div>
  );
}
