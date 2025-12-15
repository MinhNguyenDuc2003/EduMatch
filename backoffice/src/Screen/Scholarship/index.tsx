import { CheckCircle, Clock, GraduationCap, XCircle } from 'lucide-react';
import { useMemo, useState } from 'react';
import CustomDataTable from 'src/common/components/common/CustomDataTable';
import StatisticGrid from 'src/common/components/common/StatisticGrid';
import Context from './seg/context';
import { useRouter } from 'next/navigation';
// import { useRouter } from 'next/navigation';

const ScholarshipPage = () => {
  const [filterText, setFilterText] = useState('');
  const router = useRouter();
  const handleFilterSelect = (filterKey: string) => {
    setFilterText(filterKey);
  };
  // const router = useRouter();
  return (
    <Context.Provider>
      <Context.Consumer>
        {({ ss }) => {
          const list = (ss?.Joint?.ScholarshipList as any)?.data?.content || [];
          console.log('list', list);
          const scholarships =
            list?.map((item: any) => ({
              id: item.id,
              name: item.title,
              sponsor: item.university || 'N/A',
              amount: item.fundingAmount || '—',
              deadline: new Date(item.endDate).toLocaleDateString('en-US'),
              status:
                Date.now() < item.startDate
                  ? 'Not Open Yet'
                  : Date.now() > item.endDate
                    ? 'Closed'
                    : 'Open',
            })) || [];

          const total = scholarships.length;
          const open = scholarships.filter((s: any) => s.status === 'Open').length;
          const upcoming = scholarships.filter((s: any) => s.status === 'Not Open Yet').length;
          const closed = scholarships.filter((s: any) => s.status === 'Closed').length;

          const stats = [
            {
              title: 'Total Scholarships',
              value: total,
              icon: <GraduationCap />,
              color: 'text-blue-600',
              filterName: '',
            },
            {
              title: 'Open',
              value: open,
              icon: <CheckCircle />,
              color: 'text-green-600',
              filterName: 'Open',
            },
            {
              title: 'Not Open Yet',
              value: upcoming,
              icon: <Clock />,
              color: 'text-yellow-500',
              filterName: 'Not Open Yet',
            },
            {
              title: 'Closed',
              value: closed,
              icon: <XCircle />,
              color: 'text-red-600',
              filterName: 'Closed',
            },
          ];
          const columns = [
              { accessorKey: "id", header: "ID" },
              { accessorKey: "name", header: "Scholarship Name" },
              { accessorKey: "sponsor", header: "University" },
              { accessorKey: "amount", header: "Amount" },
              { accessorKey: "deadline", header: "Deadline" },
              { accessorKey: "status", header: "Status" },
            ]
          return (
            <div className="flex flex-col min-h-screen bg-gray-100 p-6">
              {/* <StatisticGrid stats={stats} onFilterSelect={handleFilterSelect} /> */}



              <CustomDataTable
                columns={columns}
                data={scholarships}
                onView={(row: any) => router.push(`/scholarship/${row.id}`)}
                onEdit={(row: any) => console.log("edit", row)}
                onDelete={(row: any) => console.log("delete", row)}
                isDelete={false}
                isEdit={false}
                isCreate={false}
              />

            </div>
          );
        }}
      </Context.Consumer>
    </Context.Provider>
  );
};

export default ScholarshipPage;
