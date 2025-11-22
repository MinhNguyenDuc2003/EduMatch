'use client';
import CustomChart from 'src/common/components/common/CustomChart';
import Context from './seg/context';

const DashboardPage = () => {
  return (
    <Context.Provider>
      <Context.Consumer>
        {({ ss }) => {
          const listRevenueByUsertype = (ss.Joint.RevenueByUsertype as any)?.data ?? [];
          const listRevenueByMonthly = (ss.Joint.RevenueMonthly as any)?.data ?? [];
          const listRevenueMonth = (ss.Joint.RevenueByMonth as any)?.data ?? [];
          const userTypeChartData = listRevenueByUsertype.map((x: any) => ({
            name: x.userType,
            value: x.total,
          }));

          const revenueByMonthChartData = listRevenueMonth.map((x: any) => ({
            name: `${x.month}/${x.year}`,
            value: x.total,
          }));

          const monthlyRevenueChartData = listRevenueByMonthly.map((x: any) => ({
            name: `${x.month}/${x.year}`,
            value: x.total,
          }));

          return (
            <div className="p-10">
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

                <CustomChart
                  title="Monthly revenue"
                  type="line"
                  data={monthlyRevenueChartData}
                />
              </div>
            </div>
          );
        }}
      </Context.Consumer>
    </Context.Provider>
  );
};

export default DashboardPage;
