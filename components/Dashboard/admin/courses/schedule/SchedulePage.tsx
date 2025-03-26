"use client"
import React from 'react';
import { useQuery,QueryClient,QueryClientProvider, Query } from '@tanstack/react-query';
import { PlusCircle, Filter, Download, Clock, Calendar, BookOpen } from 'lucide-react';
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
import { Card, CardContent } from '@/components/ui/card';

const queryClient = new QueryClient();

// Mock data for schedule
const fetchScheduleData = async () => {
  // In a real application, this would fetch from an API
  return {
    schedules: [
      {
        id: 1,
        courseCode: 'CS101',
        courseName: 'Introduction to Computer Science',
        instructor: 'Dr. Sarah Johnson',
        day: 'Monday',
        startTime: '09:00 AM',
        endTime: '10:30 AM',
        room: 'B-101',
        building: 'Science Building',
        status: 'active'
      },
      {
        id: 2,
        courseCode: 'MATH201',
        courseName: 'Advanced Calculus',
        instructor: 'Prof. Michael Chen',
        day: 'Monday',
        startTime: '11:00 AM',
        endTime: '12:30 PM',
        room: 'A-205',
        building: 'Mathematics Building',
        status: 'active'
      },
      {
        id: 3,
        courseCode: 'BIO150',
        courseName: 'Cell Biology',
        instructor: 'Dr. Emma Rodriguez',
        day: 'Tuesday',
        startTime: '09:00 AM',
        endTime: '10:30 AM',
        room: 'C-103',
        building: 'Life Sciences Building',
        status: 'active'
      },
      {
        id: 4,
        courseCode: 'HIST102',
        courseName: 'World History',
        instructor: 'Prof. James Wilson',
        day: 'Tuesday',
        startTime: '01:00 PM',
        endTime: '02:30 PM',
        room: 'D-120',
        building: 'Humanities Building',
        status: 'active'
      },
      {
        id: 5,
        courseCode: 'ENG205',
        courseName: 'Creative Writing',
        instructor: 'Dr. Lisa Thompson',
        day: 'Wednesday',
        startTime: '03:00 PM',
        endTime: '04:30 PM',
        room: 'D-115',
        building: 'Humanities Building',
        status: 'cancelled'
      },
      {
        id: 6,
        courseCode: 'PHYS220',
        courseName: 'Quantum Physics',
        instructor: 'Prof. Robert Brown',
        day: 'Thursday',
        startTime: '11:00 AM',
        endTime: '01:00 PM',
        room: 'B-205',
        building: 'Science Building',
        status: 'active'
      },
      {
        id: 7,
        courseCode: 'CS201',
        courseName: 'Data Structures and Algorithms',
        instructor: 'Dr. Sarah Johnson',
        day: 'Friday',
        startTime: '10:00 AM',
        endTime: '11:30 AM',
        room: 'B-102',
        building: 'Science Building',
        status: 'active'
      }
    ],
    statistics: {
      totalClasses: 12,
      activeClasses: 11,
      totalRooms: 8,
      classUtilization: 75
    }
  };
};

const SchedulePageContent = () => {
  const { data, isLoading } = useQuery({
    queryKey: ['schedule'],
    queryFn: fetchScheduleData
  });

  const schedules = data?.schedules || [];
  const stats = data?.statistics || { totalClasses: 0, activeClasses: 0, totalRooms: 0, classUtilization: 0 };

  const schedulesByDay = schedules.reduce((acc, schedule) => {
    if (!acc[schedule.day]) {
      acc[schedule.day] = [];
    }
    acc[schedule.day].push(schedule);
    return acc;
  }, {} as Record<string, typeof schedules>);

  return (
    // <DashboardLayout>
      <div className="p-6 space-y-6 animate-fade-in">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-slate-800">Class Schedule</h1>
            <p className="text-slate-500 mt-1">Manage course schedules and room allocations</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" className="flex items-center gap-2">
              <Download size={16} />
              Export
            </Button>
            <Button className="bg-primary-600 text-white hover:bg-primary-700 flex items-center gap-2">
              <PlusCircle size={16} />
              Add Schedule
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="bg-primary-100 p-3 rounded-full">
                  <BookOpen className="h-6 w-6 text-primary-600" />
                </div>
                <div>
                  <p className="text-slate-500 text-sm">Total Classes</p>
                  <h3 className="text-2xl font-semibold text-slate-800">{stats.totalClasses}</h3>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="bg-green-100 p-3 rounded-full">
                  <Calendar className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <p className="text-slate-500 text-sm">Active Classes</p>
                  <h3 className="text-2xl font-semibold text-slate-800">{stats.activeClasses}</h3>
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
                  <p className="text-slate-500 text-sm">Room Utilization</p>
                  <h3 className="text-2xl font-semibold text-slate-800">{stats.classUtilization}%</h3>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="bg-indigo-100 p-3 rounded-full">
                  <Clock className="h-6 w-6 text-indigo-600" />
                </div>
                <div>
                  <p className="text-slate-500 text-sm">Total Rooms</p>
                  <h3 className="text-2xl font-semibold text-slate-800">{stats.totalRooms}</h3>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <AnalyticsCard title="Weekly Schedule" className="bg-white shadow-sm">
          <div className="mb-4 flex flex-col sm:flex-row gap-3 justify-between">
            <div className="relative max-w-md">
              <Input
                placeholder="Search schedules..."
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

          {isLoading ? (
            <div className="text-center py-8">Loading schedule data...</div>
          ) : schedules.length === 0 ? (
            <div className="text-center py-8">No schedule data found</div>
          ) : (
            Object.keys(schedulesByDay).map(day => (
              <div key={day} className="mb-6">
                <h3 className="text-lg font-medium text-slate-800 mb-3">{day}</h3>
                <div className="overflow-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Course</TableHead>
                        <TableHead>Instructor</TableHead>
                        <TableHead>Time</TableHead>
                        <TableHead>Room</TableHead>
                        <TableHead>Building</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {schedulesByDay[day].map(schedule => (
                        <TableRow key={schedule.id}>
                          <TableCell>
                            <div>
                              <div className="font-medium">{schedule.courseCode}</div>
                              <div className="text-sm text-slate-500">{schedule.courseName}</div>
                            </div>
                          </TableCell>
                          <TableCell>{schedule.instructor}</TableCell>
                          <TableCell>
                            {schedule.startTime} - {schedule.endTime}
                          </TableCell>
                          <TableCell>{schedule.room}</TableCell>
                          <TableCell>{schedule.building}</TableCell>
                          <TableCell>
                            <Badge
                              className={
                                schedule.status === 'active'
                                  ? 'bg-green-100 text-green-800 hover:bg-green-100'
                                  : 'bg-red-100 text-red-800 hover:bg-red-100'
                              }
                            >
                              {schedule.status === 'active' ? 'Active' : 'Cancelled'}
                            </Badge>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>
            ))
          )}
        </AnalyticsCard>
      </div>
    // </DashboardLayout>
  );
};

const SchedulePage = () => {
  return(
  <QueryClientProvider client={queryClient}>
    <SchedulePageContent />
    </QueryClientProvider>
  )
}

export default SchedulePage;
