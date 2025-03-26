"use client";
import React, { useState } from 'react';
import { useQuery, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { 
  Download, Search, Filter, Calendar as CalendarIcon,
  Clock, GraduationCap, Check, UserCheck, UserX
} from 'lucide-react';
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
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Skeleton } from '@/components/ui/skeleton';
import { Progress } from '@/components/ui/progress';

interface Instructor {
  id: string;
  name: string;
  employeeId: string;
  department: string;
  status: 'PRESENT' | 'ABSENT' | 'LATE';
  checkInTime: string;
  checkOutTime: string;
  course: string;
}

interface AttendanceStats {
  totalTeachers: number;
  presentToday: number;
  absentToday: number;
  averageAttendance: number;
  punctualityRate: number;
}

interface AttendancePageProps {
  initialData: {
    teachers: Instructor[];
    stats: AttendanceStats;
  };
}

const queryClient = new QueryClient();

const InstructorAttendanceContent = ({ initialData }: AttendancePageProps) => {
  const [selectedDepartment, setSelectedDepartment] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  
  const { data, isLoading } = useQuery({
    queryKey: ['instructorAttendance'],
    queryFn: async () => {
      const response = await fetch('/api/instructor-attendance');
      if (!response.ok) throw new Error('Failed to fetch attendance data');
      return response.json();
    },
    initialData,
    refetchOnWindowFocus: false
  });

  const { teachers, stats } = data;

  // Get unique departments for filter
  const departments = [...new Set(teachers.map(t => t.department))];

  // Filter instructors based on selections
  const filteredTeachers = teachers.filter(teacher => {
    const matchesDepartment = selectedDepartment === "all" || teacher.department === selectedDepartment;
    const matchesSearch = teacher.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         teacher.employeeId.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesDepartment && matchesSearch;
  });

  return (
    <div className="space-y-6 p-6">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Faculty Attendance</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Track and manage instructor attendance records
          </p>
        </div>
        <div className="flex gap-3 w-full md:w-auto">
          <Button variant="outline" className="gap-2">
            <Download className="h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard 
          title="Total Faculty" 
          value={stats.totalTeachers} 
          icon={<GraduationCap className="h-5 w-5" />} 
          trend="stable"
        />
        <StatsCard 
          title="Present Today" 
          value={stats.presentToday} 
          icon={<UserCheck className="h-5 w-5" />} 
          trend="up"
          className="bg-green-50 dark:bg-green-900/20"
          iconClassName="text-green-600 dark:text-green-400"
        />
        <StatsCard 
          title="Absent Today" 
          value={stats.absentToday} 
          icon={<UserX className="h-5 w-5" />} 
          trend="down"
          className="bg-red-50 dark:bg-red-900/20"
          iconClassName="text-red-600 dark:text-red-400"
        />
        <StatsCard 
          title="Attendance Rate" 
          value={`${stats.averageAttendance}%`} 
          icon={<Check className="h-5 w-5" />} 
          trend="up"
          className="bg-blue-50 dark:bg-blue-900/20"
          iconClassName="text-blue-600 dark:text-blue-400"
        />
      </div>

      {/* Filters and Search */}
      <div className="bg-white dark:bg-gray-900 rounded-lg shadow-sm p-4 space-y-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search by name or ID..."
              className="pl-10 w-full"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="All Departments" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Departments</SelectItem>
              {departments.map(dept => (
                <SelectItem key={dept} value={dept}>{dept}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Attendance Table */}
      <Card className="overflow-hidden">
        <CardHeader className="border-b">
          <CardTitle className="flex items-center gap-2">
            <CalendarIcon className="h-5 w-5 text-gray-500" />
            <span>Today's Attendance Records</span>
            <Badge variant="secondary" className="ml-auto">
              {filteredTeachers.length} records
            </Badge>
          </CardTitle>
        </CardHeader>
        <div className="overflow-auto">
          <Table>
            <TableHeader className="bg-gray-50 dark:bg-gray-800">
              <TableRow>
                <TableHead className="w-[120px]">Employee ID</TableHead>
                <TableHead>Instructor</TableHead>
                <TableHead>Department</TableHead>
                <TableHead>Course</TableHead>
                <TableHead>Check In</TableHead>
                <TableHead>Check Out</TableHead>
                <TableHead className="text-right">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                Array(5).fill(0).map((_, i) => (
                  <TableRow key={i}>
                    <TableCell><Skeleton className="h-4 w-[100px]" /></TableCell>
                    <TableCell><Skeleton className="h-4 w-[180px]" /></TableCell>
                    <TableCell><Skeleton className="h-4 w-[120px]" /></TableCell>
                    <TableCell><Skeleton className="h-4 w-[150px]" /></TableCell>
                    <TableCell><Skeleton className="h-4 w-[80px]" /></TableCell>
                    <TableCell><Skeleton className="h-4 w-[80px]" /></TableCell>
                    <TableCell><Skeleton className="h-4 w-[70px] ml-auto" /></TableCell>
                  </TableRow>
                ))
              ) : filteredTeachers.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center h-24">
                    {teachers.length === 0 ? 
                      "No attendance records found for today" : 
                      "No instructors match your filters"}
                  </TableCell>
                </TableRow>
              ) : (
                filteredTeachers.map((teacher) => (
                  <TableRow key={teacher.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                    <TableCell className="font-medium">{teacher.employeeId}</TableCell>
                    <TableCell>
                      <div className="font-medium">{teacher.name}</div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">{teacher.email}</div>
                    </TableCell>
                    <TableCell>{teacher.department}</TableCell>
                    <TableCell>{teacher.course}</TableCell>
                    <TableCell>
                      {teacher.checkInTime || (
                        <span className="text-gray-400">-</span>
                      )}
                    </TableCell>
                    <TableCell>
                      {teacher.checkOutTime || (
                        <span className="text-gray-400">-</span>
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      <Badge 
                        variant={
                          teacher.status === 'PRESENT' ? 'default' :
                          teacher.status === 'LATE' ? 'warning' : 'destructive'
                        }
                        className="capitalize"
                      >
                        {teacher.status.toLowerCase()}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </Card>
    </div>
  );
};

const StatsCard = ({ 
  title, 
  value, 
  icon, 
  trend,
  className = "",
  iconClassName = "text-primary-600 dark:text-primary-400"
}: {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  trend?: 'up' | 'down' | 'stable';
  className?: string;
  iconClassName?: string;
}) => {
  return (
    <Card className={className}>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{title}</p>
            <h3 className="text-2xl font-semibold">{value}</h3>
          </div>
          <div className={`rounded-lg p-3 ${iconClassName.replace('text-', 'bg-').replace('dark:text-', 'dark:bg-')} bg-opacity-20`}>
            {icon}
          </div>
        </div>
        {trend && (
          <div className={`mt-2 text-sm flex items-center ${
            trend === 'up' ? 'text-green-600 dark:text-green-400' :
            trend === 'down' ? 'text-red-600 dark:text-red-400' :
            'text-gray-600 dark:text-gray-400'
          }`}>
            {trend === 'up' ? (
              <span className="flex items-center">
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                </svg>
                Increased
              </span>
            ) : trend === 'down' ? (
              <span className="flex items-center">
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
                Decreased
              </span>
            ) : (
              <span className="flex items-center">
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14" />
                </svg>
                Stable
              </span>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

const InstructorAttendancePage = ({ initialData }: AttendancePageProps) => {
  return (
    <QueryClientProvider client={queryClient}>
      <InstructorAttendanceContent initialData={initialData} />
    </QueryClientProvider>
  );
};

export default InstructorAttendancePage;