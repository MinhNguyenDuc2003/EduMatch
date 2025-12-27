'use client';

import { CheckCircle, Clock } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useMemo, useState } from 'react';
import CustomDataTable from 'src/common/components/common/CustomDataTable';
import StatisticGrid from 'src/common/components/common/StatisticGrid';
import Context from './seg/context';

const SystemNotification = () => {
  const [filterText, setFilterText] = useState('');
  const router = useRouter();

  return (
    <Context.Provider>
      <Context.Consumer>
        {({ ss }) => {
          const list = (ss?.Joint?.SystemNotification as any)?.data || [];

          // LOGIC: Sắp xếp dữ liệu theo ngày tạo giảm dần (mới nhất lên đầu)
          // Chúng ta sort trước khi format thành string để đảm bảo tính chính xác
          const sortedList = [...list].sort((a, b) => {
            return new Date(b.createdDate).getTime() - new Date(a.createdDate).getTime();
          });

          const notifications = sortedList.map((item: any) => ({
            id: item.id,
            content: item.content,
            referenceType: item.referenceType,
            isAdmin: item.isAdmin ? 'Admin' : 'User',
            createdDate: new Date(item.createdDate).toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
              year: 'numeric',
            }),
          }));

          const total = notifications.length;
          // Note: Logic read/unread cần key isRead trong mapping nếu muốn dùng stats này
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
            { accessorKey: "isAdmin", header: "Created By" },
            { accessorKey: "createdDate", header: "Created Date" },
          ];

          return (
            <div className="flex flex-col min-h-screen bg-gray-100 p-6">
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
                title='SystemNotification'
              />
            </div>
          );
        }}
      </Context.Consumer>
    </Context.Provider>
  );
};

export default SystemNotification;