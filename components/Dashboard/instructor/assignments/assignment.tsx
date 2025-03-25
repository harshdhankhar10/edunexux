"use client";
import React from 'react';
import { Check, Clock, File, FileText, Filter, Search, SortDesc } from 'lucide-react';
// import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

// Mock data for assignments
const assignments = [
  {
    id: 'a1',
    title: 'Programming Fundamentals',
    course: 'CS 101',
    dueDate: 'Oct 15, 2023',
    status: 'active',
    submissions: 28,
    totalStudents: 42,
    type: 'Individual'
  },
  {
    id: 'a2',
    title: 'Data Structures Implementation',
    course: 'CS 230',
    dueDate: 'Oct 20, 2023',
    status: 'active',
    submissions: 15,
    totalStudents: 38,
    type: 'Group'
  },
  {
    id: 'a3',
    title: 'Machine Learning Models',
    course: 'CS 450',
    dueDate: 'Oct 25, 2023',
    status: 'active',
    submissions: 10,
    totalStudents: 35,
    type: 'Individual'
  },
  {
    id: 'a4',
    title: 'Web Development Project',
    course: 'CS 375',
    dueDate: 'Nov 1, 2023',
    status: 'upcoming',
    submissions: 0,
    totalStudents: 40,
    type: 'Group'
  },
  {
    id: 'a5',
    title: 'Python Functions Homework',
    course: 'CS 101',
    dueDate: 'Oct 5, 2023',
    status: 'completed',
    submissions: 40,
    totalStudents: 42,
    type: 'Individual'
  },
  {
    id: 'a6',
    title: 'Algorithm Analysis',
    course: 'CS 230',
    dueDate: 'Oct 3, 2023',
    status: 'completed',
    submissions: 36,
    totalStudents: 38,
    type: 'Individual'
  }
];

const AssignmentsPage = () => {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* <Header /> */}
      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Assignments</h1>
            <p className="text-slate-600 mt-1">Manage and track student assignments</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <Button variant="outline" size="sm" className="gap-2">
              <Filter className="h-4 w-4" />
              Filter
            </Button>
            <Button variant="outline" size="sm" className="gap-2">
              <SortDesc className="h-4 w-4" />
              Sort
            </Button>
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search assignments..." className="pl-8 w-full md:w-[250px]" />
            </div>
            <Button asChild>
              <a href="/assignments/create">
                <FileText className="mr-2 h-4 w-4" />
                Create Assignment
              </a>
            </Button>
          </div>
        </div>

        <Tabs defaultValue="active" className="mb-8">
          <TabsList>
            <TabsTrigger value="active">Active</TabsTrigger>
            <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
            <TabsTrigger value="all">All Assignments</TabsTrigger>
          </TabsList>
          
          {["active", "upcoming", "completed", "all"].map((tab) => (
            <TabsContent key={tab} value={tab}>
              <div className="grid gap-4 grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
                {assignments
                  .filter(a => tab === "all" ? true : a.status === tab)
                  .map((assignment) => (
                    <Card key={assignment.id} className="overflow-hidden hover:shadow-md transition-shadow">
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-start">
                          <Badge variant={assignment.status === 'active' ? 'default' : 
                                        assignment.status === 'upcoming' ? 'secondary' : 'outline'}>
                            {assignment.status.charAt(0).toUpperCase() + assignment.status.slice(1)}
                          </Badge>
                          <Badge variant="outline">{assignment.type}</Badge>
                        </div>
                        <CardTitle className="text-lg mt-2">{assignment.title}</CardTitle>
                        <CardDescription className="flex items-center">
                          <span className="font-medium text-primary">{assignment.course}</span>
                          <span className="mx-2">•</span>
                          <span className="flex items-center">
                            <Clock className="h-3 w-3 mr-1" />
                            Due: {assignment.dueDate}
                          </span>
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div>
                            <div className="flex justify-between items-center text-sm mb-1">
                              <span className="text-muted-foreground">Submissions</span>
                              <span className="font-medium">{assignment.submissions} / {assignment.totalStudents}</span>
                            </div>
                            <Progress 
                              value={(assignment.submissions / assignment.totalStudents) * 100} 
                              className="h-2" 
                            />
                          </div>
                          <div className="flex justify-between">
                            <Button variant="outline" size="sm" asChild>
                              <a href={`/assignments/${assignment.id}`}>
                                <File className="mr-2 h-4 w-4" />
                                View Details
                              </a>
                            </Button>
                            <Button size="sm" variant="secondary" asChild>
                              <a href={`/assignments/grade?id=${assignment.id}`}>
                                <Check className="mr-2 h-4 w-4" />
                                Grade
                              </a>
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </main>
    </div>
  );
};

export default AssignmentsPage;
