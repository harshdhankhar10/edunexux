"use client"
import React from 'react';
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from 'recharts';
import { cn } from '@/lib/utils';

type ChartData = Array<Record<string, any>>;

type ChartProps = {
  type: 'area' | 'bar' | 'line' | 'pie';
  data: ChartData;
  xKey?: string;
  yKey?: string;
  dataKey?: string;
  keys?: string[];
  colors?: string[];
  height?: number;
  className?: string;
  showGrid?: boolean;
  showTooltip?: boolean;
  showAxis?: boolean;
  showLegend?: boolean;
  stackId?: string;
  rounded?: boolean;
};

const defaultColors = [
  '#2563eb', // primary-600
  '#60a5fa', // primary-400
  '#93c5fd', // primary-300
  '#3b82f6', // primary-500
  '#1d4ed8', // primary-700
];

const EmptyChart = () => (
  <div className="flex items-center justify-center h-full">
    <p className="text-gray-500">No data available</p>
  </div>
);

const Chart = ({
  type,
  data,
  xKey = 'name',
  yKey,
  dataKey = 'value',
  keys = [],
  colors = defaultColors,
  height = 300,
  className,
  showGrid = true,
  showTooltip = true,
  showAxis = true,
  showLegend = false,
  stackId,
  rounded = false,
}: ChartProps) => {
  const renderChart = () => {
    if (!data || data.length === 0) {
      return <EmptyChart />;
    }

    switch (type) {
      case 'area':
        return (
          <AreaChart data={data}>
            {showGrid && <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />}
            {showAxis && <XAxis dataKey={xKey} tick={{ fontSize: 12 }} tickLine={false} axisLine={{ stroke: '#e2e8f0' }} />}
            {showAxis && <YAxis tick={{ fontSize: 12 }} tickLine={false} axisLine={{ stroke: '#e2e8f0' }} />}
            {showTooltip && <Tooltip />}
            {showLegend && <Legend />}
            {keys.length === 0 ? (
              <Area
                type="monotone"
                dataKey={dataKey}
                stroke={colors[0]}
                fill={colors[0]}
                fillOpacity={0.1}
              />
            ) : (
              keys.map((key, index) => (
                <Area
                  key={key}
                  type="monotone"
                  dataKey={key}
                  stroke={colors[index % colors.length]}
                  fill={colors[index % colors.length]}
                  fillOpacity={0.1}
                  stackId={stackId}
                />
              ))
            )}
          </AreaChart>
        );
        
      case 'bar':
        return (
          <BarChart data={data}>
            {showGrid && <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />}
            {showAxis && <XAxis dataKey={xKey} tick={{ fontSize: 12 }} tickLine={false} axisLine={{ stroke: '#e2e8f0' }} />}
            {showAxis && <YAxis tick={{ fontSize: 12 }} tickLine={false} axisLine={{ stroke: '#e2e8f0' }} />}
            {showTooltip && <Tooltip />}
            {showLegend && <Legend />}
            {keys.length === 0 ? (
              <Bar 
                dataKey={dataKey} 
                fill={colors[0]} 
                radius={rounded ? [4, 4, 0, 0] : 0} 
                barSize={24}
              />
            ) : (
              keys.map((key, index) => (
                <Bar
                  key={key}
                  dataKey={key}
                  fill={colors[index % colors.length]}
                  stackId={stackId}
                  radius={rounded ? [4, 4, 0, 0] : 0}
                  barSize={keys.length > 3 ? 16 : 24}
                />
              ))
            )}
          </BarChart>
        );
        
      case 'line':
        return (
          <LineChart data={data}>
            {showGrid && <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />}
            {showAxis && <XAxis dataKey={xKey} tick={{ fontSize: 12 }} tickLine={false} axisLine={{ stroke: '#e2e8f0' }} />}
            {showAxis && <YAxis tick={{ fontSize: 12 }} tickLine={false} axisLine={{ stroke: '#e2e8f0' }} />}
            {showTooltip && <Tooltip />}
            {showLegend && <Legend />}
            {keys.length === 0 ? (
              <Line 
                type="monotone" 
                dataKey={dataKey} 
                stroke={colors[0]} 
                dot={{ r: 4, strokeWidth: 1 }}
                activeDot={{ r: 6, strokeWidth: 0 }}
              />
            ) : (
              keys.map((key, index) => (
                <Line
                  key={key}
                  type="monotone"
                  dataKey={key}
                  stroke={colors[index % colors.length]}
                  dot={{ r: 4, strokeWidth: 1, fill: colors[index % colors.length] }}
                  activeDot={{ r: 6, strokeWidth: 0 }}
                />
              ))
            )}
          </LineChart>
        );
        
      case 'pie':
        if (!dataKey) return <EmptyChart />;
        return (
          <PieChart>
            <Pie
              data={data}
              nameKey={xKey}
              dataKey={dataKey}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              paddingAngle={2}
              label={showLegend}
            >
              {data.map((_, index) => (
                <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
              ))}
            </Pie>
            {showTooltip && <Tooltip />}
            {showLegend && <Legend />}
          </PieChart>
        );
        
      default:
        return <EmptyChart />;
    }
  };

  return (
    <div className={cn("w-full", className)}>
      <ResponsiveContainer width="100%" height={height}>
        {renderChart()}
      </ResponsiveContainer>
    </div>
  );
};

export default Chart;