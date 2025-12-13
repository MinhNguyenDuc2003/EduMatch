'use client';
import { User } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useMemo, useState } from 'react';
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
              const created = new Date(item.createdTimestamp); // chuyển ISO string thành Date
              return {
                id: item.id,
                username: item.username,
                email: item.email,
                name: `${item.firstName} ${item.lastName}`,
                createdDate: created.toLocaleDateString('en-US', {
                  weekday: 'short',  // "Tue"
                  month: 'short',    // "Dec"
                  day: 'numeric',    // "3"
                  year: 'numeric'    // "2025"
                }),
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
          const columns = useMemo(
            () => [
              { accessorKey: "id", header: "ID" },
              { accessorKey: "username", header: "Username" },
              { accessorKey: "email", header: "Email" },
              { accessorKey: "name", header: "Full Name" }, // phải trùng với mappedUsers
              { accessorKey: "createdDate", header: "Created Date" },
            ],
            []
          );

          return (
            <div className="flex flex-col min-h-screen bg-gray-100 p-6">
              {/* <StatisticGrid stats={stats} onFilterSelect={handleFilterSelect} /> */}


              <CustomDataTable
                columns={columns}
                data={mappedUsers}
                onView={(row: any) => router.push(`/user/${row.id}`)}
                onEdit={(row: any) => console.log("edit", row)}
                onDelete={(row: any) => console.log("delete", row)}
                onCreate={(row: any) => router.push(`//create`)}
                isDelete={false}
                isEdit={false}
                isView={false}
              />

            </div>
          );
        }}
      </Context.Consumer>
    </Context.Provider>
  );
};

export default Users;
