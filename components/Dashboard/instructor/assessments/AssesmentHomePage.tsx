
import React from 'react';
import { AlertCircle, BookOpen, Clock, Edit, Eye, Filter, ListChecks, PenTool, Plus, Search, SortDesc } from 'lucide-react';
// import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

// Mock assessments data
const assessments = [
  {
    id: 'ex1',
    title: 'Midterm Exam',
    course: 'CS 101',
    courseFullName: 'Introduction to Programming',
    date: 'Oct 25, 2023',
    time: '10:00 AM - 12:00 PM',
    status: 'upcoming',
    totalStudents: 42,
    totalQuestions: 40,
    duration: '120 minutes',
    type: 'exam'
  },
  {
    id: 'ex2',
    title: 'Data Structures Quiz',
    course: 'CS 230',
    courseFullName: 'Data Structures & Algorithms',
    date: 'Oct 18, 2023',
    time: '2:00 PM - 2:45 PM',
    status: 'upcoming',
    totalStudents: 38,
    totalQuestions: 20,
    duration: '45 minutes',
    type: 'quiz'
  },
  {
    id: 'ex3',
    title: 'Machine Learning Concepts Test',
    course: 'CS 450',
    courseFullName: 'Machine Learning Fundamentals',
    date: 'Nov 5, 2023',
    time: '3:30 PM - 5:00 PM',
    status: 'planned',
    totalStudents: 35,
    totalQuestions: 30,
    duration: '90 minutes',
    type: 'test'
  },
  {
    id: 'ex4',
    title: 'Python Fundamentals Quiz',
    course: 'CS 101',
    courseFullName: 'Introduction to Programming',
    date: 'Oct 2, 2023',
    time: '10:00 AM - 10:30 AM',
    status: 'completed',
    totalStudents: 42,
    totalQuestions: 15,
    duration: '30 minutes',
    completedGrading: true,
    avgScore: 84,
    type: 'quiz'
  },
  {
    id: 'ex5',
    title: 'Web Development Practical Test',
    course: 'CS 375',
    courseFullName: 'Web Application Development',
    date: 'Oct 5, 2023',
    time: '1:00 PM - 3:00 PM',
    status: 'completed',
    totalStudents: 40,
    totalQuestions: 5,
    duration: '120 minutes',
    completedGrading: true,
    avgScore: 78,
    type: 'lab'
  }
];

const AssessmentsPage = () => {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* <Header /> */}
      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Assessments</h1>
            <p className="text-slate-600 mt-1">Manage exams, quizzes, and other assessments</p>
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
              <Input placeholder="Search assessments..." className="pl-8 w-full md:w-[250px]" />
            </div>
            <Button asChild>
              <a href="/assessments/create">
                <Plus className="mr-2 h-4 w-4" />
                Create Assessment
              </a>
            </Button>
          </div>
        </div>

        <Tabs defaultValue="upcoming" className="mb-8">
          <TabsList>
            <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
            <TabsTrigger value="planned">Planned</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
            <TabsTrigger value="all">All Assessments</TabsTrigger>
          </TabsList>
          
          {["upcoming", "planned", "completed", "all"].map((tab) => (
            <TabsContent key={tab} value={tab}>
              <div className="grid gap-4 grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
                {assessments
                  .filter(a => tab === "all" ? true : a.status === tab)
                  .map((assessment) => (
                    <Card key={assessment.id} className="overflow-hidden hover:shadow-md transition-shadow">
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-start">
                          <Badge variant={
                            assessment.status === 'upcoming' ? 'default' : 
                            assessment.status === 'planned' ? 'secondary' : 'outline'
                          }>
                            {assessment.status.charAt(0).toUpperCase() + assessment.status.slice(1)}
                          </Badge>
                          <Badge variant="outline">{assessment.type.charAt(0).toUpperCase() + assessment.type.slice(1)}</Badge>
                        </div>
                        <CardTitle className="text-lg mt-2">{assessment.title}</CardTitle>
                        <CardDescription className="flex items-center">
                          <span className="font-medium text-primary">{assessment.course}</span>
                          <span className="mx-2">•</span>
                          <span>{assessment.courseFullName}</span>
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="grid grid-cols-2 gap-2 text-sm">
                            <div className="flex items-center">
                              <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                              <span>{assessment.date}</span>
                            </div>
                            <div className="flex items-center">
                              <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                              <span>{assessment.time}</span>
                            </div>
                            <div className="flex items-center">
                              <BookOpen className="h-4 w-4 mr-2 text-muted-foreground" />
                              <span>{assessment.totalQuestions} questions</span>
                            </div>
                            <div className="flex items-center">
                              <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                              <span>{assessment.duration}</span>
                            </div>
                          </div>
                          
                          {assessment.status === 'completed' && assessment.completedGrading && (
                            <div className="pt-2">
                              <div className="flex justify-between items-center text-sm mb-1">
                                <span className="text-muted-foreground">Average Score</span>
                                <span className="font-medium">{assessment.avgScore}/100</span>
                              </div>
                              <Progress 
                                value={assessment.avgScore} 
                                className="h-2" 
                              />
                            </div>
                          )}
                          
                          <div className="flex justify-between pt-2">
                            {assessment.status === 'completed' ? (
                              <>
                                <Button variant="outline" size="sm" asChild>
                                  <a href={`/assessments/${assessment.id}`}>
                                    <Eye className="mr-2 h-4 w-4" />
                                    View Results
                                  </a>
                                </Button>
                                <Button size="sm" variant="secondary" asChild>
                                  <a href={`/assessments/grades?id=${assessment.id}`}>
                                    <PenTool className="mr-2 h-4 w-4" />
                                    Grade
                                  </a>
                                </Button>
                              </>
                            ) : (
                              <>
                                <Button variant="outline" size="sm" asChild>
                                  <a href={`/assessments/${assessment.id}`}>
                                    <Eye className="mr-2 h-4 w-4" />
                                    View Details
                                  </a>
                                </Button>
                                <Button size="sm" variant="secondary" asChild>
                                  <a href={`/assessments/edit?id=${assessment.id}`}>
                                    <Edit className="mr-2 h-4 w-4" />
                                    Edit
                                  </a>
                                </Button>
                              </>
                            )}
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

// Add the Calendar component because it's missing in the imports
const Calendar = (props:any) => {
  return <AlertCircle {...props} />;
};

export default AssessmentsPage;
