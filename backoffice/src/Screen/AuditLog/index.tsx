"use client";
import { CheckCircle, Clock, GraduationCap, XCircle } from 'lucide-react';
import { useState } from 'react';
import StatisticGrid from 'src/common/components/common/StatisticGrid';
import Context from './seg/context';
// import { useRouter } from 'next/navigation';

const AuditLogPage = () => {
  const [filterText, setFilterText] = useState('');

  const handleFilterSelect = (filterKey: string) => {
    setFilterText(filterKey);
  };
  // const router = useRouter();
  return (
    <Context.Provider>
      <Context.Consumer>
        {({ ss }) => {
          const list = (ss?.Joint?.News as any)?.data?.content || [];
          console.log('list', list);
          const AuditLogs =
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

          const total = AuditLogs.length;
          const open = AuditLogs.filter((s: any) => s.status === 'Open').length;
          const upcoming = AuditLogs.filter((s: any) => s.status === 'Not Open Yet').length;
          const closed = AuditLogs.filter((s: any) => s.status === 'Closed').length;

          const stats = [
            {
              title: 'Total AuditLogs',
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

          return (
            <div className="flex flex-col min-h-screen bg-gray-100 p-6">
              <StatisticGrid stats={stats} onFilterSelect={handleFilterSelect} />

              {/* <CustomDataTable
                title="AuditLog List"
                data={AuditLogs as any}
                detailPath="/AuditLog"
                customTitles={[
                  'ID',
                  'AuditLog Name',
                  'University',
                  'Amount',
                  'Deadline',
                  'Status',
                ]}
                externalFilterText={filterText}
              /> */}
            </div>
          );
        }}
      </Context.Consumer>
    </Context.Provider>
  );
};

export default AuditLogPage;
