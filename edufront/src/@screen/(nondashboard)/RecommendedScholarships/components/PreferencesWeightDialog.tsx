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
import { Input } from '@/pattern/cus/input';
import { useGetProfileQuery, useUpdateProfileMutation } from '@/state/apiApplicant';
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
];

export function PreferencesWeightDialog() {
  const t = useTranslations('applicantProfile.preferencesDialog');
  const [open, setOpen] = useState(false);
  const { data: profileData, isLoading: isLoadingProfile } = useGetProfileQuery();
  const [updateProfile, { isLoading: isUpdating }] = useUpdateProfileMutation();

  const [weights, setWeights] = useState<Record<string, number>>({});

  useEffect(() => {
    if (profileData?.applicantProfile?.applicantPreferences) {
      const newWeights: Record<string, number> = {};
      profileData.applicantProfile.applicantPreferences.forEach((pref) => {
        if (pref.field && pref.weight !== undefined) {
          newWeights[pref.field] = pref.weight;
        }
      });
      // Initialize missing fields with default logic if needed, or 0
      PREFERENCE_FIELDS.forEach((field) => {
        if (newWeights[field.key] === undefined) {
          newWeights[field.key] = 0.5; // Default value if missing
        }
      });
      setWeights(newWeights);
    }
  }, [profileData]);

  const handleWeightChange = (field: string, value: string) => {
    const numValue = parseFloat(value);
    if (!isNaN(numValue) && numValue >= 0 && numValue <= 1) {
      setWeights((prev) => ({ ...prev, [field]: numValue }));
    }
  };

  const handleSave = async () => {
    if (!profileData?.applicantProfile) return;

    try {
      const updatedPreferences = Object.entries(weights).map(([field, weight]) => ({
        field,
        weight,
        type: '', // Assuming type is optional or handled by backend if empty string
      }));

      // Merge with existing preferences to keep IDs if they exist (to update instead of recreate if backend requires IDs)
      // But looking at previous logic, it seems we might just be sending the array.
      // However, to be safe, let's map over existing ones and update weights, and add new ones if missing.

      const existingPrefs = profileData.applicantProfile.applicantPreferences || [];
      const finalPreferences = PREFERENCE_FIELDS.map((fieldDef) => {
        const existing = existingPrefs.find((p) => p.field === fieldDef.key);
        return {
          id: existing?.id,
          applicantId: existing?.applicantId,
          field: fieldDef.key,
          weight: weights[fieldDef.key] ?? 0,
          type: existing?.type || '',
        };
      });

      const updatedProfile = {
        ...profileData.applicantProfile,
        applicantPreferences: finalPreferences,
      };

      await updateProfile({ applicantProfile: updatedProfile }).unwrap();
      toast.success('Preferences updated successfully');
      setOpen(false);
    } catch (error) {
      console.error('Failed to update preferences:', error);
      toast.error('Failed to update preferences');
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="text-primary-brand hover:text-primary-brand hover:bg-primary-brand/10 border-primary-brand"
        >
          <SlidersHorizontal className="w-6 h-6" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Adjust Matching Weights</DialogTitle>
          <DialogDescription>
            Adjust the importance of each criterion for scholarship matching (0.0 to 1.0).
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4 max-h-[60vh] overflow-y-auto">
          {isLoadingProfile ? (
            <div className="flex justify-center p-4">
              <Loader2 className="w-6 h-6 animate-spin" />
            </div>
          ) : (
            PREFERENCE_FIELDS.map(({ key, label }) => (
              <div key={key} className="space-y-2 ">
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
            ))
          )}
        </div>
        <div className="flex justify-end gap-2">
          <Button
            onClick={handleSave}
            disabled={isUpdating || isLoadingProfile}
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
