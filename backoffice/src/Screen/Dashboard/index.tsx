'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from "common/services/components/ui/tabs";
import {
  LineChart, Line, BarChart, Bar,
  XAxis, YAxis, Tooltip, ResponsiveContainer,
  CartesianGrid, Legend, FunnelChart, Funnel, LabelList,
  AreaChart, Area, ComposedChart,
  PolarAngleAxis, PolarGrid, PolarRadiusAxis,
  Radar, RadarChart
} from "recharts";



// =======================
//     CARD COMPONENT
// =======================
const ChartCard = ({ title, children }) => (
  <div className="p-5 bg-white shadow rounded-xl border">
    <h2 className="font-semibold text-lg mb-3">{title}</h2>
    <div className="w-full h-[300px]">{children}</div>
  </div>
);


export default function DashboardPage() {

  // ===========================
  //        MOCK DATA
  // ===========================
  const userGrowthData = [
    { month: "Jan", users: 120 },
    { month: "Feb", users: 160 },
    { month: "Mar", users: 240 },
    { month: "Apr", users: 400 },
    { month: "May", users: 620 },
    { month: "Jun", users: 880 },
  ];

  const scholarshipSearchData = [
    { category: "USA", searches: 1200 },
    { category: "Canada", searches: 900 },
    { category: "Japan", searches: 750 },
    { category: "Europe", searches: 620 },
  ];

  const applicationFunnel = [
    { stage: "Viewed", value: 3000 },
    { stage: "Saved", value: 1800 },
    { stage: "Applied", value: 900 },
    { stage: "Approved", value: 240 },
  ];

  const providerActivity = [
    { month: "Jan", scholarships: 10 },
    { month: "Feb", scholarships: 14 },
    { month: "Mar", scholarships: 21 },
    { month: "Apr", scholarships: 18 },
  ];

  const subscriptionRevenue = [
    { month: "Jan", revenue: 1200 },
    { month: "Feb", revenue: 2400 },
    { month: "Mar", revenue: 3100 },
    { month: "Apr", revenue: 4500 },
  ];

  const subscriptionPlanStats = [
    { plan: "Basic", users: 450 },
    { plan: "Standard", users: 820 },
    { plan: "Premium", users: 600 },
  ];

  const churnRateData = [
    { month: "Jan", churn: 4.2 },
    { month: "Feb", churn: 3.8 },
    { month: "Mar", churn: 3.1 },
    { month: "Apr", churn: 2.9 },
  ];

  // Report Type (This Month vs Last Month)
  const reportCompareData = [
    { type: "System", thisMonth: 55, lastMonth: 33 },
    { type: "Application", thisMonth: 42, lastMonth: 28 },
    { type: "Scholarship", thisMonth: 36, lastMonth: 22 },
    { type: "Provider", thisMonth: 30, lastMonth: 18 },
    { type: "User", thisMonth: 48, lastMonth: 29 },
  ];


  // =======================
  //        UI TABS
  // =======================
  return (
    <div className="p-6">

      <Tabs defaultValue="overview" className="w-full">

        {/* TAB BUTTONS */}
        <TabsList className="grid grid-cols-3 lg:grid-cols-6 w-full mb-6">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="provider">Provider</TabsTrigger>
          <TabsTrigger value="subscription">Subscription</TabsTrigger>
          <TabsTrigger value="report">Reports</TabsTrigger>
          <TabsTrigger value="ai">Target</TabsTrigger>
        </TabsList>


        {/* ========================= */}
        {/*       OVERVIEW TAB       */}
        {/* ========================= */}
        <TabsContent value="overview">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

            <ChartCard title="User Growth">
              <ResponsiveContainer>
                <LineChart data={userGrowthData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="users" stroke="#3b82f6" strokeWidth={3} />
                </LineChart>
              </ResponsiveContainer>
            </ChartCard>

            <ChartCard title="Scholarship Search by Country">
              <ResponsiveContainer>
                <BarChart data={scholarshipSearchData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="category" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="searches" fill="#10b981" />
                </BarChart>
              </ResponsiveContainer>
            </ChartCard>
<ChartCard title="Top 10 Countries Distribution (Users / Providers / Scholarships)">
  {(() => {
    const userCountries = [
      { country: "USA", count: 320 },
      { country: "UK", count: 280 },
      { country: "Canada", count: 250 },
      { country: "Australia", count: 230 },
      { country: "Germany", count: 210 },
      { country: "Japan", count: 200 },
      { country: "South Korea", count: 180 },
      { country: "France", count: 170 },
      { country: "Vietnam", count: 160 },
      { country: "Singapore", count: 150 },
    ];

    const providerCountries = [
      { country: "USA", count: 40 },
      { country: "UK", count: 35 },
      { country: "Canada", count: 30 },
      { country: "Australia", count: 28 },
      { country: "Germany", count: 25 },
      { country: "Japan", count: 22 },
      { country: "South Korea", count: 18 },
      { country: "France", count: 16 },
      { country: "Vietnam", count: 14 },
      { country: "Singapore", count: 12 },
    ];

    const scholarshipCountries = [
      { country: "USA", count: 120 },
      { country: "UK", count: 100 },
      { country: "Canada", count: 85 },
      { country: "Australia", count: 78 },
      { country: "Germany", count: 72 },
      { country: "Japan", count: 69 },
      { country: "South Korea", count: 60 },
      { country: "France", count: 55 },
      { country: "Vietnam", count: 52 },
      { country: "Singapore", count: 50 },
    ];

    // MERGE DATA
    const merged = userCountries.map((u) => ({
      country: u.country,
      users: u.count,
      providers: providerCountries.find((p) => p.country === u.country)?.count || 0,
      scholarships: scholarshipCountries.find((s) => s.country === u.country)?.count || 0,
    }));

    return (
      <div className="flex flex-col gap-3 w-full h-full">
        {/* CHART */}
        <div className="w-full h-[260px]">
          <ResponsiveContainer>
            <AreaChart data={merged}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="country" interval={0} tick={{ fontSize: 11 }} />
              <YAxis />
              <Tooltip />

              <Area
                type="monotone"
                dataKey="users"
                name="Users"
                stroke="#3b82f6"
                fill="#93c5fd"
                fillOpacity={0.6}
              />

              <Area
                type="monotone"
                dataKey="providers"
                name="Providers"
                stroke="#10b981"
                fill="#6ee7b7"
                fillOpacity={0.5}
              />

              <Area
                type="monotone"
                dataKey="scholarships"
                name="Scholarships"
                stroke="#f97316"
                fill="#fdba74"
                fillOpacity={0.5}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* CUSTOM LEGEND */}
        <div className="flex items-center justify-center gap-6 mt-2">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-sm bg-blue-400"></div>
            <span className="text-sm text-gray-700">Users</span>
          </div>

          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-sm bg-green-400"></div>
            <span className="text-sm text-gray-700">Providers</span>
          </div>

          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-sm bg-orange-400"></div>
            <span className="text-sm text-gray-700">Scholarships</span>
          </div>
        </div>
      </div>
    );
    
  })()}
  
</ChartCard>



            <ChartCard title="Applications (Views vs Apply vs Approvals)">
              <ResponsiveContainer>
                <ComposedChart
                  data={[
                    { name: "Jan", views: 4000, apply: 1200, approve: 180 },
                    { name: "Feb", views: 5200, apply: 1500, approve: 240 },
                    { name: "Mar", views: 6800, apply: 2100, approve: 320 }
                  ]}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="apply" fill="#10b981" />
                  <Line dataKey="approve" stroke="#f97316" />
                  <Area type="monotone" dataKey="views" fill="#93c5fd" stroke="#3b82f6" />
                </ComposedChart>
              </ResponsiveContainer>
            </ChartCard>
          </div>
        </TabsContent>


        {/* ========================= */}
        {/*     PROVIDER TAB         */}
        {/* ========================= */}
        <TabsContent value="provider">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

            <ChartCard title="Application Funnel">
              <ResponsiveContainer>
                <FunnelChart>
                  <Tooltip />
                  <Funnel dataKey="value" data={applicationFunnel} isAnimationActive>
                    <LabelList position="right" fill="#000" dataKey="stage" />
                  </Funnel>
                </FunnelChart>
              </ResponsiveContainer>
            </ChartCard>

            <ChartCard title="Provider Activity (Scholarships Created)">
              <ResponsiveContainer>
                <BarChart data={providerActivity}>
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="scholarships" fill="#8b5cf6" />
                </BarChart>
              </ResponsiveContainer>
            </ChartCard>

          </div>
        </TabsContent>


        {/* ========================= */}
        {/*    SUBSCRIPTION TAB      */}
        {/* ========================= */}
    <TabsContent value="subscription">
  {(() => {
    // ❗ Chỉ cần 2 tháng: previous & current
    const revenueData = [
      { month: "May", revenue: 5200 },
      { month: "Jun", revenue: 6100 }, // current month
    ];

    // Tính toán chênh lệch
    const enhanced = revenueData.map((d, idx) => {
      const prev = idx === 0 ? null : revenueData[idx - 1].revenue;
      const diff = prev ? d.revenue - prev : null;
      const diffPercent = prev ? ((diff / prev) * 100).toFixed(1) : null;

      return {
        ...d,
        prevRevenue: prev,
        diff,
        diffPercent,
      };
    });

    return (
      <div className="w-full bg-white rounded-xl shadow p-4">
        <h2 className="font-semibold text-lg mb-2">
          Subscription Revenue (USD) – Compare This Month vs Last Month
        </h2>

        <div className="h-[260px]">
          <ResponsiveContainer>
            <LineChart data={enhanced}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />

              {/* === CUSTOM TOOLTIP === */}
              <Tooltip
                content={({ payload, label }) => {
                  if (!payload || payload.length === 0) return null;

                  const d = payload[0].payload;

                  return (
                    <div className="bg-white p-3 shadow rounded text-sm">
                      <div className="font-semibold mb-1">{label}</div>

                      <div>This Month: <b>${d.revenue}</b></div>
                      <div>Last Month: <b>${d.prevRevenue}</b></div>

                      {d.diff !== null && (
                        <>
                          <div>
                            Difference:{" "}
                            <span className={d.diff > 0 ? "text-green-600" : "text-red-600"}>
                              {d.diff > 0 ? "+" : ""}
                              {d.diff}
                            </span>
                          </div>

                          <div>
                            % Change:{" "}
                            <span className={d.diff > 0 ? "text-green-600" : "text-red-600"}>
                              {d.diffPercent}%
                            </span>
                          </div>

                          <div>
                            Status:{" "}
                            <b className={d.diff > 0 ? "text-green-600" : "text-red-600"}>
                              {d.diff > 0 ? "Increase" : "Decrease"}
                            </b>
                          </div>
                        </>
                      )}
                    </div>
                  );
                }}
              />

              {/* chỉ 1 đường doanh thu */}
              <Line
                type="monotone"
                dataKey="revenue"
                name="Revenue"
                stroke="#10b981"
                strokeWidth={3}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* === Custom Summary Box === */}
        <div className="mt-4 text-sm bg-gray-50 p-3 rounded-md border">
          {enhanced[1] && (
            <div className="flex justify-between">
              <span>
                This Month: <b>${enhanced[1].revenue}</b>  
                (Last Month: ${enhanced[1].prevRevenue})
              </span>

              <span
                className={
                  enhanced[1].diff > 0
                    ? "text-green-600 font-semibold"
                    : "text-red-600 font-semibold"
                }
              >
                {enhanced[1].diff > 0 ? "+" : ""}
                {enhanced[1].diff} ({enhanced[1].diffPercent}%)
              </span>
            </div>
          )}
        </div>
      </div>
    );
  })()}
</TabsContent>




        {/* ========================= */}
        {/*        REPORT TAB        */}
        {/* ========================= */}
        <TabsContent value="report">
          <div className="grid grid-cols-1 gap-6">

            <ChartCard title="Report Type Comparison (This Month vs Last Month)">
              <ResponsiveContainer>
                <LineChart data={reportCompareData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="type" />
                  <YAxis />
                  <Tooltip />
                  <Legend />

                  <Line type="monotone" dataKey="thisMonth" stroke="#3b82f6" strokeWidth={3} dot={{ r: 5 }} />
                  <Line type="monotone" dataKey="lastMonth" stroke="#a78bfa" strokeWidth={3} strokeDasharray="5 5" dot={{ r: 5 }} />
                </LineChart>
              </ResponsiveContainer>
            </ChartCard>

          </div>
        </TabsContent>


        {/* ========================= */}
        {/*         AI TAB           */}
        {/* ========================= */}
        <TabsContent value="ai">
  <div className="grid grid-cols-1 gap-6">

    {/* Radar chart: Scholarship target audience */}
    <ChartCard title="Scholarship Target Audience Distribution">
      <ResponsiveContainer>
        <RadarChart
          data={[
            { target: "Bachelor", score: 75 },
            { target: "Master", score: 55 },
            { target: "PhD", score: 40 },
          ]}
        >
          <PolarGrid />
          <PolarAngleAxis dataKey="target" />
          <PolarRadiusAxis />
          <Radar
            name="Scholarships"
            dataKey="score"
            stroke="#3b82f6"
            fill="#93c5fd"
            fillOpacity={0.6}
          />
          <Legend />
        </RadarChart>
      </ResponsiveContainer>

      {/* Radar chart: Scholarship fields */}
      <ResponsiveContainer>
        <RadarChart
          data={[
            { field: "STEM", score: 90 },
            { field: "Business", score: 65 },
            { field: "Arts", score: 45 },
            { field: "IT", score: 80 },
            { field: "Medicine", score: 50 },
          ]}
        >
          <PolarGrid />
          <PolarAngleAxis dataKey="field" />
          <PolarRadiusAxis />
          <Radar
            name="Field"
            dataKey="score"
            stroke="#10b981"
            fill="#6ee7b7"
            fillOpacity={0.6}
          />
          <Legend />
        </RadarChart>
      </ResponsiveContainer>
    </ChartCard>

  </div>
</TabsContent>



      

      </Tabs>

    </div>
  );
}
