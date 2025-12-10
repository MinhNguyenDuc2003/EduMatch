'use client';

import { CheckCircle, Clock, DollarSign } from 'lucide-react';
import { useMemo, useState } from 'react';
import CustomDataTable from 'src/common/components/common/CustomDataTable';
import StatisticGrid from 'src/common/components/common/StatisticGrid';
import Context from './seg/context';
import { useRouter } from 'next/navigation';

const OrderPage = () => {
  const [filterText, setFilterText] = useState('');
  const router = useRouter();
  const handleFilterSelect = (filterKey: string) => {
    setFilterText(filterKey);
  };

  return (
    <Context.Provider>
      <Context.Consumer>
        {({ ss }) => {
          const list = (ss?.Joint?.OrderList as any)?.data || [];

          // Map subscription data
          const mappedSubs =
            list?.map((item: any) => ({
              ...item,
              amountStr: `$${item.amount.toFixed(2)}`,
              paidAtStr: new Date(item.paidAt).toLocaleDateString('en-US', {
                weekday: 'short',  // "Tue"
                month: 'short',    // "Dec"
                day: 'numeric',    // "3"
                year: 'numeric'    // "2025"
              }),
              fullName: `${item.customer.firstName} ${item.customer.lastName}`,
            })) || [];

          // --- Statistics ---
          const total = mappedSubs.length;
          const paid = mappedSubs.filter((x: any) => x.status === 'PAID').length;
          const pending = mappedSubs.filter((x: any) => x.status === 'PENDING').length;

          const stats = [
            {
              title: 'Total Subscriptions',
              value: total,
              icon: <DollarSign />,
              color: 'text-blue-600',
              filterName: '',
            },
            {
              title: 'Paid',
              value: paid,
              icon: <CheckCircle />,
              color: 'text-green-600',
              filterName: 'PAID',
            },
            {
              title: 'Pending',
              value: pending,
              icon: <Clock />,
              color: 'text-yellow-500',
              filterName: 'PENDING',
            },
          ];
          const columns = useMemo(
            () => [
              { accessorKey: "id", header: "ID" },
              { accessorKey: "fullName", header: "Customer Name" },
              { accessorKey: "customer.email", header: "Email" },
              // { accessorKey: "scholarshipTitle", header: "Subscription ID" },
              // { accessorKey: "organization", header: "User ID" },
              { accessorKey: "amountStr", header: "Amount" },
              { accessorKey: "currency", header: "Currency" },
              { accessorKey: "paymentMethod", header: "Payment Method" },
              // { accessorKey: "funding", header: "Transaction ID" },
              { accessorKey: "status", header: "Status" },
              { accessorKey: "paidAtStr", header: "Paid At" },
            ],
            []
          );
          return (
            <div className="flex flex-col min-h-screen bg-gray-100 p-6 space-y-6">
              {/* <StatisticGrid stats={stats} onFilterSelect={handleFilterSelect} /> */}


              <CustomDataTable
                columns={columns}
                data={mappedSubs}
                onView={(row: any) => router.push(`/order/${row.id}`)}
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

export default OrderPage;
