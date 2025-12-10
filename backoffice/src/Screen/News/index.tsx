'use client';

import { ImageIcon, ImageOff, Newspaper } from 'lucide-react';
import { useMemo, useState } from 'react';
import CustomDataTable from 'src/common/components/common/CustomDataTable';
import StatisticGrid from 'src/common/components/common/StatisticGrid';
import Context from './seg/context';
import { useRouter } from 'next/navigation';

const News = () => {
  const [filterText, setFilterText] = useState('');
  const router = useRouter();
  const handleFilterSelect = (filterKey: string) => {
    setFilterText(filterKey);
  };

  return (
    <Context.Provider>
      <Context.Consumer>
        {({ ss }) => {
          const list = (ss?.Joint?.News as any)?.data || [];



          const mappedNews =
            list?.map((item: any) => {
              const published = new Date(item.publishedAt);

              const scholarshipStatus = item.scholarship?.title
                ? 'Yes'
                : 'No';

              return {
                id: item.id,
                title: item.title,
                scholarship: item.scholarship?.title ?? '—',
                providerName: item.providerProfileVo?.organizationName ?? '—',
                images: item.newsMedias?.length ?? 0,
                fileName: item.newsMedias[0]?.fileName ?? "—",
                contentType: item.newsMedias[0]?.contentType ?? "—",
                scholarshipStatus,
                publishedAt: published.toLocaleDateString('en-US', {
                weekday: 'short',  // "Tue"
                month: 'short',    // "Dec"
                day: 'numeric',    // "3"
                year: 'numeric'    // "2025"
              }),
              };
            }) || [];





          const total = mappedNews.length;
          const withImages = mappedNews.filter((x: any) => x.images > 0).length;
          const noImages = mappedNews.filter((x: any) => x.images === 0).length;
          const withScholarship = mappedNews.filter((x: any) => x.scholarship !== '—').length;
          const noScholarship = mappedNews.filter((x: any) => x.scholarship === '—').length;

          const stats = [
            {
              title: 'Total News',
              value: total,
              icon: <Newspaper />,
              color: 'text-blue-600',
              filterName: '',
            },
            {
              title: 'With Scholarship',
              value: withScholarship,
              icon: <Newspaper />,
              color: 'text-purple-600',
              filterName: 'WithScholarship',
            },
            {
              title: 'No Scholarship',
              value: noScholarship,
              icon: <Newspaper />,
              color: 'text-gray-600',
              filterName: 'NoScholarship',
            },
          ];

          const columns = useMemo(
            () => [
              { accessorKey: "id", header: "ID" },
              { accessorKey: "title", header: "Title" },
              { accessorKey: "scholarship", header: "Scholarship" },
              { accessorKey: "providerName", header: "Provider Name" },
              { accessorKey: "fileName", header: "fileName" },
              { accessorKey: "contentType", header: "contentType" },
              { accessorKey: "scholarshipStatus", header: "Is Has Scholarship" },
              { accessorKey: "publishedAt", header: "Published At" },
            ],
            []
          );
          return (
            <div className="flex flex-col min-h-screen bg-gray-100 p-6">
              {/* <StatisticGrid stats={stats} onFilterSelect={handleFilterSelect} /> */}



              <CustomDataTable
                columns={columns}
                data={mappedNews}
                onView={(row: any) => router.push(`/news/${row.id}`)}
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

export default News;
