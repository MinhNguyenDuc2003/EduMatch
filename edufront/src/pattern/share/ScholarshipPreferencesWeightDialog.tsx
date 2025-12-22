import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/pattern/cus/dialog';
import { Button } from '@/pattern/cus/button';
import { Label } from '@/pattern/cus/label';
import { useUpdateScholarshipMutation } from '@/state/apiProvider';
import { Loader2, SlidersHorizontal } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { toast } from 'sonner';

const PREFERENCE_FIELDS = [
  { key: 'experience_w', label: 'Experience' },
  { key: 'career_w', label: 'Career Goals' },
  { key: 'education_w', label: 'Education' },
  { key: 'intentions_w', label: 'Future Intentions' },
  { key: 'major_w', label: 'Major' },
  { key: 'skills_w', label: 'Skills' },
  { key: 'research_w', label: 'Research' },
  { key: 'personal_statement_w', label: 'Personal Statement' },
  { key: 'motivation_w', label: 'Motivation' },
  { key: 'achievements_w', label: 'Achievements' },
  { key: 'extracurricular_w', label: 'Extracurricular Activities' },
];

interface ScholarshipPreferencesWeightDialogProps {
  scholarship: Scholarship;
  trigger?: React.ReactNode;
  refetch?: () => void;
}

export function ScholarshipPreferencesWeightDialog({
  scholarship,
  trigger,
  refetch,
}: ScholarshipPreferencesWeightDialogProps) {
  const [open, setOpen] = useState(false);
  const [updateScholarship, { isLoading: isUpdating }] = useUpdateScholarshipMutation();
  const [weights, setWeights] = useState<Record<string, number>>({});

  useEffect(() => {
    if (scholarship?.scholarshipPreferences) {
      const newWeights: Record<string, number> = {};
      scholarship.scholarshipPreferences.forEach((pref) => {
        if (pref.field && pref.weight !== undefined) {
          newWeights[pref.field] = pref.weight;
        }
      });

      // Initialize missing fields with default logic if needed, or 0.5
      PREFERENCE_FIELDS.forEach((field) => {
        if (newWeights[field.key] === undefined) {
          newWeights[field.key] = 0.5;
        }
      });
      setWeights(newWeights);
    }
  }, [scholarship]);

  const handleWeightChange = (field: string, value: string) => {
    const numValue = parseFloat(value);
    if (!isNaN(numValue) && numValue >= 0 && numValue <= 1) {
      setWeights((prev) => ({ ...prev, [field]: numValue }));
    }
  };

  const handleSave = async () => {
    try {
      const existingPrefs = scholarship.scholarshipPreferences || [];
      const finalPreferences = PREFERENCE_FIELDS.map((fieldDef) => {
        const existing = existingPrefs.find((p) => p.field === fieldDef.key);
        return {
          id: existing?.id,
          scholarshipId: scholarship.id,
          field: fieldDef.key,
          weight: weights[fieldDef.key] ?? 0,
          type: existing?.type || '',
        };
      });

      const updatedScholarship = {
        ...scholarship,
        scholarshipPreferences: finalPreferences,
      };

      await updateScholarship(updatedScholarship).unwrap();
      toast.success('Scholarship preferences updated successfully');
      setOpen(false);
      refetch?.();
    } catch (error) {
      console.error('Failed to update preferences:', error);
      toast.error('Failed to update preferences');
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button
            variant="outline"
            className="text-primary-brand hover:text-primary-brand hover:bg-primary-brand/10 border-primary-brand"
          >
            <SlidersHorizontal className="w-6 h-6" />
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="min-w-4xl ">
        <DialogHeader>
          <DialogTitle>Adjust Matching Weights</DialogTitle>
          <DialogDescription>
            Adjust the importance of each criterion for applicant matching (0.0 to 1.0).
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4 max-h-[90vh] overflow-y-auto">
          {PREFERENCE_FIELDS.map(({ key, label }) => (
            <div key={key} className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor={key}>{label}</Label>
                <span className="text-sm text-gray-500 font-mono">
                  {weights[key]?.toFixed(1) ?? '0.0'}
                </span>
              </div>
              <div className="flex items-center gap-4">
                <input
                  id={key}
                  type="range"
                  min="0"
                  max="1"
                  step="0.1"
                  value={weights[key] ?? 0}
                  onChange={(e) => handleWeightChange(key, e.target.value)}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary-brand"
                />
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-end gap-2">
          <Button
            onClick={handleSave}
            disabled={isUpdating}
            className="bg-[#3D6CB9] hover:bg-[#2F5A9E] text-white py-3 text-base font-semibold"
          >
            {isUpdating && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
            Save Changes
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
