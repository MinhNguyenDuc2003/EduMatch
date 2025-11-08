'use client';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  Legend,
} from 'recharts';
import React from 'react';
import { Card } from 'src/lib/by/Div';
import { CardContent, CardHeader, CardTitle } from '@commonServices/components/ui/card';

interface CustomChartProps {
  title?: string;
  data: any[];
  type?: 'bar' | 'line' | 'pie';
  dataKey?: string;
  xKey?: string;
  color?: string;
  height?: number;
}

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#8b5cf6'];

export default function CustomChart({
  title,
  data,
  type = 'bar',
  dataKey = 'value',
  xKey = 'name',
  color = '#3b82f6',
  height = 300,
}: CustomChartProps) {
  return (
    <Card className="shadow-md rounded-2xl border border-gray-200">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="w-full" style={{ height }}>
          <ResponsiveContainer width="100%" height="100%">
            {type === 'bar' && (
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey={xKey} />
                <YAxis />
                <Tooltip />
                <Bar dataKey={dataKey} fill={color} radius={[6, 6, 0, 0]} />
              </BarChart>
            )}

            {type === 'line' && (
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey={xKey} />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey={dataKey}
                  stroke={color}
                  strokeWidth={3}
                  dot={{ r: 5 }}
                />
              </LineChart>
            )}

            {type === 'pie' && (
              <PieChart>
                <Pie
                  data={data}
                  dataKey={dataKey}
                  nameKey={xKey}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  label
                >
                  {data.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            )}
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
