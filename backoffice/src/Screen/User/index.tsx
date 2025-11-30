'use client';
import { User, GraduationCap, Building } from 'lucide-react';
import { useState } from 'react';
import CustomDataTable from 'src/common/components/common/CustomDataTable';
import StatisticGrid from 'src/common/components/common/StatisticGrid';
import Context from './seg/context';

const Users = () => {
  const [filterText, setFilterText] = useState('');

  const handleFilterSelect = (filterKey: string) => {
    setFilterText(filterKey);
  };

  return (
    <Context.Provider>
      <Context.Consumer>
        {({ ss }) => {
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

          const mappedUsers = [...mappedApplicants, ...mappedProviders];

          const total = mappedUsers.length;
          const totalApplicants = mappedApplicants.length;
          const totalProviders = mappedProviders.length;

          const filteredUsers =
            filterText === 'Applicant'
              ? mappedApplicants
              : filterText === 'Provider'
              ? mappedProviders
              : mappedUsers;

          const stats = [
            {
              title: 'Total Users',
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
                title="Users"
                data={filteredUsers}
                detailPath="/backoffice/user"
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

export default Users;
