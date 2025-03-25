"use client"
import React from 'react';
import {
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
import { cn } from '@/lib/utils';

interface AssignmentChartProps {
  data: any[];
  chartType?: 'bar' | 'pie';
  className?: string;
  title?: string;
  description?: string;
}

const COLORS = ['#3498db', '#f39c12', '#e74c3c'];

const AssignmentChart = ({
  data,
  chartType = 'bar',
  className,
  title,
  description,
}: AssignmentChartProps) => {
  const renderBarChart = () => (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        data={data}
        margin={{
          top: 20,
          right: 30,
          left: 0,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.2} />
        <XAxis 
          dataKey="name" 
          axisLine={false} 
          tickLine={false} 
          tick={{ fontSize: 12 }}
        />
        <YAxis 
          axisLine={false} 
          tickLine={false} 
          tick={{ fontSize: 12 }}
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
        <Bar dataKey="onTime" stackId="a" fill="#3498db" radius={[4, 4, 0, 0]} name="On Time" />
        <Bar dataKey="late" stackId="a" fill="#f39c12" radius={[0, 0, 0, 0]} name="Late" />
        <Bar dataKey="notSubmitted" stackId="a" fill="#e74c3c" radius={[0, 0, 4, 4]} name="Not Submitted" />
      </BarChart>
    </ResponsiveContainer>
  );

  const renderPieChart = () => (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={60}
          outerRadius={80}
          fill="#8884d8"
          paddingAngle={5}
          dataKey="value"
          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
          labelLine={false}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip
          contentStyle={{ 
            backgroundColor: 'white', 
            borderRadius: '8px',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
            border: '1px solid #e2e8f0',
            fontSize: '12px'
          }}
        />
      </PieChart>
    </ResponsiveContainer>
  );

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
        {chartType === 'bar' ? renderBarChart() : renderPieChart()}
      </div>
      
      {chartType === 'bar' && (
        <div className="mt-4 flex items-center justify-center space-x-6">
          <div className="flex items-center">
            <span className="h-3 w-3 rounded-full bg-blue-500 mr-2"></span>
            <span className="text-sm text-muted-foreground">On Time</span>
          </div>
          <div className="flex items-center">
            <span className="h-3 w-3 rounded-full bg-yellow-500 mr-2"></span>
            <span className="text-sm text-muted-foreground">Late</span>
          </div>
          <div className="flex items-center">
            <span className="h-3 w-3 rounded-full bg-red-500 mr-2"></span>
            <span className="text-sm text-muted-foreground">Not Submitted</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default AssignmentChart;
