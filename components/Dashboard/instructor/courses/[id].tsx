"use client"
import React from 'react';
import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowLeft, BookOpen, Users, Clock, MapPin, Calendar, FileText, BarChart2, MessageSquare } from 'lucide-react';
import { currentClasses } from '@/components/Dashboard/instructor/data/mockData';
// import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';

const CourseDetailsPage = () => {
  const { id } = useParams();
  
  // Find the course from mock data
  const course = currentClasses.find(course => course.id === id);
  
  if (!course) {
    return (
      <div className="min-h-screen bg-slate-50">
        {/* <Header /> */}
        <main className="container mx-auto px-4 py-8">
          <div className="flex items-center mb-8">
            <Link href="/courses">
              <Button variant="outline" size="sm" className="mr-4">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Courses
              </Button>
            </Link>
            <h1 className="text-3xl font-bold text-slate-900">Course Not Found</h1>
          </div>
          <Card>
            <CardContent className="py-8">
              <p className="text-center text-muted-foreground">The course you're looking for doesn't exist or has been removed.</p>
            </CardContent>
          </Card>
        </main>
      </div>
    );
  }

  // Mock data for the course details page
  const mockAnnouncements = [
    { id: 'a1', title: 'Midterm Exam Schedule', date: '2 days ago', content: 'The midterm exam will be held on October 15th from 10:00 AM to 12:00 PM in Room 302.' },
    { id: 'a2', title: 'Assignment #3 Extended', date: '1 week ago', content: 'Due to multiple requests, the deadline for Assignment #3 has been extended to October 20th.' },
  ];

  const mockAssignments = [
    { id: 'as1', title: 'Assignment #4: Data Structures', dueDate: 'Oct 25, 2023', status: 'active', submissions: 14, totalStudents: course.students },
    { id: 'as2', title: 'Assignment #3: Algorithms', dueDate: 'Oct 10, 2023', status: 'completed', submissions: 36, totalStudents: course.students },
    { id: 'as3', title: 'Assignment #2: Basic Syntax', dueDate: 'Sep 25, 2023', status: 'completed', submissions: 42, totalStudents: course.students },
  ];

  const mockStudents = Array(course.students).fill(0).map((_, index) => ({
    id: `st${index + 1}`,
    name: `Student ${index + 1}`,
    email: `student${index + 1}@university.edu`,
    attendance: Math.floor(Math.random() * 30) + 70,
    avgGrade: Math.floor(Math.random() * 30) + 70,
    lastActive: index < 5 ? 'Today' : index < 10 ? 'Yesterday' : 'Last week'
  }));

  const mockSchedule = [
    { day: 'Monday', startTime: '10:00 AM', endTime: '11:30 AM', room: course.room, type: 'Lecture' },
    { day: 'Wednesday', startTime: '10:00 AM', endTime: '11:30 AM', room: course.room, type: 'Lecture' },
    { day: 'Friday', startTime: '2:00 PM', endTime: '3:30 PM', room: 'Lab 201', type: 'Lab' },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      {/* <Header /> */}
      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <div className="flex items-center">
            <Link href="/courses">
              <Button variant="outline" size="sm" className="mr-4">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Courses
              </Button>
            </Link>
            <div>
              <div className="flex items-center">
                <h1 className="text-3xl font-bold text-slate-900">  {course?.courseName || "Loading..."}</h1>
                <Badge className="ml-3" variant="outline">{course.courseCode}</Badge>
              </div>
              <p className="text-slate-600 mt-1">Course details and management</p>
            </div>
          </div>
          <div className="flex gap-3">
            <Button variant="outline">
              <MessageSquare className="mr-2 h-4 w-4" />
              Send Announcement
            </Button>
            <Button>
              <FileText className="mr-2 h-4 w-4" />
              Add Material
            </Button>
          </div>
        </div>

        {/* Course overview card */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center">
              <BookOpen className="mr-2 h-5 w-5 text-primary" />
              Course Overview
            </CardTitle>
            <CardDescription>Key information about this course</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="p-4 rounded-lg border bg-card">
                <div className="text-muted-foreground text-sm mb-2">Students Enrolled</div>
                <div className="flex items-center">
                  <Users className="h-5 w-5 mr-2 text-primary" />
                  <span className="text-2xl font-bold">{course.students}</span>
                </div>
              </div>
              
              <div className="p-4 rounded-lg border bg-card">
                <div className="text-muted-foreground text-sm mb-2">Next Class</div>
                <div className="flex items-center">
                  <Clock className="h-5 w-5 mr-2 text-primary" />
                  <span className="text-lg font-medium">{course.nextClass}</span>
                </div>
              </div>
              
              <div className="p-4 rounded-lg border bg-card">
                <div className="text-muted-foreground text-sm mb-2">Location</div>
                <div className="flex items-center">
                  <MapPin className="h-5 w-5 mr-2 text-primary" />
                  <span className="text-lg font-medium">{course.room}</span>
                </div>
              </div>
              
              <div className="p-4 rounded-lg border bg-card">
                <div className="text-muted-foreground text-sm mb-2">Course Progress</div>
                <div className="mb-2">
                  <span className="text-lg font-medium">{course.progress}%</span>
                </div>
                <Progress value={course.progress} className="h-2" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tabs for different course sections */}
        <Tabs defaultValue="announcements" className="mb-8">
          <TabsList className="mb-4">
            <TabsTrigger value="announcements">Announcements</TabsTrigger>
            <TabsTrigger value="assignments">Assignments</TabsTrigger>
            <TabsTrigger value="students">Students</TabsTrigger>
            <TabsTrigger value="schedule">Schedule</TabsTrigger>
            <TabsTrigger value="materials">Materials</TabsTrigger>
            <TabsTrigger value="grades">Grades</TabsTrigger>
          </TabsList>
          
          <TabsContent value="announcements">
            <Card>
              <CardHeader>
                <CardTitle>Announcements</CardTitle>
                <CardDescription>Recent announcements for this course</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockAnnouncements.map(announcement => (
                    <div key={announcement.id} className="p-4 border rounded-lg">
                      <div className="flex justify-between mb-2">
                        <h3 className="font-semibold">{announcement.title}</h3>
                        <span className="text-sm text-muted-foreground">{announcement.date}</span>
                      </div>
                      <p className="text-sm text-muted-foreground">{announcement.content}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">View All Announcements</Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="assignments">
            <Card>
              <CardHeader>
                <CardTitle>Assignments</CardTitle>
                <CardDescription>Manage course assignments</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockAssignments.map(assignment => (
                    <div key={assignment.id} className="p-4 border rounded-lg">
                      <div className="flex justify-between mb-2">
                        <div>
                          <h3 className="font-semibold">{assignment.title}</h3>
                          <p className="text-sm text-muted-foreground">Due: {assignment.dueDate}</p>
                        </div>
                        <Badge variant={assignment.status === 'active' ? 'default' : 'outline'}>
                          {assignment.status.charAt(0).toUpperCase() + assignment.status.slice(1)}
                        </Badge>
                      </div>
                      <div className="mt-2">
                        <div className="flex justify-between items-center text-sm mb-1">
                          <span className="text-muted-foreground">Submissions</span>
                          <span className="font-medium">{assignment.submissions} / {assignment.totalStudents}</span>
                        </div>
                        <Progress value={(assignment.submissions / assignment.totalStudents) * 100} className="h-2" />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">View All Assignments</Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="students">
            <Card>
              <CardHeader>
                <CardTitle>Students</CardTitle>
                <CardDescription>Students enrolled in this course</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <table className="min-w-full divide-y divide-border">
                    <thead>
                      <tr className="bg-muted/50">
                        <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Name</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Email</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Attendance</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Avg. Grade</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Last Active</th>
                      </tr>
                    </thead>
                    <tbody className="bg-card divide-y divide-border">
                      {mockStudents.slice(0, 5).map(student => (
                        <tr key={student.id}>
                          <td className="px-4 py-3 whitespace-nowrap">{student.name}</td>
                          <td className="px-4 py-3 whitespace-nowrap">{student.email}</td>
                          <td className="px-4 py-3 whitespace-nowrap">{student.attendance}%</td>
                          <td className="px-4 py-3 whitespace-nowrap">{student.avgGrade}/100</td>
                          <td className="px-4 py-3 whitespace-nowrap">{student.lastActive}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">View All Students</Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="schedule">
            <Card>
              <CardHeader>
                <CardTitle>Weekly Schedule</CardTitle>
                <CardDescription>Course meeting times and locations</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <table className="min-w-full divide-y divide-border">
                    <thead>
                      <tr className="bg-muted/50">
                        <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Day</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Time</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Room</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Type</th>
                      </tr>
                    </thead>
                    <tbody className="bg-card divide-y divide-border">
                      {mockSchedule.map((session, index) => (
                        <tr key={index}>
                          <td className="px-4 py-3 whitespace-nowrap">{session.day}</td>
                          <td className="px-4 py-3 whitespace-nowrap">{session.startTime} - {session.endTime}</td>
                          <td className="px-4 py-3 whitespace-nowrap">{session.room}</td>
                          <td className="px-4 py-3 whitespace-nowrap">
                            <Badge variant="outline">{session.type}</Badge>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="materials">
            <Card>
              <CardHeader>
                <CardTitle>Course Materials</CardTitle>
                <CardDescription>Lectures, notes, and resources</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 border rounded-lg">
                    <h3 className="font-semibold mb-2">Module 1: Introduction</h3>
                    <div className="space-y-2">
                      <div className="flex items-center p-2 border rounded bg-muted/30">
                        <FileText className="h-4 w-4 mr-2" />
                        <span>Lecture Slides - Introduction.pdf</span>
                      </div>
                      <div className="flex items-center p-2 border rounded bg-muted/30">
                        <FileText className="h-4 w-4 mr-2" />
                        <span>Week 1 Notes.pdf</span>
                      </div>
                    </div>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <h3 className="font-semibold mb-2">Module 2: Core Concepts</h3>
                    <div className="space-y-2">
                      <div className="flex items-center p-2 border rounded bg-muted/30">
                        <FileText className="h-4 w-4 mr-2" />
                        <span>Lecture Slides - Core Concepts.pdf</span>
                      </div>
                      <div className="flex items-center p-2 border rounded bg-muted/30">
                        <FileText className="h-4 w-4 mr-2" />
                        <span>Week 2 Notes.pdf</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">View All Materials</Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="grades">
            <Card>
              <CardHeader>
                <CardTitle>Grade Distribution</CardTitle>
                <CardDescription>Overview of student performance</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-center justify-center">
                  <div className="text-center text-muted-foreground">
                    <BarChart2 className="h-12 w-12 mx-auto mb-2 text-primary" />
                    <p>Grade visualization charts will appear here</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default CourseDetailsPage;
