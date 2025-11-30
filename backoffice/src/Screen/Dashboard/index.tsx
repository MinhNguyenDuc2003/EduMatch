'use client';
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import CustomChart from 'src/common/components/common/CustomChart';
import Context from './seg/context';

const DashboardPage = () => {
  return (
    <Context.Provider>
      <Context.Consumer>
        {({ ss }) => {
          const listRevenueByUsertype = (ss.Joint.RevenueByUsertype as any)?.data ?? [];
          const listRevenueByMonthly = (ss.Joint.RevenueMonthly as any)?.data ?? [];
          const listRevenueByMonth = (ss.Joint.RevenueByMonth as any)?.data ?? [];
          const listTopView = (ss.Joint.TopView as any)?.data ?? [];
          const listTopApply = (ss.Joint.TopApply as any)?.data ?? [];

          const userTypeChartData = listRevenueByUsertype.map((x: any) => ({
            name: x.userType,
            value: x.total,
          }));

          const revenueByMonthChartData = listRevenueByMonth.map((x: any) => ({
            name: `${x.month}/${x.year}`,
            value: x.total,
          }));

          const monthlyRevenueChartData = listRevenueByMonthly.map((x: any) => ({
            name: `${x.month}/${x.year}`,
            value: x.total,
          }));

          // --- Dữ liệu chart top scholarships ---
          const topScholarships = [...listTopView]
            .sort((a, b) => b.views - a.views)
            .slice(0, 5);

          const topScholarshipChartData = topScholarships.map(item => {
            const applyItem = listTopApply.find((x : any) => x.scholarshipTitle === item.title);
            return {
              name: item.title,
              views: item.views,
              apply: applyItem?.totalApply ?? 0,
            };
          });

          return (
            <div className="p-10 space-y-6">
              {/* 2 biểu đồ nhỏ (2 cột) */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <CustomChart
                  title="Revenue by user type"
                  type="pie"
                  data={userTypeChartData}
                />
                <CustomChart
                  title="Revenue for the month"
                  type="bar"
                  data={revenueByMonthChartData}
                  color="#10b981"
                />
              </div>

              {/* Biểu đồ line nhỏ hơn */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <CustomChart
                  title="Monthly revenue"
                  type="line"
                  data={monthlyRevenueChartData}
                />
              </div>

              {/* Biểu đồ đường Top Scholarships full width */}
           {/* Biểu đồ đường Top Scholarships full width */}
<div className="w-full">
  <h2 className="text-xl font-semibold mb-4">
    Top Scholarships: Views vs Apply
  </h2>
  <div style={{ width: '100%', minHeight: 400 }}>
    <ResponsiveContainer width="100%" height={400}>
      <LineChart
        data={topScholarshipChartData}
        margin={{ top: 20, right: 30, left: 20, bottom: 50 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis 
          dataKey="name" 
          tick={{ fontSize: 12 }} 
          interval={0} 
          textAnchor="end" 
        />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="views" stroke="#3b82f6" activeDot={{ r: 8 }} />
        <Line type="monotone" dataKey="apply" stroke="#f97316" />
      </LineChart>
    </ResponsiveContainer>
  </div>
</div>

            </div>
          );
        }}
      </Context.Consumer>
    </Context.Provider>
  );
};

export default DashboardPage;
