"use client"
import React from 'react';
import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query';
import { PlusCircle, Filter, Download } from 'lucide-react';
// import DashboardLayout from '@/components/layout/DashboardLayout';
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


const queryClient = new QueryClient()

// Mock data for courses
const fetchCourses = async () => {
  // In a real application, this would fetch from an API
  return [
    {
      id: 1,
      code: 'CS101',
      name: 'Introduction to Computer Science',
      department: 'Computer Science',
      instructor: 'Dr. Sarah Johnson',
      credits: 3,
      students: 45,
      status: 'active'
    },
    {
      id: 2,
      code: 'MATH201',
      name: 'Advanced Calculus',
      department: 'Mathematics',
      instructor: 'Prof. Michael Chen',
      credits: 4,
      students: 32,
      status: 'active'
    },
    {
      id: 3,
      code: 'BIO150',
      name: 'Cell Biology',
      department: 'Biology',
      instructor: 'Dr. Emma Rodriguez',
      credits: 3,
      students: 38,
      status: 'active'
    },
    {
      id: 4,
      code: 'HIST102',
      name: 'World History',
      department: 'History',
      instructor: 'Prof. James Wilson',
      credits: 3,
      students: 50,
      status: 'active'
    },
    {
      id: 5,
      code: 'ENG205',
      name: 'Creative Writing',
      department: 'English',
      instructor: 'Dr. Lisa Thompson',
      credits: 3,
      students: 25,
      status: 'inactive'
    },
    {
      id: 6,
      code: 'PHYS220',
      name: 'Quantum Physics',
      department: 'Physics',
      instructor: 'Prof. Robert Brown',
      credits: 4,
      students: 20,
      status: 'active'
    },
    {
      id: 7,
      code: 'CHEM110',
      name: 'Organic Chemistry',
      department: 'Chemistry',
      instructor: 'Dr. David Clark',
      credits: 4,
      students: 35,
      status: 'active'
    },
    {
      id: 8,
      code: 'PSYCH101',
      name: 'Introduction to Psychology',
      department: 'Psychology',
      instructor: 'Dr. Maria Garcia',
      credits: 3,
      students: 60,
      status: 'active'
    }
  ];
};

const CoursesPageContent = () => {
  const { data: courses = [], isLoading } = useQuery({
    queryKey: ['courses'],
    queryFn: fetchCourses
  });

  return (
    // <DashboardLayout>
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
              <span className="text-3xl font-semibold">{courses.length}</span>
              <span className="text-slate-500 text-sm">Across all departments</span>
            </div>
          </AnalyticsCard>
          <AnalyticsCard title="Active Courses" className="bg-white shadow-sm">
            <div className="flex flex-col">
              <span className="text-3xl font-semibold">
                {courses.filter(c => c.status === 'active').length}
              </span>
              <span className="text-slate-500 text-sm">Currently running</span>
            </div>
          </AnalyticsCard>
          <AnalyticsCard title="Average Class Size" className="bg-white shadow-sm">
            <div className="flex flex-col">
              <span className="text-3xl font-semibold">
                {courses.length > 0
                  ? Math.round(
                      courses.reduce((acc, course) => acc + course.students, 0) / courses.length
                    )
                  : 0}
              </span>
              <span className="text-slate-500 text-sm">Students per course</span>
            </div>
          </AnalyticsCard>
          <AnalyticsCard title="Departments" className="bg-white shadow-sm">
            <div className="flex flex-col">
              <span className="text-3xl font-semibold">
                {new Set(courses.map(c => c.department)).size}
              </span>
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
    // </DashboardLayout>
  );
};

const CoursesPage = () => {
  return(
  <QueryClientProvider client={queryClient}>
  <CoursesPageContent />
  </QueryClientProvider>
  )
}

export default CoursesPage;
