'use client';

import { CheckCircle, Clock } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useMemo, useState } from 'react';
import CustomDataTable from 'src/common/components/common/CustomDataTable';
import StatisticGrid from 'src/common/components/common/StatisticGrid';
import Context from './seg/context';

const SystemNotification = () => {
  const [filterText, setFilterText] = useState('');
  const router = useRouter()
  const handleFilterSelect = (filterKey: string) => {
    setFilterText(filterKey);
  };

  return (
    <Context.Provider>
      <Context.Consumer>
        {({ ss }) => {
          const list = (ss?.Joint?.SystemNotification as any)?.data || [];
          console.log('list', list);

          const notifications = list.map((item: any) => ({
            id: item.id,
            content: item.content,
            referenceType: item.referenceType,
            isRead: item.isRead ? 'Read' : 'Unread',
            isAdmin: item.isAdmin ? 'Admin' : 'User',
            createdDate: new Date(item.createdDate).toLocaleDateString('en-US', {
                weekday: 'short',  // "Tue"
                month: 'short',    // "Dec"
                day: 'numeric',    // "3"
                year: 'numeric'    // "2025"
              }),
          }));

          const total = notifications.length;
          const read = notifications.filter((n: any) => n.isRead === 'Read').length;
          const unread = notifications.filter((n: any) => n.isRead === 'Unread').length;

          const stats = [
            {
              title: 'Total Notifications',
              value: total,
              icon: <CheckCircle />,
              color: 'text-blue-600',
              filterName: '',
            },
            {
              title: 'Read',
              value: read,
              icon: <CheckCircle />,
              color: 'text-green-600',
              filterName: 'Read',
            },
            {
              title: 'Unread',
              value: unread,
              icon: <Clock />,
              color: 'text-yellow-500',
              filterName: 'Unread',
            },
          ];
          const columns = [
              { accessorKey: "id", header: "ID" },
              { accessorKey: "content", header: "Content" },
              { accessorKey: "referenceType", header: "Reference Type" },
              { accessorKey: "isRead", header: "Read Status" },
              { accessorKey: "isAdmin", header: "Created By" },
              { accessorKey: "createdDate", header: "Created Date" },

            ]
          return (
            <div className="flex flex-col min-h-screen bg-gray-100 p-6">
              {/* <StatisticGrid stats={stats} onFilterSelect={handleFilterSelect} /> */}




              <CustomDataTable
                columns={columns}
                data={notifications}
                onView={(row: any) => router.push(`/systemNotification/${row.id}`)}
                onEdit={(row: any) => console.log("edit", row)}
                onDelete={(row: any) => console.log("delete", row)}
                onCreate={() => router.push('/systemNotification/create')}
                isEdit={false}
                isView={false}
                isDelete={false}
              />
            </div>
          );
        }}
      </Context.Consumer>
    </Context.Provider>
  );
};

export default SystemNotification;
