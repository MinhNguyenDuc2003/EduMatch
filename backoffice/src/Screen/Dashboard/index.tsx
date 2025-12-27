'use client';

import React from 'react';
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

import {
  ArrowUpRight,
  DollarSign,
  Eye,
  FileText,
  Globe,
  Send,
  TrendingUp,
  Trophy,
  Users,
} from 'lucide-react';
import Context from './seg/context';

/* =========================
   UI COMPONENT: CHART CARD
========================= */
const ChartCard = ({
  title,
  subtitle,
  children,
  icon: Icon,
  className = '',
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  icon?: any;
  className?: string;
}) => (
  <div
    className={`bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col overflow-hidden ${className}`}
  >
    <div className="p-6 border-b border-gray-50 flex items-start justify-between">
      <div>
        <h2 className="text-xl font-bold text-gray-800 tracking-tight">{title}</h2>
        {subtitle && <p className="text-sm text-gray-500 mt-1 font-medium">{subtitle}</p>}
      </div>
      {Icon && (
        <div className="p-2 bg-blue-50 rounded-lg text-blue-600">
          <Icon size={22} />
        </div>
      )}
    </div>
    <div className="flex-1 w-full p-6 min-h-0 relative">{children}</div>
  </div>
);

// Modern Color Palette
const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899'];

// Helper for formatting
const formatCurrency = (val: number) => `$${val.toLocaleString('en-US')}`;
const formatNumber = (val: number) => val.toLocaleString('en-US');

