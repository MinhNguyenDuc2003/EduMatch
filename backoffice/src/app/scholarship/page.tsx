import CustomDataTable from "src/common/components/common/CustomDataTable";
import StatisticGrid from "src/common/components/common/StatisticGrid";
import { GraduationCap, CheckCircle, Clock, XCircle } from "lucide-react";

export default function Scholarship() {
  const scholarships = [
    {
      id: 1,
      name: "Học bổng FPT Talent",
      sponsor: "Tập đoàn FPT",
      amount: 10000000,
      deadline: "11/15/2025",
      status: "Đang mở",
    },
    {
      id: 2,
      name: "Học bổng Viettel Future",
      sponsor: "Tập đoàn Viettel",
      amount: 8000000,
      deadline: "11/30/2025",
      status: "Đã đóng",
    },
    {
      id: 3,
      name: "Học bổng VinUniversity",
      sponsor: "VinGroup",
      amount: 20000000,
      deadline: "12/10/2025",
      status: "Đang xét duyệt",
    },
  ];

  // ✅ Tính toán thống kê
  const total = scholarships.length;
  const open = scholarships.filter(s => s.status === "Đang mở").length;
  const reviewing = scholarships.filter(s => s.status === "Đang xét duyệt").length;
  const closed = scholarships.filter(s => s.status === "Đã đóng").length;

  // ✅ Chuẩn bị dữ liệu cho component thống kê
  const stats = [
    { title: "Tổng học bổng", value: total, icon: <GraduationCap />, color: "text-blue-600" },
    { title: "Đang mở", value: open, icon: <CheckCircle />, color: "text-green-600" },
    { title: "Đang xét duyệt", value: reviewing, icon: <Clock />, color: "text-yellow-500" },
    { title: "Đã đóng", value: closed, icon: <XCircle />, color: "text-red-600" },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 p-6">
      {/* Ô thống kê */}
      <StatisticGrid stats={stats} />

      {/* Bảng danh sách */}
      <CustomDataTable title="Danh sách học bổng" data={scholarships as any} />
    </div>
  );
}
