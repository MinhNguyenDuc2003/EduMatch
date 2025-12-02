'use client';

import { CheckCircle, Clock, XCircle } from 'lucide-react';
import { useState } from 'react';
import CustomDataTable from 'src/common/components/common/CustomDataTable';
import StatisticGrid from 'src/common/components/common/StatisticGrid';
import Context from './seg/context';
import { useRouter } from 'next/navigation';

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
          const list = (ss?.Joint?.SystemNotification as any).data || [];
          console.log('list', list);

          const notifications = list.map((item :  any) => ({
            id: item.id,
            content: item.content,
            referenceType: item.referenceType,
            isRead: item.isRead ? 'Read' : 'Unread',
            isAdmin: item.isAdmin ? 'Admin' : 'User',
            createdDate: new Date(item.createdDate).toLocaleString('en-US'),
          }));

          const total = notifications.length;
          const read = notifications.filter((n :  any) => n.isRead === 'Read').length;
          const unread = notifications.filter((n : any) => n.isRead === 'Unread').length;

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

          return (
            <div className="flex flex-col min-h-screen bg-gray-100 p-6">
              <StatisticGrid stats={stats} onFilterSelect={handleFilterSelect} />

              <CustomDataTable
                title="System Notifications"
                data={notifications}
                isCreate
                onCreate={() => router.push('/backoffice/systemNotification/create')}
                customTitles={['ID', 'Content', 'Reference Type', 'Read Status', 'Created By', 'Created Date']}
                externalFilterText={filterText}
              />
            </div>
          );
        }}
      </Context.Consumer>
    </Context.Provider>
  );
};

export default SystemNotification;
