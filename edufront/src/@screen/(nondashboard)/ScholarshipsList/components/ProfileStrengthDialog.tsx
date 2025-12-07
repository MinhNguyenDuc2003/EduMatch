'use client';

import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { AlertCircle } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/pattern/cus/dialog';
import { Button } from '@/pattern/cus/button';

interface ProfileStrengthDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  profileId?: number;
}

export default function ProfileStrengthDialog({ open, onOpenChange }: ProfileStrengthDialogProps) {
  const router = useRouter();
  const t = useTranslations('scholarshipsList.premiumBanner.profileStrengthDialog');

  const handleGoToProfile = () => {
    router.push('/applicant/profile/update');
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <div className="flex items-center gap-3">
            <AlertCircle className="w-5 h-5 text-gray-600 flex-shrink-0" />
            <DialogTitle className="text-left flex-1">{t('title')}</DialogTitle>
          </div>
          <DialogDescription className="text-left mt-2">{t('description')}</DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {/* Empathetic Message */}
          <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
            <p className="text-sm text-gray-700 leading-relaxed">{t('empatheticMessage')}</p>
          </div>
        </div>

        <DialogFooter className="flex-col sm:flex-row gap-2">
          <Button
            variant="custom"
            onClick={() => onOpenChange(false)}
            className="w-full sm:w-auto text-gray-700 border border-gray-300 hover:bg-gray-50"
          >
            {t('cancel')}
          </Button>
          <Button onClick={handleGoToProfile} className="w-full sm:w-auto">
            {t('updateProfile')}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
