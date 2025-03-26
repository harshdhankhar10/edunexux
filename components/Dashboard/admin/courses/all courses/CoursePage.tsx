"use client"
import React from 'react';
import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query';
import { PlusCircle, Filter, Download } from 'lucide-react';
import AnalyticsCard from '@/components/Dashboard/admin/dashboard/AnalyticsCard';
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

interface Course {
  id: string;
  code: string;
  name: string;
  department: string;
  instructor: string;
  credits: number;
  students: number;
  status: string;
}

interface CoursesPageProps {
  initialData: {
    courses: Course[];
    stats: {
      totalCourses: number;
      activeCourses: number;
      avgClassSize: number;
      totalDepartments: number;
    };
  };
}

const queryClient = new QueryClient();

const CoursesPageContent = ({ initialData }: CoursesPageProps) => {
  const { data: courses = initialData.courses, isLoading } = useQuery({
    queryKey: ['courses'],
    queryFn: async () => {
      const response = await fetch('/api/courses');
      if (!response.ok) throw new Error('Failed to fetch courses');
      return response.json();
    },
    initialData: initialData.courses
  });

  const stats = initialData.stats;

  return (
    <div className="p-6 space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-slate-800">Courses Management</h1>
          <p className="text-slate-500 mt-1">Manage all academic courses and their details</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="flex items-center gap-2">
            <Download size={16} />
            Export
          </Button>
          <Button className="bg-primary-600 text-white hover:bg-primary-700 flex items-center gap-2">
            <PlusCircle size={16} />
            Add New Course
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-5">
        <AnalyticsCard title="Total Courses" className="bg-white shadow-sm">
          <div className="flex flex-col">
            <span className="text-3xl font-semibold">{stats.totalCourses}</span>
            <span className="text-slate-500 text-sm">Across all departments</span>
          </div>
        </AnalyticsCard>
        <AnalyticsCard title="Active Courses" className="bg-white shadow-sm">
          <div className="flex flex-col">
            <span className="text-3xl font-semibold">{stats.activeCourses}</span>
            <span className="text-slate-500 text-sm">Currently running</span>
          </div>
        </AnalyticsCard>
        <AnalyticsCard title="Average Class Size" className="bg-white shadow-sm">
          <div className="flex flex-col">
            <span className="text-3xl font-semibold">{stats.avgClassSize}</span>
            <span className="text-slate-500 text-sm">Students per course</span>
          </div>
        </AnalyticsCard>
        <AnalyticsCard title="Departments" className="bg-white shadow-sm">
          <div className="flex flex-col">
            <span className="text-3xl font-semibold">{stats.totalDepartments}</span>
            <span className="text-slate-500 text-sm">Offering courses</span>
          </div>
        </AnalyticsCard>
      </div>

      <AnalyticsCard title="All Courses" className="bg-white shadow-sm">
        <div className="mb-4 flex flex-col sm:flex-row gap-3 justify-between">
          <div className="relative max-w-md">
            <Input
              placeholder="Search courses..."
              className="pl-10 w-full"
            />
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
          <Button variant="outline" className="flex items-center gap-2">
            <Filter size={16} />
            Filter
          </Button>
        </div>
        <div className="overflow-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Course Code</TableHead>
                <TableHead>Course Name</TableHead>
                <TableHead>Department</TableHead>
                <TableHead>Instructor</TableHead>
                <TableHead>Credits</TableHead>
                <TableHead>Students</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center">
                    Loading courses...
                  </TableCell>
                </TableRow>
              ) : courses.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center">
                    No courses found
                  </TableCell>
                </TableRow>
              ) : (
                courses.map(course => (
                  <TableRow key={course.id}>
                    <TableCell className="font-medium">{course.code}</TableCell>
                    <TableCell>{course.name}</TableCell>
                    <TableCell>{course.department}</TableCell>
                    <TableCell>{course.instructor}</TableCell>
                    <TableCell>{course.credits}</TableCell>
                    <TableCell>{course.students}</TableCell>
                    <TableCell>
                      <Badge
                        className={
                          course.status === 'active'
                            ? 'bg-green-100 text-green-800 hover:bg-green-100'
                            : 'bg-slate-100 text-slate-800 hover:bg-slate-100'
                        }
                      >
                        {course.status === 'active' ? 'Active' : 'Inactive'}
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

const CoursesPage = ({ initialData }: CoursesPageProps) => {
  return (
    <QueryClientProvider client={queryClient}>
      <CoursesPageContent initialData={initialData} />
    </QueryClientProvider>
  );
};

export default CoursesPage;