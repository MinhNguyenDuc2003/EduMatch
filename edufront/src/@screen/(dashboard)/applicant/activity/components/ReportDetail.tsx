'use client';

import { useState } from 'react';
import { X, CheckCircle2, Clock, XCircle, AlertCircle, FileText, Trash2 } from 'lucide-react';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/pattern/cus/sheet';
import { Badge } from '@/pattern/cus/badge';
import { Button } from '@/pattern/cus/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/pattern/cus/dialog';
import { useTranslations } from 'next-intl';

type ReportDetailProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  report: MyReport | null;
  onDelete?: (reportId: number) => void;
};

const getTypeColor = (type?: ReportType) => {
  switch (type) {
    case 'SCHOLARSHIP':
      return 'bg-blue-100 text-blue-700 border-blue-300';
    case 'PROVIDER':
      return 'bg-purple-100 text-purple-700 border-purple-300';
    case 'PROFILE':
      return 'bg-pink-100 text-pink-700 border-pink-300';
    case 'SYSTEM':
      return 'bg-orange-100 text-orange-700 border-orange-300';
    default:
      return 'bg-gray-100 text-gray-700 border-gray-300';
  }
};

export default function ReportDetail({ open, onOpenChange, report, onDelete }: ReportDetailProps) {
  const t = useTranslations('activity.reportDetail');
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  if (!report) return null;

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="right"
        className="w-full p-0 sm:max-w-xl max-h-[95vh] [&>button]:hidden rounded-xl !right-4 !top-1/2 !-translate-y-1/2 flex flex-col"
      >
        <div className="flex-1 overflow-y-auto p-4 scrollbar-hide">
          <SheetHeader className="!p-0">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <SheetTitle className="text-xl font-bold text-slate-900">{t('title')}</SheetTitle>
                {report.category && (
                  <Badge
                    className={`px-3 py-1 text-sm font-medium border ${getTypeColor(report.category.type)}`}
                  >
                    {report.category.name || report.category.type}
                  </Badge>
                )}
              </div>
              <button
                onClick={() => onOpenChange(false)}
                className="p-2 hover:bg-slate-100 rounded-full transition-colors"
              >
                <X className="w-5 h-5 text-slate-600 hover:text-slate-700 transition-colors cursor-pointer" />
              </button>
            </div>
          </SheetHeader>

          <span className="text-lg text-slate-900">{report.title}</span>
          {/* Comment Section */}
          {report.comment && (
            <div className="space-y-2 mt-4">
              <h3 className="text-sm font-medium text-slate-500 flex items-center gap-2">
                {t('comment')}
              </h3>
              <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
                <p className="text-sm text-slate-700 whitespace-pre-wrap">{report.comment}</p>
              </div>
            </div>
          )}

          <div className="space-y-2 mt-4">
            {/* Category Description */}
            {report.category?.description && (
              <div className="space-y-2">
                <h3 className="text-sm font-medium text-slate-500">{t('categoryDescription')}</h3>
                <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
                  <p className="text-sm text-slate-700">{report.category.description}</p>
                </div>
              </div>
            )}

            {/* Response Section */}
            {report.response ? (
              <div className="space-y-2">
                <h3 className="text-sm font-medium text-slate-500 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4" />
                  {t('response')}
                </h3>
                <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                  <p className="text-sm text-slate-700 whitespace-pre-wrap">{report.response}</p>
                </div>
              </div>
            ) : (
              <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                <p className="text-sm text-yellow-700 flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  {t('noResponse')}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Delete Button Section - Fixed at bottom */}
        {onDelete && (
          <div className="border-t border-slate-200 p-4">
            <Button
              variant="outline"
              size="md"
              className="w-full text-red-600 border-red-300 hover:bg-red-50 hover:border-red-400"
              onClick={() => setIsDeleteDialogOpen(true)}
            >
              <Trash2 className="w-4 h-4 mr-2" />
              {t('delete')}
            </Button>
          </div>
        )}
      </SheetContent>

      {/* Delete Confirmation Dialog */}
      {onDelete && (
        <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>{t('deleteConfirmation.title')}</DialogTitle>
              <DialogDescription>
                {t('deleteConfirmation.description', {
                  reportTitle: report.title || t('noTitle'),
                })}
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setIsDeleteDialogOpen(false)}
                className="text-blue-600 border-blue-300 hover:bg-blue-50 hover:border-blue-400"
              >
                {t('deleteConfirmation.cancel')}
              </Button>
              <Button
                variant="outline"
                className="text-red-600 border-red-300 hover:bg-red-50 hover:border-red-400"
                onClick={() => {
                  onDelete(report.id);
                  setIsDeleteDialogOpen(false);
                  onOpenChange(false);
                }}
              >
                {t('deleteConfirmation.confirm')}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </Sheet>
  );
}
