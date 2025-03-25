"use client"
import React, { useState } from 'react';
// import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Calendar, Clock, GraduationCap, MapPin } from 'lucide-react';
import { student } from '@/components/Dashboard/parent/data/mockData';

// Mock timetable data
const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
const periods = ['1st (8:00-8:50)', '2nd (9:00-9:50)', '3rd (10:00-10:50)', '4th (11:00-11:50)', 'Lunch (12:00-12:50)', '5th (1:00-1:50)', '6th (2:00-2:50)', '7th (3:00-3:50)'];

const classSchedule = {
  Monday: [
    { period: '1st (8:00-8:50)', subject: 'Math', room: '101', teacher: 'Mrs. Smith' },
    { period: '2nd (9:00-9:50)', subject: 'Science', room: '203', teacher: 'Mr. Johnson' },
    { period: '3rd (10:00-10:50)', subject: 'English', room: '105', teacher: 'Ms. Davis' },
    { period: '4th (11:00-11:50)', subject: 'History', room: '202', teacher: 'Mr. Wilson' },
    { period: 'Lunch (12:00-12:50)', subject: 'Lunch', room: 'Cafeteria', teacher: '' },
    { period: '5th (1:00-1:50)', subject: 'Art', room: '304', teacher: 'Mrs. Brown' },
    { period: '6th (2:00-2:50)', subject: 'Physical Education', room: 'Gym', teacher: 'Coach Thomas' },
    { period: '7th (3:00-3:50)', subject: 'Study Hall', room: 'Library', teacher: 'Ms. Wilson' }
  ],
  Tuesday: [
    { period: '1st (8:00-8:50)', subject: 'English', room: '105', teacher: 'Ms. Davis' },
    { period: '2nd (9:00-9:50)', subject: 'Math', room: '101', teacher: 'Mrs. Smith' },
    { period: '3rd (10:00-10:50)', subject: 'History', room: '202', teacher: 'Mr. Wilson' },
    { period: '4th (11:00-11:50)', subject: 'Science', room: '203', teacher: 'Mr. Johnson' },
    { period: 'Lunch (12:00-12:50)', subject: 'Lunch', room: 'Cafeteria', teacher: '' },
    { period: '5th (1:00-1:50)', subject: 'Music', room: '305', teacher: 'Mr. Adams' },
    { period: '6th (2:00-2:50)', subject: 'Computer Science', room: '204', teacher: 'Ms. Turner' },
    { period: '7th (3:00-3:50)', subject: 'Club Activities', room: 'Various', teacher: '' }
  ],
  Wednesday: [
    { period: '1st (8:00-8:50)', subject: 'Science', room: '203', teacher: 'Mr. Johnson' },
    { period: '2nd (9:00-9:50)', subject: 'History', room: '202', teacher: 'Mr. Wilson' },
    { period: '3rd (10:00-10:50)', subject: 'Math', room: '101', teacher: 'Mrs. Smith' },
    { period: '4th (11:00-11:50)', subject: 'English', room: '105', teacher: 'Ms. Davis' },
    { period: 'Lunch (12:00-12:50)', subject: 'Lunch', room: 'Cafeteria', teacher: '' },
    { period: '5th (1:00-1:50)', subject: 'Geography', room: '201', teacher: 'Mrs. Roberts' },
    { period: '6th (2:00-2:50)', subject: 'Physical Education', room: 'Gym', teacher: 'Coach Thomas' },
    { period: '7th (3:00-3:50)', subject: 'Study Hall', room: 'Library', teacher: 'Ms. Wilson' }
  ],
  Thursday: [
    { period: '1st (8:00-8:50)', subject: 'History', room: '202', teacher: 'Mr. Wilson' },
    { period: '2nd (9:00-9:50)', subject: 'English', room: '105', teacher: 'Ms. Davis' },
    { period: '3rd (10:00-10:50)', subject: 'Science', room: '203', teacher: 'Mr. Johnson' },
    { period: '4th (11:00-11:50)', subject: 'Math', room: '101', teacher: 'Mrs. Smith' },
    { period: 'Lunch (12:00-12:50)', subject: 'Lunch', room: 'Cafeteria', teacher: '' },
    { period: '5th (1:00-1:50)', subject: 'Art', room: '304', teacher: 'Mrs. Brown' },
    { period: '6th (2:00-2:50)', subject: 'Computer Science', room: '204', teacher: 'Ms. Turner' },
    { period: '7th (3:00-3:50)', subject: 'Club Activities', room: 'Various', teacher: '' }
  ],
  Friday: [
    { period: '1st (8:00-8:50)', subject: 'Math', room: '101', teacher: 'Mrs. Smith' },
    { period: '2nd (9:00-9:50)', subject: 'Science', room: '203', teacher: 'Mr. Johnson' },
    { period: '3rd (10:00-10:50)', subject: 'English', room: '105', teacher: 'Ms. Davis' },
    { period: '4th (11:00-11:50)', subject: 'History', room: '202', teacher: 'Mr. Wilson' },
    { period: 'Lunch (12:00-12:50)', subject: 'Lunch', room: 'Cafeteria', teacher: '' },
    { period: '5th (1:00-1:50)', subject: 'Music', room: '305', teacher: 'Mr. Adams' },
    { period: '6th (2:00-2:50)', subject: 'Physical Education', room: 'Gym', teacher: 'Coach Thomas' },
    { period: '7th (3:00-3:50)', subject: 'Homeroom', room: '101', teacher: 'Mrs. Smith' }
  ]
};

