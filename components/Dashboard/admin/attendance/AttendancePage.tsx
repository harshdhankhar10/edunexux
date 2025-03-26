"use client"
import React from 'react';
import { useQuery, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { PlusCircle, Download, BarChart2, Users, UserCheck, Calendar as CalendarIcon } from 'lucide-react';
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

interface AttendanceSummary {
  todayAttendance: number;
  weeklyAverage: number;
  monthlyAverage: number;
  totalStudents: number;
  presentToday: number;
  absentToday: number;
}

interface AttendanceRecord {
  id: string;
  date: string;
  class: string;
  teacher: string;
  present: number;
  absent: number;
  rate: number;
}

interface AttendancePageProps {
  initialData: {
    summary: AttendanceSummary;
    recentRecords: AttendanceRecord[];
  };
}

const queryClient = new QueryClient();

const AttendancePageContent = ({ initialData }: AttendancePageProps) => {
  const { data, isLoading } = useQuery({
    queryKey: ['attendance'],
    queryFn: async () => {
      const response = await fetch('/api/attendance');
      if (!response.ok) throw new Error('Failed to fetch attendance data');
      return response.json();
    },
    initialData
  });

  const summary = data?.summary || {
    todayAttendance: 0,
    weeklyAverage: 0,
    monthlyAverage: 0,
    totalStudents: 0,
    presentToday: 0,
    absentToday: 0
  };
  const recentRecords = data?.recentRecords || [];

  return (
    <div className="p-6 space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-slate-800">Daily Attendance</h1>
          <p className="text-slate-500 mt-1">View and manage attendance records</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="flex items-center gap-2">
            <Download size={16} />
            Export Report
          </Button>
          <Button className="bg-primary-600 text-white hover:bg-primary-700 flex items-center gap-2">
            <PlusCircle size={16} />
            Take Attendance
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="bg-primary-100 p-3 rounded-full">
                <BarChart2 className="h-6 w-6 text-primary-600" />
              </div>
              <div>
                <p className="text-slate-500 text-sm">Today's Attendance</p>
                <h3 className="text-2xl font-semibold text-slate-800">{summary.todayAttendance}%</h3>
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
                <h3 className="text-2xl font-semibold text-slate-800">{summary.presentToday}</h3>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="bg-amber-100 p-3 rounded-full">
                <Users className="h-6 w-6 text-amber-600" />
              </div>
              <div>
                <p className="text-slate-500 text-sm">Absent Today</p>
                <h3 className="text-2xl font-semibold text-slate-800">{summary.absentToday}</h3>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="bg-indigo-100 p-3 rounded-full">
                <CalendarIcon className="h-6 w-6 text-indigo-600" />
              </div>
              <div>
                <p className="text-slate-500 text-sm">Weekly Average</p>
                <h3 className="text-2xl font-semibold text-slate-800">{summary.weeklyAverage}%</h3>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <AnalyticsCard title="Today's Attendance by Class" className="bg-white shadow-sm h-full">
            <div className="mb-4">
              <div className="relative">
                <Input
                  placeholder="Search classes..."
                  className="pl-10"
                />
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </div>
            </div>

            <div className="overflow-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Class</TableHead>
                    <TableHead>Teacher</TableHead>
                    <TableHead>Present</TableHead>
                    <TableHead>Absent</TableHead>
                    <TableHead>Rate</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {isLoading ? (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center">
                        Loading attendance data...
                      </TableCell>
                    </TableRow>
                  ) : recentRecords.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center">
                        No attendance data found for today
                      </TableCell>
                    </TableRow>
                  ) : (
                    recentRecords.map(record => (
                      <TableRow key={record.id}>
                        <TableCell className="font-medium">{record.class}</TableCell>
                        <TableCell>{record.teacher}</TableCell>
                        <TableCell className="text-green-600">{record.present}</TableCell>
                        <TableCell className="text-red-600">{record.absent}</TableCell>
                        <TableCell>
                          <Badge
                            className={
                              record.rate >= 90
                                ? 'bg-green-100 text-green-800 hover:bg-green-100'
                                : record.rate >= 75
                                ? 'bg-amber-100 text-amber-800 hover:bg-amber-100'
                                : 'bg-red-100 text-red-800 hover:bg-red-100'
                            }
                          >
                            {record.rate}%
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

        <div>
          <AnalyticsCard title="Attendance Trend" className="bg-white shadow-sm h-full">
            <div className="h-[300px] flex flex-col items-center justify-center">
              <div className="flex flex-col items-center space-y-2 text-center">
                <div className="rounded-full bg-slate-100 p-6">
                  <BarChart2 className="h-10 w-10 text-slate-500" />
                </div>
                <h3 className="text-lg font-medium text-slate-800">Attendance Trend</h3>
                <p className="text-sm text-slate-500 max-w-xs">
                  Weekly Average: {summary.weeklyAverage}%
                </p>
                <p className="text-sm text-slate-500 max-w-xs">
                  Monthly Average: {summary.monthlyAverage}%
                </p>
                <Button className="mt-4 bg-primary-600 hover:bg-primary-700">
                  View Analytics
                </Button>
              </div>
            </div>
          </AnalyticsCard>
        </div>
      </div>

      <AnalyticsCard title="Recent Absent Students" className="bg-white shadow-sm">
        <div className="p-6 flex flex-col items-center justify-center space-y-4 text-center">
          <div className="rounded-full bg-slate-100 p-6">
            <Users className="h-10 w-10 text-slate-500" />
          </div>
          <h3 className="text-lg font-medium text-slate-800">
            {summary.absentToday} Students Absent Today
          </h3>
          <p className="text-sm text-slate-500 max-w-md">
            {summary.absentToday > 0 
              ? 'View detailed information about student absences'
              : 'No students absent today'}
          </p>
          <Button className="mt-2" variant="outline">
            Go to Student Attendance
          </Button>
        </div>
      </AnalyticsCard>
    </div>
  );
};

const AttendancePage = ({ initialData }: AttendancePageProps) => {
  return (
    <QueryClientProvider client={queryClient}>
      <AttendancePageContent initialData={initialData} />
    </QueryClientProvider>
  );
};

export default AttendancePage;