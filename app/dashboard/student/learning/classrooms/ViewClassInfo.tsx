"use client";

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  BookOpen,
  Calendar,
  Users,
  Clock,
  FileText,
  ClipboardList,
  AlertCircle,
  Video,
  Bookmark,
  ChevronDown,
  ChevronUp,
  Star,
  Mail,
  Download
} from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { format } from 'date-fns';
import { toast } from 'sonner';

interface SyllabusWeek {
  id: string;
  weekNumber: number;
  title: string;
  content: string | null;
  readings: string | null;
  assignments: string | null;
}

interface Syllabus {
  id: string;
  objectives: {
    id: string;
    description: string;
  }[];
  weeks: SyllabusWeek[];
  academicTerm: string;
  credits: number;
  gradingPolicy: string | null;
}

interface Meeting {
  id: string;
  title: string;
  description: string | null;
  startTime: Date;
  endTime: Date;
  zoomMeetingId: string;
}

interface Material {
  id: string;
  title: string;
  description: string | null;
  courseFiles: string[];
}

interface Assignment {
  id: string;
  title: string;
  dueDate: Date;
  totalPoints: number;
}

interface Exam {
  id: string;
  title: string;
  examDate: Date;
  totalPoints: number;
}

interface Announcement {
  id: string;
  title: string;
  content: string;
  createdAt: Date;
}

interface Instructor {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  profilePicture: string | null;
}

interface Enrollment {
  user: {
    id: string;
    firstName: string;
    lastName: string;
    profilePicture: string | null;
  };
}

interface Course {
  id: string;
  courseCode: string;
  courseName: string;
  description: string;
  department: string;
  level: string;
  status: string;
  coverImage: string | null;
  maximumStudents: number;
  startDate: Date;
  endDate: Date;
  instructor: Instructor;
  classTimings: {
    id: string;
    day: string;
    startTime: Date;
    endTime: Date;
  }[];
  materials: Material[];
  assignments: Assignment[];
  exams: Exam[];
  announcements: Announcement[];
  enrollments: Enrollment[];
  syllabus: Syllabus[];
  meetings: Meeting[];
}

