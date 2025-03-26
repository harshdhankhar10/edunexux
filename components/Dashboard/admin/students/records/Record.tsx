"use client"
import React from 'react';
import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query';
import { Bookmark, Award, GraduationCap, Clock, Filter, Search, Download, Plus } from 'lucide-react';
// import DashboardLayout from '@/components/layout/DashboardLayout';
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

// Mock data for student records
const fetchStudentRecords = async () => {
  // In a real application, this would fetch from an API
  return [
    {
      id: 1,
      name: 'Emma Johnson',
      studentId: 'S10021',
      program: 'Computer Science',
      gpa: 3.8,
      totalCredits: 76,
      status: 'active',
      year: 'Junior'
    },
    {
      id: 2,
      name: 'James Smith',
      studentId: 'S10035',
      program: 'Business Administration',
      gpa: 3.5,
      totalCredits: 58,
      status: 'active',
      year: 'Sophomore'
    },
    {
      id: 3,
      name: 'Sophia Williams',
      studentId: 'S10062',
      program: 'Mathematics',
      gpa: 3.9,
      totalCredits: 92,
      status: 'active',
      year: 'Senior'
    },
    {
      id: 4,
      name: 'Liam Brown',
      studentId: 'S10078',
      program: 'Physics',
      gpa: 3.7,
      totalCredits: 72,
      status: 'active',
      year: 'Junior'
    },
    {
      id: 5,
      name: 'Olivia Davis',
      studentId: 'S10084',
      program: 'Chemistry',
      gpa: 3.6,
      totalCredits: 48,
      status: 'probation',
      year: 'Sophomore'
    },
    {
      id: 6,
      name: 'Noah Miller',
      studentId: 'S10096',
      program: 'Engineering',
      gpa: 3.2,
      totalCredits: 82,
      status: 'active',
      year: 'Senior'
    },
    {
      id: 7,
      name: 'Ava Wilson',
      studentId: 'S10124',
      program: 'Literature',
      gpa: 3.9,
      totalCredits: 68,
      status: 'active',
      year: 'Junior'
    },
    {
      id: 8,
      name: 'Isabella Moore',
      studentId: 'S10142',
      program: 'Art History',
      gpa: 3.7,
      totalCredits: 36,
      status: 'leave',
      year: 'Sophomore'
    }
  ];
};

// Student performance chart data
const studentPerformanceData = [
  { program: 'Computer Science', avgGPA: 3.7, students: 120 },
  { program: 'Business Admin', avgGPA: 3.5, students: 150 },
  { program: 'Engineering', avgGPA: 3.6, students: 110 },
  { program: 'Mathematics', avgGPA: 3.8, students: 85 },
  { program: 'Physics', avgGPA: 3.7, students: 65 },
  { program: 'Chemistry', avgGPA: 3.5, students: 75 },
];

const StudentRecordsPageContent = () => {
  const { data: students = [], isLoading } = useQuery({
    queryKey: ['studentRecords'],
    queryFn: fetchStudentRecords
  });

  const activeStudents = students.filter(s => s.status === 'active').length;
  const probationStudents = students.filter(s => s.status === 'probation').length;
  const leaveStudents = students.filter(s => s.status === 'leave').length;
  
  // Calculate average GPA
  const avgGPA = students.length > 0 
    ? students.reduce((sum, student) => sum + student.gpa, 0) / students.length
    : 0;

  return (
    // <DashboardLayout>
      <div className="p-6 space-y-6 animate-fade-in">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-slate-800">Student Records</h1>
            <p className="text-slate-500 mt-1">View and manage academic records</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" className="flex items-center gap-2">
              <Download size={16} />
              Export Records
            </Button>
            <Button className="bg-primary-600 text-white hover:bg-primary-700 flex items-center gap-2">
              <Plus size={16} />
              Add Record
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
          <AnalyticsCard title="Total Students" className="bg-white shadow-sm">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                <GraduationCap size={18} className="text-blue-600" />
              </div>
              <div className="flex flex-col">
                <span className="text-3xl font-semibold">{students.length}</span>
                <span className="text-slate-500 text-sm">Enrolled</span>
              </div>
            </div>
          </AnalyticsCard>
          
          <AnalyticsCard title="Average GPA" className="bg-white shadow-sm">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                <Award size={18} className="text-green-600" />
              </div>
              <div className="flex flex-col">
                <span className="text-3xl font-semibold">{avgGPA.toFixed(2)}</span>
                <span className="text-slate-500 text-sm">All Students</span>
              </div>
            </div>
          </AnalyticsCard>
          
          <AnalyticsCard title="Academic Standing" className="bg-white shadow-sm">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center">
                <Bookmark size={18} className="text-amber-600" />
              </div>
              <div className="flex flex-col">
                <span className="text-3xl font-semibold">{probationStudents}</span>
                <span className="text-slate-500 text-sm">On Probation</span>
              </div>
            </div>
          </AnalyticsCard>
          
          <AnalyticsCard title="Leave of Absence" className="bg-white shadow-sm">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
                <Clock size={18} className="text-purple-600" />
              </div>
              <div className="flex flex-col">
                <span className="text-3xl font-semibold">{leaveStudents}</span>
                <span className="text-slate-500 text-sm">Students</span>
              </div>
            </div>
          </AnalyticsCard>
        </div>

        <AnalyticsCard title="Program Performance" className="bg-white shadow-sm">
          <Chart 
            type="bar"
            data={studentPerformanceData}
            xKey="program"
            keys={["avgGPA"]}
            colors={["#3b82f6"]}
            height={300}
          />
        </AnalyticsCard>

        <AnalyticsCard title="Student Records" className="bg-white shadow-sm">
          <div className="mb-4 flex flex-col sm:flex-row gap-3 justify-between">
            <div className="relative max-w-md">
              <Input
                placeholder="Search students..."
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
                  <TableHead>Name</TableHead>
                  <TableHead>Student ID</TableHead>
                  <TableHead>Program</TableHead>
                  <TableHead>Year</TableHead>
                  <TableHead>GPA</TableHead>
                  <TableHead>Credits</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center">
                      Loading student records...
                    </TableCell>
                  </TableRow>
                ) : students.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center">
                      No student records found
                    </TableCell>
                  </TableRow>
                ) : (
                  students.map(student => (
                    <TableRow key={student.id}>
                      <TableCell className="font-medium">{student.name}</TableCell>
                      <TableCell>{student.studentId}</TableCell>
                      <TableCell>{student.program}</TableCell>
                      <TableCell>{student.year}</TableCell>
                      <TableCell>{student.gpa}</TableCell>
                      <TableCell>{student.totalCredits}</TableCell>
                      <TableCell>
                        <Badge
                          className={
                            student.status === 'active'
                              ? 'bg-green-100 text-green-800 hover:bg-green-100'
                              : student.status === 'probation'
                              ? 'bg-amber-100 text-amber-800 hover:bg-amber-100'
                              : 'bg-purple-100 text-purple-800 hover:bg-purple-100'
                          }
                        >
                          {student.status.charAt(0).toUpperCase() + student.status.slice(1)}
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

const StudentRecordsPage = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <StudentRecordsPageContent />
    </QueryClientProvider>
  );
};

export default StudentRecordsPage;
