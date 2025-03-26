"use client"
import React from 'react';
import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query';
import { Users, Award, Briefcase, Bookmark, Filter, Search, Download, Plus } from 'lucide-react';

import AnalyticsCard from '@/components/Dashboard/admin/dashboard/AnalyticsCard';
import Chart from '@/components/Dashboard/admin/dashboard/Chart';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';

const queryClient = new QueryClient();

// Mock data for department performance
const fetchDepartments = async () => {
  // In a real application, this would fetch from an API
  return [
    {
      id: 1,
      name: 'Computer Science',
      head: 'Dr. Robert Chen',
      teacherCount: 12,
      studentCount: 245,
      coursesOffered: 18,
      performanceIndex: 92,
      rating: 'excellent'
    },
    {
      id: 2,
      name: 'Business Administration',
      head: 'Dr. Lisa Johnson',
      teacherCount: 15,
      studentCount: 320,
      coursesOffered: 22,
      performanceIndex: 88,
      rating: 'excellent'
    },
    {
      id: 3,
      name: 'Mathematics',
      head: 'Dr. Michael Brown',
      teacherCount: 10,
      studentCount: 180,
      coursesOffered: 14,
      performanceIndex: 90,
      rating: 'excellent'
    },
    {
      id: 4,
      name: 'Physics',
      head: 'Dr. Sarah Wilson',
      teacherCount: 8,
      studentCount: 145,
      coursesOffered: 12,
      performanceIndex: 86,
      rating: 'good'
    },
    {
      id: 5,
      name: 'Chemistry',
      head: 'Dr. James Miller',
      teacherCount: 9,
      studentCount: 160,
      coursesOffered: 13,
      performanceIndex: 84,
      rating: 'good'
    },
    {
      id: 6,
      name: 'Engineering',
      head: 'Dr. Emily Davis',
      teacherCount: 14,
      studentCount: 280,
      coursesOffered: 20,
      performanceIndex: 89,
      rating: 'excellent'
    },
    {
      id: 7,
      name: 'Literature',
      head: 'Dr. David Garcia',
      teacherCount: 11,
      studentCount: 190,
      coursesOffered: 16,
      performanceIndex: 82,
      rating: 'good'
    },
    {
      id: 8,
      name: 'Art History',
      head: 'Dr. Jennifer Martinez',
      teacherCount: 7,
      studentCount: 110,
      coursesOffered: 9,
      performanceIndex: 78,
      rating: 'average'
    }
  ];
};

// Department rating chart data
const departmentRatingData = [
  { rating: 'Excellent', count: 4 },
  { rating: 'Good', count: 3 },
  { rating: 'Average', count: 1 },
  { rating: 'Needs Improvement', count: 0 },
];


// Department performance comparison chart data
const departmentPerformanceData = [
  { name: 'CS', performanceIndex: 92, teacherCount: 12 },
  { name: 'Business', performanceIndex: 88, teacherCount: 15 },
  { name: 'Math', performanceIndex: 90, teacherCount: 10 },
  { name: 'Physics', performanceIndex: 86, teacherCount: 8 },
  { name: 'Chemistry', performanceIndex: 84, teacherCount: 9 },
  { name: 'Engineering', performanceIndex: 89, teacherCount: 14 },
  { name: 'Literature', performanceIndex: 82, teacherCount: 11 },
  { name: 'Art', performanceIndex: 78, teacherCount: 7 },
];

