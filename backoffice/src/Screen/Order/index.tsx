'use client';

import { CheckCircle, Clock, DollarSign } from 'lucide-react';
import { useState } from 'react';
import CustomDataTable from 'src/common/components/common/CustomDataTable';
import StatisticGrid from 'src/common/components/common/StatisticGrid';
import Context from './seg/context';

const OrderPage = () => {
  const [filterText, setFilterText] = useState('');

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
              paidAtStr: new Date(item.paidAt).toLocaleDateString('en-US'),
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

          return (
            <div className="flex flex-col min-h-screen bg-gray-100 p-6 space-y-6">
              <StatisticGrid stats={stats} onFilterSelect={handleFilterSelect} />

              <CustomDataTable
                title="Order Payments List"
                data={mappedSubs}
                detailPath="/order"
                customTitles={[
                  'ID',
                  'Subscription ID',
                  'User ID',
                  'Amount',
                  'Currency',
                  'Payment Method',
                  'Transaction ID',
                  'Status',
                  'Paid At',
                ]}
                externalFilterText={filterText}
               
              />
            </div>
          );
        }}
      </Context.Consumer>
    </Context.Provider>
  );
};

export default OrderPage;