// Mock enrolled courses data
const enrolledCourses = [
  { id: 'c1', name: 'Mathematics', code: 'MATH-101', teacher: 'Mrs. Smith', room: '101', schedule: 'MWF 8:00-8:50 AM', description: 'Pre-Algebra and introductory algebraic concepts' },
  { id: 'c2', name: 'Science', code: 'SCI-203', teacher: 'Mr. Johnson', room: '203', schedule: 'MWF 9:00-9:50 AM', description: 'Life sciences focusing on biology and ecology' },
  { id: 'c3', name: 'English', code: 'ENG-105', teacher: 'Ms. Davis', room: '105', schedule: 'TR 8:00-8:50 AM', description: 'Language arts, reading comprehension, and writing' },
  { id: 'c4', name: 'History', code: 'HIST-202', teacher: 'Mr. Wilson', room: '202', schedule: 'TR 10:00-10:50 AM', description: 'American history and social studies' },
  { id: 'c5', name: 'Art', code: 'ART-304', teacher: 'Mrs. Brown', room: '304', schedule: 'MW 1:00-1:50 PM', description: 'Visual arts, drawing, and creative expression' },
  { id: 'c6', name: 'Physical Education', code: 'PE-101', teacher: 'Coach Thomas', room: 'Gym', schedule: 'MWF 2:00-2:50 PM', description: 'Physical fitness, sports, and health education' },
  { id: 'c7', name: 'Music', code: 'MUS-305', teacher: 'Mr. Adams', room: '305', schedule: 'TR 1:00-1:50 PM', description: 'Music theory, instrument practice, and choir' },
  { id: 'c8', name: 'Computer Science', code: 'CS-204', teacher: 'Ms. Turner', room: '204', schedule: 'TR 2:00-2:50 PM', description: 'Introduction to programming and digital literacy' }
];

// Mock teachers data
const teachers = [
  { id: 't1', name: 'Mrs. Smith', subject: 'Mathematics', avatar: 'https://i.pravatar.cc/150?img=32', email: 'smith@school.edu', phone: '(555) 123-4567', office: 'Room 101', officeHours: 'Mon, Wed 3:30-4:30 PM' },
  { id: 't2', name: 'Mr. Johnson', subject: 'Science', avatar: 'https://i.pravatar.cc/150?img=59', email: 'johnson@school.edu', phone: '(555) 234-5678', office: 'Room 203', officeHours: 'Tue, Thu 3:30-4:30 PM' },
  { id: 't3', name: 'Ms. Davis', subject: 'English', avatar: 'https://i.pravatar.cc/150?img=45', email: 'davis@school.edu', phone: '(555) 345-6789', office: 'Room 105', officeHours: 'Mon, Fri 3:30-4:30 PM' },
  { id: 't4', name: 'Mr. Wilson', subject: 'History', avatar: 'https://i.pravatar.cc/150?img=53', email: 'wilson@school.edu', phone: '(555) 456-7890', office: 'Room 202', officeHours: 'Wed, Fri 3:30-4:30 PM' },
  { id: 't5', name: 'Mrs. Brown', subject: 'Art', avatar: 'https://i.pravatar.cc/150?img=10', email: 'brown@school.edu', phone: '(555) 567-8901', office: 'Room 304', officeHours: 'Tue, Thu 3:30-4:30 PM' },
  { id: 't6', name: 'Coach Thomas', subject: 'Physical Education', avatar: 'https://i.pravatar.cc/150?img=60', email: 'thomas@school.edu', phone: '(555) 678-9012', office: 'Gym Office', officeHours: 'Mon-Fri 3:30-4:30 PM' },
  { id: 't7', name: 'Mr. Adams', subject: 'Music', avatar: 'https://i.pravatar.cc/150?img=25', email: 'adams@school.edu', phone: '(555) 789-0123', office: 'Room 305', officeHours: 'Mon, Wed 3:30-4:30 PM' },
  { id: 't8', name: 'Ms. Turner', subject: 'Computer Science', avatar: 'https://i.pravatar.cc/150?img=23', email: 'turner@school.edu', phone: '(555) 890-1234', office: 'Room 204', officeHours: 'Tue, Thu 3:30-4:30 PM' }
];

