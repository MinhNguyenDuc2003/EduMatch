'use client';

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "common/services/components/ui/tabs";

import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
} from "recharts";

import { TrendingUp, Users, FileText, DollarSign } from 'lucide-react'; // Example icons
import Context from "./seg/context";

/* =========================
   UI COMPONENT: CHART CARD
========================= */
const ChartCard = ({
  title,
  subtitle,
  children,
  icon: Icon,
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  icon?: any;
}) => (
  <div className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col overflow-hidden h-[420px]">
    <div className="p-6 border-b border-gray-50 flex items-start justify-between">
      <div>
        <h2 className="text-lg font-bold text-gray-800 tracking-tight">{title}</h2>
        {subtitle && <p className="text-sm text-gray-500 mt-1 font-medium">{subtitle}</p>}
      </div>
      {Icon && <div className="p-2 bg-blue-50 rounded-lg text-blue-600"><Icon size={20} /></div>}
    </div>
    <div className="flex-1 w-full p-4 min-h-0 relative">
      {children}
    </div>
  </div>
);

// Modern Color Palette
const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899'];

// Helper for formatting numbers
const formatCurrency = (val: number) => `$${val.toLocaleString('en-US')}`;
const formatNumber = (val: number) => val.toLocaleString('en-US');

/* =========================
   CUSTOM TOOLTIP
========================= */
const CustomTooltip = ({ active, payload, label, unit = "" }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-4 border border-gray-100 shadow-xl rounded-xl">
        <p className="text-sm font-bold text-gray-700 mb-2">{label}</p>
        {payload.map((entry: any, index: number) => (
          <div key={index} className="flex items-center gap-2 text-sm text-gray-600 mb-1 last:mb-0">
            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.color }} />
            <span className="font-medium">{entry.name}:</span>
            <span className="font-bold text-gray-900">
              {unit === '$' ? formatCurrency(entry.value) : formatNumber(entry.value)}{unit !== '$' ? unit : ''}
            </span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

/* =========================
   PAGE COMPONENT
========================= */
export default function DashboardPage() {
  return (
    <Context.Provider>
      <Context.Consumer>
        {({ ss }) => {

          /* --- SAFE DATA EXTRACTION & FORMATTING --- */
          const revenueByMonth = Array.isArray(ss?.Joint?.RevenueByMonth) ? ss.Joint.RevenueByMonth : [];
          const revenueByUserType = Array.isArray(ss?.Joint?.RevenueByUsertype) ? ss.Joint.RevenueByUsertype : [];
          // revenueMonthly looks redundant with RevenueByMonth in your data, but let's process it if needed for a different view
          const revenueMonthly = Array.isArray(ss?.Joint?.RevenueMonthly) ? ss.Joint.RevenueMonthly : [];
          const topCountry = Array.isArray(ss?.Joint?.TopCountry) ? ss.Joint.TopCountry : [];
          const reportsStatistics = Array.isArray(ss?.Joint?.ReportsStatistics) ? ss.Joint.ReportsStatistics : [];
          const scholarshipCreated = Array.isArray(ss?.Joint?.ScholarshipCreatedInMonth) ? ss.Joint.ScholarshipCreatedInMonth : [];

          // Format for Charts
          const formattedRevenue = revenueByMonth.map((i) => ({
            period: `Week ${i.month}/${i.year}`, // Assuming data might be granular, or just Month/Year
            rawPeriod: `${i.month}/${i.year}`,
            total: Number(i?.total?.toFixed(2)),
          }));

          const formattedScholarship = scholarshipCreated.map((i) => ({
            period: `${i.month}/${i.year}`,
            count: i.count,
          }));

          const formattedCountries = topCountry.map((i) => ({
            ...i,
            countryName: i.country.charAt(0).toUpperCase() + i.country.slice(1),
          }));

          // Calculate Totals for Summary Cards (Optional)
          const totalRevenue = revenueByMonth.reduce(
            (acc, curr) => acc + (curr.total ?? 0),
            0
          );
          const totalScholarships = scholarshipCreated.reduce((acc, curr) => acc + curr.count, 0);

          return (
            <div className="p-8 bg-gray-50/50 min-h-screen font-sans text-gray-900">

              {/* DASHBOARD HEADER */}
              <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                  <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Executive Dashboard</h1>
                  <p className="text-gray-500 mt-2 font-medium">Real-time insights into platform performance and financial health.</p>
                </div>
                {/* Simple Stat Cards Row */}
                <div className="flex gap-4">
                  <div className="bg-white px-6 py-3 rounded-xl border border-gray-200 shadow-sm">
                    <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">Total Revenue (In Month)</p>
                    <p className="text-xl font-bold text-emerald-600">{formatCurrency(totalRevenue)}</p>
                  </div>
                  <div className="bg-white px-6 py-3 rounded-xl border border-gray-200 shadow-sm">
                    <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">New Scholarships (In Month)</p>
                    <p className="text-xl font-bold text-blue-600">{formatNumber(totalScholarships)}</p>
                  </div>
                </div>
              </div>

              <Tabs defaultValue="overview" className="space-y-8">

                {/* STYLED TABS LIST */}
                <TabsList className="bg-white p-1.5 rounded-xl border border-gray-200 shadow-sm inline-flex h-auto">
                  {['Overview', 'Financial', 'Reports'].map((tab) => (
                    <TabsTrigger
                      key={tab}
                      value={tab.toLowerCase()}
                      className="px-6 py-2.5 rounded-lg text-sm font-semibold text-gray-600 data-[state=active]:bg-gray-100 data-[state=active]:text-gray-900 transition-all"
                    >
                      {tab}
                    </TabsTrigger>
                  ))}
                </TabsList>

                {/* =========================
                    OVERVIEW TAB
                ========================= */}
                <TabsContent value="overview" className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

                    {/* 1. Scholarship Growth Trend */}
                    <ChartCard
                      title="Scholarship Growth"
                      subtitle="Monthly volume of newly created opportunities"
                      icon={TrendingUp}
                    >
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={formattedScholarship} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                          <defs>
                            <linearGradient id="colorSch" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#f97316" stopOpacity={0.1} />
                              <stop offset="95%" stopColor="#f97316" stopOpacity={0} />
                            </linearGradient>
                          </defs>
                          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                          <XAxis
                            dataKey="period"
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: '#6b7280', fontSize: 12, fontWeight: 500 }}
                            dy={10}
                          />
                          <YAxis
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: '#6b7280', fontSize: 12 }}
                          />
                          <Tooltip content={<CustomTooltip />} />
                          <Area
                            type="monotone"
                            dataKey="count"
                            name="Created"
                            stroke="#f97316"
                            strokeWidth={3}
                            fillOpacity={1}
                            fill="url(#colorSch)"
                          />
                        </AreaChart>
                      </ResponsiveContainer>
                    </ChartCard>

                    {/* 2. Top Countries (Horizontal Bar) */}
                    <ChartCard
                      title="Geographic Distribution"
                      subtitle="Top performing regions by total activity"
                      icon={GlobeIcon}
                    >
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                          data={formattedCountries}
                          layout="vertical"
                          margin={{ top: 0, right: 30, left: 40, bottom: 0 }}
                        >
                          <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f3f4f6" />
                          <XAxis type="number" hide />
                          <YAxis
                            dataKey="countryName"
                            type="category"
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: '#374151', fontSize: 13, fontWeight: 600 }}
                            width={100}
                          />
                          <Tooltip cursor={{ fill: '#f9fafb' }} content={<CustomTooltip />} />
                          <Bar
                            dataKey="total"
                            name="Total Activity"
                            fill="#10b981"
                            radius={[0, 6, 6, 0]}
                            barSize={32}
                          >
                            {formattedCountries.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                          </Bar>
                        </BarChart>
                      </ResponsiveContainer>
                    </ChartCard>

                  </div>
                </TabsContent>

                {/* =========================
                    FINANCIAL TAB
                ========================= */}
                <TabsContent value="financial" className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

                    {/* 3. Monthly Revenue Trend (Added missing chart) */}
                    <ChartCard
                      title="Revenue Trajectory"
                      subtitle="Monthly earnings overview (USD)"
                      icon={DollarSign}
                    >
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={formattedRevenue} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                          <defs>
                            <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.2} />
                              <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                            </linearGradient>
                          </defs>
                          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                          <XAxis
                            dataKey="rawPeriod"
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: '#6b7280', fontSize: 12 }}
                            dy={10}
                          />
                          <YAxis
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: '#6b7280', fontSize: 12 }}
                            tickFormatter={(value) => `$${value}`} // Format Axis
                          />
                          <Tooltip content={<CustomTooltip unit="$" />} />
                          <Area
                            type="monotone"
                            dataKey="total"
                            name="Revenue"
                            stroke="#3b82f6"
                            strokeWidth={3}
                            fillOpacity={1}
                            fill="url(#colorRev)"
                          />
                        </AreaChart>
                      </ResponsiveContainer>
                    </ChartCard>

                    {/* 4. Revenue By User Type (Donut) */}
                    <ChartCard
                      title="Revenue Source"
                      subtitle="Distribution by user segment"
                      icon={Users}
                    >
                      <div className="flex items-center justify-center h-full">
                        <ResponsiveContainer width="100%" height="100%">
                          <PieChart>
                            <Pie
                              data={revenueByUserType as any }
                              dataKey="total"
                              nameKey="userType"
                              innerRadius={80}
                              outerRadius={120}
                              paddingAngle={5}
                              cornerRadius={6}
                            >
                              {revenueByUserType.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={index === 0 ? '#3b82f6' : '#10b981'} />
                              ))}
                            </Pie>
                            <Tooltip content={<CustomTooltip unit="$" />} />
                            <Legend
                              verticalAlign="bottom"
                              height={36}
                              iconType="circle"
                              formatter={(value) => <span className="text-gray-600 font-semibold ml-2 capitalize">{value.toLowerCase()}</span>}
                            />
                          </PieChart>
                        </ResponsiveContainer>
                      </div>
                    </ChartCard>

                  </div>
                </TabsContent>

                {/* =========================
                    REPORTS TAB
                ========================= */}
                <TabsContent value="reports" className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <div className="grid grid-cols-1 gap-8">

                    {/* 5. Reports Comparison (Grouped Bar) */}
                    <ChartCard
                      title="System Reports Analysis"
                      subtitle="Comparative volume: This Month vs Last Month"
                      icon={FileText}
                    >
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={reportsStatistics} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                          <XAxis
                            dataKey="type"
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: '#374151', fontWeight: 600, fontSize: 12 }}
                            dy={10}
                          />
                          <YAxis
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: '#6b7280', fontSize: 12 }}
                          />
                          <Tooltip cursor={{ fill: '#f9fafb' }} content={<CustomTooltip />} />
                          <Legend wrapperStyle={{ paddingTop: '20px' }} formatter={(value) => <span className="text-gray-600 font-medium ml-1">{value}</span>} />

                          <Bar
                            dataKey="thisMonthCount"
                            name="This Month"
                            fill="#3b82f6"
                            radius={[6, 6, 0, 0]}
                            barSize={45}
                          />
                          <Bar
                            dataKey="lastMonthCount"
                            name="Last Month"
                            fill="#e5e7eb"
                            radius={[6, 6, 0, 0]}
                            barSize={45}
                          />
                        </BarChart>
                      </ResponsiveContainer>
                    </ChartCard>

                  </div>
                </TabsContent>

              </Tabs>
            </div>
          );
        }}
      </Context.Consumer>
    </Context.Provider>
  );
}

// Simple Globe Icon Component since it was missing in imports
const GlobeIcon = ({ size, className }: { size?: number, className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size || 24}
    height={size || 24}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <circle cx="12" cy="12" r="10"></circle>
    <line x1="2" y1="12" x2="22" y2="12"></line>
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
  </svg>
);