import { Button } from '@/lib/cus/button';
import { Checkbox } from '@/lib/cus/checkbox';
import { useReferApplicantsMutation } from '@/state/apiProvider';
import { Eye, Loader2 } from 'lucide-react';
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

  const [referApplicants, { isLoading: isReferApplicantsLoading }] = useReferApplicantsMutation();

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
              <th className="px-2 sm:px-4 py-3 text-left font-semibold">Name</th>
              <th className="px-2 sm:px-4 py-3 text-left font-semibold hidden sm:table-cell">
                GPA
              </th>
              <th className="px-2 sm:px-4 py-3 text-left font-semibold hidden md:table-cell">
                University
              </th>
              <th className="px-2 sm:px-4 py-3 text-left font-semibold hidden lg:table-cell">
                Major
              </th>
              <th className="px-2 sm:px-4 py-3 text-left font-semibold hidden lg:table-cell">
                Matching Score
              </th>
              <th className="px-2 sm:px-4 py-3 text-center font-semibold">Actions</th>
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
                  {applicant.firstName} {applicant.lastName}
                </td>
                <td
                  className="px-2 sm:px-4 py-3 font-bold hidden sm:table-cell"
                  style={{ color: '#3d6cb9' }}
                >
                  {applicant.overallGpa}
                </td>
                <td className="px-2 sm:px-4 py-3 text-muted-foreground text-xs hidden md:table-cell">
                  {applicant.educationHistories?.[0]?.institutionName || 'N/A'}
                </td>
                <td className="px-2 sm:px-4 py-3 text-muted-foreground text-xs hidden lg:table-cell">
                  {applicant.educationHistories?.[0]?.majorName || 'N/A'}
                </td>
                <td className="px-2 sm:px-4 py-3 text-muted-foreground text-xs hidden lg:table-cell">
                  {applicant.score ? `${(applicant.score * 100).toFixed(2)}%` : 'N/A'}
                </td>
                <td className="px-2 sm:px-4 py-3 flex items-center justify-center text-center">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setDetailApplicant(applicant)}
                    className="shadow-none"
                  >
                    <Eye className="w-4 h-4 text-primary-brand" />
                  </Button>
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
            Clear Selection
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
              `Save ${selectedApplicants.length} Applicant${selectedApplicants.length !== 1 ? 's' : ''}`
            )}
          </Button>
        </div>
      )}
    </div>
  );
};

export default ApplicantsList;
