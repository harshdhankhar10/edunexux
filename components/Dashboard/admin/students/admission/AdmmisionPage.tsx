"use client"
import React from 'react';
import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query';
import { Plus, FileCheck, UserPlus, Calendar, Filter, Search, Download, Clock } from 'lucide-react';
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
import Chart from '@/components/Dashboard/admin/dashboard/Chart';

const queryClient = new QueryClient();

// Mock data for admissions
const fetchAdmissions = async () => {
  // In a real application, this would fetch from an API
  return [
    {
      id: 1,
      name: 'Emma Johnson',
      email: 'emma.j@example.com',
      program: 'Computer Science',
      submissionDate: '2023-04-10',
      status: 'accepted',
      interviewDate: '2023-05-15'
    },
    {
      id: 2,
      name: 'James Smith',
      email: 'james.smith@example.com',
      program: 'Business Administration',
      submissionDate: '2023-04-12',
      status: 'pending',
      interviewDate: '2023-05-18'
    },
    {
      id: 3,
      name: 'Sophia Williams',
      email: 'sophia.w@example.com',
      program: 'Mathematics',
      submissionDate: '2023-04-15',
      status: 'review',
      interviewDate: '2023-05-20'
    },
    {
      id: 4,
      name: 'Liam Brown',
      email: 'liam.b@example.com',
      program: 'Physics',
      submissionDate: '2023-04-18',
      status: 'accepted',
      interviewDate: '2023-05-22'
    },
    {
      id: 5,
      name: 'Olivia Davis',
      email: 'olivia.d@example.com',
      program: 'Chemistry',
      submissionDate: '2023-04-20',
      status: 'rejected',
      interviewDate: 'N/A'
    },
    {
      id: 6,
      name: 'Noah Miller',
      email: 'noah.m@example.com',
      program: 'Engineering',
      submissionDate: '2023-04-22',
      status: 'pending',
      interviewDate: '2023-05-28'
    },
    {
      id: 7,
      name: 'Ava Wilson',
      email: 'ava.w@example.com',
      program: 'Literature',
      submissionDate: '2023-04-25',
      status: 'review',
      interviewDate: '2023-05-30'
    },
    {
      id: 8,
      name: 'Isabella Moore',
      email: 'isabella.m@example.com',
      program: 'Art History',
      submissionDate: '2023-04-28',
      status: 'accepted',
      interviewDate: '2023-06-02'
    }
  ];
};

// Admission trends chart data
const admissionTrendsData = [
  { name: 'Jan', applications: 45, accepted: 20, rejected: 15 },
  { name: 'Feb', applications: 52, accepted: 25, rejected: 18 },
  { name: 'Mar', applications: 68, accepted: 35, rejected: 22 },
  { name: 'Apr', applications: 75, accepted: 40, rejected: 25 },
  { name: 'May', applications: 92, accepted: 48, rejected: 30 },
  { name: 'Jun', applications: 80, accepted: 42, rejected: 28 },
];

const StudentAdmissionsPageContent = () => {
  const { data: admissions = [], isLoading } = useQuery({
    queryKey: ['admissions'],
    queryFn: fetchAdmissions
  });


  const accepted = admissions.filter(a => a.status === 'accepted').length;
  const pending = admissions.filter(a => a.status === 'pending').length;
  const review = admissions.filter(a => a.status === 'review').length;
  const rejected = admissions.filter(a => a.status === 'rejected').length;

  return (
    // <DashboardLayout>
      <div className="p-6 space-y-6 animate-fade-in">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-slate-800">Student Admissions</h1>
            <p className="text-slate-500 mt-1">Manage and track student applications</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" className="flex items-center gap-2">
              <Download size={16} />
              Export
            </Button>
            <Button className="bg-primary-600 text-white hover:bg-primary-700 flex items-center gap-2">
              <Plus size={16} />
              New Application
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
          <AnalyticsCard title="Total Applications" className="bg-white shadow-sm">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                <FileCheck size={18} className="text-blue-600" />
              </div>
              <div className="flex flex-col">
                <span className="text-3xl font-semibold">{admissions.length}</span>
                <span className="text-slate-500 text-sm">Applications</span>
              </div>
            </div>
          </AnalyticsCard>
          
          <AnalyticsCard title="Accepted" className="bg-white shadow-sm">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                <UserPlus size={18} className="text-green-600" />
              </div>
              <div className="flex flex-col">
                <span className="text-3xl font-semibold">{accepted}</span>
                <span className="text-slate-500 text-sm">Students</span>
              </div>
            </div>
          </AnalyticsCard>
          
          <AnalyticsCard title="Pending" className="bg-white shadow-sm">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center">
                <Clock size={18} className="text-amber-600" />
              </div>
              <div className="flex flex-col">
                <span className="text-3xl font-semibold">{pending + review}</span>
                <span className="text-slate-500 text-sm">Applications</span>
              </div>
            </div>
          </AnalyticsCard>
          
          <AnalyticsCard title="Rejected" className="bg-white shadow-sm">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
                <Calendar size={18} className="text-red-600" />
              </div>
              <div className="flex flex-col">
                <span className="text-3xl font-semibold">{rejected}</span>
                <span className="text-slate-500 text-sm">Applications</span>
              </div>
            </div>
          </AnalyticsCard>
        </div>

        <AnalyticsCard title="Admission Trends" className="bg-white shadow-sm">
          <Chart 
            type="line"
            data={admissionTrendsData}
            xKey="name"
            keys={["applications", "accepted", "rejected"]}
            colors={["#3b82f6", "#10b981", "#ef4444"]}
            height={300}
            />
        </AnalyticsCard>

        <AnalyticsCard title="Applications" className="bg-white shadow-sm">
          <div className="mb-4 flex flex-col sm:flex-row gap-3 justify-between">
            <div className="relative max-w-md">
              <Input
                placeholder="Search applications..."
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
                  <TableHead>Email</TableHead>
                  <TableHead>Program</TableHead>
                  <TableHead>Submission Date</TableHead>
                  <TableHead>Interview Date</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center">
                      Loading applications...
                    </TableCell>
                  </TableRow>
                ) : admissions.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center">
                      No applications found
                    </TableCell>
                  </TableRow>
                ) : (
                  admissions.map(admission => (
                    <TableRow key={admission.id}>
                      <TableCell className="font-medium">{admission.name}</TableCell>
                      <TableCell>{admission.email}</TableCell>
                      <TableCell>{admission.program}</TableCell>
                      <TableCell>{admission.submissionDate}</TableCell>
                      <TableCell>{admission.interviewDate}</TableCell>
                      <TableCell>
                        <Badge
                          className={
                            admission.status === 'accepted'
                              ? 'bg-green-100 text-green-800 hover:bg-green-100'
                              : admission.status === 'pending'
                              ? 'bg-amber-100 text-amber-800 hover:bg-amber-100'
                              : admission.status === 'review'
                              ? 'bg-blue-100 text-blue-800 hover:bg-blue-100'
                              : 'bg-red-100 text-red-800 hover:bg-red-100'
                          }
                        >
                          {admission.status.charAt(0).toUpperCase() + admission.status.slice(1)}
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
// Wrap your content component with QueryClientProvider
const StudentAdmissionsPage = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <StudentAdmissionsPageContent />
    </QueryClientProvider>
  );
};

export default StudentAdmissionsPage;
