"use client";
import React from 'react';
import {
  Area,
  AreaChart,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { cn } from '@/lib/utils';

interface PerformanceChartProps {
  data: any[];
  className?: string;
  title?: string;
  description?: string;
}

const PerformanceChart = ({
  data,
  className,
  title,
  description,
}: PerformanceChartProps) => {
  return (
    <div className={cn(
      "bg-white p-6 rounded-xl border border-slate-100 shadow-subtle",
      className
    )}>
      {title && (
        <div className="mb-4">
          <h3 className="text-base font-medium">{title}</h3>
          {description && (
            <p className="text-sm text-muted-foreground mt-1">{description}</p>
          )}
        </div>
      )}
      
      <div className="h-[240px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{
              top: 5,
              right: 10,
              left: 0,
              bottom: 0,
            }}
          >
            <defs>
              <linearGradient id="colorGrade" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3498db" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#3498db" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorAttendance" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#2ecc71" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#2ecc71" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.2} />
            <XAxis
              dataKey="month"
              axisLine={false}
              tickLine={false}
              tickMargin={10}
              tick={{ fontSize: 12 }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tickMargin={10}
              tick={{ fontSize: 12 }}
              domain={[0, 100]}
            />
            <Tooltip
              contentStyle={{ 
                backgroundColor: 'white', 
                borderRadius: '8px',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                border: '1px solid #e2e8f0',
                fontSize: '12px'
              }}
            />
            <Area
              type="monotone"
              dataKey="avgGrade"
              stroke="#3498db"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorGrade)"
              activeDot={{ r: 6 }}
              name="Average Grade"
            />
            <Area
              type="monotone"
              dataKey="attendance"
              stroke="#2ecc71"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorAttendance)"
              activeDot={{ r: 6 }}
              name="Attendance %"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      
      <div className="mt-4 flex items-center justify-center space-x-6">
        <div className="flex items-center">
          <span className="h-3 w-3 rounded-full bg-blue-500 mr-2"></span>
          <span className="text-sm text-muted-foreground">Grades</span>
        </div>
        <div className="flex items-center">
          <span className="h-3 w-3 rounded-full bg-green-500 mr-2"></span>
          <span className="text-sm text-muted-foreground">Attendance</span>
        </div>
      </div>
    </div>
  );
};

export default PerformanceChart;
