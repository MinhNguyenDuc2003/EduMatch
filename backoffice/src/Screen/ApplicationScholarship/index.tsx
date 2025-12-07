'use client';
import { CheckCircle, Clock, GraduationCap, XCircle } from 'lucide-react';
import { useState } from 'react';
import CustomDataTable from 'src/common/components/common/CustomDataTable';
import StatisticGrid from 'src/common/components/common/StatisticGrid';
import Context from './seg/context';

const ApplicantScholarship = () => {
  const [filterText, setFilterText] = useState('');

  const handleFilterSelect = (filterKey: string) => {
    setFilterText(filterKey);
  };

  return (
    <Context.Provider>
      <Context.Consumer>
        {({ ss }) => {
          const list = (ss?.Joint?.ApplicationItem as any)?.data || [];

          const applications =
            list?.map((item: any) => {
              const scholarship = item.scholarshipVo || {};
              const provider = scholarship.providerProfileVo || {};
              const applicant = item.applicationVo || {};

              return {
                id: item.id,
                scholarshipTitle: scholarship.title || 'Untitled Scholarship',
                organization: provider.organizationName || 'N/A',
                applicantName: applicant.fullName || 'N/A',
                university: scholarship.university || '—',
                country: scholarship.country || '—',
                funding: scholarship.fundingAmount || '—',
                studyLevel: scholarship.studyLevel || '—',
                status: item.status?.toUpperCase() || 'UNKNOWN',
              };
            }) || [];

          const total = applications.length;
          const pending = applications.filter((a: any) => a.status === 'PENDING').length;
          const approved = applications.filter((a: any) => a.status === 'APPROVED').length;
          const rejected = applications.filter((a: any) => a.status === 'REJECTED').length;

          const stats = [
            {
              title: 'Total Applications',
              value: total,
              icon: <GraduationCap />,
              color: 'text-blue-600',
              filterName: '',
            },
            {
              title: 'Pending',
              value: pending,
              icon: <Clock />,
              color: 'text-yellow-500',
              filterName: 'PENDING',
            },
            {
              title: 'Approved',
              value: approved,
              icon: <CheckCircle />,
              color: 'text-green-600',
              filterName: 'APPROVED',
            },
            {
              title: 'Rejected',
              value: rejected,
              icon: <XCircle />,
              color: 'text-red-600',
              filterName: 'REJECTED',
            },
          ];

          // ✅ Lọc theo trạng thái
          const filteredApplications =
            filterText && filterText !== ''
              ? applications.filter((a: any) => a.status === filterText)
              : applications;

          return (
            <div className="flex flex-col min-h-screen bg-gray-50 p-6">
              <StatisticGrid stats={stats} onFilterSelect={handleFilterSelect} />

              <CustomDataTable
                title="Scholarship Applications List"
                data={filteredApplications as any}
                detailPath="/backoffice/applicationScholarship"
                customTitles={[
                  'ID',
                  'Scholarship Title',
                  'Organization',
                  'Applicant',
                  'University',
                  'Country',
                  'Funding',
                  'Study Level',
                  'Status',
                ]}
              />
            </div>
          );
        }}
      </Context.Consumer>
    </Context.Provider>
  );
};

export default ApplicantScholarship;
