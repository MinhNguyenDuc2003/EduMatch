import CustomDataTable from "src/common/components/common/CustomDataTable";
import StatisticGrid from "src/common/components/common/StatisticGrid";
import { Users, GraduationCap, ShieldCheck, School, UserCheck } from "lucide-react";

export default function User() {
  const users = [
    {
      id: 1,
      name: "Nguyễn Đức Minh",
      role: "Sinh viên",
      school: "ĐH FPT Hà Nội",
      email: "minhndse173515@fpt.edu.vn",
      registeredScholarships: 3,
      joinDate: "01/12/2024",
      status: "Đang hoạt động",
    },
    {
      id: 2,
      name: "Đỗ Minh Hiếu",
      role: "Quản trị viên",
      school: "ĐH FPT Đà Nẵng",
      email: "hieudmse173419@fpt.edu.vn",
      registeredScholarships: 5,
      joinDate: "05/15/2024",
      status: "Đang hoạt động",
    },
    {
      id: 3,
      name: "Võ Tấn Tài",
      role: "Sinh viên",
      school: "ĐH FPT TP.HCM",
      email: "taivtse173519@fpt.edu.vn",
      registeredScholarships: 1,
      joinDate: "08/10/2024",
      status: "Bị khóa",
    },
    {
      id: 4,
      name: "Trần Thế Khang",
      role: "Nhà tài trợ",
      school: "VinUniversity",
      email: "khangttse173509@vinuni.edu.vn",
      registeredScholarships: 8,
      joinDate: "02/20/2025",
      status: "Đang hoạt động",
    },
  ];

  // ✅ Tính toán thống kê
  const totalUsers = users.length;
  const activeUsers = users.filter((u) => u.status === "Đang hoạt động").length;
  const sponsors = users.filter((u) => u.role === "Nhà tài trợ").length;
  const students = users.filter((u) => u.role === "Sinh viên").length;

  // ✅ Dữ liệu cho component thống kê
  const stats = [
    { title: "Tổng người dùng", value: totalUsers, icon: <Users />, color: "text-blue-600" },
    { title: "Đang hoạt động", value: activeUsers, icon: <ShieldCheck />, color: "text-green-600" },
    { title: "Nhà tài trợ", value: sponsors, icon: <GraduationCap />, color: "text-purple-600" },
    { title: "Sinh viên", value: students, icon: <School />, color: "text-yellow-600" },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 p-6">
      {/* Các ô thống kê */}
      <StatisticGrid stats={stats} />

      {/* Bảng người dùng */}
      <CustomDataTable title="Danh sách người dùng" data={users as any} />
    </div>
  );
}
