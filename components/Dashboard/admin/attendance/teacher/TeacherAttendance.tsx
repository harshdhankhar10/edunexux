"use client"
import React, { useState } from 'react';
import { useQuery,QueryClient,QueryClientProvider } from '@tanstack/react-query';
import { 
  Download, Search, Filter, Calendar as CalendarIcon,
  Clock, GraduationCap, Check
} from 'lucide-react';
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
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const queryClient = new QueryClient();

// Mock data for teacher attendance
const fetchTeacherAttendanceData = async () => {
  // In a real application, this would fetch from an API
  return {
    teachers: [
      {
        id: 1,
        name: "Dr. Sarah Johnson",
        employeeId: "EMP001",
        department: "Computer Science",
        presentDays: 22,
        absentDays: 0,
        attendanceRate: 100,
        checkInTime: "08:15 AM",
        checkOutTime: "04:30 PM",
        status: "present"
      },
      {
        id: 2,
        name: "Prof. Michael Chen",
        employeeId: "EMP002",
        department: "Mathematics",
        presentDays: 21,
        absentDays: 1,
        attendanceRate: 95,
        checkInTime: "08:05 AM",
        checkOutTime: "04:45 PM",
        status: "present"
      },
      {
        id: 3,
        name: "Dr. Emma Rodriguez",
        employeeId: "EMP003",
        department: "Biology",
        presentDays: 20,
        absentDays: 2,
        attendanceRate: 91,
        checkInTime: "08:30 AM",
        checkOutTime: "04:15 PM",
        status: "present"
      },
      {
        id: 4,
        name: "Prof. James Wilson",
        employeeId: "EMP004",
        department: "History",
        presentDays: 22,
        absentDays: 0,
        attendanceRate: 100,
        checkInTime: "08:20 AM",
        checkOutTime: "05:00 PM",
        status: "present"
      },
      {
        id: 5,
        name: "Dr. Lisa Thompson",
        employeeId: "EMP005",
        department: "English",
        presentDays: 19,
        absentDays: 3,
        attendanceRate: 86,
        checkInTime: "",
        checkOutTime: "",
        status: "absent"
      },
      {
        id: 6,
        name: "Prof. Robert Brown",
        employeeId: "EMP006",
        department: "Physics",
        presentDays: 21,
        absentDays: 1,
        attendanceRate: 95,
        checkInTime: "08:10 AM",
        checkOutTime: "04:40 PM",
        status: "present"
      },
      {
        id: 7,
        name: "Dr. David Clark",
        employeeId: "EMP007",
        department: "Chemistry",
        presentDays: 18,
        absentDays: 4,
        attendanceRate: 82,
        checkInTime: "08:25 AM",
        checkOutTime: "04:30 PM",
        status: "present"
      },
      {
        id: 8,
        name: "Dr. Maria Garcia",
        employeeId: "EMP008",
        department: "Psychology",
        presentDays: 20,
        absentDays: 2,
        attendanceRate: 91,
        checkInTime: "",
        checkOutTime: "",
        status: "absent"
      }
    ],
    stats: {
      totalTeachers: 45,
      presentToday: 43,
      absentToday: 2,
      averageAttendance: 94,
      punctualityRate: 92
    }
  };
};

