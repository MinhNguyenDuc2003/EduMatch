'use client';

import { Building } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useMemo } from 'react';
import CustomDataTable from 'src/common/components/common/CustomDataTable';
import Context from './seg/context';

const ProviderProfiles = () => {
  const router = useRouter();

  return (
    <Context.Provider>
      <Context.Consumer>
        {({ ss }) => {
          const listProviders = (ss?.Joint?.Provider as any)?.data || [];

          const mappedProviders = listProviders.map((p: any) => ({
            id: `PRO-${p.id}`,
            name: p.organizationName,
            email: p.email ?? 'N/A',
            phone: p.phone ?? 'N/A',
            role: 'Provider',
            verified: p.verified ? 'Verified' : 'Unverified',
            createDate: new Date(p.createdDate).toLocaleDateString('en-US', {
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
              { accessorKey: 'verified', header: 'Verified' },
              { accessorKey: 'createDate', header: 'Create Date' },
            ]

          return (
            <div className="flex flex-col min-h-screen bg-gray-100 p-6">
              <CustomDataTable
                columns={columns}
                data={mappedProviders}
                onView={(row: any) =>
                  router.push(`/profileProvider/${row.id}`)
                }
                onEdit={(row: any) => console.log('edit', row)}
                onDelete={(row: any) => console.log('delete', row)}
                isCreate={false}
                isDelete={false}
                isEdit={false}
                title='ProviderProfiles'
              />
            </div>
          );
        }}
      </Context.Consumer>
    </Context.Provider>
  );
};

export default ProviderProfiles;
