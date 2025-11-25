'use client';
import { useTranslations } from 'next-intl';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/lib/cus/dialog';
import ApplicantDetail from '@/pattern/share/ApplicantDetail';

interface ApplicantDetailDialogProps {
  applicant: ApplicantProfile | null;
  open: boolean;
  onClose: () => void;
}

export default function ApplicantDetailDialog({
  applicant,
  open,
  onClose,
}: ApplicantDetailDialogProps) {
  const t = useTranslations('provider.favourite.detail');

  if (!applicant) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="w-[95vw] sm:w-[90vw] md:w-[85vw] lg:min-w-7xl max-h-[90vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">{t('title')}</DialogTitle>
          <DialogDescription>{t('description')}</DialogDescription>
        </DialogHeader>

        <ApplicantDetail applicant={applicant} />
      </DialogContent>
    </Dialog>
  );
}