const DepartmentPerformancePageContent = () => {
  const { data: departments = [], isLoading } = useQuery({
    queryKey: ['departments'],
    queryFn: fetchDepartments
  });

  const totalTeachers = departments.reduce((sum, dept) => sum + dept.teacherCount, 0);
  const totalStudents = departments.reduce((sum, dept) => sum + dept.studentCount, 0);
  const totalCourses = departments.reduce((sum, dept) => sum + dept.coursesOffered, 0);
  
  // Calculate average performance index
  const avgPerformanceIndex = departments.length > 0 
    ? departments.reduce((sum, dept) => sum + dept.performanceIndex, 0) / departments.length
    : 0;

  return (
      <div className="p-6 space-y-6 animate-fade-in">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-slate-800">Department Performance</h1>
            <p className="text-slate-500 mt-1">Track academic departments and their metrics</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" className="flex items-center gap-2">
              <Download size={16} />
              Export Data
            </Button>
            <Button className="bg-primary-600 text-white hover:bg-primary-700 flex items-center gap-2">
              <Plus size={16} />
              New Department
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
          <AnalyticsCard title="Departments" className="bg-white shadow-sm">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                <Briefcase size={18} className="text-blue-600" />
              </div>
              <div className="flex flex-col">
                <span className="text-3xl font-semibold">{departments.length}</span>
                <span className="text-slate-500 text-sm">Total Departments</span>
              </div>
            </div>
          </AnalyticsCard>
          
          <AnalyticsCard title="Faculty" className="bg-white shadow-sm">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
                <Users size={18} className="text-purple-600" />
              </div>
              <div className="flex flex-col">
                <span className="text-3xl font-semibold">{totalTeachers}</span>
                <span className="text-slate-500 text-sm">Total Teachers</span>
              </div>
            </div>
          </AnalyticsCard>
          
          <AnalyticsCard title="Courses" className="bg-white shadow-sm">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center">
                <Bookmark size={18} className="text-amber-600" />
              </div>
              <div className="flex flex-col">
                <span className="text-3xl font-semibold">{totalCourses}</span>
                <span className="text-slate-500 text-sm">Being Offered</span>
              </div>
            </div>
          </AnalyticsCard>
          
          <AnalyticsCard title="Performance Index" className="bg-white shadow-sm">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                <Award size={18} className="text-green-600" />
              </div>
              <div className="flex flex-col">
                <span className="text-3xl font-semibold">{avgPerformanceIndex.toFixed(1)}</span>
                <span className="text-slate-500 text-sm">Average Score</span>
              </div>
            </div>
          </AnalyticsCard>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <AnalyticsCard title="Department Performance" className="bg-white shadow-sm">
            <Chart 
              type="bar"
              data={departmentPerformanceData}
              xKey="name"
              keys={["performanceIndex"]}
              colors={["#3b82f6"]}
              height={300}
            />
          </AnalyticsCard>

          <AnalyticsCard title="Department Ratings" className="bg-white shadow-sm">
            <Chart 
              type="pie"
              data={departmentRatingData}
              // nameKey="rating"
              dataKey="count"
              colors={["#10b981", "#3b82f6", "#f59e0b", "#ef4444"]}
              height={300}
            />
          </AnalyticsCard>
        </div>

        <AnalyticsCard title="Department Details" className="bg-white shadow-sm">
          <div className="mb-4 flex flex-col sm:flex-row gap-3 justify-between">
            <div className="relative max-w-md">
              <Input
                placeholder="Search departments..."
                className="pl-10 w-full"
              />
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Search className="h-5 w-5 text-slate-400" />
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="flex items-center gap-1">
                <Filter size={16} />
                Filter
              </Button>
            </div>
          </div>
          <div className="overflow-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Department</TableHead>
                  <TableHead>Department Head</TableHead>
                  <TableHead>Teachers</TableHead>
                  <TableHead>Students</TableHead>
                  <TableHead>Courses</TableHead>
                  <TableHead>Performance</TableHead>
                  <TableHead>Rating</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center">
                      Loading departments...
                    </TableCell>
                  </TableRow>
                ) : departments.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center">
                      No departments found
                    </TableCell>
                  </TableRow>
                ) : (
                  departments.map(department => (
                    <TableRow key={department.id}>
                      <TableCell className="font-medium">{department.name}</TableCell>
                      <TableCell>{department.head}</TableCell>
                      <TableCell>{department.teacherCount}</TableCell>
                      <TableCell>{department.studentCount}</TableCell>
                      <TableCell>{department.coursesOffered}</TableCell>
                      <TableCell>{department.performanceIndex}/100</TableCell>
                      <TableCell>
                        <Badge
                          className={
                            department.rating === 'excellent'
                              ? 'bg-green-100 text-green-800 hover:bg-green-100'
                              : department.rating === 'good'
                              ? 'bg-blue-100 text-blue-800 hover:bg-blue-100'
                              : department.rating === 'average'
                              ? 'bg-amber-100 text-amber-800 hover:bg-amber-100'
                              : 'bg-red-100 text-red-800 hover:bg-red-100'
                          }
                        >
                          {department.rating.charAt(0).toUpperCase() + department.rating.slice(1)}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </AnalyticsCard>
      </div>
  );
};

const DepartmentPerformancePage = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <DepartmentPerformancePageContent />
    </QueryClientProvider>
  );
};

export default DepartmentPerformancePage;
