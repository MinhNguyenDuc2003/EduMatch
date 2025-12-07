import { Button } from '@/pattern/cus/button';
import { Checkbox } from '@/pattern/cus/checkbox';
import {
  useAddFavouriteApplicantMutation,
  useGetProfileQuery,
  useReferApplicantsMutation,
} from '@/state/apiProvider';
import { Eye, Heart, Loader2, MapPin } from 'lucide-react';
import { useTranslations } from 'next-intl';
import React, { useState } from 'react';
import { toast } from 'sonner';

const ApplicantsList = ({
  applicants,
  setDetailApplicant,
  scholarshipId,
}: {
  applicants: ApplicantProfile[];
  setDetailApplicant: (applicant: ApplicantProfile) => void;
  scholarshipId: number;
}) => {
  const [selectedApplicants, setSelectedApplicants] = useState<string[]>([]);

  const t = useTranslations('aiApplicantSuggestions');

  const [referApplicants, { isLoading: isReferApplicantsLoading }] = useReferApplicantsMutation();
  const { data } = useGetProfileQuery();
  const [addFavouriteApplicant, { isLoading: isAddFavouriteApplicantLoading }] =
    useAddFavouriteApplicantMutation();

  const toggleApplicantSelection = (userId: string) => {
    if (selectedApplicants.includes(userId)) {
      setSelectedApplicants(selectedApplicants.filter((id) => id !== userId));
    } else {
      setSelectedApplicants([...selectedApplicants, userId]);
    }
  };

  const handleSaveSelected = async () => {
    try {
      await referApplicants({ scholarshipId, userIds: selectedApplicants })
        .unwrap()
        .then((response) => {
          if (response) {
            toast.success('Applicants referred successfully');
            setSelectedApplicants([]);
          }
        });
    } catch (error) {
      console.log('Failed to refer applicants:', error);
    }
  };

  const handleAddFavouriteApplicant = async (userId: string) => {
    try {
      if (!data || !data.providerProfile) return;

      await addFavouriteApplicant({
        userId,
        providerId: data.providerProfile.id,
        note: '',
      })
        .unwrap()
        .then(() => {
          toast.success('Applicant added to favourites successfully');
        });
    } catch (error) {
      console.log('Failed to add favourite applicant:', error);
    }
  };

  return (
    <div className="flex-1 overflow-y-auto">
      <div className="overflow-x-auto border rounded mb-4">
        <table className="w-full text-xs sm:text-sm">
          <thead>
            <tr className="border-b bg-muted/50">
              <th className="px-2 sm:px-4 py-3 text-left w-10">
                <Checkbox
                  checked={selectedApplicants.length === applicants.length && applicants.length > 0}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      setSelectedApplicants(applicants.map((a) => a.userId));
                    } else {
                      setSelectedApplicants([]);
                    }
                  }}
                />
              </th>
              <th className="px-2 sm:px-4 py-3 text-left font-semibold">{t('name')}</th>
              <th className="px-2 sm:px-4 py-3 text-left font-semibold hidden sm:table-cell">
                {t('gpa')}
              </th>
              <th className="px-2 sm:px-4 py-3 text-left font-semibold hidden md:table-cell">
                {t('university')}
              </th>
              <th className="px-2 sm:px-4 py-3 text-left font-semibold hidden md:table-cell">
                {t('contact')}
              </th>
              <th className="px-2 sm:px-4 py-3 text-left font-semibold hidden sm:table-cell">
                {t('score')}
              </th>
              <th className="px-2 sm:px-4 py-3 text-center font-semibold">{t('actions')}</th>
            </tr>
          </thead>
          <tbody>
            {applicants.map((applicant) => (
              <tr key={applicant.id} className="border-b hover:bg-muted/30 transition-colors">
                <td className="px-2 sm:px-4 py-3">
                  <Checkbox
                    checked={selectedApplicants.includes(applicant.userId)}
                    onCheckedChange={() => toggleApplicantSelection(applicant.userId)}
                  />
                </td>
                <td className="px-2 sm:px-4 py-3 font-medium text-xs sm:text-sm">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary-brand rounded-full flex items-center justify-center text-white font-bold">
                      {applicant.firstName?.[0]}
                      {applicant.lastName?.[0]}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">
                        {applicant.firstName} {applicant.lastName}
                      </p>
                    </div>
                  </div>
                </td>
                <td
                  className="px-2 sm:px-4 py-3 font-bold hidden sm:table-cell"
                  style={{ color: '#3d6cb9' }}
                >
                  {applicant.overallGpa}
                </td>
                <td className="px-2 sm:px-4 py-3 text-muted-foreground text-xs hidden md:table-cell">
                  {applicant.educationHistories && applicant.educationHistories.length > 0 ? (
                    <div className="max-w-xs">
                      <div className="flex items-center gap-1 mb-1">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {applicant.educationHistories[0].institutionName}
                        </p>
                      </div>
                      <p className="text-xs text-gray-500 truncate">
                        {applicant.educationHistories[0].majorName}
                      </p>
                    </div>
                  ) : (
                    <span className="text-sm text-gray-400">-</span>
                  )}
                </td>

                <td className="px-2 sm:px-4 py-3 text-muted-foreground text-xs hidden md:table-cell">
                  <div className="space-y-1">
                    {applicant.phoneNumber && (
                      <p className="text-sm text-gray-900">{applicant.phoneNumber}</p>
                    )}
                    {applicant.hometown && (
                      <div className="flex items-center gap-1 text-sm text-gray-500">
                        <MapPin className="w-3 h-3" />
                        <span>{applicant.hometown}</span>
                      </div>
                    )}
                  </div>
                </td>

                <td
                  className="px-2 h-full sm:px-4 py-3 font-bold hidden sm:table-cell"
                  style={{ color: '#3d6cb9' }}
                >
                  {applicant.score ? `${(applicant.score * 100).toFixed(2)}%` : 'N/A'}
                </td>
                <td className="px-2 h-full sm:px-4 py-3 sm:table-cell">
                  <div className="flex items-center justify-center gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setDetailApplicant(applicant)}
                      className="shadow-none w-fit"
                    >
                      <Eye className="w-4 h-4 text-primary-brand" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleAddFavouriteApplicant(applicant.userId)}
                      className="shadow-none w-fit"
                    >
                      <Heart className="w-4 h-4 text-primary-brand" />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedApplicants.length > 0 && (
        <div className="border-t pt-4 flex flex-col sm:flex-row justify-end gap-2">
          <Button
            onClick={() => setSelectedApplicants([])}
            className="w-full sm:w-auto bg-gray-200 text-gray-900 hover:bg-gray-300 shadow-sm"
          >
            {t('clearSelection')}
          </Button>
          <Button
            onClick={handleSaveSelected}
            style={{ backgroundColor: '#3d6cb9', color: 'white' }}
            disabled={isReferApplicantsLoading}
            className="bg-primary-brand text-white hover:bg-primary-brand/90 w-full sm:w-auto shadow-sm"
          >
            {isReferApplicantsLoading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              `${t('save', { count: selectedApplicants.length })}`
            )}
          </Button>
        </div>
      )}
    </div>
  );
};

export default ApplicantsList;
