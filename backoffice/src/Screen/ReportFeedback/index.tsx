"use client";
import { CheckCircle, Clock, GraduationCap, Mail } from "lucide-react";
import { useMemo, useState } from "react";
import CustomDataTable from "src/common/components/common/CustomDataTable";
import StatisticGrid from "src/common/components/common/StatisticGrid";
import Context from "./seg/context";
import { useRouter } from "next/navigation";

const ReportFeedbackPage = () => {
  const [filterText, setFilterText] = useState("");
  const router = useRouter();
  const handleFilterSelect = (filterKey: string) => {
    setFilterText(filterKey);
  };

  return (
    <Context.Provider>
      <Context.Consumer>
        {({ ss }) => {
          const list = (ss?.Joint?.ReportList as any)?.data || [];
          console.log("list", list);

          const ReportFeedbacks =
            list?.map((item: any) => ({
              id: item.id,
              title: item.title ?? "—",
              comment: item.comment ?? "—",
              categoryName: item.category?.name || "—",
              categoryType: item.category?.type || "—",
              status: item.status ?? "—",
              isRead: item.isRead ? "Read" : "Unread",
            })) || [];

          // ✅ Thống kê
          const total = ReportFeedbacks.length;
          const unread = ReportFeedbacks.filter((s: any) => s.isRead === "Unread").length;
          const pending = ReportFeedbacks.filter((s: any) => s.status === "PENDING").length;
          const resolved = ReportFeedbacks.filter((s: any) => s.status === "RESOLVED").length;

          // UI của thống kê
          const stats = [
            {
              title: "Total Reports",
              value: total,
              icon: <GraduationCap />,
              color: "text-blue-600",
              filterName: "",
            },
            {
              title: "Unread",
              value: unread,
              icon: <Mail />,
              color: "text-purple-600",
              filterName: "Unread",
            },
            {
              title: "Pending",
              value: pending,
              icon: <Clock />,
              color: "text-yellow-500",
              filterName: "PENDING",
            },
            {
              title: "Resolved",
              value: resolved,
              icon: <CheckCircle />,
              color: "text-green-600",
              filterName: "RESOLVED",
            },
          ];
          const columns = [
    { accessorKey: "id", header: "ID" },
    { accessorKey: "title", header: "Title" },
    { accessorKey: "comment", header: "Comment" },
    { accessorKey: "categoryName", header: "Category Name" },
    { accessorKey: "categoryType", header: "Category Type" },
    { accessorKey: "status", header: "Status" },
    { accessorKey: "isRead", header: "Read" },
  ];
          return (
            <div className="flex flex-col min-h-screen bg-gray-100 p-6">
              {/* STATISTIC GRID */}
              {/* <StatisticGrid stats={stats} onFilterSelect={handleFilterSelect} /> */}

              {/* DATA TABLE */}

              <CustomDataTable
                columns={columns}
                data={ReportFeedbacks}
                onView={(row: any) => router.push(`/reportFeedback/${row.id}`)}
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

export default ReportFeedbackPage;
