import CustomDataTable from "src/common/components/common/CustomDataTable";
import StatisticGrid from "src/common/components/common/StatisticGrid";
import { FileText, CheckCircle, Clock, XCircle } from "lucide-react";

export default function Request() {
  const requests = [
    { id: 1, requester: "Nguyễn Đức Minh", scholarship: "Học bổng FPT Talent", date: "10/25/2025", status: "Đang chờ duyệt" },
    { id: 2, requester: "Đỗ Minh Hiếu", scholarship: "Học bổng Viettel Future", date: "10/27/2025", status: "Đã duyệt" },
    { id: 3, requester: "Võ Tấn Tài", scholarship: "Học bổng VinUniversity", date: "10/28/2025", status: "Từ chối" },
  ];

  const totalRequests = requests.length;
  const approved = requests.filter(r => r.status === "Đã duyệt").length;
  const pending = requests.filter(r => r.status === "Đang chờ duyệt").length;
  const rejected = requests.filter(r => r.status === "Từ chối").length;

  const stats = [
    { title: "Tổng yêu cầu", value: totalRequests, icon: <FileText />, color: "text-blue-600" },
    { title: "Đã duyệt", value: approved, icon: <CheckCircle />, color: "text-green-600" },
    { title: "Đang chờ duyệt", value: pending, icon: <Clock />, color: "text-yellow-500" },
    { title: "Từ chối", value: rejected, icon: <XCircle />, color: "text-red-600" },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 p-6">
      <StatisticGrid stats={stats} />
      <CustomDataTable title="Danh sách yêu cầu" data={requests as any} />
    </div>
  );
}