/* =========================
   CUSTOM TOOLTIP
========================= */
const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-4 border border-gray-100 shadow-xl rounded-xl max-w-sm">
        <p className="text-sm font-bold text-gray-800 mb-2 whitespace-normal leading-tight">
          {label || payload[0].name}
        </p>
        {payload.map((entry: any, index: number) => (
          <div key={index} className="flex flex-col gap-1 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.color }} />
              <span className="font-medium">{entry.name}:</span>
              <span className="font-bold text-gray-900">
                {entry.dataKey === 'percentValue'
                  ? `${entry.value}%`
                  : entry.dataKey === 'total'
                    ? formatCurrency(entry.value)
                    : formatNumber(entry.value)}
              </span>
            </div>
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
          /* --- TRÍCH XUẤT DỮ LIỆU --- */
          const revenueByMonth = Array.isArray(ss?.Joint?.RevenueByMonth)
            ? ss.Joint.RevenueByMonth
            : [];
          const revenueByUserTypeRaw = Array.isArray(ss?.Joint?.RevenueByUsertype)
            ? ss.Joint.RevenueByUsertype
            : [];
          const topCountry = Array.isArray(ss?.Joint?.TopCountry) ? ss.Joint.TopCountry : [];
          const reportsStatistics = Array.isArray(ss?.Joint?.ReportsStatistics)
            ? ss.Joint.ReportsStatistics
            : [];
          const scholarshipCreated = Array.isArray(ss?.Joint?.ScholarshipCreatedInMonth)
            ? ss.Joint.ScholarshipCreatedInMonth
            : [];
          const topViewRaw = Array.isArray(ss?.Joint?.TopView) ? ss.Joint.TopView : [];
          const topApplyRaw = Array.isArray(ss?.Joint?.TopApply) ? ss.Joint.TopApply : [];

          /* --- XỬ LÝ DOANH THU THEO PHẦN TRĂM (%) --- */
          const totalUserRevenue = revenueByUserTypeRaw.reduce(
            (acc, curr) => acc + (curr.total || 0),
            0
          );
          const revenuePercentageData = revenueByUserTypeRaw.map((item) => {
            const userType = item.userType ?? 'unknown';
            const total = item.total ?? 0;
            return {
              name: userType.charAt(0).toUpperCase() + userType.slice(1).toLowerCase(),
              percentValue:
                totalUserRevenue > 0 ? Number(((total / totalUserRevenue) * 100).toFixed(1)) : 0,
              originalTotal: total,
            };
          });

          /* --- ĐỊNH DẠNG DỮ LIỆU --- */
          const formattedScholarship = scholarshipCreated.map((i) => ({
            period: `${i.month}/${i.year}`,
            count: i.count,
          }));

          const formattedCountries = topCountry.map((i) => ({
            name: i.country.charAt(0).toUpperCase() + i.country.slice(1),
            // total: i.total, // <-- Cũ
            count: i.total, // <-- Mới: Đổi tên để tránh bị format thành tiền tệ ($) trong tooltip
          }));

          const formattedRevenue = revenueByMonth.map((i) => ({
            period: `${i.month}/${i.year}`,
            total: Number(i?.total?.toFixed(2)),
          }));

          // Dữ liệu Top 5 cho Table
          const top5Views = [...topViewRaw].sort((a, b) => b.views - a.views).slice(0, 5);

          const top5Apply = [...topApplyRaw]
            .sort((a, b) => b.totalApply - a.totalApply)
            .slice(0, 5);

          const totalRevenue = revenueByMonth.reduce((acc, curr) => acc + (curr.total ?? 0), 0);
          const totalScholarships = scholarshipCreated.reduce((acc, curr) => acc + curr.count, 0);

          return (
            <div className="p-8 bg-gray-50/50 min-h-screen font-sans text-gray-900 space-y-10">
              {/* HEADER SECTION */}
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                  <h1 className="text-4xl font-black text-gray-900 tracking-tighter uppercase leading-none">
                    Management Dashboard
                  </h1>
                  <p className="text-gray-500 mt-3 text-lg font-medium">
                    Full visibility into platform operations and engagement.
                  </p>
                </div>
                <div className="flex gap-6">
                  <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm min-w-[220px]">
                    <p className="text-xs text-gray-400 font-black uppercase tracking-widest mb-1">
                      Total Revenue
                    </p>
                    <p className="text-3xl font-bold text-emerald-600 tracking-tight">
                      {formatCurrency(totalRevenue)}
                    </p>
                  </div>
                  <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm min-w-[220px]">
                    <p className="text-xs text-gray-400 font-black uppercase tracking-widest mb-1">
                      Total Scholarships
                    </p>
                    <p className="text-3xl font-bold text-blue-600 tracking-tight">
                      {formatNumber(totalScholarships)}
                    </p>
                  </div>
                </div>
              </div>

              {/* ROW 1: REVENUE SHARE & REGIONAL */}
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-10">
                <ChartCard
                  title="Revenue Share Percentage"
                  subtitle="Relative contribution of Providers vs Applicants"
                  icon={Users}
                  className="h-[500px]"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={revenuePercentageData}
                        dataKey="percentValue"
                        nameKey="name"
                        innerRadius={90}
                        outerRadius={140}
                        paddingAngle={5}
                        cornerRadius={10}
                        label={({ name, value }) => `${name}: ${value}%`}
                      >
                        {revenuePercentageData.map((_, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip content={<CustomTooltip />} />
                      <Legend
                        verticalAlign="bottom"
                        height={36}
                        formatter={(value) => (
                          <span className="font-bold text-gray-700">{value}</span>
                        )}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </ChartCard>

                <ChartCard title="Regional Distribution" icon={Globe} className="h-[500px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={formattedCountries} layout="vertical">
                      <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f3f4f6" />
                      <XAxis type="number" hide />

                      {/* CẬP NHẬT YAxis */}
                      <YAxis
                        dataKey="name"
                        type="category"
                        axisLine={false}
                        tickLine={false}
                        width={180}
                        tick={{ fontWeight: 700 }}
                      />

                      <Tooltip content={<CustomTooltip />} />

                      {/* CẬP NHẬT Bar: đổi dataKey thành 'count' */}
                      <Bar dataKey="count" name="Scholarships" radius={[0, 4, 4, 0]} barSize={35}>
                        {formattedCountries.map((_, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </ChartCard>
              </div>

              {/* ROW 2: GROWTH & TRENDS */}
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-10">
                <ChartCard
                  title="Monthly Scholarship Growth"
                  icon={TrendingUp}
                  className="h-[450px]"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={formattedScholarship}>
                      <defs>
                        <linearGradient id="colorSch" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.1} />
                          <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                      <XAxis dataKey="period" axisLine={false} tickLine={false} />
                      <YAxis axisLine={false} tickLine={false} />
                      <Tooltip content={<CustomTooltip />} />
                      <Area
                        type="monotone"
                        dataKey="count"
                        name="Count"
                        stroke="#3b82f6"
                        strokeWidth={4}
                        fill="url(#colorSch)"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </ChartCard>

                <ChartCard title="Total Revenue Trend" icon={DollarSign} className="h-[450px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={formattedRevenue}>
                      <defs>
                        <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#10b981" stopOpacity={0.1} />
                          <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                      <XAxis dataKey="period" axisLine={false} tickLine={false} />
                      <YAxis axisLine={false} tickLine={false} />
                      <Tooltip content={<CustomTooltip />} />
                      <Area
                        type="monotone"
                        dataKey="total"
                        name="Revenue"
                        stroke="#10b981"
                        strokeWidth={4}
                        fill="url(#colorRev)"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </ChartCard>
              </div>

              {/* ROW 3: SYSTEM PERFORMANCE */}
              <ChartCard title="System Performance Reports" icon={FileText} className="h-[450px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={reportsStatistics}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                    <XAxis dataKey="type" axisLine={false} tickLine={false} />
                    <YAxis axisLine={false} tickLine={false} />
                    <Tooltip cursor={{ fill: '#f9fafb' }} content={<CustomTooltip />} />
                    <Legend verticalAlign="top" height={36} />
                    <Bar
                      dataKey="thisMonthCount"
                      name="This Month"
                      fill="#3b82f6"
                      radius={[6, 6, 0, 0]}
                      barSize={60}
                    />
                    <Bar
                      dataKey="lastMonthCount"
                      name="Last Month"
                      fill="#e5e7eb"
                      radius={[6, 6, 0, 0]}
                      barSize={60}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </ChartCard>

              {/* ROW 4: TOP RANKINGS TABLES (FINAL SECTION) */}
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-10">
                {/* TOP VIEWS TABLE */}
                <ChartCard
                  title="Top 5 Most Viewed Scholarships"
                  subtitle="Ranked by total engagement"
                  icon={Eye}
                >
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="border-b border-gray-100">
                          <th className="py-4 px-2 text-xs font-black text-gray-400 uppercase tracking-widest w-16">
                            Rank
                          </th>
                          <th className="py-4 px-2 text-xs font-black text-gray-400 uppercase tracking-widest">
                            Scholarship Name
                          </th>
                          <th className="py-4 px-2 text-xs font-black text-gray-400 uppercase tracking-widest text-right">
                            Views
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {top5Views.map((item, idx) => (
                          <tr
                            key={idx}
                            className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors group"
                          >
                            <td className="py-4 px-2 font-bold text-gray-400">
                              {idx === 0 ? (
                                <Trophy size={18} className="text-amber-400" />
                              ) : (
                                `#${idx + 1}`
                              )}
                            </td>
                            <td className="py-4 px-2">
                              <p className="font-bold text-gray-800 line-clamp-1 group-hover:text-blue-600 transition-colors">
                                {item.title}
                              </p>
                            </td>
                            <td className="py-4 px-2 text-right">
                              <span className="inline-flex items-center gap-1 font-black text-blue-600 bg-blue-50 px-3 py-1 rounded-lg text-sm">
                                {formatNumber(item.views)} <ArrowUpRight size={14} />
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </ChartCard>

                {/* TOP APPLY TABLE */}
                <ChartCard
                  title="Top 5 High Conversion Scholarships"
                  subtitle="Ranked by successful applications"
                  icon={Send}
                >
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="border-b border-gray-100">
                          <th className="py-4 px-2 text-xs font-black text-gray-400 uppercase tracking-widest w-16">
                            Rank
                          </th>
                          <th className="py-4 px-2 text-xs font-black text-gray-400 uppercase tracking-widest">
                            Scholarship Name
                          </th>
                          <th className="py-4 px-2 text-xs font-black text-gray-400 uppercase tracking-widest text-right">
                            Applied
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {top5Apply.map((item, idx) => (
                          <tr
                            key={idx}
                            className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors group"
                          >
                            <td className="py-4 px-2 font-bold text-gray-400">
                              {idx === 0 ? (
                                <Trophy size={18} className="text-amber-400" />
                              ) : (
                                `#${idx + 1}`
                              )}
                            </td>
                            <td className="py-4 px-2">
                              <p className="font-bold text-gray-800 line-clamp-1 group-hover:text-amber-600 transition-colors">
                                {item.scholarshipTitle}
                              </p>
                            </td>
                            <td className="py-4 px-2 text-right">
                              <span className="inline-flex items-center gap-1 font-black text-amber-600 bg-amber-50 px-3 py-1 rounded-lg text-sm">
                                {formatNumber(item.totalApply)} <ArrowUpRight size={14} />
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </ChartCard>
              </div>
            </div>
          );
        }}
      </Context.Consumer>
    </Context.Provider>
  );
}