const TeacherAttendancePageContent = () => {
  const [selectedDepartment, setSelectedDepartment] = useState<string>("all");
  const [selectedStatus, setSelectedStatus] = useState<string>("all");
  
  const { data, isLoading } = useQuery({
    queryKey: ['teacherAttendance'],
    queryFn: fetchTeacherAttendanceData
  });

  const teachers = data?.teachers || [];
  const stats = data?.stats || {
    totalTeachers: 0,
    presentToday: 0,
    absentToday: 0,
    averageAttendance: 0,
    punctualityRate: 0
  };

  // Filter teachers based on selected department and status
  const filteredTeachers = teachers.filter(teacher => {
    const departmentMatch = selectedDepartment === "all" || teacher.department === selectedDepartment;
    const statusMatch = selectedStatus === "all" || teacher.status === selectedStatus;
    return departmentMatch && statusMatch;
  });

  // Extract unique departments for filter
  const departments = [...new Set(teachers.map(teacher => teacher.department))];

  return (
    <>
      <div className="p-6 space-y-6 animate-fade-in">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-slate-800">Teacher Attendance</h1>
            <p className="text-slate-500 mt-1">Track faculty attendance and punctuality</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" className="flex items-center gap-2">
              <Download size={16} />
              Export Report
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="bg-primary-100 p-3 rounded-full">
                  <GraduationCap className="h-6 w-6 text-primary-600" />
                </div>
                <div>
                  <p className="text-slate-500 text-sm">Total Faculty</p>
                  <h3 className="text-2xl font-semibold text-slate-800">{stats.totalTeachers}</h3>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="bg-green-100 p-3 rounded-full">
                  <Check className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <p className="text-slate-500 text-sm">Present Today</p>
                  <h3 className="text-2xl font-semibold text-slate-800">{stats.presentToday}</h3>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="bg-red-100 p-3 rounded-full">
                  <Clock className="h-6 w-6 text-red-600" />
                </div>
                <div>
                  <p className="text-slate-500 text-sm">Absent Today</p>
                  <h3 className="text-2xl font-semibold text-slate-800">{stats.absentToday}</h3>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="bg-amber-100 p-3 rounded-full">
                  <CalendarIcon className="h-6 w-6 text-amber-600" />
                </div>
                <div>
                  <p className="text-slate-500 text-sm">Attendance Rate</p>
                  <h3 className="text-2xl font-semibold text-slate-800">{stats.averageAttendance}%</h3>
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
                  <p className="text-slate-500 text-sm">Punctuality</p>
                  <h3 className="text-2xl font-semibold text-slate-800">{stats.punctualityRate}%</h3>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <AnalyticsCard title="Teacher Attendance Records" className="bg-white shadow-sm">
          <div className="mb-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <Input
                placeholder="Search teachers..."
                className="pl-10 w-full"
              />
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Search className="h-5 w-5 text-slate-400" />
              </div>
            </div>
            
            <div>
              <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Department" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Departments</SelectItem>
                  {departments.map(department => (
                    <SelectItem key={department} value={department}>{department}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                <SelectTrigger>
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="present">Present</SelectItem>
                  <SelectItem value="absent">Absent</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="overflow-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Employee ID</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Department</TableHead>
                  <TableHead>Check-In</TableHead>
                  <TableHead>Check-Out</TableHead>
                  <TableHead>Present Days</TableHead>
                  <TableHead>Absent Days</TableHead>
                  <TableHead>Attendance Rate</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  <TableRow>
                    <TableCell colSpan={9} className="text-center">
                      Loading teacher attendance data...
                    </TableCell>
                  </TableRow>
                ) : filteredTeachers.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={9} className="text-center">
                      No teacher records found
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredTeachers.map(teacher => (
                    <TableRow key={teacher.id}>
                      <TableCell>{teacher.employeeId}</TableCell>
                      <TableCell className="font-medium">{teacher.name}</TableCell>
                      <TableCell>{teacher.department}</TableCell>
                      <TableCell>
                        {teacher.checkInTime || "-"}
                      </TableCell>
                      <TableCell>
                        {teacher.checkOutTime || "-"}
                      </TableCell>
                      <TableCell className="text-green-600">{teacher.presentDays}</TableCell>
                      <TableCell className="text-red-600">{teacher.absentDays}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <div className="w-20 bg-slate-200 rounded-full h-2">
                            <div
                              className={`h-2 rounded-full ${
                                teacher.attendanceRate >= 90
                                  ? 'bg-green-500'
                                  : teacher.attendanceRate >= 75
                                  ? 'bg-amber-500'
                                  : 'bg-red-500'
                              }`}
                              style={{ width: `${teacher.attendanceRate}%` }}
                            ></div>
                          </div>
                          <span>{teacher.attendanceRate}%</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge
                          className={
                            teacher.status === 'present'
                              ? 'bg-green-100 text-green-800 hover:bg-green-100'
                              : 'bg-red-100 text-red-800 hover:bg-red-100'
                          }
                        >
                          {teacher.status === 'present' ? 'Present' : 'Absent'}
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
    </>
  );
};


const TeacherAttendancePage = () =>{
  return (
    <QueryClientProvider client={queryClient}>
      <TeacherAttendancePageContent />
    </QueryClientProvider>
  )
}
export default TeacherAttendancePage;
