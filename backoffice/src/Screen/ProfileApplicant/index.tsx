'use client';

import { GraduationCap } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useMemo } from 'react';
import CustomDataTable from 'src/common/components/common/CustomDataTable';
import Context from './seg/context';

const ApplicantProfiles = () => {
  const router = useRouter();

  return (
    <Context.Provider>
      <Context.Consumer>
        {({ ss }) => {
          const listApplicants = (ss?.Joint?.Students as any)?.data || [];

          const mappedApplicants = listApplicants.map((s: any) => ({
            id: `STU-${s.id}`,
            name: `${s.firstName} ${s.lastName}`.trim(),
            email: s.contactName ?? 'N/A',
            phone: s.phoneNumber ?? 'N/A',
            role: 'Applicant',
             createDate: new Date(s.createdDate).toLocaleDateString('en-US', {
                  // "Tue"
                month: 'short',    // "Dec"
                day: 'numeric',    // "3"
                year: 'numeric'    // "2025"
              }),
          }));

          const columns =  [
              { accessorKey: 'id', header: 'ID' },
              { accessorKey: 'name', header: 'Name' },
              { accessorKey: 'email', header: 'Email' },
              { accessorKey: 'phone', header: 'Phone' },
              { accessorKey: 'createDate', header: 'Create Date' },
            ]

          return (
            <div className="flex flex-col min-h-screen bg-gray-100 p-6">
              <CustomDataTable
                columns={columns}
                data={mappedApplicants}
                onView={(row: any) =>
                  router.push(`/profileApplicant/${row.id}`)
                }
                onEdit={(row: any) => console.log('edit', row)}
                onDelete={(row: any) => console.log('delete', row)}
                isCreate={false}
                isDelete={false}
                isEdit={false}
                title='ApplicantProfiles'
              />
            </div>
          );
        }}
      </Context.Consumer>
    </Context.Provider>
  );
};

export default ApplicantProfiles;
