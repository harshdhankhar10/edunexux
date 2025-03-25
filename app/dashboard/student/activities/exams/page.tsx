"use client";

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { 
  CalendarDays, CheckSquare, Clock, Eye, FileText, Filter, 
  Search, AlertCircle, BookOpen, BarChart4, ChevronRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from 'recharts';
import { cn } from '@/lib/utils';

const ExamsPage = () => {
  const [activeTab, setActiveTab] = useState("upcoming");
  const [searchQuery, setSearchQuery] = useState('');
  const [filterDate, setFilterDate] = useState('');

  // Sample data for upcoming exams
  const upcomingExams = [
    {
      id: 1,
      subject: 'Advanced Mathematics',
      date: '2023-10-15',
      time: '09:00 AM - 11:00 AM',
      duration: '2 hours',
      location: 'Hall A',
      type: 'Mid-term',
      status: 'upcoming',
      teacher: 'Dr. Robert Chen'
    },
    {
      id: 2,
      subject: 'Physics',
      date: '2023-10-18',
      time: '10:30 AM - 12:30 PM',
      duration: '2 hours',
      location: 'Science Block',
      type: 'Quiz',
      status: 'upcoming',
      teacher: 'Prof. Lisa Wang'
    },
    {
      id: 3,
      subject: 'Literature',
      date: '2023-10-22',
      time: '01:00 PM - 03:00 PM',
      duration: '2 hours',
      location: 'Main Hall',
      type: 'Mid-term',
      status: 'upcoming',
      teacher: 'Ms. Emily Brooks'
    }
  ];
  
  // Sample data for past exams
  const pastExams = [
    {
      id: 4,
      subject: 'Computer Science',
      date: '2023-09-28',
      score: 92,
      maxScore: 100,
      grade: 'A',
      feedback: 'Excellent work on programming concepts',
      teacher: 'Mr. Jason Lee'
    },
    {
      id: 5,
      subject: 'Chemistry',
      date: '2023-09-20',
      score: 85,
      maxScore: 100,
      grade: 'B+',
      feedback: 'Good understanding of organic chemistry',
      teacher: 'Dr. Amanda Garcia'
    },
    {
      id: 6,
      subject: 'Mathematics',
      date: '2023-09-15',
      score: 78,
      maxScore: 100,
      grade: 'B',
      feedback: 'Need to work on calculus problems',
      teacher: 'Prof. Michael Brown'
    },
    {
      id: 7,
      subject: 'History',
      date: '2023-09-10',
      score: 90,
      maxScore: 100,
      grade: 'A-',
      feedback: 'Excellent analysis of historical events',
      teacher: 'Ms. Sarah Johnson'
    }
  ];
  
  // Performance data for chart
  const performanceData = [
    { subject: 'Math', score: 78, average: 72 },
    { subject: 'Physics', score: 85, average: 68 },
    { subject: 'Chemistry', score: 85, average: 75 },
    { subject: 'Literature', score: 90, average: 82 },
    { subject: 'CompSci', score: 92, average: 80 },
    { subject: 'History', score: 90, average: 78 }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 p-8">
      <div className="pt-24 container mx-auto">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold">Exams & Assessments</h1>
            <p className="text-gray-600 mt-1">Manage your exams, assessments, and performance</p>
          </div>
          <div className="mt-4 md:mt-0 flex gap-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
              <input
                type="text"
                placeholder="Search exams..."
                className="pl-9 pr-4 py-2 rounded-md border border-gray-200 w-full md:w-64 focus:outline-none focus:ring-2 focus:ring-primary"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="animate-fade-in">
            <CardContent className="flex flex-col items-center justify-center p-6">
              <div className="bg-blue-100 rounded-full p-3 mb-4">
                <CalendarDays className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-center">3</h3>
              <p className="text-gray-600 text-center">Upcoming Exams</p>
            </CardContent>
          </Card>
          
          <Card className="animate-fade-in delay-100">
            <CardContent className="flex flex-col items-center justify-center p-6">
              <div className="bg-green-100 rounded-full p-3 mb-4">
                <CheckSquare className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-center">85%</h3>
              <p className="text-gray-600 text-center">Average Score</p>
            </CardContent>
          </Card>
          
          <Card className="animate-fade-in delay-200">
            <CardContent className="flex flex-col items-center justify-center p-6">
              <div className="bg-purple-100 rounded-full p-3 mb-4">
                <BookOpen className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold text-center">12</h3>
              <p className="text-gray-600 text-center">Total Assessments</p>
            </CardContent>
          </Card>
        </div>
        
        <Tabs defaultValue="upcoming" className="mb-8" onValueChange={setActiveTab}>
          <TabsList className="mb-6 text-gray-500 h-10 p-1 bg-gray-200">
            <TabsTrigger value="upcoming">Upcoming Exams</TabsTrigger>
            <TabsTrigger value="past">Past Results</TabsTrigger>
            <TabsTrigger value="performance">Performance Analysis</TabsTrigger>
          </TabsList>
          
          <TabsContent value="upcoming">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {upcomingExams.map((exam) => (
                <Card key={exam.id} className="animate-fade-in hover:shadow-md transition-shadow">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle>{exam.subject}</CardTitle>
                        <CardDescription>{exam.type}</CardDescription>
                      </div>
                      <Button variant="ghost" size="icon">
                        <Eye className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center text-sm">
                        <CalendarDays className="h-4 w-4 mr-2 text-gray-500" />
                        <span>{new Date(exam.date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
                      </div>
                      <div className="flex items-center text-sm">
                        <Clock className="h-4 w-4 mr-2 text-gray-500" />
                        <span>{exam.time} ({exam.duration})</span>
                      </div>
                      <div className="flex items-center text-sm">
                        <FileText className="h-4 w-4 mr-2 text-gray-500" />
                        <span>Location: {exam.location}</span>
                      </div>
                      <div className="flex items-center text-sm">
                        <BookOpen className="h-4 w-4 mr-2 text-gray-500" />
                        <span>Instructor: {exam.teacher}</span>
                      </div>
                      <div className="pt-2 flex justify-between">
                        <Button variant="outline" size="sm">Study Materials</Button>
                        <Button size="sm" className='bg-blue-500 hover:bg-blue-600 cursor-pointer'>Prepare</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="past">
            <div className="space-y-4">
              {pastExams.map((exam) => (
                <Card key={exam.id} className="animate-fade-in hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row md:items-center justify-between">
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold">{exam.subject}</h3>
                        <p className="text-sm text-gray-600">
                          {new Date(exam.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                        </p>
                        <p className="text-sm text-gray-600 mt-1">Instructor: {exam.teacher}</p>
                      </div>
                      
                      <div className="flex-1 mt-4 md:mt-0 md:text-center">
                        <div className="inline-flex items-center">
                          <div className={cn(
                            "flex items-center justify-center w-12 h-12 rounded-full text-white font-bold",
                            exam.grade === 'A' || exam.grade === 'A-' ? "bg-green-500" :
                            exam.grade.startsWith('B') ? "bg-blue-500" :
                            exam.grade.startsWith('C') ? "bg-yellow-500" : "bg-red-500"
                          )}>
                            {exam.grade}
                          </div>
                          <div className="ml-4 text-left">
                            <p className="font-semibold">{exam.score}/{exam.maxScore}</p>
                            <p className="text-sm text-gray-600">{Math.round((exam.score / exam.maxScore) * 100)}%</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex-1 mt-4 md:mt-0">
                        <p className="text-sm">
                          <span className="font-medium">Feedback: </span>
                          {exam.feedback}
                        </p>
                        <div className="mt-2 flex justify-end">
                          <Button variant="outline" size="sm" className="mr-2">
                            <FileText className="h-3.5 w-3.5 mr-1" />
                            View Paper
                          </Button>
                          <Button size="sm" className='bg-blue-500 hover:bg-blue-600 cursor-pointer'>
                            <BarChart4 className="h-3.5 w-3.5 mr-1"  />
                            Analysis
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="performance">
            <Card className="animate-fade-in">
              <CardHeader>
                <CardTitle>Performance Comparison</CardTitle>
                <CardDescription>Your scores compared to class average</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[400px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={performanceData}
                      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="subject" />
                      <YAxis domain={[0, 100]} />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="score" name="Your Score" fill="#3B82F6" radius={[4, 4, 0, 0]} />
                      <Bar dataKey="average" name="Class Average" fill="#94A3B8" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="animate-fade-in delay-100">
                <CardHeader>
                  <CardTitle className="text-lg">Improvement Areas</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded">
                      <div className="flex">
                        <AlertCircle className="h-5 w-5 text-yellow-600 mr-2 flex-shrink-0" />
                        <div>
                          <p className="font-medium text-yellow-700">Physics - Thermodynamics</p>
                          <p className="text-sm text-yellow-600">Focus on improving problem-solving in heat transfer concepts</p>
                        </div>
                      </div>
                    </div>
                    <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded">
                      <div className="flex">
                        <AlertCircle className="h-5 w-5 text-yellow-600 mr-2 flex-shrink-0" />
                        <div>
                          <p className="font-medium text-yellow-700">Mathematics - Calculus</p>
                          <p className="text-sm text-yellow-600">Work on integration techniques and applications</p>
                        </div>
                      </div>
                    </div>
                    <Button variant="outline" className="w-full">View Study Recommendations</Button>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="animate-fade-in delay-200">
                <CardHeader>
                  <CardTitle className="text-lg">Strong Subjects</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {[
                      { subject: 'Computer Science', score: 92, description: 'Excellent understanding of algorithms' },
                      { subject: 'Literature', score: 90, description: 'Strong analytical writing skills' },
                    ].map((item, index) => (
                      <div key={index} className="flex items-center justify-between p-3 rounded-lg border border-gray-100 hover:bg-gray-50 transition-colors">
                        <div>
                          <p className="font-medium">{item.subject}</p>
                          <p className="text-sm text-gray-600">{item.description}</p>
                        </div>
                        <div className="flex items-center">
                          <span className="text-lg font-bold mr-2">{item.score}%</span>
                          <ChevronRight className="h-4 w-4 text-gray-400" />
                        </div>
                      </div>
                    ))}
                    <Button variant="outline" className="w-full">Explore Advanced Topics</Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
        
        <Card className="animate-fade-in">
          <CardHeader>
            <CardTitle>Study Resources</CardTitle>
            <CardDescription>Recommended resources for your upcoming exams</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {[
                { title: 'Mathematics Formulas', type: 'PDF', size: '2.4 MB' },
                { title: 'Physics Problem Set', type: 'Document', size: '1.8 MB' },
                { title: 'Literature Study Guide', type: 'PDF', size: '3.1 MB' },
                { title: 'Past Exam Papers', type: 'ZIP', size: '8.6 MB' },
              ].map((resource, index) => (
                <div key={index} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors cursor-pointer">
                  <FileText className="h-8 w-8 text-blue-500 mb-2" />
                  <p className="font-medium">{resource.title}</p>
                  <div className="flex justify-between mt-2 text-xs text-gray-500">
                    <span>{resource.type}</span>
                    <span>{resource.size}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ExamsPage;