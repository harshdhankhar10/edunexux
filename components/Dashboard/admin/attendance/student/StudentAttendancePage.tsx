"use client"
import React, { useState } from 'react';
import { useQuery,QueryClient,QueryClientProvider } from '@tanstack/react-query';
import { 
  PlusCircle, Download, Search, Filter,
  UserCheck, UserX, Calendar as CalendarIcon
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
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';


const queryClient = new QueryClient();
// Mock data for student attendance
const fetchStudentAttendanceData = async () => {
  // In a real application, this would fetch from an API
  return {
    students: [
      {
        id: 1,
        name: "John Smith",
        studentId: "STU001",
        grade: "10",
        class: "10-A",
        presentDays: 18,
        absentDays: 2,
        attendanceRate: 90,
        lastAttendance: "2023-10-18",
        status: "present"
      },
      {
        id: 2,
        name: "Emily Johnson",
        studentId: "STU002",
        grade: "10",
        class: "10-A",
        presentDays: 16,
        absentDays: 4,
        attendanceRate: 80,
        lastAttendance: "2023-10-18",
        status: "present"
      },
      {
        id: 3,
        name: "Michael Williams",
        studentId: "STU003",
        grade: "10",
        class: "10-A",
        presentDays: 20,
        absentDays: 0,
        attendanceRate: 100,
        lastAttendance: "2023-10-18",
        status: "present"
      },
      {
        id: 4,
        name: "Sarah Brown",
        studentId: "STU004",
        grade: "10",
        class: "10-B",
        presentDays: 17,
        absentDays: 3,
        attendanceRate: 85,
        lastAttendance: "2023-10-18",
        status: "absent"
      },
      {
        id: 5,
        name: "David Lee",
        studentId: "STU005",
        grade: "10",
        class: "10-B",
        presentDays: 19,
        absentDays: 1,
        attendanceRate: 95,
        lastAttendance: "2023-10-18",
        status: "present"
      },
      {
        id: 6,
        name: "Jessica Garcia",
        studentId: "STU006",
        grade: "10",
        class: "10-B",
        presentDays: 15,
        absentDays: 5,
        attendanceRate: 75,
        lastAttendance: "2023-10-18",
        status: "present"
      },
      {
        id: 7,
        name: "Andrew Martinez",
        studentId: "STU007",
        grade: "11",
        class: "11-A",
        presentDays: 13,
        absentDays: 7,
        attendanceRate: 65,
        lastAttendance: "2023-10-18",
        status: "absent"
      },
      {
        id: 8,
        name: "Emma Thompson",
        studentId: "STU008",
        grade: "11",
        class: "11-A",
        presentDays: 18,
        absentDays: 2,
        attendanceRate: 90,
        lastAttendance: "2023-10-18",
        status: "present"
      },
      {
        id: 9,
        name: "Daniel Rodriguez",
        studentId: "STU009",
        grade: "11",
        class: "11-A",
        presentDays: 16,
        absentDays: 4,
        attendanceRate: 80,
        lastAttendance: "2023-10-18",
        status: "present"
      },
      {
        id: 10,
        name: "Olivia Wilson",
        studentId: "STU010",
        grade: "11",
        class: "11-B",
        presentDays: 20,
        absentDays: 0,
        attendanceRate: 100,
        lastAttendance: "2023-10-18",
        status: "present"
      }
    ],
    stats: {
      totalStudents: 450,
      averageAttendance: 85,
      highRiskStudents: 45,
      perfectAttendance: 120
    }
  };
};

const StudentAttendancePageContent = () => {
  const [selectedGrade, setSelectedGrade] = useState<string>("all");
  const [selectedClass, setSelectedClass] = useState<string>("all");
  
  const { data, isLoading } = useQuery({
    queryKey: ['studentAttendance'],
    queryFn: fetchStudentAttendanceData
  });

  const students = data?.students || [];
  const stats = data?.stats || {
    totalStudents: 0,
    averageAttendance: 0,
    highRiskStudents: 0,
    perfectAttendance: 0
  };

  // Filter students based on selected grade and class
  const filteredStudents = students.filter(student => {
    const gradeMatch = selectedGrade === "all" || student.grade === selectedGrade;
    const classMatch = selectedClass === "all" || student.class === selectedClass;
    return gradeMatch && classMatch;
  });

  // Extract unique grades and classes for filters
  const grades = [...new Set(students.map(student => student.grade))];
  const classes = [...new Set(students.map(student => student.class))];

  return (
    <>
      <div className="p-6 space-y-6 animate-fade-in">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-slate-800">Student Attendance</h1>
            <p className="text-slate-500 mt-1">Track and manage individual student attendance records</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" className="flex items-center gap-2">
              <Download size={16} />
              Export Report
            </Button>
            <Button className="bg-primary-600 text-white hover:bg-primary-700 flex items-center gap-2">
              <PlusCircle size={16} />
              Record Attendance
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <AnalyticsCard title="Total Students" className="bg-white shadow-sm">
            <div className="flex items-center gap-4">
              <div className="bg-primary-100 p-3 rounded-full">
                <UserCheck className="h-6 w-6 text-primary-600" />
              </div>
              <div className="flex flex-col">
                <span className="text-3xl font-semibold">{stats.totalStudents}</span>
                <span className="text-slate-500 text-sm">Enrolled students</span>
              </div>
            </div>
          </AnalyticsCard>
          
          <AnalyticsCard title="Average Attendance" className="bg-white shadow-sm">
            <div className="flex items-center gap-4">
              <div className="bg-green-100 p-3 rounded-full">
                <CalendarIcon className="h-6 w-6 text-green-600" />
              </div>
              <div className="flex flex-col">
                <span className="text-3xl font-semibold">{stats.averageAttendance}%</span>
                <span className="text-slate-500 text-sm">Monthly average</span>
              </div>
            </div>
          </AnalyticsCard>
          
          <AnalyticsCard title="At Risk Students" className="bg-white shadow-sm">
            <div className="flex items-center gap-4">
              <div className="bg-red-100 p-3 rounded-full">
                <UserX className="h-6 w-6 text-red-600" />
              </div>
              <div className="flex flex-col">
                <span className="text-3xl font-semibold">{stats.highRiskStudents}</span>
                <span className="text-slate-500 text-sm">Below 75% attendance</span>
              </div>
            </div>
          </AnalyticsCard>
          
          <AnalyticsCard title="Perfect Attendance" className="bg-white shadow-sm">
            <div className="flex items-center gap-4">
              <div className="bg-amber-100 p-3 rounded-full">
                <UserCheck className="h-6 w-6 text-amber-600" />
              </div>
              <div className="flex flex-col">
                <span className="text-3xl font-semibold">{stats.perfectAttendance}</span>
                <span className="text-slate-500 text-sm">100% attendance</span>
              </div>
            </div>
          </AnalyticsCard>
        </div>

        <AnalyticsCard title="Student Attendance Records" className="bg-white shadow-sm">
          <div className="mb-6 grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative col-span-2">
              <Input
                placeholder="Search students..."
                className="pl-10 w-full"
              />
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Search className="h-5 w-5 text-slate-400" />
              </div>
            </div>
            
            <div>
              <Select value={selectedGrade} onValueChange={setSelectedGrade}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Grade" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Grades</SelectItem>
                  {grades.map(grade => (
                    <SelectItem key={grade} value={grade}>Grade {grade}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Select value={selectedClass} onValueChange={setSelectedClass}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Class" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Classes</SelectItem>
                  {classes.map(cls => (
                    <SelectItem key={cls} value={cls}>Class {cls}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="overflow-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Student ID</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Grade</TableHead>
                  <TableHead>Class</TableHead>
                  <TableHead>Present Days</TableHead>
                  <TableHead>Absent Days</TableHead>
                  <TableHead>Attendance Rate</TableHead>
                  <TableHead>Today's Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center">
                      Loading student attendance data...
                    </TableCell>
                  </TableRow>
                ) : filteredStudents.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center">
                      No student records found
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredStudents.map(student => (
                    <TableRow key={student.id}>
                      <TableCell>{student.studentId}</TableCell>
                      <TableCell className="font-medium">{student.name}</TableCell>
                      <TableCell>{student.grade}</TableCell>
                      <TableCell>{student.class}</TableCell>
                      <TableCell className="text-green-600">{student.presentDays}</TableCell>
                      <TableCell className="text-red-600">{student.absentDays}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <div className="w-20 bg-slate-200 rounded-full h-2">
                            <div
                              className={`h-2 rounded-full ${
                                student.attendanceRate >= 90
                                  ? 'bg-green-500'
                                  : student.attendanceRate >= 75
                                  ? 'bg-amber-500'
                                  : 'bg-red-500'
                              }`}
                              style={{ width: `${student.attendanceRate}%` }}
                            ></div>
                          </div>
                          <span>{student.attendanceRate}%</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge
                          className={
                            student.status === 'present'
                              ? 'bg-green-100 text-green-800 hover:bg-green-100'
                              : 'bg-red-100 text-red-800 hover:bg-red-100'
                          }
                        >
                          {student.status === 'present' ? 'Present' : 'Absent'}
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

const StudentAttendancePage = ()=>{
  return (
    <QueryClientProvider client={queryClient}>
      <StudentAttendancePageContent />
    </QueryClientProvider>
  )
}

export default StudentAttendancePage;
