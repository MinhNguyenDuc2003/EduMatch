import { GraduationCap, MapPin, Eye, Star } from 'lucide-react';
import { useTranslations } from 'next-intl';

interface FavouriteApplicantsTableProps {
  applicants: ApplicantProfile[];
  onViewDetail: (applicant: ApplicantProfile) => void;
}

export default function FavouriteApplicantsTable({
  applicants,
  onViewDetail,
}: FavouriteApplicantsTableProps) {
  const t = useTranslations('provider.favourite');

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b">
            <tr>
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
            {applicants.map((applicant) => (
              <tr key={applicant.id} className="hover:bg-gray-50 transition-colors">
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
                <td className="px-6 py-4 whitespace-nowrap text-center">
                  <button
                    onClick={() => onViewDetail(applicant)}
                    className="inline-flex items-center gap-1 text-primary-brand hover:text-[#3d4c63] cursor-pointer font-medium text-sm transition-colors"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
