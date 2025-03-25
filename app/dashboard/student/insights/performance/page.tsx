"use client";

import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  ArrowUpRight, 
  BookOpen, 
  ChevronDown, 
  Download, 
  Filter, 
  GraduationCap,
  PieChart,
  BarChart3,
  LineChart as LineChartIcon,
  TrendingUp,
  Award,
  Calendar,
  AlertCircle
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend,
  BarChart,
  Bar,
  Cell,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar
} from 'recharts';

const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#8B5CF6', '#EC4899'];

const PerformancePage = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('semester');
  
  const gradeTrends = [
    { month: 'Aug', GPA: 3.5, Mathematics: 85, Physics: 78, Literature: 86, ComputerScience: 90 },
    { month: 'Sep', GPA: 3.6, Mathematics: 86, Physics: 79, Literature: 88, ComputerScience: 92 },
    { month: 'Oct', GPA: 3.7, Mathematics: 88, Physics: 82, Literature: 85, ComputerScience: 95 },
    { month: 'Nov', GPA: 3.8, Mathematics: 90, Physics: 85, Literature: 87, ComputerScience: 94 },
    { month: 'Dec', GPA: 3.6, Mathematics: 85, Physics: 80, Literature: 88, ComputerScience: 91 },
    { month: 'Jan', GPA: 3.9, Mathematics: 92, Physics: 88, Literature: 90, ComputerScience: 96 },
  ];
  
  const subjectPerformance = [
    { subject: 'Mathematics', grade: 'A-', percentage: 92, color: '#3B82F6' },
    { subject: 'Physics', grade: 'B+', percentage: 88, color: '#8B5CF6' },
    { subject: 'Literature', grade: 'A', percentage: 95, color: '#EC4899' },
    { subject: 'Computer Science', grade: 'A+', percentage: 97, color: '#10B981' },
    { subject: 'History', grade: 'B', percentage: 85, color: '#F59E0B' },
  ];
  
  const skillsData = [
    { subject: 'Critical Thinking', A: 85, fullMark: 100 },
    { subject: 'Problem Solving', A: 93, fullMark: 100 },
    { subject: 'Communication', A: 78, fullMark: 100 },
    { subject: 'Team Work', A: 88, fullMark: 100 },
    { subject: 'Time Management', A: 75, fullMark: 100 },
    { subject: 'Research Skills', A: 82, fullMark: 100 },
  ];
  
  const CustomTooltip = ({ active, payload, label }: { active?: boolean; payload?: any[]; label?: string }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-4 rounded-lg shadow-lg border border-gray-200">
          <p className="font-medium text-sm">{`${label}`}</p>
          <p className="text-primary text-sm">{`Score: ${payload[0].value}%`}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      
      <main className="container mx-auto px-4 pt-24 pb-12">
        <div className="mb-8 animate-fade-in">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
                Academic Performance
              </h1>
              <p className="mt-1 text-gray-600">
                Track your grades, progress, and achievements
              </p>
            </div>
            <div className="mt-4 md:mt-0 flex flex-wrap gap-2">
              <Button variant="outline">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
              <Button variant="outline">
                <Calendar className="h-4 w-4 mr-2" />
                <span>This Semester</span>
                <ChevronDown className="h-4 w-4 ml-1" />
              </Button>
              <Button className="bg-blue-500 hover:bg-blue-600 text-white">
                <Download className="h-4 w-4 mr-2" />
                Download Report
              </Button>
            </div>
          </div>
        </div>
        
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="p-5 border border-gray-100 shadow-soft">
            <div className="flex items-start justify-between mb-3">
              <div className="p-2 rounded-lg bg-blue-50 text-blue-500">
                <GraduationCap className="h-6 w-6" />
              </div>
              <TrendingUp className="h-5 w-5 text-emerald-500" />
            </div>
            <h3 className="text-lg font-semibold text-gray-800">Current GPA</h3>
            <div className="mt-2">
              <div className="text-3xl font-bold">3.8</div>
              <p className="text-sm text-emerald-600 flex items-center mt-1">
                <ArrowUpRight className="h-3.5 w-3.5 mr-1" />
                +0.2 from last semester
              </p>
            </div>
          </Card>
          
          <Card className="p-5 border border-gray-100 shadow-soft">
            <div className="flex items-start justify-between mb-3">
              <div className="p-2 rounded-lg bg-purple-50 text-purple-500">
                <BarChart3 className="h-6 w-6" />
              </div>
            </div>
            <h3 className="text-lg font-semibold text-gray-800">Class Rank</h3>
            <div className="mt-2">
              <div className="text-3xl font-bold">7<span className="text-lg text-gray-500">/125</span></div>
              <p className="text-sm text-emerald-600 flex items-center mt-1">
                <ArrowUpRight className="h-3.5 w-3.5 mr-1" />
                Top 5% of your class
              </p>
            </div>
          </Card>
          
          <Card className="p-5 border border-gray-100 shadow-soft">
            <div className="flex items-start justify-between mb-3">
              <div className="p-2 rounded-lg bg-amber-50 text-amber-500">
                <Award className="h-6 w-6" />
              </div>
            </div>
            <h3 className="text-lg font-semibold text-gray-800">Achievements</h3>
            <div className="mt-2">
              <div className="text-3xl font-bold">5</div>
              <p className="text-sm text-gray-600 flex items-center mt-1">
                <BookOpen className="h-3.5 w-3.5 mr-1" />
                3 academic, 2 extracurricular
              </p>
            </div>
          </Card>
        </div>
        
        {/* Grade Trends Chart */}
        <Card className="rounded-xl border border-gray-100 shadow-soft p-6 mb-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-semibold">Grade Trends</h2>
              <p className="text-sm text-gray-600 mt-1">Your academic performance over time</p>
            </div>
            <div className="flex items-center space-x-2 mt-3 sm:mt-0">
              <Button variant="outline" size="sm" className="h-8">
                <LineChartIcon className="h-4 w-4 mr-1" />
                <span>Line</span>
              </Button>
              <Button size="sm" variant="outline" className="h-8">
                <BarChart3 className="h-4 w-4 mr-1" />
                <span>Bar</span>
              </Button>
            </div>
          </div>

          <div className="w-full h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={gradeTrends}
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
                  domain={[60, 100]}
                  tickCount={5}
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
        
        {/* Subject Performance & Skills Assessment */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <Card className="rounded-xl border border-gray-100 shadow-soft p-6">
            <h2 className="text-xl font-semibold mb-6">Subject Performance</h2>
            
            <div className="w-full h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={subjectPerformance}
                  margin={{ top: 5, right: 30, left: 0, bottom: 5 }}
                  barSize={30}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
                  <XAxis 
                    dataKey="subject" 
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: '#6B7280', fontSize: 12 }}
                  />
                  <YAxis 
                    axisLine={false} 
                    tickLine={false}
                    tick={{ fill: '#6B7280', fontSize: 12 }}
                    domain={[0, 100]}
                  />
                  <Tooltip 
                    cursor={{ fill: 'rgba(0, 0, 0, 0.05)' }}
                    content={({ active, payload, label }) => {
                      if (active && payload && payload.length) {
                        return (
                          <div className="bg-white p-3 border border-gray-200 shadow-md rounded-md">
                            <p className="font-medium mb-1">{label}</p>
                            <p className="text-sm">
                              <span className="font-medium">Grade: </span>
                              <span>{payload[0].payload.grade}</span>
                            </p>
                            <p className="text-sm">
                              <span className="font-medium">Score: </span>
                              <span>{payload[0].value}%</span>
                            </p>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <Bar 
                    dataKey="percentage" 
                    animationDuration={1500}
                    animationEasing="ease-out"
                  >
                    {subjectPerformance.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>
          
          <Card className="rounded-xl border border-gray-100 shadow-soft p-6">
            <h2 className="text-xl font-semibold mb-6">Skills Assessment</h2>
            
            <div className="w-full h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="80%" data={skillsData}>
                  <PolarGrid stroke="#e5e7eb" />
                  <PolarAngleAxis 
                    dataKey="subject" 
                    tick={{ fill: '#6B7280', fontSize: 12 }}
                  />
                  <PolarRadiusAxis 
                    angle={30} 
                    domain={[0, 100]} 
                    tick={{ fill: '#6B7280', fontSize: 10 }}
                  />
                  <Radar 
                    name="Skills" 
                    dataKey="A" 
                    stroke="#3B82F6" 
                    fill="#3B82F6" 
                    fillOpacity={0.6}
                    animationDuration={1500}
                    animationEasing="ease-out"
                  />
                  <Tooltip/>
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </div>
        
        {/* Improvement Areas */}
        <Card className="rounded-xl border border-gray-100 shadow-soft p-6">
          <h2 className="text-xl font-semibold mb-4">Improvement Areas</h2>
          
          <div className="space-y-5">
            <div className="p-4 rounded-lg border border-red-100 bg-red-50">
              <div className="flex items-start">
                <div className="p-1 rounded-full bg-white mr-3">
                  <AlertCircle className="h-5 w-5 text-red-500" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900 mb-1">Physics Lab Reports</h3>
                  <p className="text-sm text-gray-700">Your lab reports are consistently scoring below your other assignments. Focus on methodology and data analysis sections.</p>
                  <Button variant="link" className="mt-2 p-0 h-auto text-sm text-primary">
                    View Resources <ArrowUpRight className="h-3.5 w-3.5 ml-1" />
                  </Button>
                </div>
              </div>
            </div>
            
            <div className="p-4 rounded-lg border border-amber-100 bg-amber-50">
              <div className="flex items-start">
                <div className="p-1 rounded-full bg-white mr-3">
                  <AlertCircle className="h-5 w-5 text-amber-500" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900 mb-1">Literature Essay Structure</h3>
                  <p className="text-sm text-gray-700">While your content is strong, your essay organization could be improved. Consider using more transition phrases and stronger topic sentences.</p>
                  <Button variant="link" className="mt-2 p-0 h-auto text-sm text-primary">
                    View Resources <ArrowUpRight className="h-3.5 w-3.5 ml-1" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </main>
    </div>
  );
};

export default PerformancePage;