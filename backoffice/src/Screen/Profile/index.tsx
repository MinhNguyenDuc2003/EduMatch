'use client';
import { Building, GraduationCap, User } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import CustomDataTable from 'src/common/components/common/CustomDataTable';
import StatisticGrid from 'src/common/components/common/StatisticGrid';
import Context from './seg/context';

const Profiles = () => {
  const [filterText, setFilterText] = useState('');
  const router = useRouter()
  const handleFilterSelect = (filterKey: string) => {
    setFilterText(filterKey);
  };

  return (
    <Context.Provider>
      <Context.Consumer>
        {({ ss, meds }) => {
          const listApplicants = (ss?.Joint?.Students as any)?.data || [];
          const listProvider = (ss?.Joint?.Provider as any)?.data || [];

          const mappedApplicants = listApplicants.map((s: any) => ({
            id: `STU-${s.id}`,
            name: `${s.firstName} ${s.lastName}`.trim(),
            email: s.contactName ?? 'N/A',
            phone: s.phoneNumber ?? 'N/A',
            role: 'Applicant',
          }));

          const mappedProviders = listProvider.map((p: any) => ({
            id: `PRO-${p.id}`,
            name: p.organizationName,
            email: p.email ?? 'N/A',
            phone: p.phone ?? 'N/A',
            role: 'Provider',
          }));

          const mappedProfiles = [...mappedApplicants, ...mappedProviders];

          const total = mappedProfiles.length;
          const totalApplicants = mappedApplicants.length;
          const totalProviders = mappedProviders.length;

          const filteredProfiles =
            filterText === 'Applicant'
              ? mappedApplicants
              : filterText === 'Provider'
                ? mappedProviders
                : mappedProfiles;

          const stats = [
            {
              title: 'Total Profiles',
              value: total,
              icon: <User />,
              color: 'text-blue-600',
              filterName: '',
            },
            {
              title: 'Applicants',
              value: totalApplicants,
              icon: <GraduationCap />,
              color: 'text-green-600',
              filterName: 'Applicant',
            },
            {
              title: 'Providers',
              value: totalProviders,
              icon: <Building />,
              color: 'text-purple-600',
              filterName: 'Provider',
            },
          ];

          return (
            <div className="flex flex-col min-h-screen bg-gray-100 p-6">
              <StatisticGrid stats={stats} onFilterSelect={handleFilterSelect} />
              <CustomDataTable
                title="Profiles"
                data={filteredProfiles}
                detailPath="/profile"
                customTitles={[
                  'ID',
                  'Name',
                  'Email',
                  'Phone',
                  'Role',
                ]}
                externalFilterText={filterText}
              />
            </div>
          );
        }}
      </Context.Consumer>
    </Context.Provider>
  );
};

export default Profiles;
