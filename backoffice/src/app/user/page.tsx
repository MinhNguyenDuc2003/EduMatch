import CustomDataTable from "src/common/components/common/CustomDataTable";

export default function User() {
  const users = [
  { name: "Nguyễn Đức Minh", age: 21, city: "Đà Nẵng", email: "minh@example.com" },
  { name: "Đỗ Minh Hiếu", age: 22, city: "Hà Nội", email: "hieu@example.com" },
];
  return (
    <div className="flex min-h-screen bg-gray-100">
        <CustomDataTable title="Danh sách nhân viên" data={users} />; 
    </div>
  );
}
