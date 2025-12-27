'use client';
import { CheckCircle, Clock, GraduationCap, XCircle } from 'lucide-react';
import { useMemo, useState } from 'react';
import CustomDataTable from 'src/common/components/common/CustomDataTable';
import StatisticGrid from 'src/common/components/common/StatisticGrid';
import Context from './seg/context';
import { useRouter } from 'next/navigation';

const Subcription = () => {
  const [filterText, setFilterText] = useState('');
  const router = useRouter();
  const handleFilterSelect = (filterKey: string) => {
    setFilterText(filterKey);
  };

  return (
    <Context.Provider>
      <Context.Consumer>
        {({ ss }) => {
          const list = (ss?.Joint?.SubcriptionList as any)?.data || [];
          console.log('list', list);

          // Map dữ liệu từ API vào định dạng cho bảng
          const Subcriptions =
            [...list] // Tạo bản sao để không ảnh hưởng mảng gốc
              .sort((a: any, b: any) => {
                // Sắp xếp: Start Date mới nhất (giá trị thời gian lớn hơn) lên trước
                return new Date(b.startDate).getTime() - new Date(a.startDate).getTime();
              })
              .map((item: any) => {
                const start = new Date(item.startDate);   // ❗ KHÔNG nhân *1000
                const end = new Date(item.endDate);

                // Calculate actual status based on dates
                let computedStatus = '';
                if (Date.now() < start.getTime()) computedStatus = 'Not Started';
                else if (Date.now() > end.getTime()) computedStatus = 'Expired';
                else computedStatus = 'Active';

                return {
                  id: item.id,
                  planName: item.plan?.name || '—',
                  userType: item.userType || '—',
                  price: `${item.plan?.price || 0} ${item.plan?.currency || ''}`,
                  duration: `${item.plan?.durationDays || 0} days`,
                  startDate: start.toLocaleDateString('en-US', {
                      // "Tue"
                    month: 'short',    // "Dec"
                    day: 'numeric',    // "3"
                    year: 'numeric'    // "2025"
                  }),
                  endDate: end.toLocaleDateString('en-US', {
                      // "Tue"
                    month: 'short',    // "Dec"
                    day: 'numeric',    // "3"
                    year: 'numeric'    // "2025"
                  }),
                  autoRenew: item.autoRenew ? 'Yes' : 'No',
                  status: computedStatus,
                  fullName: `${item.customer.firstName} ${item.customer.lastName}`,
                  email: `${item.customer.email}`,

                };
              }) || [];

          // Stats
          const total = Subcriptions.length;
          const active = Subcriptions.filter((s: any) => s.status === 'Active').length;
          const notStarted = Subcriptions.filter((s: any) => s.status === 'Not Started').length;
          const expired = Subcriptions.filter((s: any) => s.status === 'Expired').length;

          const stats = [
            {
              title: 'Total Subscriptions',
              value: total,
              icon: <GraduationCap />,
              color: 'text-blue-600',
              filterName: '',
            },
            {
              title: 'Active',
              value: active,
              icon: <CheckCircle />,
              color: 'text-green-600',
              filterName: 'Active',
            },

            {
              title: 'Expired',
              value: expired,
              icon: <XCircle />,
              color: 'text-red-600',
              filterName: 'Expired',
            },

          ];
          const columns =  [
              { accessorKey: "id", header: "ID" },
              { accessorKey: "fullName", header: "Customer Name" },
              { accessorKey: "email", header: "Email" },
              { accessorKey: "planName", header: "Plan Name" },
              { accessorKey: "userType", header: "User Type" },
              // { accessorKey: "scholarshipTitle", header: "Subscription ID" },
              // { accessorKey: "organization", header: "User ID" },
              { accessorKey: "price", header: "Price" },
              { accessorKey: "duration", header: "Duration" },
              { accessorKey: "startDate", header: "Start Date" },
              // { accessorKey: "funding", header: "Transaction ID" },
              { accessorKey: "endDate", header: "End Date" },
              // { accessorKey: "autoRenew", header: "Auto Renew" },
              { accessorKey: "status", header: "Status" },
            ]
          return (
            <div className="flex flex-col min-h-screen bg-gray-100 p-6">
              {/* <StatisticGrid stats={stats} onFilterSelect={handleFilterSelect} /> */}

              <CustomDataTable
                columns={columns}
                data={Subcriptions}
                onView={(row: any) => router.push(`/subscriptions/${row.id}`)}
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

export default Subcription;