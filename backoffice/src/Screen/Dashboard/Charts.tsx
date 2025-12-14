"use client";

import dynamic from "next/dynamic";
import { useMemo } from "react";

const ApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });

/* =========================================
   PIE CHART
========================================= */
export function PieChart({ data }) {
  const config = useMemo(() => {
    return {
      series: data.map((x) => x.value),
      options: {
        labels: data.map((x) => x.name),
        legend: { position: "bottom" },
      },
    };
  }, [data]);

  return <ApexChart type="pie" height={300} series={config.series} options={config.options} />;
}

/* =========================================
   BAR CHART
========================================= */
export function BarChart({ data, color = "#10b981" }) {
  const config = useMemo(() => {
    return {
      series: [
        {
          name: "Value",
          data: data.map((x) => x.value),
        },
      ],
      options: {
        colors: [color],
        xaxis: { categories: data.map((x) => x.name) },
        chart: { toolbar: { show: false } },
        plotOptions: { bar: { borderRadius: 6 } },
      },
    };
  }, [data]);

  return <ApexChart type="bar" height={300} series={config.series} options={config.options} />;
}

/* =========================================
   LINE CHART
========================================= */
export function LineChartSimple({ data }) {
  const config = useMemo(() => {
    return {
      series: [
        {
          name: "Value",
          data: data.map((x) => x.value),
        },
      ],
      options: {
        xaxis: { categories: data.map((x) => x.name) },
        stroke: { curve: "smooth" },
        chart: { toolbar: { show: false } },
      },
    };
  }, [data]);

  return <ApexChart type="line" height={300} series={config.series} options={config.options} />;
}

/* =========================================
   LINE CHART — Top Scholarships (2 series)
========================================= */
export function TopScholarshipLineChart({ data }) {
  const config = useMemo(() => {
    return {
      series: [
        { name: "Views", data: data.map((x) => x.views) },
        { name: "Apply", data: data.map((x) => x.apply) },
      ],
      options: {
        xaxis: { categories: data.map((x) => x.name) },
        stroke: { curve: "smooth" },
        chart: { toolbar: { show: false } },
      },
    };
  }, [data]);

  return <ApexChart type="line" height={400} series={config.series} options={config.options} />;
}
