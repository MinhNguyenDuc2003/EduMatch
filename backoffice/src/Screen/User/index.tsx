'use client';
import { User } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import CustomDataTable from 'src/common/components/common/CustomDataTable';
import StatisticGrid from 'src/common/components/common/StatisticGrid';
import Context from './seg/context';

const Users = () => {
  const [filterText, setFilterText] = useState('');
  const router = useRouter()
  const handleFilterSelect = (filterKey: string) => {
    setFilterText(filterKey);
  };

  return (
    <Context.Provider>
      <Context.Consumer>
        {({ ss }) => {
          const list = (ss?.Joint?.Users as any) || [];

          const mappedUsers =
            list?.map((item: any) => {
              return {
                id: item.id,
                username: item.username,
                email: item.email,
                name: `${item.firstName} ${item.lastName}`,
                createdDate: new Date(item.createdTimestamp).toLocaleDateString(
                  'en-US'
                ),
              };
            }) || [];

          const total = mappedUsers.length;

          const stats = [
            {
              title: 'Total Users',
              value: total,
              icon: <User />,
              color: 'text-blue-600',
              filterName: '',
            },
          ];

          return (
            <div className="flex flex-col min-h-screen bg-gray-100 p-6">
              <StatisticGrid stats={stats} onFilterSelect={handleFilterSelect} />

              <CustomDataTable
                title="Users"
                data={mappedUsers}
                detailPath="/backoffice/user"
                customTitles={[
                  'ID',
                  'Username',
                  'Email',
                  'Full Name',
                  'Created Date',
                ]}
                isCreate
                isUser
                 onCreate={() => router.push('/backoffice/user/create')}
                externalFilterText={filterText}
              />
            </div>
          );
        }}
      </Context.Consumer>
    </Context.Provider>
  );
};

export default Users;
