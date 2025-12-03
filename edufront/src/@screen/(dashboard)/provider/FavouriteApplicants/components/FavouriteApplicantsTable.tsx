import { MapPin, Eye, Trash, Send } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { Checkbox } from '@/lib/cus/checkbox';
import { Button } from '@/lib/cus/button';

interface FavouriteApplicantsTableProps {
  applicants: FavouriteApplicant[];
  onViewDetail: (applicant: ApplicantProfile) => void;
  onRemoveFavourite: (favouriteApplicantId: number) => void;
  onSelectedApplicantsChange?: (userIds: string[]) => void;
}

export default function FavouriteApplicantsTable({
  applicants,
  onViewDetail,
  onRemoveFavourite,
  onSelectedApplicantsChange,
}: FavouriteApplicantsTableProps) {
  const t = useTranslations('provider.favourite');
  const [selectedApplicants, setSelectedApplicants] = useState<number[]>([]);

  const notifyParent = (newSelectedIds: number[]) => {
    if (onSelectedApplicantsChange) {
      const selectedFavouriteApplicants = applicants.filter((a) => newSelectedIds.includes(a.id));
      const userIds = selectedFavouriteApplicants
        .map((a) => a.applicantProfileVo?.userId)
        .filter((id): id is string => !!id);
      onSelectedApplicantsChange(userIds);
    }
  };

  const toggleApplicantSelection = (favouriteApplicantId: number) => {
    let newSelected: number[];
    if (selectedApplicants.includes(favouriteApplicantId)) {
      newSelected = selectedApplicants.filter((id) => id !== favouriteApplicantId);
    } else {
      newSelected = [...selectedApplicants, favouriteApplicantId];
    }
    setSelectedApplicants(newSelected);
    notifyParent(newSelected);
  };

  const handleSelectAll = (checked: boolean) => {
    let newSelected: number[];
    if (checked) {
      newSelected = applicants.map((a) => a.id);
    } else {
      newSelected = [];
    }
    setSelectedApplicants(newSelected);
    notifyParent(newSelected);
  };

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-10">
                <Checkbox
                  checked={selectedApplicants.length === applicants.length && applicants.length > 0}
                  onCheckedChange={handleSelectAll}
                />
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {t('table.applicant') || 'Applicant'}
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {t('table.contact') || 'Contact'}
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {t('table.education') || 'Education'}
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {t('table.gpa') || 'GPA'}
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {t('table.note') || 'Note'}
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                {t('table.actions') || 'Actions'}
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {applicants.map((favouriteApplicant) => {
              const applicant = favouriteApplicant.applicantProfileVo;
              if (!applicant) return null;

              return (
                <tr key={applicant.id} className="hover:bg-gray-50 transition-colors">
                  {/* Checkbox */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Checkbox
                      checked={selectedApplicants.includes(favouriteApplicant.id)}
                      onCheckedChange={() => toggleApplicantSelection(favouriteApplicant.id)}
                    />
                  </td>
                  {/* Applicant Info */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-primary-brand rounded-full flex items-center justify-center text-white font-bold">
                        {applicant.firstName?.[0]}
                        {applicant.lastName?.[0]}
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">
                          {applicant.firstName} {applicant.lastName}
                        </p>
                        <p className="text-sm text-gray-500">{applicant.contactName}</p>
                      </div>
                    </div>
                  </td>

                  {/* Contact */}
                  <td className="px-6 py-4">
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

                  {/* Education */}
                  <td className="px-6 py-4">
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

                  {/* GPA */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    {applicant.overallGpa ? (
                      <div className="flex items-center gap-1">
                        <span className="font-semibold text-gray-900">
                          {applicant.overallGpa.toFixed(2)}
                        </span>
                      </div>
                    ) : (
                      <span className="text-sm text-gray-400">-</span>
                    )}
                  </td>

                  {/* Note */}
                  <td className="px-6 py-4">
                    {applicant.note ? (
                      <p className="text-sm text-gray-900">{applicant.note}</p>
                    ) : (
                      <span className="text-sm text-gray-400">_____</span>
                    )}
                  </td>

                  {/* Actions */}
                  <td className="px-6 py-4  whitespace-nowrap text-center">
                    <div className="flex items-center justify-center gap-2">
                      <button
                        onClick={() => onViewDetail(applicant)}
                        className="inline-flex items-center gap-1 text-primary-brand hover:text-[#3d4c63] cursor-pointer font-medium text-sm transition-colors"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => onRemoveFavourite(favouriteApplicant.id)}
                        className="inline-flex items-center gap-1 text-red-500 hover:text-red-700 cursor-pointer font-medium text-sm transition-colors"
                      >
                        <Trash className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Action buttons when applicants are selected */}
      {selectedApplicants.length > 0 && (
        <div className="border-t pt-4 px-6 pb-4 flex flex-col sm:flex-row justify-end gap-2">
          <Button
            onClick={() => setSelectedApplicants([])}
            className="w-full sm:w-auto bg-gray-200 text-gray-900 hover:bg-gray-300 shadow-sm"
          >
            {t('clearSelection') || 'Clear Selection'}
          </Button>
        </div>
      )}
    </div>
  );
}