export default function ViewClassInfo({ course }: { course: Course }) {
  const [activeTab, setActiveTab] = useState('overview');
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    syllabus: true,
    materials: false,
    schedule: true,
  });

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const downloadMaterial = (fileUrl: string) => {
    toast.info('Downloading file...');
    // In a real app, you would handle the file download here
    console.log('Downloading:', fileUrl);
  };

  const formatTime = (date: Date) => {
    return format(new Date(date), 'h:mm a');
  };

  const formatDate = (date: Date) => {
    return format(new Date(date), 'MMMM d, yyyy');
  };

  const formatDateTime = (date: Date) => {
    return format(new Date(date), 'MMMM d, yyyy h:mm a');
  };

  const getInitials = (firstName: string, lastName: string) => {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
  };

  const handleStartClass = () =>{
    if(typeof window !== 'undefined'){
      window.location.href = 'https://console-api-sig.zegocloud.com/s/uikit/rauyie';
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Course Header */}
      <div className="flex pt-24 flex-col md:flex-row gap-6 mb-8">
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {course.courseCode}: {course.courseName}
          </h1>
          <div className="flex items-center gap-4 mb-4">
            <div className="flex items-center">
              <Avatar className="h-8 w-8 mr-2">
                <AvatarImage src={course.instructor.profilePicture || undefined} />
                <AvatarFallback>
                  {getInitials(course.instructor.firstName, course.instructor.lastName)}
                </AvatarFallback>
              </Avatar>
              <span className="text-gray-700">
                Prof. {course.instructor.firstName} {course.instructor.lastName}
              </span>
            </div>
            <Badge variant="outline" className="text-sm">
              {course.department}
            </Badge>
            <Badge variant={course.status === 'IN_PROGRESS' ? 'default' : 'secondary'}>
              {course.status.replace('_', ' ')}
            </Badge>
          </div>
          <p className="text-gray-600 mb-4">{course.description}</p>
          
          <div className="flex flex-wrap gap-2 mb-4">
            <div className="flex items-center text-sm text-gray-600">
              <Users className="h-4 w-4 mr-1" />
              {course.enrollments.length} / {course.maximumStudents} students
            </div>
            <div className="flex items-center text-sm text-gray-600">
              <Calendar className="h-4 w-4 mr-1" />
              {formatDate(course.startDate)} - {formatDate(course.endDate)}
            </div>
          </div>

          <Button onClick={handleStartClass}
           className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>
            Join Class
          </Button>
        </div>
        
        {course.coverImage && (
          <div className="w-full md:w-1/3">
            <img 
              src={course.coverImage} 
              alt={`${course.courseName} cover`}
              className="rounded-lg object-cover w-full h-48 md:h-full"
            />
          </div>
        )}
      </div>

      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-2 ">
          <span className="text-sm font-medium text-gray-700">Course Progress</span>
          <span className="text-sm text-gray-500 ">65%</span>
        </div>
        <Progress value={65} className="h-2" />
      </div>

      {/* Main Content Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">
            <BookOpen className="h-4 w-4 mr-2" /> Overview
          </TabsTrigger>
          <TabsTrigger value="materials">
            <FileText className="h-4 w-4 mr-2" /> Materials
          </TabsTrigger>
          <TabsTrigger value="assignments">
            <ClipboardList className="h-4 w-4 mr-2" /> Assignments
          </TabsTrigger>
          <TabsTrigger value="exams">
            <AlertCircle className="h-4 w-4 mr-2" /> Exams
          </TabsTrigger>
          <TabsTrigger value="meetings">
            <Video className="h-4 w-4 mr-2" /> Meetings
          </TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          {/* Syllabus Section */}
          <Card>
            <CardHeader 
              className="flex flex-row items-center justify-between cursor-pointer"
              onClick={() => toggleSection('syllabus')}
            >
              <CardTitle className="flex items-center">
                <Bookmark className="h-5 w-5 mr-2 text-primary" />
                Syllabus
              </CardTitle>
              {expandedSections.syllabus ? <ChevronUp /> : <ChevronDown />}
            </CardHeader>
            {expandedSections.syllabus && (
              <CardContent>
                {course.syllabus.length > 0 ? (
                  <div className="space-y-6">
                    {course.syllabus.map((syllabus) => (
                      <div key={syllabus.id}>
                        <div className="mb-4">
                          <h3 className="font-semibold mb-2">Course Objectives</h3>
                          <ul className="list-disc pl-5 space-y-1">
                            {syllabus.objectives.map((obj) => (
                              <li key={obj.id}>{obj.description}</li>
                            ))}
                          </ul>
                        </div>

                        <div className="mb-4">
                          <h3 className="font-semibold mb-2">Weekly Schedule</h3>
                          <div className="space-y-4">
                            {syllabus.weeks.map((week) => (
                              <div key={week.id} className="border-l-2 border-primary pl-4 py-2">
                                <h4 className="font-medium">Week {week.weekNumber}: {week.title}</h4>
                                {week.content && <p className="text-sm text-gray-600 mt-1">{week.content}</p>}
                                {week.readings && (
                                  <div className="mt-2">
                                    <p className="text-sm font-medium">Readings:</p>
                                    <p className="text-sm text-gray-600">{week.readings}</p>
                                  </div>
                                )}
                                {week.assignments && (
                                  <div className="mt-2">
                                    <p className="text-sm font-medium">Assignments:</p>
                                    <p className="text-sm text-gray-600">{week.assignments}</p>
                                  </div>
                                )}
                              </div>
                            ))}
                          </div>
                        </div>

                        {syllabus.gradingPolicy && (
                          <div className="mb-4">
                            <h3 className="font-semibold mb-2">Grading Policy</h3>
                            <p className="text-sm text-gray-600">{syllabus.gradingPolicy}</p>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500">No syllabus available for this course.</p>
                )}
              </CardContent>
            )}
          </Card>

          {/* Class Schedule Section */}
          <Card>
            <CardHeader 
              className="flex flex-row items-center justify-between cursor-pointer"
              onClick={() => toggleSection('schedule')}
            >
              <CardTitle className="flex items-center">
                <Calendar className="h-5 w-5 mr-2 text-primary" />
                Class Schedule
              </CardTitle>
              {expandedSections.schedule ? <ChevronUp /> : <ChevronDown />}
            </CardHeader>
            {expandedSections.schedule && (
              <CardContent>
                {course.classTimings.length > 0 ? (
                  <div className="space-y-2">
                    {course.classTimings.map((timing) => (
                      <div key={timing.id} className="flex items-center justify-between py-2 border-b">
                        <div>
                          <span className="font-medium">{timing.day}</span>
                          <span className="text-gray-600 ml-2">
                            {formatTime(timing.startTime)} - {formatTime(timing.endTime)}
                          </span>
                        </div>
                        <Badge variant="outline">Room 101</Badge>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500">No schedule available for this course.</p>
                )}
              </CardContent>
            )}
          </Card>

          {/* Instructor Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Avatar className="h-5 w-5 mr-2">
                  <AvatarImage src={course.instructor.profilePicture || undefined} />
                  <AvatarFallback>
                    {getInitials(course.instructor.firstName, course.instructor.lastName)}
                  </AvatarFallback>
                </Avatar>
                Instructor
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-start gap-4">
                <Avatar className="h-16 w-16">
                  <AvatarImage src={course.instructor.profilePicture || undefined} />
                  <AvatarFallback>
                    {getInitials(course.instructor.firstName, course.instructor.lastName)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-semibold">
                    {course.instructor.firstName} {course.instructor.lastName}
                  </h3>
                  <p className="text-gray-600 text-sm mb-2">{course.instructor.email}</p>
                  <Button variant="outline" size="sm" className="gap-2">
                    <Mail className="h-4 w-4" />
                    Contact Instructor
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Classmates Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Users className="h-5 w-5 mr-2 text-primary" />
                Classmates ({course.enrollments.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              {course.enrollments.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                  {course.enrollments.map((enrollment) => (
                    <div key={enrollment.user.id} className="flex flex-col items-center text-center">
                      <Avatar className="h-12 w-12 mb-2">
                        <AvatarImage src={enrollment.user.profilePicture || undefined} />
                        <AvatarFallback>
                          {getInitials(enrollment.user.firstName, enrollment.user.lastName)}
                        </AvatarFallback>
                      </Avatar>
                      <p className="text-sm font-medium">
                        {enrollment.user.firstName} {enrollment.user.lastName}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500">No classmates found.</p>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Materials Tab */}
        <TabsContent value="materials" className="space-y-4">
          {course.materials.length > 0 ? (
            course.materials.map((material) => (
              <Card key={material.id}>
                <CardHeader>
                  <CardTitle>{material.title}</CardTitle>
                  {material.description && (
                    <p className="text-sm text-gray-600">{material.description}</p>
                  )}
                </CardHeader>
                <CardContent>
                  {material.courseFiles.length > 0 ? (
                    <div className="space-y-2">
                      {material.courseFiles.map((file, index) => (
                        <div 
                          key={index} 
                          className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 cursor-pointer"
                          onClick={() => downloadMaterial(file)}
                        >
                          <div className="flex items-center">
                            <FileText className="h-5 w-5 mr-3 text-gray-500" />
                            <span className="font-medium">
                              {file.split('/').pop()}
                            </span>
                          </div>
                          <Button variant="ghost" size="sm">
                            <Download className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500">No files available for this material.</p>
                  )}
                </CardContent>
              </Card>
            ))
          ) : (
            <Card>
              <CardContent className="py-8 text-center">
                <p className="text-gray-500">No materials available for this course.</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        {/* Assignments Tab */}
        <TabsContent value="assignments" className="space-y-4">
          {course.assignments.length > 0 ? (
            course.assignments.map((assignment) => (
              <Card key={assignment.id}>
                <CardHeader>
                  <CardTitle>{assignment.title}</CardTitle>
                  <div className="flex items-center gap-4 text-sm">
                    <span className="text-gray-600">
                      Due: {formatDateTime(assignment.dueDate)}
                    </span>
                    <span className="font-medium">
                      Points: {assignment.totalPoints}
                    </span>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">
                      Status: Not submitted
                    </span>
                    <Button variant="outline">View Assignment</Button>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <Card>
              <CardContent className="py-8 text-center">
                <p className="text-gray-500">No assignments available for this course.</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        {/* Exams Tab */}
        <TabsContent value="exams" className="space-y-4">
          {course.exams.length > 0 ? (
            course.exams.map((exam) => (
              <Card key={exam.id}>
                <CardHeader>
                  <CardTitle>{exam.title}</CardTitle>
                  <div className="flex items-center gap-4 text-sm">
                    <span className="text-gray-600">
                      Date: {formatDateTime(exam.examDate)}
                    </span>
                    <span className="font-medium">
                      Points: {exam.totalPoints}
                    </span>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">
                      Status: Not taken
                    </span>
                    <Button variant="outline">View Exam Details</Button>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <Card>
              <CardContent className="py-8 text-center">
                <p className="text-gray-500">No exams scheduled for this course.</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        {/* Meetings Tab */}
        <TabsContent value="meetings" className="space-y-4">
          {course.meetings.length > 0 ? (
            course.meetings.map((meeting) => (
              <Card key={meeting.id}>
                <CardHeader>
                  <CardTitle>{meeting.title}</CardTitle>
                  <div className="flex items-center gap-4 text-sm">
                    <span className="text-gray-600">
                      {formatDateTime(meeting.startTime)} - {formatTime(meeting.endTime)}
                    </span>
                  </div>
                  {meeting.description && (
                    <p className="text-sm text-gray-600">{meeting.description}</p>
                  )}
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">
                      Zoom ID: {meeting.zoomMeetingId}
                    </span>
                    <Button>Join Meeting</Button>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <Card>
              <CardContent className="py-8 text-center">
                <p className="text-gray-500">No meetings scheduled for this course.</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>

      {/* Recent Announcements */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <AlertCircle className="h-5 w-5 mr-2 text-primary" />
            Recent Announcements
          </CardTitle>
        </CardHeader>
        <CardContent>
          {course.announcements.length > 0 ? (
            <div className="space-y-4">
              {course.announcements.map((announcement) => (
                <div key={announcement.id} className="border-l-2 border-primary pl-4 py-2">
                  <div className="flex justify-between items-start">
                    <h3 className="font-semibold">{announcement.title}</h3>
                    <span className="text-sm text-gray-500">
                      {formatDate(announcement.createdAt)}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">{announcement.content}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No announcements available.</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}