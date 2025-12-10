'use client';

import { CheckCircle, Users, XCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useMemo, useState } from 'react';
import CustomDataTable from 'src/common/components/common/CustomDataTable';
import StatisticGrid from 'src/common/components/common/StatisticGrid';
import Context from './seg/context';

const CaseStudyPage = () => {
  const [filterText, setFilterText] = useState('');
  const router = useRouter();
  const handleFilterSelect = (filterKey: string) => {
    setFilterText(filterKey);
  };

  return (
    <Context.Provider>
      <Context.Consumer>
        {({ ss }) => {
          const list = (ss?.Joint?.CaseStudy as any)?.data || [];

          const mappedCaseStudies = list.map((item: any) => ({
            id: item.id || '—',
            title: item.title || '—',
            userName: item.profileVo?.contactName || '—',
            phoneNumber: item.profileVo?.phoneNumber || '—',
            hometown: item.profileVo?.hometown || '—',
            verified: item.verified ? 'Verified' : 'Unverified',
            fileName: item?.medias?.[0]?.fileName || '—',
            contentType: item?.medias?.[0]?.contentType || '—',
          }));

          const total = mappedCaseStudies.length;
          const verified = mappedCaseStudies.filter((x: any) => x.verified === 'Verified').length;
          const unverified = mappedCaseStudies.filter((x: any) => x.verified === 'Unverified').length;

          const stats = [
            {
              title: 'Total Case Studies',
              value: total,
              icon: <Users />,
              color: 'text-blue-600',
              filterName: '',
            },
            {
              title: 'Verified',
              value: verified,
              icon: <CheckCircle />,
              color: 'text-green-600',
              filterName: 'Verified',
            },
            {
              title: 'Unverified',
              value: unverified,
              icon: <XCircle />,
              color: 'text-red-500',
              filterName: 'Unverified',
            },
          ];
          const columns = useMemo(
            () => [
              { accessorKey: "id", header: "ID" },
              { accessorKey: "userName", header: "User Name" },
              { accessorKey: "phoneNumber", header: "Phone Number" },
              { accessorKey: "hometown", header: "Hometown" },
              { accessorKey: "title", header: "Title" },
              { accessorKey: "verified", header: "Verified" },
              { accessorKey: "fileName", header: "File Name" },
              { accessorKey: "contentType", header: "Content Type" },
            ],
            []
          );
          return (
            <div className="flex flex-col min-h-screen bg-gray-100 p-6 space-y-6">
              {/* <StatisticGrid stats={stats} onFilterSelect={handleFilterSelect} /> */}



              <CustomDataTable
                columns={columns}
                data={mappedCaseStudies}
                onView={(row: any) => router.push(`/caseStudy/${row.id}`)}
                onEdit={(row: any) => console.log("edit", row)}
                onDelete={(row: any) => console.log("delete", row)}
                isCreate={false}
                isEdit={false}
                isDelete={false}
              />
            </div>
          );
        }}
      </Context.Consumer>
    </Context.Provider>
  );
};

export default CaseStudyPage;
