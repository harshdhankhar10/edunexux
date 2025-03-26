"use client";
import React from 'react';
import { useQuery, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Download, UserCheck, UserX, Clock, Users, BarChart2 } from 'lucide-react';
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
import { Card, CardContent } from '@/components/ui/card';

interface AttendanceRecord {
  id: string;
  studentName: string;
  email: string;
  course: string;
  date: string;
  status: 'PRESENT' | 'ABSENT' | 'LATE';
  notes: string;
}

interface AttendanceStats {
  totalStudents: number;
  presentCount: number;
  absentCount: number;
  lateCount: number;
  attendanceRate: number;
}

interface AttendancePageProps {
  initialData: {
    attendanceRecords: AttendanceRecord[];
    stats: AttendanceStats;
  };
}

const queryClient = new QueryClient();

const StudentAttendancePageContent = ({ initialData }: AttendancePageProps) => {
  const { data } = useQuery({
    queryKey: ['attendance'],
    queryFn: async () => {
      const response = await fetch('/api/attendance');
      if (!response.ok) throw new Error('Failed to fetch attendance data');
      return response.json();
    },
    initialData,
    refetchOnMount: false,
    refetchOnWindowFocus: false
  });

  const { attendanceRecords, stats } = data;

  return (
    <div className="p-6 space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-slate-800">Student Attendance</h1>
          <p className="text-slate-500 mt-1">View and manage student attendance records</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="flex items-center gap-2">
            <Download size={16} />
            Export
          </Button>
          <Button className="bg-primary-600 text-white hover:bg-primary-700 flex items-center gap-2">
            <UserCheck size={16} />
            Mark Attendance
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="bg-blue-100 p-3 rounded-full">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-slate-500 text-sm">Total Students</p>
                <h3 className="text-2xl font-semibold text-slate-800">{stats.totalStudents}</h3>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="bg-green-100 p-3 rounded-full">
                <UserCheck className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-slate-500 text-sm">Present Today</p>
                <h3 className="text-2xl font-semibold text-slate-800">{stats.presentCount}</h3>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="bg-red-100 p-3 rounded-full">
                <UserX className="h-6 w-6 text-red-600" />
              </div>
              <div>
                <p className="text-slate-500 text-sm">Absent Today</p>
                <h3 className="text-2xl font-semibold text-slate-800">{stats.absentCount}</h3>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="bg-amber-100 p-3 rounded-full">
                <Clock className="h-6 w-6 text-amber-600" />
              </div>
              <div>
                <p className="text-slate-500 text-sm">Attendance Rate</p>
                <h3 className="text-2xl font-semibold text-slate-800">{stats.attendanceRate}%</h3>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <AnalyticsCard title="Today's Attendance Records" className="bg-white shadow-sm">
        <div className="mb-4 flex flex-col sm:flex-row gap-3 justify-between">
          <div className="relative max-w-md">
            <Input
              placeholder="Search students..."
              className="pl-10 w-full"
            />
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
          <Button variant="outline" className="flex items-center gap-2">
            <BarChart2 size={16} />
            View Reports
          </Button>
        </div>
        <div className="overflow-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Student</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Course</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Notes</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {attendanceRecords.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center">
                    No attendance records found for today
                  </TableCell>
                </TableRow>
              ) : (
                attendanceRecords.map(record => (
                  <TableRow key={record.id}>
                    <TableCell className="font-medium">{record.studentName}</TableCell>
                    <TableCell>{record.email}</TableCell>
                    <TableCell>{record.course}</TableCell>
                    <TableCell>{record.date}</TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          record.status === 'PRESENT'
                            ? 'success'
                            : record.status === 'ABSENT'
                            ? 'destructive'
                            : 'warning'
                        }
                      >
                        {record.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{record.notes}</TableCell>
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

const StudentAttendancePage = ({ initialData }: AttendancePageProps) => {
  return (
    <QueryClientProvider client={queryClient}>
      <StudentAttendancePageContent initialData={initialData} />
    </QueryClientProvider>
  );
};

export default StudentAttendancePage;