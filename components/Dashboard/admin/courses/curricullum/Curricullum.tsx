"use client"
import React from 'react';
import { useQuery,QueryClient,QueryClientProvider } from '@tanstack/react-query';
import { PlusCircle, Filter, Download, FileText, Book, GraduationCap } from 'lucide-react';
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

// Mock data for curriculum
const fetchCurriculumData = async () => {
  // In a real application, this would fetch from an API
  return {
    subjects: [
      {
        id: 1,
        name: 'Computer Science',
        totalModules: 24,
        progress: 80,
        lastUpdated: '2023-10-15',
        status: 'active'
      },
      {
        id: 2,
        name: 'Mathematics',
        totalModules: 18,
        progress: 65,
        lastUpdated: '2023-09-28',
        status: 'active'
      },
      {
        id: 3,
        name: 'Biology',
        totalModules: 20,
        progress: 70,
        lastUpdated: '2023-10-05',
        status: 'active'
      },
      {
        id: 4,
        name: 'Chemistry',
        totalModules: 16,
        progress: 90,
        lastUpdated: '2023-10-12',
        status: 'active'
      },
      {
        id: 5,
        name: 'Physics',
        totalModules: 22,
        progress: 75,
        lastUpdated: '2023-10-08',
        status: 'active'
      },
      {
        id: 6,
        name: 'English Literature',
        totalModules: 15,
        progress: 60,
        lastUpdated: '2023-09-20',
        status: 'review'
      }
    ],
    modules: [
      {
        id: 101,
        name: 'Data Structures',
        subject: 'Computer Science',
        duration: '6 weeks',
        resources: 12,
        assessments: 5
      },
      {
        id: 102,
        name: 'Linear Algebra',
        subject: 'Mathematics',
        duration: '5 weeks',
        resources: 8,
        assessments: 4
      },
      {
        id: 103,
        name: 'Cell Biology',
        subject: 'Biology',
        duration: '4 weeks',
        resources: 10,
        assessments: 3
      },
      {
        id: 104,
        name: 'Organic Chemistry',
        subject: 'Chemistry',
        duration: '7 weeks',
        resources: 15,
        assessments: 6
      }
    ]
  };
};

const CurriculumPageContent = () => {
  const { data, isLoading } = useQuery({
    queryKey: ['curriculum'],
    queryFn: fetchCurriculumData
  });

  const subjects = data?.subjects || [];
  const modules = data?.modules || [];

  return (
    // <DashboardLayout>
      <div className="p-6 space-y-6 animate-fade-in">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-slate-800">Curriculum Management</h1>
            <p className="text-slate-500 mt-1">Design and manage academic curriculum structure</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" className="flex items-center gap-2">
              <Download size={16} />
              Export
            </Button>
            <Button className="bg-primary-600 text-white hover:bg-primary-700 flex items-center gap-2">
              <PlusCircle size={16} />
              Add Subject
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="bg-primary-100 p-3 rounded-full">
                  <Book className="h-6 w-6 text-primary-600" />
                </div>
                <div>
                  <p className="text-slate-500 text-sm">Total Subjects</p>
                  <h3 className="text-2xl font-semibold text-slate-800">{subjects.length}</h3>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="bg-amber-100 p-3 rounded-full">
                  <FileText className="h-6 w-6 text-amber-600" />
                </div>
                <div>
                  <p className="text-slate-500 text-sm">Total Modules</p>
                  <h3 className="text-2xl font-semibold text-slate-800">
                    {subjects.reduce((sum, subject) => sum + subject.totalModules, 0)}
                  </h3>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="bg-green-100 p-3 rounded-full">
                  <GraduationCap className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <p className="text-slate-500 text-sm">Avg. Completion</p>
                  <h3 className="text-2xl font-semibold text-slate-800">
                    {subjects.length > 0
                      ? Math.round(
                          subjects.reduce((sum, subject) => sum + subject.progress, 0) /
                            subjects.length
                        )
                      : 0}
                    %
                  </h3>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <AnalyticsCard title="Curriculum Subjects" className="bg-white shadow-sm">
          <div className="mb-4 flex flex-col sm:flex-row gap-3 justify-between">
            <div className="relative max-w-md">
              <Input
                placeholder="Search subjects..."
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
                  <TableHead>Subject</TableHead>
                  <TableHead>Total Modules</TableHead>
                  <TableHead>Completion</TableHead>
                  <TableHead>Last Updated</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center">
                      Loading curriculum data...
                    </TableCell>
                  </TableRow>
                ) : subjects.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center">
                      No subjects found
                    </TableCell>
                  </TableRow>
                ) : (
                  subjects.map(subject => (
                    <TableRow key={subject.id}>
                      <TableCell className="font-medium">{subject.name}</TableCell>
                      <TableCell>{subject.totalModules}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <div className="w-full bg-slate-200 rounded-full h-2.5">
                            <div
                              className="bg-primary-600 h-2.5 rounded-full"
                              style={{ width: `${subject.progress}%` }}
                            ></div>
                          </div>
                          <span>{subject.progress}%</span>
                        </div>
                      </TableCell>
                      <TableCell>{subject.lastUpdated}</TableCell>
                      <TableCell>
                        <Badge
                          className={
                            subject.status === 'active'
                              ? 'bg-green-100 text-green-800 hover:bg-green-100'
                              : 'bg-amber-100 text-amber-800 hover:bg-amber-100'
                          }
                        >
                          {subject.status === 'active' ? 'Active' : 'Under Review'}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </AnalyticsCard>

        <AnalyticsCard title="Recent Modules" className="bg-white shadow-sm">
          <div className="overflow-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Module Name</TableHead>
                  <TableHead>Subject</TableHead>
                  <TableHead>Duration</TableHead>
                  <TableHead>Resources</TableHead>
                  <TableHead>Assessments</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center">
                      Loading module data...
                    </TableCell>
                  </TableRow>
                ) : modules.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center">
                      No modules found
                    </TableCell>
                  </TableRow>
                ) : (
                  modules.map(module => (
                    <TableRow key={module.id}>
                      <TableCell className="font-medium">{module.name}</TableCell>
                      <TableCell>{module.subject}</TableCell>
                      <TableCell>{module.duration}</TableCell>
                      <TableCell>{module.resources}</TableCell>
                      <TableCell>{module.assessments}</TableCell>
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

const CurriculumPage = () => {
  return(

  <QueryClientProvider client={queryClient}>
    <CurriculumPageContent />
  </QueryClientProvider>
  )
}

export default CurriculumPage;
