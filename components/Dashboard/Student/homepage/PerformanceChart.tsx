"use client"

import React from 'react';
import { ArrowUpRight, ChevronDown } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  ResponsiveContainer, 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend 
} from 'recharts';

// Define proper type for the CustomTooltip props to fix the TypeScript error
interface CustomTooltipProps {
  active?: boolean;
  payload?: any[];
  label?: string;
}

const PerformanceChart = () => {
  const data = [
    { month: 'Jan', Mathematics: 75, Physics: 68, Literature: 82, ComputerScience: 85 },
    { month: 'Feb', Mathematics: 78, Physics: 70, Literature: 80, ComputerScience: 87 },
    { month: 'Mar', Mathematics: 82, Physics: 75, Literature: 79, ComputerScience: 90 },
    { month: 'Apr', Mathematics: 79, Physics: 81, Literature: 85, ComputerScience: 89 },
    { month: 'May', Mathematics: 85, Physics: 83, Literature: 82, ComputerScience: 92 },
    { month: 'Jun', Mathematics: 89, Physics: 85, Literature: 86, ComputerScience: 94 },
  ];

  // Custom tooltip with proper TypeScript typing
  const CustomTooltip: React.FC<CustomTooltipProps> = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-4 border border-gray-200 shadow-md rounded-md">
          <p className="font-medium mb-2">{label}</p>
          {payload.map((entry, index) => (
            <div key={`tooltip-${index}`} className="flex items-center space-x-2 mb-1">
              <div 
                className="h-3 w-3 rounded-full" 
                style={{ backgroundColor: entry.color }}
              />
              <p className="text-sm">
                <span className="font-medium">{entry.name}: </span>
                <span>{entry.value}%</span>
              </p>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <Card className="rounded-xl border border-gray-100 shadow-soft p-6 animate-fade-in delay-400">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold">Academic Performance</h2>
          <p className="text-sm text-gray-600 mt-1">Subject-wise performance over time</p>
        </div>
        <div className="flex items-center space-x-2 mt-3 sm:mt-0">
          <Button variant="outline" size="sm" className="h-8">
            <span>This Semester</span>
            <ChevronDown className="h-4 w-4 ml-1" />
          </Button>
          <Button size="sm" variant="ghost" className="h-8 font-normal text-primary">
            <ArrowUpRight className="h-4 w-4 mr-1" />
            <span>Full Report</span>
          </Button>
        </div>
      </div>

      <div className="w-full h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{ top: 5, right: 30, left: 0, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis 
              dataKey="month" 
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#6B7280', fontSize: 12 }}
            />
            <YAxis 
              axisLine={false} 
              tickLine={false}
              tick={{ fill: '#6B7280', fontSize: 12 }}
              domain={[50, 100]}
              tickCount={6}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend 
              verticalAlign="top" 
              height={36}
              wrapperStyle={{ paddingTop: '10px' }}
            />
            <Line 
              type="monotone" 
              dataKey="Mathematics" 
              stroke="#3B82F6" 
              strokeWidth={2} 
              dot={{ r: 4 }} 
              activeDot={{ r: 6, strokeWidth: 2 }}
              animationDuration={1500}
              animationEasing="ease-in-out"
            />
            <Line 
              type="monotone" 
              dataKey="Physics" 
              stroke="#8B5CF6" 
              strokeWidth={2} 
              dot={{ r: 4 }} 
              activeDot={{ r: 6, strokeWidth: 2 }}
              animationDuration={1500}
              animationEasing="ease-in-out"
              animationBegin={300}
            />
            <Line 
              type="monotone" 
              dataKey="Literature" 
              stroke="#EC4899" 
              strokeWidth={2} 
              dot={{ r: 4 }} 
              activeDot={{ r: 6, strokeWidth: 2 }}
              animationDuration={1500}
              animationEasing="ease-in-out"
              animationBegin={600}
            />
            <Line 
              type="monotone" 
              dataKey="ComputerScience" 
              stroke="#10B981" 
              strokeWidth={2} 
              dot={{ r: 4 }} 
              activeDot={{ r: 6, strokeWidth: 2 }}
              animationDuration={1500}
              animationEasing="ease-in-out"
              animationBegin={900}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};

export default PerformanceChart;