const ChildTimeTable: React.FC = () => {
  const [viewType, setViewType] = useState<'weekly' | 'daily'>('weekly');
  const [selectedDay, setSelectedDay] = useState<string>('Monday');
  
  return (
    <>
      <div className="space-y-6 animate-fade-in">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Student Schedule</h1>
          <p className="text-gray-600">View class timetable, courses, and teacher information</p>
        </div>
        
        <div className="flex items-center space-x-4">
          <Avatar className="h-16 w-16 border-2 border-white shadow-sm">
            <AvatarImage src={student.avatar} alt={student.name} />
            <AvatarFallback>{student.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <h2 className="text-xl font-bold">{student.name}</h2>
            <p className="text-gray-600">{student.grade} • Student ID: S-2023-{student.id}</p>
          </div>
        </div>
        
        <Tabs defaultValue="timetable" className="w-full">
          <TabsList className="w-full max-w-md grid grid-cols-3">
            <TabsTrigger value="timetable">Timetable</TabsTrigger>
            <TabsTrigger value="courses">Enrolled Courses</TabsTrigger>
            <TabsTrigger value="teachers">Subject Teachers</TabsTrigger>
          </TabsList>
          
          <TabsContent value="timetable" className="mt-6">
            <Card>
              <CardHeader className="pb-3">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-2 md:space-y-0">
                  <div>
                    <CardTitle>Class Schedule</CardTitle>
                    <CardDescription>Weekly timetable for all classes</CardDescription>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-2">
                    <div className="flex items-center gap-2">
                      <label className="text-sm">View:</label>
                      <Select value={viewType} onValueChange={(value: 'weekly' | 'daily') => setViewType(value)}>
                        <SelectTrigger className="w-36">
                          <SelectValue placeholder="Select view" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="weekly">Weekly View</SelectItem>
                          <SelectItem value="daily">Daily View</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    {viewType === 'daily' && (
                      <Select value={selectedDay} onValueChange={setSelectedDay}>
                        <SelectTrigger className="w-36">
                          <SelectValue placeholder="Select day" />
                        </SelectTrigger>
                        <SelectContent>
                          {days.map((day) => (
                            <SelectItem key={day} value={day}>{day}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {viewType === 'weekly' ? (
                  <div className="overflow-x-auto">
                    <Table className="border-collapse">
                      <TableHeader>
                        <TableRow>
                          <TableHead className="font-medium">Period</TableHead>
                          {days.map((day) => (
                            <TableHead key={day} className="font-medium">{day}</TableHead>
                          ))}
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {periods.map((period) => (
                          <TableRow key={period}>
                            <TableCell className="font-medium whitespace-nowrap">{period}</TableCell>
                            {days.map((day) => {
                              const classInfo = classSchedule[day as keyof typeof classSchedule].find(
                                c => c.period === period
                              );
                              return (
                                <TableCell key={`${day}-${period}`} className="min-w-[150px]">
                                  {classInfo?.subject === 'Lunch' ? (
                                    <div className="bg-blue-50 p-2 rounded-md text-center">
                                      <p className="font-medium text-blue-700">Lunch Break</p>
                                      <p className="text-xs text-blue-600">Cafeteria</p>
                                    </div>
                                  ) : classInfo?.subject === 'Study Hall' ? (
                                    <div className="bg-purple-50 p-2 rounded-md">
                                      <p className="font-medium text-purple-700">Study Hall</p>
                                      <p className="text-xs text-purple-600">{classInfo.room}</p>
                                    </div>
                                  ) : classInfo?.subject === 'Club Activities' ? (
                                    <div className="bg-green-50 p-2 rounded-md">
                                      <p className="font-medium text-green-700">Club Activities</p>
                                      <p className="text-xs text-green-600">Various Locations</p>
                                    </div>
                                  ) : classInfo ? (
                                    <div className="bg-gray-50 p-2 rounded-md">
                                      <p className="font-medium">{classInfo.subject}</p>
                                      <div className="flex justify-between text-xs text-gray-500">
                                        <span>Room {classInfo.room}</span>
                                        <span>{classInfo.teacher}</span>
                                      </div>
                                    </div>
                                  ) : (
                                    <div className="text-gray-400 text-center text-xs">No Class</div>
                                  )}
                                </TableCell>
                              );
                            })}
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <h3 className="text-lg font-bold">{selectedDay}'s Schedule</h3>
                    <div className="grid gap-3">
                      {classSchedule[selectedDay as keyof typeof classSchedule].map((classInfo, idx) => (
                        <div key={idx} className="bg-gray-50 rounded-lg p-4">
                          <div className="flex justify-between items-start">
                            <div>
                              <h4 className="font-medium">{classInfo.subject}</h4>
                              <p className="text-sm text-gray-500">{classInfo.period}</p>
                            </div>
                            {classInfo.subject !== 'Lunch' && classInfo.subject !== 'Club Activities' && (
                              <Badge variant="outline" className="bg-blue-50 text-blue-700">
                                {classInfo.room}
                              </Badge>
                            )}
                          </div>
                          {classInfo.teacher && (
                            <div className="mt-2 pt-2 border-t border-gray-200">
                              <p className="text-sm text-gray-600">Teacher: {classInfo.teacher}</p>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="courses" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {enrolledCourses.map((course) => (
                <Card key={course.id} className="transition-all hover:shadow-md">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <Badge variant="outline" className="mb-2 bg-blue-50 text-blue-700">
                          {course.code}
                        </Badge>
                        <CardTitle className="text-lg">{course.name}</CardTitle>
                        <CardDescription>Teacher: {course.teacher}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pb-3">
                    <div className="grid grid-cols-2 gap-2 mb-3">
                      <div className="flex items-center">
                        <MapPin className="h-4 w-4 text-gray-500 mr-2" />
                        <span className="text-sm">Room {course.room}</span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 text-gray-500 mr-2" />
                        <span className="text-sm">{course.schedule}</span>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600">{course.description}</p>
                  </CardContent>
                  <CardContent className="pt-0 flex flex-wrap gap-2">
                    <Button variant="outline" size="sm">Syllabus</Button>
                    <Button variant="outline" size="sm">Assignments</Button>
                    <Button variant="outline" size="sm">Materials</Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="teachers" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {teachers.map((teacher) => (
                <Card key={teacher.id} className="transition-all hover:shadow-md">
                  <CardContent className="p-6">
                    <div className="flex flex-col items-center text-center mb-4">
                      <Avatar className="h-24 w-24 mb-3">
                        <AvatarImage src={teacher.avatar} alt={teacher.name} />
                        <AvatarFallback>{teacher.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <h3 className="font-bold text-lg">{teacher.name}</h3>
                      <div className="flex items-center justify-center mt-1">
                        <GraduationCap className="h-4 w-4 text-gray-500 mr-1" />
                        <p className="text-gray-600">{teacher.subject}</p>
                      </div>
                    </div>
                    
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-500">Email:</span>
                        <span className="font-medium">{teacher.email}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Phone:</span>
                        <span className="font-medium">{teacher.phone}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Office:</span>
                        <span className="font-medium">{teacher.office}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Office Hours:</span>
                        <span className="font-medium">{teacher.officeHours}</span>
                      </div>
                    </div>
                    
                    <div className="mt-4 pt-4 border-t border-gray-200 grid grid-cols-2 gap-2">
                      <Button variant="outline" size="sm">Message</Button>
                      <Button variant="outline" size="sm">Schedule Meeting</Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
};

export default ChildTimeTable;
