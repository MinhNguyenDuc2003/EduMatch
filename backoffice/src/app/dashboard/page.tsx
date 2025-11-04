import React from 'react';
import CustomChart from 'src/common/components/common/CustomChart';

const Dashboard = () => {
  const users = [
    {
      id: 1,
      name: 'Nguyễn Đức Minh',
      role: 'Sinh viên',
      school: 'ĐH FPT Hà Nội',
      email: 'minhndse173515@fpt.edu.vn',
      registeredScholarships: 3,
      joinDate: '01/12/2024',
      status: 'Đang hoạt động',
    },
    {
      id: 2,
      name: 'Đỗ Minh Hiếu',
      role: 'Quản trị viên',
      school: 'ĐH FPT Đà Nẵng',
      email: 'hieudmse173419@fpt.edu.vn',
      registeredScholarships: 5,
      joinDate: '05/15/2024',
      status: 'Đang hoạt động',
    },
    {
      id: 3,
      name: 'Võ Tấn Tài',
      role: 'Sinh viên',
      school: 'ĐH FPT TP.HCM',
      email: 'taivtse173519@fpt.edu.vn',
      registeredScholarships: 1,
      joinDate: '08/10/2024',
      status: 'Bị khóa',
    },
    {
      id: 4,
      name: 'Trần Thế Khang',
      role: 'Nhà tài trợ',
      school: 'VinUniversity',
      email: 'khangttse173509@vinuni.edu.vn',
      registeredScholarships: 8,
      joinDate: '02/20/2025',
      status: 'Đang hoạt động',
    },
  ];

  const totalUsers = users.length;
  const activeUsers = users.filter((u) => u.status === 'Đang hoạt động').length;
  const sponsors = users.filter((u) => u.role === 'Nhà tài trợ').length;
  const students = users.filter((u) => u.role === 'Sinh viên').length;
  return (
    <div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6  p-14">
        <CustomChart
          title="Phân bố người dùng theo vai trò"
          type="pie"
          data={[
            { name: 'Sinh viên', value: students },
            { name: 'Nhà tài trợ', value: sponsors },
            { name: 'Quản trị viên', value: 1 },
          ]}
        />

        <CustomChart
          title="Tình trạng hoạt động"
          type="bar"
          data={[
            { name: 'Đang hoạt động', value: activeUsers },
            { name: 'Bị khóa', value: totalUsers - activeUsers },
          ]}
          color="#10b981"
        />
      </div>
   
    </div>
  );
};

export default Dashboard;
